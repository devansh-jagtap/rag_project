import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const chat = await prisma.chat.create({
      data: {
        title: "New Chat",
      },
    });

    return Response.json(chat);
  } catch (error) {
    console.error("Failed to create chat:", error);
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
