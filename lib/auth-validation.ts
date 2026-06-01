export const PASSWORD_MIN_LENGTH = 8;

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password: string) {
  const errors: string[] = [];

  if (password.length < PASSWORD_MIN_LENGTH) {
    errors.push(`Password must be at least ${PASSWORD_MIN_LENGTH} characters.`);
  }

  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    errors.push("Password must include letters and numbers.");
  }

  return errors;
}
