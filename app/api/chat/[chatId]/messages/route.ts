import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ chatId: string }> },
) {
  try {
    const { chatId } = await params;

    const messages = await prisma.message.findMany({
      where: {
        chatId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return Response.json(messages);
  } catch (error) {
    console.error("Failed to load messages:", error);
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
