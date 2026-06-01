"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";

type AuthMode = "login" | "register" | "forgot";

function getCallbackUrl() {
  if (typeof window === "undefined") return "/dashboard";
  return new URLSearchParams(window.location.search).get("callbackUrl") ?? "/dashboard";
}

export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrors([]);
    setMessage("");

    if (mode === "login") {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: getCallbackUrl()
      });

      setLoading(false);

      if (result?.error) {
        setErrors(["Invalid email or password."]);
        return;
      }

      const sessionResponse = await fetch("/api/auth/session");
      const session = await sessionResponse.json().catch(() => null);
      const role = session?.user?.role;
      const callbackUrl = getCallbackUrl();
      const destination =
        role === "ADMIN"
          ? "/admin"
          : callbackUrl.startsWith("/admin")
            ? "/dashboard"
            : result?.url ?? "/dashboard";

      router.push(destination);
      router.refresh();
      return;
    }

    const endpoint = mode === "register" ? "/api/auth/register" : "/api/auth/forgot-password";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mode === "register" ? { name, email, password } : { email })
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setErrors(data.errors ?? ["Something went wrong."]);
      return;
    }

    if (mode === "register") {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/dashboard"
      });

      if (result?.error) {
        router.push("/login");
        return;
      }

      router.push(result?.url ?? "/dashboard");
      router.refresh();
      return;
    }

    setMessage(data.message ?? "If an account exists, a password reset link will be sent.");
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit} className="panel mx-auto grid w-full max-w-md gap-4 rounded-2xl p-6">
      <div className="mb-2">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-secondary">
          {mode === "login" ? "Secure portal" : mode === "register" ? "Create client account" : "Account recovery"}
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-text">
          {mode === "login"
            ? "Welcome back."
            : mode === "register"
              ? "Start your Aryonix workspace."
              : "Reset your password."}
        </h1>
        <p className="mt-3 text-sm leading-6 text-accent">
          {mode === "forgot"
            ? "Enter your email and we will prepare a secure reset link."
            : "Protected by JWT sessions, encrypted passwords and role-based access."}
        </p>
      </div>

      {mode === "register" ? (
        <label className="grid gap-2 text-sm font-medium text-text">
          Name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            className="h-12 rounded-xl border border-line bg-white/[0.04] px-4 outline-none focus:border-secondary"
            required
          />
        </label>
      ) : null}

      <label className="grid gap-2 text-sm font-medium text-text">
        Email
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          autoComplete="email"
          className="h-12 rounded-xl border border-line bg-white/[0.04] px-4 outline-none focus:border-secondary"
          required
        />
      </label>

      {mode !== "forgot" ? (
        <label className="grid gap-2 text-sm font-medium text-text">
          Password
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            className="h-12 rounded-xl border border-line bg-white/[0.04] px-4 outline-none focus:border-secondary"
            required
          />
        </label>
      ) : null}

      {errors.length ? (
        <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm leading-6 text-red-100">
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      ) : null}

      {message ? (
        <div className="rounded-xl border border-secondary/30 bg-primary/10 p-3 text-sm leading-6 text-accent">
          {message}
        </div>
      ) : null}

      <Button type="submit" className="mt-2" disabled={loading}>
        {loading
          ? "Please wait..."
          : mode === "login"
            ? "Login"
            : mode === "register"
              ? "Register"
              : "Send Reset Link"}
      </Button>
    </form>
  );
}
