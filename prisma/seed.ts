import fs from "node:fs";
import path from "node:path";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { staticKnowledgeEntries } from "../lib/knowledge/knowledge";

function loadEnvFile(fileName: string, override = false) {
  const fullPath = path.join(process.cwd(), fileName);
  if (!fs.existsSync(fullPath)) return;

  const lines = fs.readFileSync(fullPath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;

    const [key, ...valueParts] = trimmed.split("=");
    if (process.env[key] && !override) continue;
    process.env[key] = valueParts.join("=").trim().replace(/^["']|["']$/g, "");
  }
}

loadEnvFile(".env");
loadEnvFile(".env.local", true);

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing. Add your MongoDB Atlas URL to .env.local before running npm.cmd run seed.");
}

const prisma = new PrismaClient();

async function main() {
  const email = "admin@aryonix.in";
  const password = "Admin@12345";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: {
      name: "Aryonix Admin",
      passwordHash,
      role: "ADMIN"
    },
    create: {
      name: "Aryonix Admin",
      email,
      passwordHash,
      role: "ADMIN"
    }
  });

  console.log(`Default admin user ready: ${email}`);

  let createdKnowledge = 0;

  for (const entry of staticKnowledgeEntries) {
    const existing = await prisma.aIKnowledge.findFirst({
      where: {
        type: entry.type,
        title: entry.title
      }
    });

    if (existing) continue;

    await prisma.aIKnowledge.create({
      data: {
        type: entry.type,
        title: entry.title,
        content: entry.content,
        isActive: true
      }
    });
    createdKnowledge += 1;
  }

  console.log(`AI knowledge seed complete. Created ${createdKnowledge} new entries.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
