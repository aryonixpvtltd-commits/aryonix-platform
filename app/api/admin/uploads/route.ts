import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { requireAdmin } from "@/lib/admin-auth";
import { getCloudinaryClient } from "@/lib/cloudinary";

export const runtime = "nodejs";

const allowedTypes = new Set(["image/png", "image/jpeg", "image/webp"]);
const fileExtensions = new Map([
  ["image/png", "png"],
  ["image/jpeg", "jpg"],
  ["image/webp", "webp"]
]);

function safeBaseName(fileName: string) {
  return fileName
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "portfolio-screenshot";
}

function getCloudinaryConfigError() {
  const missing = ["CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET"]
    .filter((key) => !process.env[key]);

  return missing.length ? `Missing Cloudinary environment variables: ${missing.join(", ")}` : null;
}

export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

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

    const configError = getCloudinaryConfigError();
    if (configError) {
      const uploadDir = path.join(process.cwd(), "public", "uploads", "portfolio");
      await mkdir(uploadDir, { recursive: true });

      const uploads = await Promise.all(
        files.map(async (file, index) => {
          const buffer = Buffer.from(await file.arrayBuffer());
          const extension = fileExtensions.get(file.type) ?? "png";
          const fileName = `${Date.now()}-${index + 1}-${safeBaseName(file.name)}.${extension}`;
          await writeFile(path.join(uploadDir, fileName), buffer);

          return {
            url: `/uploads/portfolio/${fileName}`,
            alt: file.name.replace(/\.[^.]+$/, "") || `Portfolio screenshot ${index + 1}`,
            order: index
          };
        })
      );

      return NextResponse.json({ uploads }, { status: 201 });
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
