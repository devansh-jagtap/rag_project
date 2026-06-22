
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const chunks = await prisma.documentChunk.findMany();

  return NextResponse.json({
    count: chunks.length,
  });
}