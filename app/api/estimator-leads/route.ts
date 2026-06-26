import { NextResponse } from "next/server";
import { validateEstimatorLead } from "@/lib/estimator";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const result = validateEstimatorLead(await request.json());
    if (!result.ok) return NextResponse.json({ errors: result.errors }, { status: 422 });

    const { name, businessName, email, phone, businessType, websiteType, pages, features, designLevel, requestedTimeline, statedBudget, estimatedPrice, estimatedTimeline, recommendedPackage, techStack } = result.data;
    const lead = await prisma.estimatorLead.create({
      data: {
        name,
        businessName,
        email,
        phone,
        businessType,
        websiteType,
        pages,
        features,
        designLevel,
        requestedTimeline,
        statedBudget,
        estimatedPrice,
        estimatedTimeline,
        recommendedPackage,
        techStack,
        proposals: {
          create: {
            clientName: name,
            businessName,
            recommendedPackage,
            features,
            estimatedPrice,
            timeline: estimatedTimeline,
            techStack,
            nextSteps: [
              "Free consultation and scope confirmation",
              "Content and requirements collection",
              "Design direction approval",
              "Development, review and production launch"
            ]
          }
        }
      },
      include: { proposals: true }
    });

    return NextResponse.json({ ok: true, lead, proposal: lead.proposals[0] }, { status: 201 });
  } catch (error) {
    console.error("ESTIMATOR LEAD ERROR:", error);
    return NextResponse.json({ errors: ["Unable to save this estimate right now."] }, { status: 500 });
  }
}
