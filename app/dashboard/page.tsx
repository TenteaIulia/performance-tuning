import Link from "next/link";
import { redirect } from "next/navigation";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { createClient } from "@/lib/supabase/server";

import { signOut } from "./actions";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Overview", href: "/dashboard" },
  { label: "New Order", href: "/dashboard/orders/new" },
  { label: "Orders", href: "/dashboard/orders" },
  { label: "Vehicles", href: "/dashboard/vehicles" },
  { label: "Files", href: "/dashboard/files" },
  { label: "Payments", href: "/dashboard/payments" },
  { label: "Support", href: "/dashboard/support" },
  { label: "Settings", href: "/dashboard/settings" },
];

const stats = [
  {
    label: "My vehicles",
    value: "0",
    description: "Vehicles saved to your account",
  },
  {
    label: "Active orders",
    value: "0",
    description: "Currently being processed",
  },
  {
    label: "Completed files",
    value: "0",
    description: "Files delivered successfully",
  },
  {
    label: "Total spent",
    value: "€0",
    description: "Total value of completed orders",
  },
];

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
      <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
        <aside className="hidden border-r border-white/10 bg-[#0a0d13] lg:flex lg:flex-col">
          <div className="border-b border-white/10 px-6 py-6">
            <Link
              href="/"
              className="text-xl font-semibold tracking-tight"
            >
              Performance
              <span className="text-blue-500">Tuning</span>
            </Link>
          </div>

          <nav className="flex-1 space-y-1 px-4 py-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center rounded-xl px-4 py-3 text-sm font-medium text-zinc-400 transition hover:bg-white/[0.05] hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-white/10 p-4">
            <div className="mb-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-medium text-white">
                {fullName}
              </p>

              <p className="mt-1 truncate text-xs text-zinc-500">
                {user.email}
              </p>
            </div>

            <form action={signOut}>
              <button
                type="submit"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/[0.08] hover:text-white"
              >
                Log out
              </button>
            </form>
          </div>
        </aside>

        <section className="min-w-0">
          <DashboardHeader
            fullName={fullName}
            email={user.email ?? ""}
          />

          <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
            <section>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                Welcome back, {firstName || "customer"}
              </p>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
                Your tuning workspace
              </h1>

              <p className="mt-4 max-w-2xl text-zinc-400">
                Manage vehicles, upload ECU files, follow active orders and
                download completed tuning files from one place.
              </p>
            </section>

            <section className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((item) => (
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

            <section className="mt-8 grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03]">
                <div className="flex flex-col gap-4 border-b border-white/10 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
                      Recent orders
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold">
                      Your latest requests
                    </h2>
                  </div>

                  <Link
                    href="/dashboard/orders"
                    className="text-sm font-medium text-zinc-400 transition hover:text-white"
                  >
                    View all orders
                  </Link>
                </div>

                <div className="p-6">
                  <div className="rounded-2xl border border-dashed border-white/10 bg-black/10 px-6 py-12 text-center">
                    <p className="font-medium text-zinc-300">
                      No orders yet
                    </p>

                    <p className="mt-2 text-sm text-zinc-500">
                      Your ECU file orders will appear here.
                    </p>

                    <Link
                      href="/dashboard/orders/new"
                      className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500"
                    >
                      Create first order
                    </Link>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/10 to-cyan-500/5 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
                    Quick actions
                  </p>

                  <div className="mt-6 space-y-3">
                    <Link
                      href="/dashboard/orders/new"
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 transition hover:bg-white/[0.08]"
                    >
                      <span>
                        <span className="block font-medium">
                          New tuning order
                        </span>

                        <span className="mt-1 block text-sm text-zinc-500">
                          Upload a new ECU file
                        </span>
                      </span>

                      <span className="text-zinc-500">→</span>
                    </Link>

                    <Link
                      href="/dashboard/vehicles/new"
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 transition hover:bg-white/[0.08]"
                    >
                      <span>
                        <span className="block font-medium">
                          Add vehicle
                        </span>

                        <span className="mt-1 block text-sm text-zinc-500">
                          Save vehicle details
                        </span>
                      </span>

                      <span className="text-zinc-500">→</span>
                    </Link>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
                    Order process
                  </p>

                  <div className="mt-6 space-y-4">
                    {[
                      "Upload original file",
                      "Select tuning services",
                      "Order review",
                      "Tuning in progress",
                      "Download completed file",
                    ].map((step, index) => (
                      <div
                        key={step}
                        className="flex items-start gap-3"
                      >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-xs text-zinc-400">
                          {index + 1}
                        </div>

                        <p className="pt-1 text-sm text-zinc-400">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}