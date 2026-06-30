import { prisma } from "@/lib/prisma";
import { index } from "@/lib/pinecone";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ chatId: string }> }
) {
  try {
    const { chatId } = await params;


    await prisma.message.deleteMany({
      where: {
        chatId,
      },
    });

  
    const documents = await prisma.document.findMany({
      where: {
        chatId,
      },
    });

    for (const document of documents) {
      
      await index.namespace("documents").deleteMany({
        filter: {
          chatId: { $eq: chatId },
          title: { $eq: document.title }
        },
      });
    }

   
    await prisma.document.deleteMany({
      where: {
        chatId,
      },
    });

   
    await prisma.chat.delete({
      where: {
        id: chatId,
      },
    });

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