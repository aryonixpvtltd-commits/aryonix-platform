import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getCloudinaryClient } from "@/lib/cloudinary";

export const runtime = "nodejs";

const allowedTypes = new Set(["image/png", "image/jpeg", "image/webp"]);

function getCloudinaryConfigError() {
  const missing = ["CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET"]
    .filter((key) => !process.env[key]);

  return missing.length ? `Missing Cloudinary environment variables: ${missing.join(", ")}` : null;
}

export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const configError = getCloudinaryConfigError();
  if (configError) {
    console.error("CLOUDINARY UPLOAD CONFIG ERROR:", configError);
    return NextResponse.json(
      { error: "Cloudinary is not configured." },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const files = formData.getAll("files").filter((item): item is File => item instanceof File);

    if (files.length === 0) {
      return NextResponse.json({ error: "No files uploaded." }, { status: 422 });
    }

    const invalidFile = files.find((file) => !allowedTypes.has(file.type));
    if (invalidFile) {
      return NextResponse.json(
        { error: "Only PNG, JPG, JPEG and WEBP images can be uploaded." },
        { status: 422 }
      );
    }

    const cloudinary = getCloudinaryClient();
    const uploads = await Promise.all(
      files.map(async (file, index) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        const dataUri = `data:${file.type};base64,${buffer.toString("base64")}`;
        const result = await cloudinary.uploader.upload(dataUri, {
          folder: "aryonix/portfolio",
          resource_type: "image"
        });

        return {
          url: result.secure_url,
          alt: file.name.replace(/\.[^.]+$/, "") || `Portfolio screenshot ${index + 1}`,
          order: index
        };
      })
    );

    return NextResponse.json({ uploads }, { status: 201 });
  } catch (error) {
    console.error("CLOUDINARY UPLOAD ERROR:", error);
    return NextResponse.json(
      { error: "Screenshot upload failed. Check Cloudinary credentials and try again." },
      { status: 500 }
    );
  }
}
