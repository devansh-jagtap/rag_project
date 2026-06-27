import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ chatId: string }> }
) {
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
}