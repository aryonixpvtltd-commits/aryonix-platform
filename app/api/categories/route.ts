import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const categories = await prisma.projectCategory.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: { projects: true }
      }
    }
  });

  return NextResponse.json(categories);
}
