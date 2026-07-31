export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div className="absolute left-1/2 top-40 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
          Professional ECU File Platform
        </span>

        <h1 className="mt-8 text-5xl font-bold leading-tight md:text-7xl">
          Upload your ECU file.
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            We handle the rest.
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
          Secure file upload, professional modification, real-time tracking and
          instant download. Everything from one modern dashboard.
        </p>

        <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="/register"
            className="rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-500"
          >
            Upload File
          </a>

          <a
            href="#how-it-works"
            className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-semibold transition hover:bg-white/10"
          >
            Learn More
          </a>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-zinc-500">
          <span>✓ Secure Upload</span>
          <span>✓ Worldwide</span>
          <span>✓ EUR Payments</span>
          <span>✓ RO / EN</span>
        </div>
      </div>
    </section>
  );
}