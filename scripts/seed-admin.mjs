import fs from "node:fs";
import path from "node:path";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

function loadEnvFile(file) {
  const fullPath = path.join(process.cwd(), file);
  if (!fs.existsSync(fullPath)) return;

  const lines = fs.readFileSync(fullPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const [key, ...rest] = trimmed.split("=");
    if (process.env[key]) continue;
    process.env[key] = rest.join("=").trim().replace(/^["']|["']$/g, "");
  }
}

loadEnvFile(".env");
loadEnvFile(".env.local");

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is missing. Add your MongoDB connection string to .env or .env.local, then rerun npm.cmd run seed:admin.");
  process.exit(1);
}

const prisma = new PrismaClient();

const email = process.env.ADMIN_EMAIL ?? "admin@aryonix.in";
const password = process.env.ADMIN_PASSWORD ?? "Admin@12345";
const passwordHash = await bcrypt.hash(password, 12);

await prisma.user.upsert({
  where: { email },
  update: {
    passwordHash,
    role: "ADMIN",
    name: "Aryonix Admin"
  },
  create: {
    email,
    passwordHash,
    role: "ADMIN",
    name: "Aryonix Admin"
  }
});

await prisma.$disconnect();

console.log(`Admin user ready: ${email}`);
