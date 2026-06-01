import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export const metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <section className="min-h-screen px-4 pt-36">
      <AuthForm mode="register" />
      <p className="mt-6 text-center text-sm text-accent">
        Already have access? <Link href="/login" className="text-secondary">Login</Link>
      </p>
    </section>
  );
}
