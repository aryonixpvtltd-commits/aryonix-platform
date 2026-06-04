export const ADMIN_SESSION_COOKIE = "aryonix_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;

type AdminSessionPayload = {
  role: "ADMIN";
  iat: number;
  exp: number;
  nonce: string;
};

function getSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET ??
    "aryonix-local-development-secret-change-before-production"
  );
}

function base64UrlEncode(value: string) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return new TextDecoder().decode(bytes);
}

async function sign(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  let binary = "";
  new Uint8Array(signature).forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export async function createAdminSessionToken() {
  const now = Math.floor(Date.now() / 1000);
  const payload: AdminSessionPayload = {
    role: "ADMIN",
    iat: now,
    exp: now + ADMIN_SESSION_MAX_AGE,
    nonce: crypto.randomUUID()
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = await sign(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export async function verifyAdminSessionToken(token?: string | null) {
  if (!token) return false;

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return false;

  const expectedSignature = await sign(encodedPayload);
  if (signature !== expectedSignature) return false;

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as AdminSessionPayload;
    return payload.role === "ADMIN" && payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}
