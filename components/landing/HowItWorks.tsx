import Reveal from "@/components/animations/Reveal";

const steps = [
  {
    number: "01",
    title: "Upload your file",
    description:
      "Add your vehicle details, describe the issue and upload the original ECU file.",
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
      "Your request is reviewed and the file is modified by the Performance Tuning team.",
  },
  {
    number: "04",
    title: "Download the result",
    description:
      "Receive a notification and download the completed file directly from your account.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-y border-white/10 bg-white/[0.02] px-6 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              How it works
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              From original file to finished order in four clear steps.
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 120}>
              <article className="rounded-2xl border border-white/10 bg-[#0c1017] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-[#101620]">
                <span className="text-sm font-semibold text-blue-400">
                  {step.number}
                </span>

                <h3 className="mt-8 text-xl font-semibold">{step.title}</h3>

                <p className="mt-3 leading-7 text-zinc-400">
                  {step.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}