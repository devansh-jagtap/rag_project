import { prisma } from "@/lib/prisma";

export async function POST() {
  const chat = await prisma.chat.create({
    data: {
      title: "New Chat",
    },
  });

  return Response.json(chat);
}