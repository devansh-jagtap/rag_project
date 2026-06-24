import { GoogleGenAI } from "@google/genai";
import { prisma } from "@/lib/prisma";

const ai = new GoogleGenAI({});
function cosineSimilarity(a: number[], b: number[]) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}
export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    console.log(message);
    const questionResponse = await ai.models.embedContent({
      model: "gemini-embedding-2",
      contents: message,
      config: {
        taskType: "SEMANTIC_SIMILARITY",
      },
    });

    const questionEmbedding = questionResponse.embeddings?.[0]?.values;

    if (!questionEmbedding) {
      throw new Error("No question embedding");
    }
    const chunks = await prisma.documentChunk.findMany();

    // SIMILARITY SEARCH
    const scores = chunks
      .filter((chunk) => chunk.embedding)
      .map((chunk) => ({
        text: chunk.text,
        score: cosineSimilarity(questionEmbedding, chunk.embedding as number[]),
      }));
    scores.sort((a, b) => b.score - a.score);

    console.log("Top Score:", scores[0]?.score);
    console.log("second Score:", scores[1]?.score);
    console.log("third Score:", scores[2]?.score);

    // Build Context
    const context = scores
      .slice(0, 3)
      .map((item) => item.text)
      .join("\n");

    // Generate Answer
    const prompt = `
Answer the question using the provided context. 
and write short and better answers as you are assistant

Context:
${context}

Question:
${message}
`;
    const answer = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    console.log(answer.text);
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
