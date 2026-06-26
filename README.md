# Aryonix Platform

Premium Next.js 15 agency website and admin-only business management system for ARYONIX.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Password-only admin session
- MongoDB with Prisma
- Cloudinary-ready media uploads
- Gemini API key support for the premium chatbot integration

## Key Features

- Premium dark ARYONIX marketing website
- AI website cost estimator at `/estimate`
- Website analyzer lead magnet at `/analyzer`
- Premium chatbot lead capture
- Gemini-powered ARYONIX AI consultant with static and admin-editable knowledge
- Admin-only dashboard at `/admin`
- Admin AI Knowledge Manager at `/admin/ai-knowledge`
- CRM pipeline for contact, chatbot, estimator and analyzer leads
- Stored estimator proposals with branded PDF download
- Portfolio CRUD with screenshots, categories, featured projects, tech tags and live links
- Website settings for homepage content, social links and testimonials

Client dashboard and client authentication have been removed. Admin authentication remains protected by the existing admin session middleware.

## Gemini Chatbot Knowledge Flow

The premium chatbot UI stays client-side, but typed questions are answered through `/api/chatbot`.

1. The API loads structured static knowledge from `lib/knowledge`.
2. It loads active `AIKnowledge` records from MongoDB.
3. It combines both into a private server-side Gemini system context.
4. If Gemini is unavailable or `GEMINI_API_KEY` is missing, the route returns a rule-based ARYONIX fallback reply.

The key is never exposed to the browser. Admin routes and knowledge CRUD remain protected by the existing admin session.

## Updating AI Knowledge

Open `/admin/ai-knowledge` after admin login. From there you can add, edit, delete, search, filter and activate/deactivate knowledge entries.

Supported knowledge types:

- `company`
- `service`
- `pricing`
- `faq`
- `portfolio`
- `process`
- `techstack`
- `contact`
- `custom`

Run `npm.cmd run seed` to seed the database with the static knowledge base. The seed checks existing `type + title` records first, so it does not duplicate entries.

## Run Locally

```bash
npm.cmd install
npm.cmd exec prisma generate
npm.cmd run seed
npm.cmd run dev
```

Copy `.env.example` to `.env.local` and fill database, admin, Cloudinary and Gemini values.

## Environment Variables

```bash
DATABASE_URL="mongodb+srv://USER:PASSWORD@HOST/aryonix"
ADMIN_EMAIL="admin@aryonix.in"
ADMIN_PASSWORD="replace-with-a-strong-admin-password"
ADMIN_SESSION_SECRET="replace-with-a-long-random-admin-session-secret"
SKIP_ADMIN_AUTH="false"

CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

GEMINI_API_KEY=""
```

## Verification

Use these checks before deployment:

```bash
npm.cmd exec prisma format
npm.cmd exec prisma generate
npm.cmd run typecheck
npm.cmd run build
```
