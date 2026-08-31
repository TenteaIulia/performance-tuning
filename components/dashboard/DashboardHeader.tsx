"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { signOut } from "@/app/dashboard/actions";

type DashboardHeaderProps = {
  fullName: string;
  email?: string;
};

const menuItems = [
  {
    label: "Home",
    href: "/",
    description: "Back to PerformanceTuning",
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    description: "Account overview",
  },
  {
    label: "New Order",
    href: "/dashboard/orders/new",
    description: "Upload an ECU file",
  },
  {
    label: "Orders",
    href: "/dashboard/orders",
    description: "Track your tuning requests",
  },
  {
    label: "Vehicles",
    href: "/dashboard/vehicles",
    description: "Manage saved vehicles",
  },
  {
    label: "Files",
    href: "/dashboard/files",
    description: "Original and modified files",
  },
  {
    label: "Payments",
    href: "/dashboard/payments",
    description: "Invoices and payments",
  },
  {
    label: "Support",
    href: "/dashboard/support",
    description: "Get help with an order",
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    description: "Account preferences",
  },
];

const websiteItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/#about",
  },
  {
    label: "FAQ",
    href: "/#faq",
  },
  {
    label: "Contact",
    href: "/#contact",
  },
];

export default function DashboardHeader({
  fullName,
  email,
}: DashboardHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07090d]/90 backdrop-blur-xl">
        <div className="mx-auto flex min-h-20 max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/dashboard"
            className="text-xl font-semibold tracking-tight sm:text-2xl"
          >
            Performance
            <span className="text-blue-500">Tuning</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/orders/new"
              className="hidden rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500 sm:inline-flex"
            >
              New Order
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="group flex h-12 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition hover:border-white/20 hover:bg-white/[0.08]"
            >
              <div className="space-y-[5px]">
                <span className="block h-[2px] w-6 rounded-full bg-zinc-300 transition group-hover:bg-white" />
                <span className="block h-[2px] w-6 rounded-full bg-zinc-300 transition group-hover:bg-white" />
                <span className="block h-[2px] w-6 rounded-full bg-zinc-300 transition group-hover:bg-white" />
              </div>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 transition ${
          menuOpen
            ? "pointer-events-auto visible"
            : "pointer-events-none invisible"
        }`}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <aside
          className={`absolute right-0 top-0 flex h-full w-full max-w-xl flex-col border-l border-white/10 bg-[#090c12] shadow-2xl transition-transform duration-500 ease-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex min-h-20 items-center justify-between border-b border-white/10 px-6">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-xl font-semibold tracking-tight"
            >
              Performance
              <span className="text-blue-500">Tuning</span>
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-2xl text-zinc-400 transition hover:bg-white/[0.08] hover:text-white"
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="border-b border-white/10 px-6 py-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                Customer account
              </p>

              <p className="mt-3 font-semibold text-white">
                {fullName}
              </p>

              {email && (
                <p className="mt-1 text-sm text-zinc-500">
                  {email}
                </p>
              )}
            </div>

            <nav>
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-center justify-between border-b border-white/[0.07] px-6 py-5 transition hover:bg-white/[0.04]"
                >
                  <div>
                    <p className="text-lg font-semibold text-zinc-200 transition group-hover:text-white">
                      {item.label}
                    </p>

                    <p className="mt-1 text-sm text-zinc-600 transition group-hover:text-zinc-400">
                      {item.description}
                    </p>
                  </div>

                  <span className="ml-4 text-xl text-blue-500 transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              ))}
            </nav>

            <div className="px-6 py-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600">
                PerformanceTuning
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {websiteItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-zinc-400 transition hover:bg-white/[0.07] hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 bg-[#07090d] p-6">
            <Link
              href="/dashboard/orders/new"
              onClick={() => setMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3.5 font-semibold transition hover:bg-blue-500"
            >
              + New tuning order
            </Link>

            <form action={signOut} className="mt-3">
              <button
                type="submit"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3.5 font-medium text-zinc-400 transition hover:bg-white/[0.07] hover:text-white"
              >
                Log out
              </button>
            </form>
          </div>
        </aside>
      </div>
    </>
  );
}