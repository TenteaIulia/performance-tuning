"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Reveal from "@/components/animations/Reveal";
import HomeHeader from "@/components/landing/HomeHeader";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { createClient } from "@/lib/supabase/client";

const projects = [
  {
    image: "/images/projects/audi-a4.jpg",
    title: "Audi A4 B9",
    ecu: "Bosch EDC17",
  },
  {
    image: "/images/projects/bmw-x5.jpg",
    title: "BMW X5",
    ecu: "Bosch EDC17",
  },
  {
    image: "/images/projects/audi-a6.jpg",
    title: "Audi A6",
    ecu: "Bosch EDC17",
  },
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { language, t } = useLanguage();

  const steps =
    language === "RO"
      ? [
          {
            number: "01",
            title: "Încarcă fișierul",
            description:
              "Adaugă datele vehiculului, descrie solicitarea și încarcă fișierul ECU original.",
          },
          {
            number: "02",
            title: "Plată securizată",
            description:
              "Autorizează plata în EUR înainte ca tehnicianul să înceapă lucrul.",
          },
          {
            number: "03",
            title: "Modificare profesională",
            description:
              "Solicitarea este analizată, iar fișierul este pregătit de echipa Performance Tuning.",
          },
          {
            number: "04",
            title: "Descarcă rezultatul",
            description:
              "Primești notificare și descarci fișierul final direct din contul tău.",
          },
        ]
      : [
          {
            number: "01",
            title: "Upload your file",
            description:
              "Add your vehicle details, describe the request and upload the original ECU file.",
          },
          {
            number: "02",
            title: "Secure payment",
            description:
              "Authorize the payment securely in EUR before the technician starts working.",
          },
          {
            number: "03",
            title: "Professional modification",
            description:
              "Your request is reviewed and the file is prepared by the Performance Tuning team.",
          },
          {
            number: "04",
            title: "Download the result",
            description:
              "Receive a notification and download the completed file directly from your account.",
          },
        ];

  const benefits =
    language === "RO"
      ? [
          "Gestionare privată și securizată a fișierelor",
          "Status clar și actualizări pentru fiecare comandă",
          "Interfață în română și engleză",
          "Serviciu disponibil internațional",
        ]
      : [
          "Private and secure file handling",
          "Clear order status and updates",
          "Romanian and English interface",
          "Worldwide service",
        ];

  const progressSteps =
    language === "RO"
      ? [
          "Fișier încărcat",
          "Plată autorizată",
          "Analiză tehnician",
          "Procesare fișier",
          "Gata de descărcare",
        ]
      : [
          "File uploaded",
          "Payment authorized",
          "Technician review",
          "File processing",
          "Ready to download",
        ];

  const aboutPoints =
    language === "RO"
      ? [
          "Gestionare securizată și privată a fișierelor ECU",
          "Comunicare clară pe tot parcursul comenzii",
          "Acces internațional cu suport în română și engleză",
        ]
      : [
          "Secure and private ECU file handling",
          "Clear communication throughout every order",
          "Worldwide access with Romanian and English support",
        ];

  const stats =
    language === "RO"
      ? [
          {
            value: "RO / EN",
            label: "Platformă bilingvă",
          },
          {
            value: "EUR",
            label: "Plăți securizate",
          },
          {
            value: "Worldwide",
            label: "Disponibilitate internațională",
          },
          {
            value: "348 KB+",
            label: "Suport pentru fișiere ECU",
          },
        ]
      : [
          {
            value: "RO / EN",
            label: "Bilingual platform",
          },
          {
            value: "EUR",
            label: "Secure payments",
          },
          {
            value: "Worldwide",
            label: "Global availability",
          },
          {
            value: "348 KB+",
            label: "Typical ECU file support",
          },
        ];

  useEffect(() => {
    const supabase = createClient();

    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsLoggedIn(!!user);
    }

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentStep((previousStep) =>
        previousStep === progressSteps.length - 1 ? 0 : previousStep + 1,
      );
    }, 2200);

    return () => window.clearInterval(interval);
  }, [progressSteps.length]);

  const progress = ((currentStep + 1) / progressSteps.length) * 100;

  return (
    <main className="min-h-screen overflow-hidden bg-[#07090d] text-white">
      <HomeHeader isLoggedIn={isLoggedIn} />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <div className="pointer-events-none absolute left-1/2 top-20 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px] sm:h-[500px] sm:w-[500px] sm:blur-[140px]" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300 sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              {t.home.badge}
            </div>

            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              {t.home.heroTitle}

              <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                {t.home.heroHighlight}
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
              {t.home.heroDescription}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href={isLoggedIn ? "/dashboard/orders/new" : "/register"}
                className="rounded-xl bg-blue-600 px-6 py-3.5 text-center font-semibold transition hover:bg-blue-500"
              >
                {isLoggedIn ? t.common.newOrder : t.home.uploadFile}
              </Link>

              <a
                href="#how-it-works"
                className="rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-center font-semibold text-zinc-200 transition hover:bg-white/10"
              >
                {t.home.seeHowItWorks}
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-5 gap-y-3 text-sm text-zinc-500 sm:gap-x-6">
              <span>{t.home.secureUploads}</span>
              <span>{t.home.eurPayments}</span>
              <span>{t.home.worldwideAccess}</span>
              <span>{t.home.languages}</span>
            </div>
          </div>

          {/* Demo card */}
          <div className="relative mx-auto w-full max-w-xl [perspective:1200px]">
            <div className="pointer-events-none absolute inset-8 rounded-full bg-blue-600/20 blur-[90px]" />

            <div className="absolute inset-x-8 inset-y-4 hidden translate-x-5 translate-y-5 rotate-3 rounded-3xl border border-blue-400/10 bg-blue-500/[0.04] lg:block" />

            <div className="relative transition-transform duration-500 lg:[transform:rotateY(-5deg)_rotateX(2deg)] lg:hover:[transform:rotateY(0deg)_rotateX(0deg)_translateY(-6px)]">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-2 shadow-2xl shadow-blue-950/50 backdrop-blur-xl sm:p-3">
                <div className="pointer-events-none absolute -left-24 -top-32 hidden h-72 w-48 rotate-[28deg] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent blur-xl lg:block" />

                <div className="relative rounded-2xl border border-white/10 bg-[#0c1017]/95 p-4 sm:p-6">
                  <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_14px_rgba(34,197,94,0.8)]" />

                        <p className="text-sm text-zinc-500">
                          {language === "RO"
                            ? "Previzualizare comandă demo"
                            : "Demo order preview"}
                        </p>
                      </div>

                      <h2 className="mt-2 text-xl font-semibold">
                        BMW 320d F30
                      </h2>

                      <p className="mt-2 max-w-xs text-xs leading-5 text-zinc-600">
                        {language === "RO"
                          ? "Flux demonstrativ. Detaliile reale ale comenzilor apar după crearea contului."
                          : "Example workflow. Real order details appear after you create an account."}
                      </p>
                    </div>

                    <span className="w-fit shrink-0 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
                      {progressSteps[currentStep]}
                    </span>
                  </div>

                  <div className="mt-6 space-y-5">
                    <div>
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="text-zinc-400">
                          {language === "RO"
                            ? "Progres comandă"
                            : "Order progress"}
                        </span>

                        <span className="font-medium text-white">
                          {Math.round(progress)}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="relative h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-700 ease-out"
                          style={{
                            width: `${progress}%`,
                          }}
                        >
                          <div className="absolute inset-0 bg-white/20 blur-sm" />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                        <p className="text-xs uppercase tracking-wider text-zinc-500">
                          ECU
                        </p>

                        <p className="mt-2 font-medium">Bosch EDC17</p>

                        <p className="mt-1 text-xs text-zinc-600">
                          {language === "RO"
                            ? "Controler detectat"
                            : "Detected controller"}
                        </p>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                        <p className="text-xs uppercase tracking-wider text-zinc-500">
                          {language === "RO" ? "Fișier" : "File"}
                        </p>

                        <p className="mt-2 font-medium">original.bin</p>

                        <p className="mt-1 text-xs text-zinc-600">
                          {language === "RO"
                            ? "348 KB · Securizat"
                            : "348 KB · Secure"}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {progressSteps.map((label, index) => {
                        const complete = index <= currentStep;
                        const active = index === currentStep;

                        return (
                          <div
                            key={label}
                            className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5 transition-all duration-500 ${
                              active
                                ? "border-blue-500/20 bg-blue-500/[0.07]"
                                : "border-transparent"
                            }`}
                          >
                            <div className="flex min-w-0 items-center gap-3 text-sm">
                              <span
                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                                  complete
                                    ? "border-green-500/30 bg-green-500/10 text-green-400"
                                    : "border-white/10 bg-white/5 text-zinc-600"
                                }`}
                              >
                                {complete ? "✓" : "·"}
                              </span>

                              <span
                                className={`truncate ${
                                  complete
                                    ? "text-zinc-300"
                                    : "text-zinc-600"
                                }`}
                              >
                                {label}
                              </span>
                            </div>

                            {active && (
                              <span className="shrink-0 text-xs font-medium text-blue-400">
                                {language === "RO" ? "Activ" : "Active"}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-zinc-600">
                          {language === "RO"
                            ? "Plată securizată"
                            : "Secured payment"}
                        </p>

                        <p className="mt-1 text-sm font-medium text-zinc-300">
                          {language === "RO"
                            ? "Autorizarea este menținută până la livrare"
                            : "Authorization held until delivery"}
                        </p>
                      </div>

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-green-500/20 bg-green-500/10 text-green-400">
                        €
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-5 text-center text-xs text-zinc-600">
              {language === "RO"
                ? "Demonstrație interactivă — fără date reale ale clienților"
                : "Interactive demonstration — no real customer data"}
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="border-y border-white/10 bg-white/[0.02] px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                {t.navigation.howItWorks}
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
                {t.home.howItWorksTitle}
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <Reveal key={step.number} delay={index * 150}>
                <article className="h-full rounded-2xl border border-white/10 bg-[#0c1017] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500/30">
                  <span className="text-sm font-semibold text-blue-400">
                    {step.number}
                  </span>

                  <h3 className="mt-8 text-xl font-semibold">
                    {step.title}
                  </h3>

                  <p className="mt-3 leading-7 text-zinc-400">
                    {step.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About us */}
      <section
        id="about"
        className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <Reveal>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                  {t.home.aboutLabel}
                </p>

                <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
                  {t.home.aboutTitle}
                </h2>

                <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
                  {t.home.aboutDescription}
                </p>

                <div className="mt-8 space-y-4">
                  {aboutPoints.map((item, index) => (
                    <Reveal key={item} delay={index * 100}>
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/10 text-sm text-blue-400">
                          ✓
                        </span>

                        <p className="leading-6 text-zinc-300">
                          {item}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {stats.map((stat, index) => (
                <Reveal key={stat.label} delay={index * 120}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.05]">
                    <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl transition group-hover:bg-blue-500/20" />

                    <p className="relative text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                      {stat.value}
                    </p>

                    <p className="relative mt-3 text-sm leading-6 text-zinc-500">
                      {stat.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="px-4 py-24 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-14 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                {language === "RO"
                  ? "Proiecte reale"
                  : "Real Projects"}
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                {language === "RO" ? (
                  <>
                    Vehicule reale.
                    <br />
                    Lucrări reale.
                  </>
                ) : (
                  <>
                    Real vehicles.
                    <br />
                    Real work.
                  </>
                )}
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
                {language === "RO"
                  ? "Fiecare proiect este realizat cu echipamente profesionale și verificat înainte de livrare."
                  : "Every project is performed with professional equipment and verified before delivery."}
              </p>
            </div>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Reveal key={project.title} delay={index * 120}>
                <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-2xl font-semibold">
                        {project.title}
                      </h3>

                      <p className="mt-2 text-zinc-300">
                        {project.ecu}
                      </p>

                      <div className="mt-5 inline-flex rounded-full bg-green-500/15 px-3 py-1 text-sm text-green-400">
                        ✔ {language === "RO" ? "Finalizat" : "Completed"}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section
        id="benefits"
        className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                {t.home.benefitsLabel}
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
                {t.home.benefitsTitle}
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
                {language === "RO"
                  ? "Fără conversații împrăștiate, statusuri neclare sau fișiere pierdute. Fiecare vehicul, fișier, plată și actualizare rămâne conectată la comanda corectă."
                  : "No more scattered conversations, unclear order states or lost attachments. Every vehicle, file, payment and update stays connected to the correct order."}
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
              <Reveal key={benefit} delay={index * 120}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.05]">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    ✓
                  </div>

                  <p className="font-medium">{benefit}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="faq"
        className="px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8"
      >
        <Reveal>
          <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/15 to-cyan-500/5 px-5 py-14 text-center sm:px-12 sm:py-16">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              {t.home.ctaTitle}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
              {t.home.ctaDescription}
            </p>

            <Link
              href={isLoggedIn ? "/dashboard/orders/new" : "/register"}
              className="mt-8 inline-flex rounded-xl bg-white px-6 py-3.5 font-semibold text-black transition hover:bg-zinc-200"
            >
              {isLoggedIn
                ? t.home.createNewOrder
                : t.home.createAccount}
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 Performance Tuning.{" "}
            {language === "RO"
              ? "Toate drepturile rezervate."
              : "All rights reserved."}
          </p>

          <div className="flex flex-wrap gap-5">
            <Link
              href="/privacy"
              className="transition hover:text-white"
            >
              {language === "RO"
                ? "Confidențialitate"
                : "Privacy"}
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-white"
            >
              {language === "RO" ? "Termeni" : "Terms"}
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-white"
            >
              {t.navigation.contact}
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}