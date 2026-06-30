import { prisma } from "@/lib/prisma";
import { index } from "@/lib/pinecone";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ chatId: string }> },
) {
  try {
    const { chatId } = await params;

    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
    });

    if (!chat) {
      return Response.json(
        {
          success: false,
          error: "Chat not found",
        },
        {
          status: 404,
        },
      );
    }

    await index.namespace("documents").deleteMany({
      filter: {
        chatId: {
          $eq: chatId,
        },
      },
    });

    await prisma.$transaction([
      prisma.message.deleteMany({
        where: {
          chatId,
        },
      }),
      prisma.document.deleteMany({
        where: {
          chatId,
        },
      }),
      prisma.chat.delete({
        where: {
          id: chatId,
        },
      }),
    ]);

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error("Failed to delete chat session:", error);
    return Response.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ chatId: string }> },
) {
  try {
    const { chatId } = await params;
    const { title } = await req.json();

    if (typeof title !== "string" || !title.trim()) {
      return Response.json(
        {
          success: false,
          error: "Title is required",
        },
        {
          status: 400,
        },
      );
    }

    const chat = await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        title: title.trim(),
      },
    });

    return Response.json(chat);
  } catch (error) {
    console.error("Failed to rename chat:", error);
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
