"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrors([]);

    const response = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });
    const data = await response.json().catch(() => ({}));
    setLoading(false);

    if (!response.ok) {
      setErrors(data.errors ?? ["Invalid admin password."]);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="panel mx-auto grid w-full max-w-md gap-4 rounded-2xl p-6">
      <div className="mb-2">
        <div className="grid size-12 place-items-center rounded-xl border border-secondary/30 bg-primary/10 text-secondary shadow-glow">
          <ShieldCheck size={22} />
        </div>
        <p className="mt-5 font-mono text-xs uppercase tracking-[0.24em] text-secondary">
          Admin Portal
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-text">Aryonix admin access.</h1>
        <p className="mt-3 text-sm leading-6 text-accent">
          Enter the private admin password to open the operations dashboard.
        </p>
      </div>

      <label className="grid gap-2 text-sm font-medium text-text">
        Admin Password
        <div className="flex h-12 items-center gap-3 rounded-xl border border-line bg-white/[0.04] px-4 focus-within:border-secondary">
          <LockKeyhole className="shrink-0 text-secondary" size={17} />
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            autoComplete="current-password"
            className="h-full w-full bg-transparent text-sm outline-none"
            required
          />
        </div>
      </label>

      {errors.length ? (
        <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm leading-6 text-red-100">
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      ) : null}

      <Button type="submit" className="mt-2" disabled={loading}>
        {loading ? "Checking..." : "Open Admin Dashboard"}
      </Button>
    </form>
  );
}
