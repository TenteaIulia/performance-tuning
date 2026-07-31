export default function HeroPreview() {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#0d1118] p-6 shadow-2xl">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-zinc-500">
            Demo Order
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            BMW M340i
          </h2>
        </div>

        <span className="rounded-full bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
          In Progress
        </span>

      </div>

      <div className="mt-10 h-2 rounded-full bg-zinc-800">

        <div className="h-2 w-3/5 rounded-full bg-blue-500" />

      </div>

      <div className="mt-10 space-y-5">

        <div>✅ File Uploaded</div>

        <div>✅ Payment Authorized</div>

        <div>🔵 File Modification</div>

        <div>⚪ Ready to Download</div>

      </div>

    </div>
  );
}