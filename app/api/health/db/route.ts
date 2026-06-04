import { NextResponse } from "next/server";
import { getDatabaseHostname, getErrorMessage } from "@/lib/db-diagnostics";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const databaseHost = getDatabaseHostname();
  console.log("DATABASE HEALTH HOST:", databaseHost);

  try {
    await prisma.$runCommandRaw({ ping: 1 });

    return NextResponse.json({
      database: "connected"
    });
  } catch (error) {
    console.error("DATABASE HEALTH ERROR:", error);

    return NextResponse.json(
      {
        database: "failed",
        error: getErrorMessage(error)
      },
      { status: 500 }
    );
  }
}
