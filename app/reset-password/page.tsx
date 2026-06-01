import { ResetPasswordForm } from "@/components/reset-password-form";

export const metadata = { title: "Reset Password" };

export default function ResetPasswordPage() {
  return (
    <section className="min-h-screen px-4 pt-36">
      <ResetPasswordForm />
    </section>
  );
}
