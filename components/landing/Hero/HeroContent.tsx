export default function HeroContent() {
  return (
    <div>
      <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
        Professional ECU File Platform
      </span>

      <h1 className="mt-8 text-6xl font-bold leading-tight">
        Upload your ECU file.
        <br />

        <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          We handle the rest.
        </span>
      </h1>

      <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-400">
        Secure uploads, professional modifications, real-time order tracking
        and worldwide access.
      </p>

      <div className="mt-10 flex gap-4">
        <button className="rounded-xl bg-blue-600 px-8 py-4 font-semibold hover:bg-blue-500">
          Upload File
        </button>

        <button className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-semibold hover:bg-white/10">
          Learn More
        </button>
      </div>
    </div>
  );
}