export default function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#07090d]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-8">
        <a href="#" className="text-lg font-semibold tracking-tight">
          Performance<span className="text-blue-500">Tuning</span>
        </a>

        <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          <a href="#how-it-works" className="transition hover:text-white">
            How it works
          </a>
          <a href="#benefits" className="transition hover:text-white">
            Benefits
          </a>
          <a href="#faq" className="transition hover:text-white">
            FAQ
          </a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/login"
            className="hidden rounded-lg px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white sm:block"
          >
            Log in
          </a>

          <a
            href="/register"
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            Get started
          </a>
        </div>
      </div>
    </nav>
  );
}