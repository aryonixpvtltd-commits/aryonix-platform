import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export const metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <section className="min-h-screen px-4 pt-36">
      <AuthForm mode="login" />
      <p className="mt-6 text-center text-sm leading-6 text-accent">
        New client? <Link href="/register" className="text-secondary">Create an account</Link>
        <br />
        <Link href="/forgot-password" className="text-secondary">Forgot password?</Link>
      </p>
    </section>
  );
}
