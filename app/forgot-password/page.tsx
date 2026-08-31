"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email") ?? "")
      .trim()
      .toLowerCase();

    if (!email) {
      setError("Please enter your email address.");
      setIsSubmitting(false);
      return;
    }

    try {
      const supabase = createClient();

      const { error: resetError } =
        await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
        });

      if (resetError) {
        setError(resetError.message);
        return;
      }

      setSuccess(
        "If an account exists for this email, you will receive a password reset link shortly.",
      );
    } catch (unknownError) {
      console.error(unknownError);

      setError(
        "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07090d] px-4 py-10 text-white sm:px-6">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[140px]" />

      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-blue-950/30 backdrop-blur-xl sm:p-10">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight"
        >
          Performance
          <span className="text-blue-500">Tuning</span>
        </Link>

        <div className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Password recovery
          </p>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight">
            Forgot your password?
          </h1>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            Enter your email address and we&apos;ll send you a secure link to
            create a new password.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Email address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={isSubmitting}
              placeholder="you@example.com"
              className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-white outline-none transition placeholder:text-zinc-700 focus:border-blue-500/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60"
            />
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            >
              {error}
            </div>
          )}

          {success && (
            <div
              role="status"
              className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm leading-6 text-green-300"
            >
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-5 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "Sending reset link..."
              : "Send reset link"}
          </button>
        </form>

        <Link
          href="/login"
          className="mt-6 flex h-12 w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-5 font-semibold text-zinc-200 transition hover:bg-white/[0.07]"
        >
          Back to login
        </Link>
      </div>
    </main>
  );
}