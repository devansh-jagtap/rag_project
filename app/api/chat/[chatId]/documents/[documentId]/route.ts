import { prisma } from "@/lib/prisma";
import { index } from "@/lib/pinecone";


export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ documentId: string }> }
) {
  const { documentId } = await params;

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
}