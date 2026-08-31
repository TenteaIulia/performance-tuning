"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function CheckoutPage() {
  const { language } = useLanguage();

  // Temporar - ulterior aceste date vor veni din comanda reală.
  const order = {
    vehicle: "BMW 320d F30",
    ecu: "Bosch EDC17",
    file: "original.bin",
    services: [
      {
        id: "stage1",
        name: "Stage 1",
        price: 89,
      },
      {
        id: "diagnostics",
        name:
          language === "RO"
            ? "Analiză diagnostică"
            : "Diagnostics review",
        price: 25,
      },
    ],
  };

  const subtotal = order.services.reduce(
    (total, service) => total + service.price,
    0,
  );

  const total = subtotal;

  return (
    <main className="min-h-screen bg-[#07090d] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#07090d]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-xl font-semibold tracking-tight"
          >
            Performance
            <span className="text-blue-500">Tuning</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="hidden rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-zinc-300 transition hover:bg-white/[0.08] hover:text-white sm:inline-flex"
            >
              {language === "RO" ? "Contul meu" : "My account"}
            </Link>

            <div className="flex h-11 items-center rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm font-semibold text-zinc-300">
              EUR
            </div>
          </div>
        </div>
      </header>

      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Page title */}
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              {language === "RO"
                ? "Finalizare comandă"
                : "Checkout"}
            </p>

            <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
              {language === "RO"
                ? "Verifică comanda și autorizează plata."
                : "Review your order and authorize payment."}
            </h1>

            <p className="mt-4 max-w-2xl leading-7 text-zinc-500">
              {language === "RO"
                ? "Suma este doar autorizată acum. Plata va fi încasată numai după ce fișierul final este pregătit pentru livrare."
                : "The amount is only authorized now. Payment will be captured only when your completed file is ready for delivery."}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            {/* LEFT */}
            <div className="space-y-6">
              {/* Vehicle */}
              <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
                <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-zinc-500">
                      {language === "RO" ? "Vehicul" : "Vehicle"}
                    </p>

                    <h2 className="mt-1 text-2xl font-semibold">
                      {order.vehicle}
                    </h2>
                  </div>

                  <span className="w-fit rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                    {language === "RO"
                      ? "Pregătit pentru checkout"
                      : "Ready for checkout"}
                  </span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs uppercase tracking-wider text-zinc-600">
                      ECU
                    </p>

                    <p className="mt-2 font-medium text-zinc-200">
                      {order.ecu}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs uppercase tracking-wider text-zinc-600">
                      {language === "RO" ? "Fișier" : "File"}
                    </p>

                    <p className="mt-2 font-medium text-zinc-200">
                      {order.file}
                    </p>
                  </div>
                </div>
              </section>

              {/* Services */}
              <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {language === "RO"
                        ? "Servicii selectate"
                        : "Selected services"}
                    </h2>

                    <p className="mt-1 text-sm text-zinc-600">
                      {language === "RO"
                        ? "Serviciile incluse în această comandă."
                        : "Services included in this order."}
                    </p>
                  </div>

                  <Link
                    href="/dashboard/orders/new"
                    className="shrink-0 text-sm font-semibold text-blue-400 transition hover:text-blue-300"
                  >
                    {language === "RO" ? "Modifică" : "Edit"}
                  </Link>
                </div>

                <div className="mt-6 space-y-3">
                  {order.services.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-4"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                          ✓
                        </div>

                        <p className="font-medium text-zinc-200">
                          {service.name}
                        </p>
                      </div>

                      <span className="shrink-0 font-semibold">
                        €{service.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Payment flow */}
              <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
                    {language === "RO"
                      ? "Protecția plății"
                      : "Payment protection"}
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold">
                    {language === "RO"
                      ? "Plătești numai când fișierul este pregătit."
                      : "You pay only when the file is ready."}
                  </h2>
                </div>

                <div className="mt-8 space-y-7">
                  {/* 1 */}
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/10 text-sm font-semibold text-blue-400">
                      1
                    </div>

                    <div>
                      <p className="font-semibold text-zinc-200">
                        {language === "RO"
                          ? "Autorizezi plata"
                          : "You authorize payment"}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-zinc-500">
                        {language === "RO"
                          ? "Cardul este autorizat pentru valoarea comenzii. Suma nu este încă încasată."
                          : "Your card is authorized for the order amount. The payment is not captured yet."}
                      </p>
                    </div>
                  </div>

                  {/* connector */}
                  <div className="ml-5 h-5 w-px bg-white/10" />

                  {/* 2 */}
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/10 text-sm font-semibold text-blue-400">
                      2
                    </div>

                    <div>
                      <p className="font-semibold text-zinc-200">
                        {language === "RO"
                          ? "Comanda este procesată"
                          : "Your order is processed"}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-zinc-500">
                        {language === "RO"
                          ? "Tehnicianul verifică solicitarea și pregătește fișierul final."
                          : "The technician reviews your request and prepares the completed file."}
                      </p>
                    </div>
                  </div>

                  <div className="ml-5 h-5 w-px bg-white/10" />

                  {/* 3 */}
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-green-500/20 bg-green-500/10 text-sm font-semibold text-green-400">
                      3
                    </div>

                    <div>
                      <p className="font-semibold text-zinc-200">
                        {language === "RO"
                          ? "Fișierul final este încărcat"
                          : "Completed file is uploaded"}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-zinc-500">
                        {language === "RO"
                          ? "Administratorul încarcă fișierul final. Acesta nu este încă disponibil pentru descărcare."
                          : "The administrator uploads the completed file. It is not yet available for download."}
                      </p>
                    </div>
                  </div>

                  <div className="ml-5 h-5 w-px bg-white/10" />

                  {/* 4 */}
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-green-500/20 bg-green-500/10 text-sm font-semibold text-green-400">
                      4
                    </div>

                    <div>
                      <p className="font-semibold text-zinc-200">
                        {language === "RO"
                          ? "Plata este încasată"
                          : "Payment is captured"}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-zinc-500">
                        {language === "RO"
                          ? "Sistemul finalizează plata înainte de a permite accesul la fișier."
                          : "The system captures the authorized payment before allowing access to the file."}
                      </p>
                    </div>
                  </div>

                  <div className="ml-5 h-5 w-px bg-white/10" />

                  {/* 5 */}
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-green-500/20 bg-green-500/10 text-sm font-semibold text-green-400">
                      ✓
                    </div>

                    <div>
                      <p className="font-semibold text-zinc-200">
                        {language === "RO"
                          ? "Fișier disponibil pentru descărcare"
                          : "File available for download"}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-zinc-500">
                        {language === "RO"
                          ? "După confirmarea plății, fișierul final devine disponibil în cont."
                          : "Once payment is confirmed, the completed file becomes available in your account."}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT */}
            <aside>
              <div className="sticky top-6 rounded-3xl border border-white/10 bg-[#0d1118] p-6 shadow-2xl shadow-black/30 sm:p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  {language === "RO"
                    ? "Rezumat comandă"
                    : "Order summary"}
                </p>

                <div className="mt-6 space-y-4">
                  {order.services.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-start justify-between gap-5"
                    >
                      <span className="text-sm leading-6 text-zinc-400">
                        {service.name}
                      </span>

                      <span className="text-sm font-medium">
                        €{service.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="my-6 border-t border-white/10" />

                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500">
                    Subtotal
                  </span>

                  <span>€{subtotal.toFixed(2)}</span>
                </div>

                <div className="mt-5 flex items-end justify-between gap-5">
                  <div>
                    <p className="font-semibold">
                      {language === "RO" ? "Total" : "Total"}
                    </p>

                    <p className="mt-1 text-xs text-zinc-600">
                      EUR
                    </p>
                  </div>

                  <p className="text-3xl font-semibold tracking-tight">
                    €{total.toFixed(2)}
                  </p>
                </div>

                {/* Authorization info */}
                <div className="mt-7 rounded-2xl border border-blue-500/20 bg-blue-500/[0.06] p-4">
                  <div className="flex gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                      🔒
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-zinc-200">
                        {language === "RO"
                          ? "Doar autorizare"
                          : "Authorization only"}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-zinc-500">
                        {language === "RO"
                          ? "Nu încasăm plata acum."
                          : "We do not capture your payment now."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment button */}
                <button
                  type="button"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 font-semibold transition hover:bg-blue-500"
                >
                  <span>🔒</span>

                  {language === "RO"
                    ? `Autorizează €${total.toFixed(2)}`
                    : `Authorize €${total.toFixed(2)}`}
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-zinc-600">
                  {language === "RO"
                    ? "Suma va fi încasată numai după ce fișierul final este pregătit pentru livrare."
                    : "The amount will only be captured when your completed file is ready for delivery."}
                </p>

                {/* Supported payment */}
                <div className="mt-6 grid grid-cols-3 gap-2">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-center text-xs font-semibold text-zinc-500">
                    VISA
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-center text-xs font-semibold text-zinc-500">
                    Mastercard
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-center text-xs font-semibold text-zinc-500">
                    3D Secure
                  </div>
                </div>

                <Link
                  href="/dashboard/orders/new"
                  className="mt-5 flex w-full items-center justify-center rounded-xl border border-white/10 px-5 py-3.5 text-sm font-medium text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
                >
                  ←{" "}
                  {language === "RO"
                    ? "Înapoi la comandă"
                    : "Back to order"}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}