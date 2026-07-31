import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { signOut } from "./actions";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const firstName =
    typeof user.user_metadata?.first_name === "string"
      ? user.user_metadata.first_name
      : "";

  const lastName =
    typeof user.user_metadata?.last_name === "string"
      ? user.user_metadata.last_name
      : "";

  const fullName =
    `${firstName} ${lastName}`.trim() || "Customer";

  return (
    <main className="min-h-screen bg-[#07090d] text-white">
      <header className="border-b border-white/10 bg-[#07090d]/90 backdrop-blur-xl">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight"
          >
            Performance
            <span className="text-blue-500">Tuning</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-zinc-200">
                {fullName}
              </p>

              <p className="text-xs text-zinc-500">
                {user.email}
              </p>
            </div>

            <form action={signOut}>
              <button
                type="submit"
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Customer dashboard
          </p>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            Welcome back, {firstName || "customer"}.
          </h1>

          <p className="mt-4 max-w-2xl text-zinc-400">
            Manage your vehicles, create ECU file orders and follow every
            request from upload to final delivery.
          </p>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              label: "My vehicles",
              value: "0",
              description: "Vehicles saved to your account",
            },
            {
              label: "Active orders",
              value: "0",
              description: "Orders currently being processed",
            },
            {
              label: "Completed files",
              value: "0",
              description: "Files ready or previously delivered",
            },
          ].map((item) => (
            <article
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <p className="text-sm text-zinc-500">
                {item.label}
              </p>

              <p className="mt-4 text-4xl font-semibold">
                {item.value}
              </p>

              <p className="mt-3 text-sm leading-6 text-zinc-500">
                {item.description}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
                  Orders
                </p>

                <h2 className="mt-3 text-2xl font-semibold">
                  No orders yet
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500">
                  Your uploaded files and order progress will appear here.
                </p>
              </div>

              <Link
                href="/dashboard/orders/new"
                className="shrink-0 rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold transition hover:bg-blue-500"
              >
                New order
              </Link>
            </div>

            <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-black/10 px-6 py-12 text-center">
              <p className="text-zinc-400">
                Create your first order to begin.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/10 to-cyan-500/5 p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
              Quick start
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              Add your first vehicle
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Save the vehicle details once, then reuse them whenever you
              submit a new ECU file.
            </p>

            <Link
              href="/dashboard/vehicles/new"
              className="mt-8 inline-flex rounded-xl border border-white/10 bg-white/[0.06] px-5 py-3 font-semibold transition hover:bg-white/[0.1]"
            >
              Add vehicle
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}