export const authSecret =
  process.env.NEXTAUTH_SECRET ??
  (process.env.NODE_ENV === "production"
    ? undefined
    : "aryonix-local-development-secret-change-before-production");
