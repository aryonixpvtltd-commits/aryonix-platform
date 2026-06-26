import { NextResponse } from "next/server";
import { validateAnalyzerLead } from "@/lib/analyzer";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const result = validateAnalyzerLead(await request.json());
    if (!result.ok) return NextResponse.json({ errors: result.errors }, { status: 422 });
    const lead = await prisma.analyzerLead.create({ data: result.data });
    return NextResponse.json({ ok: true, lead }, { status: 201 });
  } catch (error) {
    console.error("ANALYZER LEAD ERROR:", error);
    return NextResponse.json({ errors: ["Unable to save this analysis right now."] }, { status: 500 });
  }
}
