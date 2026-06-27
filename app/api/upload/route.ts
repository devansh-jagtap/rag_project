import { NextResponse } from "next/server";
import { extractText } from "unpdf";
import { GoogleGenAI } from "@google/genai";
import { prisma } from "@/lib/prisma";
import { index } from "@/lib/pinecone";

const ai = new GoogleGenAI({});

function chunkText(
  text: string,
  chunkSize = 500,
  overlap = 100
) {
  const chunks = [];

  for (let i = 0; i < text.length; i += chunkSize - overlap) {
    chunks.push(text.slice(i, i + chunkSize));
  }

  return chunks;
}

export async function POST(req: Request) {
  try {
    // GET PDF
    const formData = await req.formData();
    const file = formData.get("pdf") as File;

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // EXTRACT TEXT
    const data = await extractText(uint8Array);
    const fullText = data.text.join(" ");

    // CHUNK
    const chunks = chunkText(fullText);

    console.log("Chunks:", chunks.length);

    // CREATE DOCUMENT
    const document = await prisma.document.create({
      data: {
        title: file.name,
      },
    });

    const documentId = document.id;

    // CREATE EMBEDDINGS
    const embeddedChunks = await Promise.all(
      chunks.map(async (chunk) => {
        const response = await ai.models.embedContent({
          model: "gemini-embedding-2",
          contents: chunk,
          config: {
            taskType: "SEMANTIC_SIMILARITY",
            outputDimensionality: 1024,
          },
        });

        return {
          text: chunk,
          embedding: response.embeddings?.[0]?.values ?? [],
        };
      })
    );

    // CREATE PINECONE VECTORS
    const vectors = embeddedChunks.map((chunk, i) => ({
      id: `${documentId}-${i}`,
      values: chunk.embedding,
      metadata: {
        documentId,
        chunkIndex: i,
        text: chunk.text,
      },
    }));

    await index.upsert({
      records: vectors,
    });

    console.log("Uploaded to Pinecone");

    return NextResponse.json({
      success: true,
      documentId,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}



// import { NextResponse } from "next/server";
// import { extractText } from "unpdf";
// import { GoogleGenAI } from "@google/genai";
// import { prisma } from "@/lib/prisma";
// import { index } from "@/lib/pinecone";

// const ai = new GoogleGenAI({});

// function chunkText(text: string, chunkSize = 500, overlap = 100) {
//   const chunks = [];

//   for (let i = 0; i < text.length; i += chunkSize - overlap) {
//     chunks.push(text.slice(i, i + chunkSize));
//   }

//   return chunks;
// }

// export async function POST(req: Request) {
//   try {
//     // GET PDF

//     const formData = await req.formData();
//     const file = formData.get("pdf") as File;

//     const arrayBuffer = await file.arrayBuffer();
//     const uint8Array = new Uint8Array(arrayBuffer);

//     // EXTRACT TEXT

//     const data = await extractText(uint8Array);
//     const fullText = data.text.join(" ");

//     // CHUNK TEXT

//     const chunks = chunkText(fullText);

//     console.log("Chunks:", chunks.length);

//     // CREATE DOCUMENT

//     const document = await prisma.document.create({
//       data: {
//         title: file.name,
//       },
//     });

//     const documentId = document.id;

//     console.log("Document ID:", documentId);

//     // CREATE EMBEDDINGS

//     const embeddedChunks = await Promise.all(
//       chunks.map(async (chunk) => {
//         const response = await ai.models.embedContent({
//           model: "gemini-embedding-2",
//           contents: chunk,
//           config: {
//             taskType: "SEMANTIC_SIMILARITY",
//             outputDimensionality: 1024,
//           },
//         });

//         return {
//           text: chunk,
//           embedding: response.embeddings?.[0]?.values,
//         };
//       }),
//     );

//     console.log("Embedding Length:", embeddedChunks[0].embedding?.length);

//     // PREPARE PINECONE VECTORS

//     const vectors = embeddedChunks.map((chunk, i) => ({
//       id: `${documentId}-${i}`,
//       values: chunk.embedding!,
//       metadata: {
//         documentId,
//         chunkIndex: i,
//         text: chunk.text,
//       },
//     }));

//     console.log(vectors[0]);

//     await index.upsert({
//       records: vectors,
//     });

//     // OLD DATABASE STORAGE
//     // (Keep temporarily)

//     /*
//     for (let i = 0; i < chunks.length; i++) {
//       await prisma.documentChunk.create({
//         data: {
//           documentId,
//           chunkIndex: i,
//           text: embeddedChunks[i].text,
//           embedding: embeddedChunks[i].embedding,
//         },
//       });
//     }
//     */

//     return NextResponse.json({
//       success: true,
//       documentId,
//     });
//   } catch (error) {
//     console.error(error);

//     return NextResponse.json(
//       {
//         success: false,
//         error: String(error),
//       },
//       {
//         status: 500,
//       },
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import { extractText } from "unpdf";
// import { GoogleGenAI } from "@google/genai";
// import { prisma } from "@/lib/prisma";
// import { index } from "@/lib/pinecone";
// const ai = new GoogleGenAI({});
// // function cosineSimilarity(a: number[], b: number[]) {
// //   let dotProduct = 0;
// //   let normA = 0;
// //   let normB = 0;

// //   for (let i = 0; i < a.length; i++) {
// //     dotProduct += a[i] * b[i];
// //     normA += a[i] * a[i];
// //     normB += b[i] * b[i];
// //   }

// //   return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
// // }
// function chunkText(text: string, chunkSize = 500, overlap = 100) {
//   const chunks = [];

//   for (let i = 0; i < text.length; i += chunkSize - overlap) {
//     chunks.push(text.slice(i, i + chunkSize));
//   }

//   return chunks;
// }

// export async function POST(req: Request) {
//   try {
//     // FORM DATA -> GET PDF
//     const formData = await req.formData();
//     const file = formData.get("pdf") as File;
//     const arrayBuffer = await file.arrayBuffer();
//     const uint8Array = new Uint8Array(arrayBuffer);

//     // EXTRACT TEXT
//     const data = await extractText(uint8Array);
//     const fullText = data.text.join(" ");

//     // CHUNK TEXT
//     const chunks = chunkText(fullText);
//     console.log("Chunks:", chunks.length);

//     // EMBEDDINGS
//     const embeddedChunks = await Promise.all(
//       chunks.map(async (chunk) => {
//         const response = await ai.models.embedContent({
//           model: "gemini-embedding-2",
//           contents: chunk,
//           config: {
//             taskType: "SEMANTIC_SIMILARITY",
//             outputDimensionality: 1024,
//           },
//         });
//         return {
//           text: chunk,
//           embedding: response.embeddings?.[0]?.values,
//         };
//       }),
//     );
//     const vectors = embeddedChunks.map((chunk, i) => ({
//       id: `${documentId}-${i}`,
//       values: chunk.embedding!,
//       metadata: {
//         documentId,
//         chunkIndex: i,
//         text: chunk.text,
//       },
//     }));
//     console.log("Embedding Length:", embeddedChunks[0].embedding?.length);

//     console.log(typeof embeddedChunks[0].embedding);

//     console.log(embeddedChunks[0].embedding?.length);

//     console.log(embeddedChunks[0]);
//     // SAVE TO DATABASE
//     // const documentId = crypto.randomUUID();

//     const document = await prisma.document.create({
//       data: {
//         title: file.name,
//       },
//     });
//     const documentId = document.id;
//     for (let i = 0; i < chunks.length; i++) {
//       await prisma.documentChunk.create({
//         data: {
//           documentId,
//           chunkIndex: i,
//           text: embeddedChunks[i].text,
//           embedding: embeddedChunks[i].embedding,
//         },
//       });
//     }
//     const savedChunks = await prisma.documentChunk.findMany();

//     console.log(savedChunks.length);

//     // QUESTIONS EMBEDDING

//     // const question = "What databases does Devansh know?";

//     // const questionResponse = await ai.models.embedContent({
//     //   model: "gemini-embedding-2",
//     //   contents: question,
//     //   config: {
//     //     taskType: "SEMANTIC_SIMILARITY",
//     //   },
//     // });

//     // const questionEmbedding = questionResponse.embeddings?.[0]?.values;

//     // if (!questionEmbedding) {
//     //   throw new Error("No question embedding");
//     // }

//     //     // SIMILARITY SEARCH
//     //     const scores = embeddedChunks.map((chunk) => ({
//     //       text: chunk.text,
//     //       score: cosineSimilarity(questionEmbedding, chunk.embedding!),
//     //     }));
//     //     scores.sort((a, b) => b.score - a.score);

//     //     console.log("Top Score:", scores[0].score);

//     //     // Build Context
//     //     const context = scores
//     //       .slice(0, 3)
//     //       .map((item) => item.text)
//     //       .join("\n\n");

//     //     // Generate Answer
//     //     const prompt = `
//     // Answer the question using only the provided context.

//     // Context:
//     // ${context}

//     // Question:
//     // ${question}
//     // `;
//     //     const answer = await ai.models.generateContent({
//     //       model: "gemini-2.5-flash",
//     //       contents: prompt,
//     //     });

//     //     console.log(answer.text);

//     return NextResponse.json({
//       success: true,
//       documentId,
//     });
//   } catch (error) {
//     console.error("ERROR:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         error: String(error),
//       },
//       { status: 500 },
//     );
//   }
// }
