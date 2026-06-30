import { prisma } from "@/lib/prisma";
import { index } from "@/lib/pinecone";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ chatId: string; documentId: string }> },
) {
  try {
    const { chatId, documentId } = await params;

    const document = await prisma.document.findFirst({
      where: {
        id: documentId,
        chatId,
      },
    });

    if (!document) {
      return Response.json(
        {
          success: false,
          error: "Document not found",
        },
        {
          status: 404,
        },
      );
    }

    await index.namespace("documents").deleteMany({
      filter: {
        documentId: {
          $eq: documentId,
        },
      },
    });

    await prisma.document.delete({
      where: {
        id: documentId,
      },
    });

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error("Failed to delete document:", error);
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
