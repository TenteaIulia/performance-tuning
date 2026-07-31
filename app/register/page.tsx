"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const firstName = String(
      formData.get("firstName") ?? "",
    ).trim();

    const lastName = String(
      formData.get("lastName") ?? "",
    ).trim();

    const email = String(
      formData.get("email") ?? "",
    )
      .trim()
      .toLowerCase();

    const password = String(
      formData.get("password") ?? "",
    );

    const confirmPassword = String(
      formData.get("confirmPassword") ?? "",
    );

    const acceptedTerms =
      formData.get("acceptTerms") === "on";

    if (!firstName || !lastName || !email) {
      setError("Please complete all required fields.");
      setIsSubmitting(false);
      return;
    }

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

    if (!acceptedTerms) {
      setError(
        "You must accept the Terms and Conditions and Privacy Policy.",
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const supabase = createClient();

      const { data, error: signUpError } =
        await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: firstName,
              last_name: lastName,
              full_name: `${firstName} ${lastName}`,
            },

            emailRedirectTo: `${window.location.origin}/auth/confirm`,
          },
        });

      if (signUpError) {
        setError(signUpError.message);
        setIsSubmitting(false);
        return;
      }

      form.reset();

      /*
       * Dacă Supabase returnează o sesiune, confirmarea e-mailului
       * nu este obligatorie și utilizatorul poate intra direct.
       */
      if (data.session) {
        router.push("/dashboard");
        router.refresh();
        return;
      }

      /*
       * Dacă sesiunea este null, Supabase așteaptă de regulă
       * confirmarea adresei de e-mail.
       */
      setSuccess(
        "Account created. Please check your email to confirm your account.",
      );

      window.setTimeout(() => {
        router.push("/login");
      }, 2500);
    } catch (unknownError) {
      console.error(unknownError);

      setError(
        "Something went wrong while creating your account. Please try again.",
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
              <span className="text-blue-500">
                Tuning
              </span>
            </Link>

            <div className="my-16">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                Create your account
              </p>

              <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight">
                Start your first order.

                <span className="block text-zinc-400">
                  Track everything securely.
                </span>
              </h1>

              <p className="mt-6 max-w-md leading-7 text-zinc-400">
                Add your vehicles, upload ECU files, authorize
                payments and receive completed files from one modern
                customer portal.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  "Manage multiple vehicles",
                  "Follow every order status",
                  "Download completed files securely",
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
              Worldwide access · Romanian and English support
            </p>
          </section>

          {/* Register form */}
          <section className="p-6 sm:p-10 lg:p-14">
            <div className="mx-auto max-w-md">
              <div className="flex items-center justify-between lg:hidden">
                <Link
                  href="/"
                  className="text-lg font-semibold tracking-tight"
                >
                  Performance
                  <span className="text-blue-500">
                    Tuning
                  </span>
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
                  New customer
                </p>

                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Create your account
                </h2>

                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  Enter your details to start managing vehicles and
                  ECU file orders.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-10 space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-sm font-medium text-zinc-300"
                    >
                      First name
                    </label>

                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      required
                      disabled={isSubmitting}
                      placeholder="John"
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-white outline-none transition placeholder:text-zinc-700 focus:border-blue-500/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-2 block text-sm font-medium text-zinc-300"
                    >
                      Last name
                    </label>

                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      required
                      disabled={isSubmitting}
                      placeholder="Smith"
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-white outline-none transition placeholder:text-zinc-700 focus:border-blue-500/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                </div>

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
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-zinc-300"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      autoComplete="new-password"
                      required
                      minLength={8}
                      disabled={isSubmitting}
                      placeholder="Minimum 8 characters"
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 pr-20 text-white outline-none transition placeholder:text-zinc-700 focus:border-blue-500/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() =>
                        setShowPassword(
                          (current) => !current,
                        )
                      }
                      className="absolute inset-y-0 right-0 px-4 text-sm text-zinc-500 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
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
                    Confirm password
                  </label>

                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      autoComplete="new-password"
                      required
                      minLength={8}
                      disabled={isSubmitting}
                      placeholder="Repeat your password"
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 pr-20 text-white outline-none transition placeholder:text-zinc-700 focus:border-blue-500/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() =>
                        setShowConfirmPassword(
                          (current) => !current,
                        )
                      }
                      className="absolute inset-y-0 right-0 px-4 text-sm text-zinc-500 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {showConfirmPassword
                        ? "Hide"
                        : "Show"}
                    </button>
                  </div>
                </div>

                <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-zinc-400">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    required
                    disabled={isSubmitting}
                    className="mt-1 h-4 w-4 shrink-0 rounded border-white/20 bg-white/5 accent-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <span>
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-blue-400 transition hover:text-blue-300"
                    >
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-blue-400 transition hover:text-blue-300"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>

                {error && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-300"
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
                    ? "Creating account..."
                    : "Create account"}
                </button>
              </form>

              <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />

                <span className="text-xs uppercase tracking-wider text-zinc-600">
                  Already registered
                </span>

                <div className="h-px flex-1 bg-white/10" />
              </div>

              <Link
                href="/login"
                className="flex h-12 w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-5 font-semibold text-zinc-200 transition hover:border-white/20 hover:bg-white/[0.07]"
              >
                Log in to your account
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}