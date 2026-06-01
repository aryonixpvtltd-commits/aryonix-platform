# Aryonix Architecture

## Product Surfaces

- Marketing website: Home, Services, Portfolio, About and Contact.
- Auth: NextAuth credentials flow with Admin and Client roles.
- Client dashboard: project status, progress, files, profile and invoices.
- Admin dashboard: portfolio management, users, enquiries, content and client project status.
- APIs: projects and enquiries are scaffolded for Prisma-backed persistence.

## Folder Structure

```txt
app/
  api/
  admin/
  dashboard/
  services/
  portfolio/
  about/
  contact/
  login/
  register/
components/
  sections/
  ui/
lib/
  auth.ts
  content.ts
  prisma.ts
prisma/
  schema.prisma
types/
  next-auth.d.ts
```

## Design System

- Background: `#04071A`
- Surface: `#080D24`
- Primary: `#1A6FFF`
- Secondary: `#4DA3FF`
- Text: `#E8EEFF`
- Accent: `#C8D4E8`

The interface uses restrained glass panels, 8-12px radii, blue technical lighting, fine grid detail and minimal motion.

## Next Steps

- Wire forms to the API routes with server actions or client submission.
- Add route protection middleware for `/admin` and `/dashboard`.
- Connect Cloudinary upload widgets for portfolio and file assets.
- Add admin CRUD views once the database is connected.
