# Aryonix Platform

Premium Next.js 15 website and platform scaffold for ARYONIX.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Password-only admin session
- MongoDB with Prisma
- Cloudinary-ready media layer

## Run

```bash
pnpm install
pnpm dev
```

Copy `.env.example` to `.env.local` and fill database/auth/media values before enabling real persistence.

## Environment Variables

The contact form stores enquiries in MongoDB for review in the admin dashboard.

```bash
DATABASE_URL="mongodb+srv://USER:PASSWORD@HOST/aryonix"
ADMIN_EMAIL="aryonixpvtltd@gmail.com"
ADMIN_PASSWORD="Admin@12345"
ADMIN_SESSION_SECRET="replace-with-a-long-random-admin-session-secret"
```
