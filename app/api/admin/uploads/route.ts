import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { cloudinary } from "@/lib/cloudinary";

export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    return NextResponse.json(
      { error: "Cloudinary is not configured." },
      { status: 500 }
    );
  }

  const formData = await request.formData();
  const files = formData.getAll("files").filter((item): item is File => item instanceof File);

  if (files.length === 0) {
    return NextResponse.json({ error: "No files uploaded." }, { status: 422 });
  }

  const uploads = await Promise.all(
    files.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const dataUri = `data:${file.type};base64,${buffer.toString("base64")}`;
      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "aryonix/portfolio",
        resource_type: "image"
      });

      return {
        url: result.secure_url,
        alt: file.name
      };
    })
  );

  return NextResponse.json({ uploads }, { status: 201 });
}
