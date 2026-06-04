import { NextResponse } from "next/server";
import { sendEnquiryNotification } from "@/lib/enquiry-email";
import { validateEnquiryPayload } from "@/lib/enquiry-validation";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = validateEnquiryPayload(body);

    if (!result.ok) {
      return NextResponse.json({ errors: result.errors }, { status: 422 });
    }

    const enquiry = await prisma.enquiry.create({
      data: result.data
    });

    await sendEnquiryNotification({
      ...result.data,
      id: enquiry.id,
      createdAt: enquiry.createdAt
    }).catch(() => ({ ok: false, skipped: false }));

    return NextResponse.json(
      {
        ok: true,
        enquiry,
        message: "Enquiry received. Aryonix will review your brief and respond with the next step."
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { errors: ["Unable to submit enquiry right now."] },
      { status: 500 }
    );
  }
}
