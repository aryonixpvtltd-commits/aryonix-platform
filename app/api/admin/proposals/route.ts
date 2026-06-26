import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

const proposalNextSteps = [
  "Confirm project scope and priority features",
  "Schedule a 30-minute ARYONIX strategy call",
  "Approve timeline, milestone plan and kickoff checklist"
];

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  return NextResponse.json(await prisma.proposal.findMany({
    include: { estimatorLead: true },
    orderBy: { createdAt: "desc" }
  }));
}

export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const body = await request.json().catch(() => ({})) as Record<string, unknown>;
  const estimatorLeadId = typeof body.estimatorLeadId === "string" ? body.estimatorLeadId : "";

  if (!estimatorLeadId) {
    return NextResponse.json({ errors: ["Estimator lead is required."] }, { status: 422 });
  }

  const lead = await prisma.estimatorLead.findUnique({
    where: { id: estimatorLeadId },
    include: { proposals: true }
  });

  if (!lead) {
    return NextResponse.json({ errors: ["Estimator lead not found."] }, { status: 404 });
  }

  if (lead.proposals[0]) {
    return NextResponse.json(lead.proposals[0]);
  }

  const proposal = await prisma.proposal.create({
    data: {
      estimatorLeadId: lead.id,
      clientName: lead.name,
      businessName: lead.businessName,
      recommendedPackage: lead.recommendedPackage,
      features: lead.features,
      estimatedPrice: lead.estimatedPrice,
      timeline: lead.estimatedTimeline,
      techStack: lead.techStack,
      nextSteps: proposalNextSteps
    }
  });

  await prisma.estimatorLead.update({
    where: { id: lead.id },
    data: {
      status: "PROPOSAL_SENT",
      history: { push: `Proposal generated for ${lead.recommendedPackage}` }
    }
  });

  return NextResponse.json(proposal, { status: 201 });
}
