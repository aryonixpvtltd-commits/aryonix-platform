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

The contact form stores enquiries in MongoDB and can notify the admin inbox through Resend.

```bash
DATABASE_URL="mongodb+srv://USER:PASSWORD@HOST/aryonix"
ADMIN_EMAIL="aryonixpvtltd@gmail.com"
ADMIN_PASSWORD="Admin@12345"
ADMIN_SESSION_SECRET="replace-with-a-long-random-admin-session-secret"
EMAIL_FROM="Aryonix <onboarding@resend.dev>"
RESEND_API_KEY="your_resend_api_key"
```

If `RESEND_API_KEY`, `ADMIN_EMAIL`, or `EMAIL_FROM` is missing, enquiries are still saved in MongoDB and the user still receives the normal success message.
