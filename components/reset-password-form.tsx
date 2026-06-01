"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ResetPasswordForm() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setToken(new URLSearchParams(window.location.search).get("token") ?? "");
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors([]);
    setMessage("");

    if (password !== confirmPassword) {
      setErrors(["Passwords do not match."]);
      return;
    }

    setLoading(true);
    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password })
    });
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setErrors(data.errors ?? ["Unable to reset password."]);
      return;
    }

    setPassword("");
    setConfirmPassword("");
    setMessage("Password updated. You can now log in with your new password.");
  }

  return (
    <form onSubmit={handleSubmit} className="panel mx-auto grid w-full max-w-md gap-4 rounded-2xl p-6">
      <div className="mb-2">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-secondary">
          Secure reset
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-text">Create a new password.</h1>
        <p className="mt-3 text-sm leading-6 text-accent">
          Reset links expire quickly and can only be used once.
        </p>
      </div>

      <label className="grid gap-2 text-sm font-medium text-text">
        New password
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          autoComplete="new-password"
          className="h-12 rounded-xl border border-line bg-white/[0.04] px-4 outline-none focus:border-secondary"
          required
        />
      </label>

      <label className="grid gap-2 text-sm font-medium text-text">
        Confirm password
        <input
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          type="password"
          autoComplete="new-password"
          className="h-12 rounded-xl border border-line bg-white/[0.04] px-4 outline-none focus:border-secondary"
          required
        />
      </label>

      {errors.length ? (
        <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm leading-6 text-red-100">
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      ) : null}

      {message ? (
        <div className="rounded-xl border border-secondary/30 bg-primary/10 p-3 text-sm leading-6 text-accent">
          {message} <Link href="/login" className="text-secondary">Go to login.</Link>
        </div>
      ) : null}

      <Button type="submit" className="mt-2" disabled={loading || !token}>
        {loading ? "Updating..." : "Update Password"}
      </Button>
    </form>
  );
}
