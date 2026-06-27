import { GoogleGenAI } from "@google/genai";
import { index } from "@/lib/pinecone";
import { ragPrompt } from "@/lib/prompt";
import { prisma } from "@/lib/prisma";
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

    // Embed Question
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

    // Query Pinecone
    const results = await index.namespace("documents").query({
      vector: questionEmbedding,
      topK: 10,
      includeMetadata: true,
      filter: {
        documentId: {
          $eq: chatId,
        },
      },
    });

    console.log("Matches");

    results.matches.forEach((match, index) => {
      console.log("----------------");
      console.log(index + 1);
      console.log("Score:", match.score);
      console.log(match.metadata?.text);
    });
    console.log(results.matches);

    // Build Context
    const context = results.matches
      .map((match) => match.metadata?.text as string)
      .join("\n\n");

    // Generate Answer
    //     const prompt = `
    // You are a PDF assistant.

    // Answer ONLY using the provided context.

    // If the answer is not present in the context, simply reply:

    // "I couldn't find that information in the uploaded PDF."

    // Context:
    // ${context}

    // Question:
    // ${message}
    // `;
    const prompt = await ragPrompt.format({
      context,
      question: message,
    });

    const answer = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return Response.json({
      success: true,
      answer: answer.text,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 },
    );
  }
}

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
