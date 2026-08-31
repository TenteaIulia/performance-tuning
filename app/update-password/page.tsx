"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export default function UpdatePasswordPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    const password = String(
      formData.get("password") ?? "",
    );

    const confirmPassword = String(
      formData.get("confirmPassword") ?? "",
    );

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    try {
      const supabase = createClient();

      const { error: updateError } =
        await supabase.auth.updateUser({
          password,
        });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setSuccess("Password updated successfully.");

      window.setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (unknownError) {
      console.error(unknownError);

      setError(
        "Something went wrong while updating your password.",
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
            New password
          </p>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight">
            Create a new password
          </h1>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            Choose a new password for your account.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              New password
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                disabled={isSubmitting}
                placeholder="Minimum 8 characters"
                className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 pr-20 text-white outline-none transition placeholder:text-zinc-700 focus:border-blue-500/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-blue-500/10"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((current) => !current)
                }
                className="absolute inset-y-0 right-0 px-4 text-sm text-zinc-500 transition hover:text-white"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Confirm new password
            </label>

            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={
                  showConfirmPassword ? "text" : "password"
                }
                required
                minLength={8}
                disabled={isSubmitting}
                placeholder="Repeat your password"
                className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 pr-20 text-white outline-none transition placeholder:text-zinc-700 focus:border-blue-500/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-blue-500/10"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    (current) => !current,
                  )
                }
                className="absolute inset-y-0 right-0 px-4 text-sm text-zinc-500 transition hover:text-white"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
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
              className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-300"
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
              ? "Updating password..."
              : "Update password"}
          </button>
        </form>
      </div>
    </main>
  );
}