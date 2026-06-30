import { GoogleGenAI } from "@google/genai";
import { index } from "@/lib/pinecone";
import { ragPrompt } from "@/lib/prompt";
import { prisma } from "@/lib/prisma";
import { chatModel } from "@/lib/ai";
import { generateText } from "ai";
const ai = new GoogleGenAI({});

export async function GET() {
  const chats = await prisma.chat.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json(chats);
}

export async function POST(req: Request) {
  try {
    const { message, chatId } = await req.json();

    const documents = await prisma.document.findMany({
      where: {
        chatId,
      },
    });

    let selectedDocument: string | null = null;

    for (const document of documents) {
      if (message.toLowerCase().includes(document.title.toLowerCase())) {
        selectedDocument = document.title;
        break;
      }
    }

    console.log("Selected Document:", selectedDocument);
    await prisma.message.create({
      data: {
        role: "user",
        content: message,
        chatId,
      },
    });
    const previousMessages = await prisma.message.findMany({
      where: {
        chatId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    const history = previousMessages
      .reverse()
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");
    const questionResponse = await ai.models.embedContent({
      model: "gemini-embedding-2",
      contents: message,
      config: {
        taskType: "SEMANTIC_SIMILARITY",
        outputDimensionality: 1024,
      },
    });

    const questionEmbedding = questionResponse.embeddings?.[0]?.values;

    if (!questionEmbedding) {
      throw new Error("No question embedding");
    }

    const results = await index.namespace("documents").query({
      vector: questionEmbedding,
      topK: 5,
      includeMetadata: true,
      filter: selectedDocument
        ? {
            chatId: {
              $eq: chatId,
            },
            title: {
              $eq: selectedDocument,
            },
          }
        : {
            chatId: {
              $eq: chatId,
            },
          },
    });

    console.log("Matches");

    results.matches.forEach((match, index) => {
      console.log("----------------");
      console.log(index + 1);
      console.log("Score:", match.score);
      console.log(match.metadata?.title);
      console.log(match.metadata?.text);
    });

    const context = results.matches
      .map((match) => {
        return `
Document: ${match.metadata?.title}

${match.metadata?.text}
`;
      })
      .join("\n----------------------\n");
    if (!context) {
      return Response.json({
        success: true,
        answer: "I couldn't find anything relevant in the uploaded documents.",
      });
    }
    const prompt = `
You are an AI assistant that answers questions using uploaded PDFs.

Previous Conversation:
${history}

Retrieved Documents:
${context}

Current Question:
${message}

Rules:
- Use the retrieved documents first.
- Use conversation history for follow-up questions.
- Mention the document name whenever relevant.
- If information comes from multiple PDFs, combine it into one answer.
- If the answer is missing, say you couldn't find it.
`;
    const { text } = await generateText({
      model: chatModel,
      prompt,
    });
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
    });

    if (chat?.title === "New Chat") {
      const { text: title } = await generateText({
        model: chatModel,
        prompt: `
Generate a short chat title (max 4 words).

First user message:
${message}

Return only the title.
`,
      });

      await prisma.chat.update({
        where: {
          id: chatId,
        },
        data: {
          title: title.replace(/["']/g, "").trim(),
        },
      });
    }
    await prisma.message.create({
      data: {
        role: "assistant",
        content: text,
        chatId,
      },
    });
    return Response.json({
      success: true,
      answer: text,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      },
    );
  }
}

// import { GoogleGenAI } from "@google/genai";
// import { index } from "@/lib/pinecone";
// import { ragPrompt } from "@/lib/prompt";
// import { prisma } from "@/lib/prisma";
// const ai = new GoogleGenAI({});
// export async function GET() {
//   const chats = await prisma.chat.findMany({
//     orderBy: {
//       createdAt: "desc",
//     },
//   });

//   return Response.json(chats);
// }

// export async function POST(req: Request) {
//   try {
//     const { message, chatId } = await req.json();

//     // Embed Question
//     const questionResponse = await ai.models.embedContent({
//       model: "gemini-embedding-2",
//       contents: message,
//       config: {
//         taskType: "SEMANTIC_SIMILARITY",
//         outputDimensionality: 1024,
//       },
//     });

//     const questionEmbedding = questionResponse.embeddings?.[0]?.values;

//     if (!questionEmbedding) {
//       throw new Error("No question embedding");
//     }

//     // Query Pinecone
//     const results = await index.namespace("documents").query({
//       vector: questionEmbedding,
//       topK: 10,
//       includeMetadata: true,
//       filter: {
//         documentId: {
//           $eq: chatId,
//         },
//       },
//     });

//     console.log("Matches");

//     results.matches.forEach((match, index) => {
//       console.log("----------------");
//       console.log(index + 1);
//       console.log("Score:", match.score);
//       console.log(match.metadata?.text);
//     });
//     console.log(results.matches);

//     // Build Context
//     const context = results.matches
//       .map((match) => match.metadata?.text as string)
//       .join("\n\n");

//     // Generate Answer
//     //     const prompt = `
//     // You are a PDF assistant.

//     // Answer ONLY using the provided context.

//     // If the answer is not present in the context, simply reply:

//     // "I couldn't find that information in the uploaded PDF."

//     // Context:
//     // ${context}

//     // Question:
//     // ${message}
//     // `;
//     const prompt = await ragPrompt.format({
//       context,
//       question: message,
//     });

//     const answer = await ai.models.generateContent({
//       model: "gemini-2.5-flash",
//       contents: prompt,
//     });

//     return Response.json({
//       success: true,
//       answer: answer.text,
//     });
//   } catch (error) {
//     console.error(error);

//     return Response.json(
//       {
//         success: false,
//         error: String(error),
//       },
//       { status: 500 },
//     );
//   }
// }

// import { GoogleGenAI } from "@google/genai";
// import { prisma } from "@/lib/prisma";

// const ai = new GoogleGenAI({});
// function cosineSimilarity(a: number[], b: number[]) {
//   let dotProduct = 0;
//   let normA = 0;
//   let normB = 0;

//   for (let i = 0; i < a.length; i++) {
//     dotProduct += a[i] * b[i];
//     normA += a[i] * a[i];
//     normB += b[i] * b[i];
//   }

//   return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
// }
// export async function POST(req: Request) {
//   try {
//     // const { message } = await req.json();

//     // console.log(message);
//     const { message, documentId } = await req.json();

//     console.log(message);
//     console.log(documentId);
//     const questionResponse = await ai.models.embedContent({
//       model: "gemini-embedding-2",
//       contents: message,
//       config: {
//         taskType: "SEMANTIC_SIMILARITY",
//         outputDimensionality: 1024,
//       },
//     });

//     const questionEmbedding = questionResponse.embeddings?.[0]?.values;

//     if (!questionEmbedding) {
//       throw new Error("No question embedding");
//     }
//     const chunks = await prisma.documentChunk.findMany({
//       where: {
//         documentId,
//       },
//     });

//     // SIMILARITY SEARCH
//     const scores = chunks
//       .filter((chunk) => chunk.embedding)
//       .map((chunk) => ({
//         text: chunk.text,
//         score: cosineSimilarity(questionEmbedding, chunk.embedding as number[]),
//       }));
//     scores.sort((a, b) => b.score - a.score);

//     scores.slice(0, 5).forEach((item, index) => {
//       console.log("----------------");
//       console.log(index + 1);
//       console.log(item.score);
//       console.log(item.text);
//     });

//     // Build Context
//     const context = scores
//       .slice(0, 3)
//       .map((item) => item.text)
//       .join("\n");

//     // Generate Answer
//     const prompt = `
// Answer the question using the provided context.
// and write short and better answers as you are assistant

// Context:
// ${context}

// Question:
// ${message}
// `;
//     const answer = await ai.models.generateContent({
//       model: "gemini-2.5-flash",
//       contents: prompt,
//     });

//     console.log(answer.text);
//     return Response.json({
//       success: true,
//       answer: answer.text,
//     });
//   } catch (error) {
//     console.error(error);

//     return Response.json(
//       {
//         success: false,
//         error: String(error),
//       },
//       { status: 500 },
//     );
//   }
// }
