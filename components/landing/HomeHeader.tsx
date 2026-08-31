"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

type HomeHeaderProps = {
  isLoggedIn: boolean;
};

export default function HomeHeader({ isLoggedIn }: HomeHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const { language, setLanguage, t } = useLanguage();

  const languageRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        languageRef.current &&
        !languageRef.current.contains(event.target as Node)
      ) {
        setLanguageOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function selectLanguage(newLanguage: "EN" | "RO") {
    setLanguage(newLanguage);
    setLanguageOpen(false);
  }

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#07090d]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="shrink-0 text-lg font-semibold tracking-tight sm:text-xl"
          >
            Performance
            <span className="text-blue-500">Tuning</span>
          </Link>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {/* Language */}
            <div ref={languageRef} className="relative">
              <button
                type="button"
                onClick={() => setLanguageOpen((previous) => !previous)}
                aria-label={
                  language === "RO" ? "Schimbă limba" : "Change language"
                }
                aria-expanded={languageOpen}
                className="flex h-11 shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-sm font-semibold text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white sm:h-12 sm:px-4"
              >
                <span className="hidden text-base sm:inline">🌐</span>

                <span>{language}</span>

                <span
                  className={`text-xs text-zinc-600 transition-transform duration-200 ${
                    languageOpen ? "rotate-180" : ""
                  }`}
                >
                  ⌄
                </span>
              </button>

              {languageOpen && (
                <div className="absolute right-0 top-[54px] z-50 w-44 overflow-hidden rounded-xl border border-white/10 bg-[#0c1017] p-1.5 shadow-2xl shadow-black/40 sm:top-[58px]">
                  <button
                    type="button"
                    onClick={() => selectLanguage("EN")}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm transition ${
                      language === "EN"
                        ? "bg-blue-600/15 text-white"
                        : "text-zinc-400 hover:bg-white/[0.05] hover:text-white"
                    }`}
                  >
                    <span>English</span>
                    <span className="text-xs text-zinc-600">EN</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => selectLanguage("RO")}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm transition ${
                      language === "RO"
                        ? "bg-blue-600/15 text-white"
                        : "text-zinc-400 hover:bg-white/[0.05] hover:text-white"
                    }`}
                  >
                    <span>Română</span>
                    <span className="text-xs text-zinc-600">RO</span>
                  </button>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link
              href="/checkout"
              aria-label={language === "RO" ? "Deschide coșul" : "Open cart"}
              className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white sm:h-12 sm:w-12"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5 sm:h-6 sm:w-6"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4h2l2.1 10.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L20 8H6.2"
                />

                <circle cx="10" cy="20" r="1" />
                <circle cx="17" cy="20" r="1" />
              </svg>

              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
                0
              </span>
            </Link>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={
                language === "RO" ? "Deschide meniul" : "Open menu"
              }
              aria-expanded={menuOpen}
              className="group flex h-11 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition hover:border-white/20 hover:bg-white/[0.08] sm:h-12 sm:w-14"
            >
              <div className="space-y-[5px]">
                <span className="block h-[2px] w-5 rounded-full bg-zinc-300 transition group-hover:bg-white sm:w-6" />
                <span className="block h-[2px] w-5 rounded-full bg-zinc-300 transition group-hover:bg-white sm:w-6" />
                <span className="block h-[2px] w-5 rounded-full bg-zinc-300 transition group-hover:bg-white sm:w-6" />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Side menu */}
      <div
        className={`fixed inset-0 z-50 transition ${
          menuOpen
            ? "pointer-events-auto visible"
            : "pointer-events-none invisible"
        }`}
      >
        <button
          type="button"
          aria-label={language === "RO" ? "Închide meniul" : "Close menu"}
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
              aria-label={language === "RO" ? "Închide meniul" : "Close menu"}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-2xl text-zinc-400 transition hover:bg-white/[0.08] hover:text-white"
            >
              ×
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="group flex items-center justify-between border-b border-white/[0.07] px-6 py-5 transition hover:bg-white/[0.04]"
            >
              <div>
                <p className="text-lg font-semibold text-zinc-200">
                  {t.common.home}
                </p>

                <p className="mt-1 text-sm text-zinc-600">
                  {language === "RO"
                    ? "Înapoi la pagina principală"
                    : "Back to the main page"}
                </p>
              </div>

              <span className="text-xl text-blue-500">→</span>
            </Link>

            <a
              href="#how-it-works"
              onClick={() => setMenuOpen(false)}
              className="group flex items-center justify-between border-b border-white/[0.07] px-6 py-5 transition hover:bg-white/[0.04]"
            >
              <div>
                <p className="text-lg font-semibold text-zinc-200">
                  {t.navigation.howItWorks}
                </p>

                <p className="mt-1 text-sm text-zinc-600">
                  {language === "RO"
                    ? "Vezi fluxul complet al comenzii"
                    : "See the tuning workflow"}
                </p>
              </div>

              <span className="text-xl text-blue-500">→</span>
            </a>

            <a
              href="#about"
              onClick={() => setMenuOpen(false)}
              className="group flex items-center justify-between border-b border-white/[0.07] px-6 py-5 transition hover:bg-white/[0.04]"
            >
              <div>
                <p className="text-lg font-semibold text-zinc-200">
                  {t.navigation.about}
                </p>

                <p className="mt-1 text-sm text-zinc-600">
                  {language === "RO"
                    ? "Află mai multe despre PerformanceTuning"
                    : "Learn more about PerformanceTuning"}
                </p>
              </div>

              <span className="text-xl text-blue-500">→</span>
            </a>

            <a
              href="#benefits"
              onClick={() => setMenuOpen(false)}
              className="group flex items-center justify-between border-b border-white/[0.07] px-6 py-5 transition hover:bg-white/[0.04]"
            >
              <div>
                <p className="text-lg font-semibold text-zinc-200">
                  {t.navigation.benefits}
                </p>

                <p className="mt-1 text-sm text-zinc-600">
                  {language === "RO"
                    ? "De ce să folosești platforma"
                    : "Why use our platform"}
                </p>
              </div>

              <span className="text-xl text-blue-500">→</span>
            </a>

            <a
              href="#faq"
              onClick={() => setMenuOpen(false)}
              className="group flex items-center justify-between border-b border-white/[0.07] px-6 py-5 transition hover:bg-white/[0.04]"
            >
              <div>
                <p className="text-lg font-semibold text-zinc-200">
                  {t.navigation.faq}
                </p>

                <p className="mt-1 text-sm text-zinc-600">
                  {language === "RO"
                    ? "Întrebări și răspunsuri frecvente"
                    : "Common questions"}
                </p>
              </div>

              <span className="text-xl text-blue-500">→</span>
            </a>

            <Link
              href="/checkout"
              onClick={() => setMenuOpen(false)}
              className="group flex items-center justify-between border-b border-white/[0.07] px-6 py-5 transition hover:bg-white/[0.04]"
            >
              <div>
                <p className="text-lg font-semibold text-zinc-200">
                  {language === "RO" ? "Coș" : "Cart"}
                </p>

                <p className="mt-1 text-sm text-zinc-600">
                  {language === "RO"
                    ? "Vezi serviciile selectate"
                    : "View your selected services"}
                </p>
              </div>

              <span className="text-xl text-blue-500">→</span>
            </Link>

            {isLoggedIn ? (
              <Link
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="group flex items-center justify-between border-b border-white/[0.07] px-6 py-5 transition hover:bg-white/[0.04]"
              >
                <div>
                  <p className="text-lg font-semibold text-white">
                    {t.common.dashboard}
                  </p>

                  <p className="mt-1 text-sm text-zinc-600">
                    {language === "RO"
                      ? "Deschide contul tău"
                      : "Open your customer account"}
                  </p>
                </div>

                <span className="text-xl text-blue-500">→</span>
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-center justify-between border-b border-white/[0.07] px-6 py-5 transition hover:bg-white/[0.04]"
                >
                  <div>
                    <p className="text-lg font-semibold text-white">
                      {t.common.login}
                    </p>

                    <p className="mt-1 text-sm text-zinc-600">
                      {language === "RO"
                        ? "Accesează contul tău"
                        : "Access your account"}
                    </p>
                  </div>

                  <span className="text-xl text-blue-500">→</span>
                </Link>

                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-center justify-between border-b border-white/[0.07] px-6 py-5 transition hover:bg-white/[0.04]"
                >
                  <div>
                    <p className="text-lg font-semibold text-white">
                      {t.common.register}
                    </p>

                    <p className="mt-1 text-sm text-zinc-600">
                      {language === "RO"
                        ? "Începe să folosești PerformanceTuning"
                        : "Start using PerformanceTuning"}
                    </p>
                  </div>

                  <span className="text-xl text-blue-500">→</span>
                </Link>
              </>
            )}
          </nav>
        </aside>
      </div>
    </>
  );
}