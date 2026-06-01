import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export const metadata = { title: "Forgot Password" };

export default function ForgotPasswordPage() {
  return (
    <section className="min-h-screen px-4 pt-36">
      <AuthForm mode="forgot" />
      <p className="mt-6 text-center text-sm text-accent">
        Remembered it? <Link href="/login" className="text-secondary">Back to login</Link>
      </p>
    </section>
  );
}
