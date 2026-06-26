import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { isLeadSource, readCrmUpdate } from "@/lib/crm";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, context: { params: Promise<{ source: string; id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { source, id } = await context.params;
  if (!isLeadSource(source)) {
    return NextResponse.json({ errors: ["Invalid lead source."] }, { status: 422 });
  }

  const update = readCrmUpdate(await request.json().catch(() => ({})));
  const data = {
    ...(update.status ? { status: update.status } : {}),
    ...(typeof update.notes === "string" ? { notes: update.notes } : {}),
    ...(update.followUpDate !== undefined ? { followUpDate: update.followUpDate } : {}),
    ...(update.historyEntry ? { history: { push: update.historyEntry } } : {})
  };

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ errors: ["No CRM update fields provided."] }, { status: 422 });
  }

  if (source === "enquiries") {
    return NextResponse.json(await prisma.enquiry.update({ where: { id }, data }));
  }
  if (source === "chatbot") {
    return NextResponse.json(await prisma.chatbotLead.update({ where: { id }, data }));
  }
  if (source === "estimator") {
    return NextResponse.json(await prisma.estimatorLead.update({ where: { id }, data }));
  }

  return NextResponse.json(await prisma.analyzerLead.update({ where: { id }, data }));
}
