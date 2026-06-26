import { NextResponse } from "next/server";
import { validateChatbotLead } from "@/lib/chatbot-lead-validation";
import { getDatabaseHostname, getPrismaErrorDiagnostics } from "@/lib/db-diagnostics";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = validateChatbotLead(body);

    if (!result.ok) {
      return NextResponse.json({ errors: result.errors }, { status: 422 });
    }

    const lead = await prisma.chatbotLead.create({ data: result.data });

    return NextResponse.json(
      {
        ok: true,
        leadId: lead.id,
        message: "Thanks. The ARYONIX team has received your project details."
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CHATBOT LEAD DATABASE HOST:", getDatabaseHostname());
    console.error("CHATBOT LEAD API ERROR:", error);
    console.error("CHATBOT LEAD PRISMA DIAGNOSTICS:", getPrismaErrorDiagnostics(error));

    return NextResponse.json(
      { errors: ["We could not save your details right now. Please try again."] },
      { status: 500 }
    );
  }
}
