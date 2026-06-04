# Aryonix Architecture

## Product Surfaces

- Marketing website: Home, Services, Portfolio, About and Contact.
- Admin auth: password-only `/admin-login` flow using `ADMIN_PASSWORD` and a signed admin session cookie.
- Admin dashboard: portfolio management, users, enquiries, content and project operations.
- APIs: projects and enquiries are scaffolded for Prisma-backed persistence. Public enquiries also trigger Resend notifications.

## Folder Structure

```txt
app/
  api/
  admin/
  admin-login/
  services/
  portfolio/
  about/
  contact/
components/
  admin/
  contact/
  sections/
  ui/
lib/
  admin-session.ts
  content.ts
  enquiry-email.ts
  prisma.ts
prisma/
  schema.prisma
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

- Continue expanding admin dashboard workflows.
- Connect Cloudinary upload widgets for portfolio and file assets.
- Add deployment environment secrets for `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `ADMIN_EMAIL`, `EMAIL_FROM` and `RESEND_API_KEY`.
