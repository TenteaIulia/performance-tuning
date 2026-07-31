"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email") ?? "")
      .trim()
      .toLowerCase();

    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      setError("Please enter your email address and password.");
      setIsSubmitting(false);
      return;
    }

    try {
      const supabase = createClient();

      const { error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        setError("Invalid email address or password.");
        setIsSubmitting(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (unknownError) {
      console.error(unknownError);

      setError(
        "Something went wrong while signing in. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[#07090d] px-4 py-10 text-white sm:px-6">
      {/* Background effects */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[140px]" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[130px]" />

      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl shadow-blue-950/30 backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left side */}
          <section className="hidden border-r border-white/10 bg-gradient-to-br from-blue-600/15 via-transparent to-cyan-500/5 p-10 lg:flex lg:flex-col lg:justify-between">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight"
            >
              Performance
              <span className="text-blue-500">Tuning</span>
            </Link>

            <div className="my-16">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                Customer portal
              </p>

              <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight">
                Your ECU files.

                <span className="block text-zinc-400">
                  One secure workspace.
                </span>
              </h1>

              <p className="mt-6 max-w-md leading-7 text-zinc-400">
                Manage vehicles, upload original files, track active orders and
                download completed files from one account.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  "Private file management",
                  "Transparent order tracking",
                  "Secure EUR payments",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-zinc-300"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-green-500/20 bg-green-500/10 text-xs text-green-400">
                      ✓
                    </span>

                    {item}
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-zinc-600">
              Secure access to the Performance Tuning platform.
            </p>
          </section>

          {/* Login form */}
          <section className="p-6 sm:p-10 lg:p-14">
            <div className="mx-auto max-w-md">
              <div className="flex items-center justify-between lg:hidden">
                <Link
                  href="/"
                  className="text-lg font-semibold tracking-tight"
                >
                  Performance
                  <span className="text-blue-500">Tuning</span>
                </Link>

                <Link
                  href="/"
                  className="text-sm text-zinc-500 transition hover:text-white"
                >
                  Back
                </Link>
              </div>

              <div className="mt-12 lg:mt-0">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                  Welcome back
                </p>

                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Log in to your account
                </h2>

                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  Enter your credentials to access your vehicles and orders.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-10 space-y-5"
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
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-white outline-none transition placeholder:text-zinc-700 focus:border-blue-500/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-zinc-300"
                    >
                      Password
                    </label>

                    <Link
                      href="/forgot-password"
                      className="text-sm text-blue-400 transition hover:text-blue-300"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      minLength={8}
                      disabled={isSubmitting}
                      placeholder="Enter your password"
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 pr-20 text-white outline-none transition placeholder:text-zinc-700 focus:border-blue-500/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() =>
                        setShowPassword((current) => !current)
                      }
                      className="absolute inset-y-0 right-0 px-4 text-sm text-zinc-500 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <label className="flex cursor-pointer items-center gap-3 text-sm text-zinc-400">
                  <input
                    type="checkbox"
                    name="remember"
                    disabled={isSubmitting}
                    className="h-4 w-4 rounded border-white/20 bg-white/5 accent-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  Remember me
                </label>

                {error && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-300"
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-5 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Signing in..." : "Log in"}
                </button>
              </form>

              <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />

                <span className="text-xs uppercase tracking-wider text-zinc-600">
                  New customer
                </span>

                <div className="h-px flex-1 bg-white/10" />
              </div>

              <Link
                href="/register"
                className="flex h-12 w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-5 font-semibold text-zinc-200 transition hover:border-white/20 hover:bg-white/[0.07]"
              >
                Create an account
              </Link>

              <p className="mt-8 text-center text-xs leading-5 text-zinc-600">
                By continuing, you agree to our{" "}
                <Link
                  href="/terms"
                  className="text-zinc-400 transition hover:text-white"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-zinc-400 transition hover:text-white"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}