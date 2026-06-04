import { AdminLoginForm } from "@/components/admin/admin-login-form";

export const metadata = {
  title: "Admin Login"
};

export default function AdminLoginPage() {
  return (
    <section className="relative min-h-screen overflow-hidden px-4 pt-36">
      <div className="grid-mask absolute inset-0 opacity-40" />
      <div className="absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
      <div className="relative">
        <AdminLoginForm />
      </div>
    </section>
  );
}
