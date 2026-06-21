import { NextResponse } from "next/server";
import { extractText } from "unpdf";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});
function cosineSimilarity(
  a: number[],
  b: number[]
) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dotProduct /
    (Math.sqrt(normA) * Math.sqrt(normB));
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("pdf") as File;

    const arrayBuffer = await file.arrayBuffer();

    const uint8Array = new Uint8Array(arrayBuffer);

    const data = await extractText(uint8Array);
    function chunkText(text: string, chunkSize = 500, overlap = 100) {
      const chunks = [];

      for (let i = 0; i < text.length; i += chunkSize - overlap) {
        chunks.push(text.slice(i, i + chunkSize));
      }

      return chunks;
    }
    const fullText = data.text.join(" ");

    const chunks = chunkText(fullText);


    const embeddedChunks = await Promise.all(
      chunks.map(async (chunk) => {
        const response = await ai.models.embedContent({
          model: "gemini-embedding-2",
          contents: chunk,
          config: { taskType: "SEMANTIC_SIMILARITY" },
        });
        return {
          text: chunk,
          embedding: response.embeddings?.[0]?.values,
        };
      }),
    );
    const question =
  "What databases does Devansh know?";

const questionResponse =
  await ai.models.embedContent({
    model: "gemini-embedding-2",
    contents: question,
    config: {
      taskType: "SEMANTIC_SIMILARITY",
    },
  });

const questionEmbedding =
  questionResponse.embeddings?.[0]?.values;

if (!questionEmbedding) {
  throw new Error("No question embedding");
}
const scores = embeddedChunks.map(
  (chunk) => ({
    text: chunk.text,
    score: cosineSimilarity(
      questionEmbedding,
      chunk.embedding!
    ),
  })
);
scores.sort(
  (a, b) => b.score - a.score
);

const context = scores
  .slice(0, 3)
  .map(item => item.text)
  .join("\n\n");

const prompt = `
Answer the question using only the provided context.

Context:
${context}

Question:
${question}
`;
const answer = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: prompt,
});

console.log(answer.text);
// console.log("Best Match:");

// console.log(scores[0].score);
// console.log(scores.slice(0, 3));

// console.log(scores[0].text);
    // c
    // onsole.log(chunks.length);
    // console.log(chunks[0].length);
    // console.log(chunks[1].length);
    // console.log("Total chunks:", embeddedChunks.length);

    // console.log(embeddedChunks[0].embedding?.length);

    // console.log(response.embeddings);
    // console.log(response);

    // if (!response.embeddings?.length) {
    //   throw new Error("No embeddings returned");
    // }

    // console.log(response.embeddings.length);

    // console.log(response.embeddings[0]?.values?.length);

    // console.log(response.embeddings[0]?.values?.slice(0, 10));
    // console.log("Chunks:", chunks.length);
    // console.log(chunks.length);
    // console.log(chunks.slice(0, 5));
    // console.log(chunks[0]);
    // console.log(chunks[1]);
    // console.log(data);
    // console.log("Text extracted");

    return NextResponse.json({
      success: true,
      text: data.text,
    });
  } catch (error) {
    console.error("ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 },
    );
  }
}
