import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ chatId: string }> },
) {
  try {
    const { chatId } = await params;

    const documents = await prisma.document.findMany({
      where: {
        chatId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(documents);
  } catch (error) {
    console.error("Failed to load documents:", error);
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
