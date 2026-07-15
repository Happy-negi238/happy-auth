import steps from "./step";

export default function QuickStart() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-16 text-center">
        <p className="text-xs text-zinc-400 uppercase tracking-widest">
          Documentation
        </p>

        <h2 className="mt-2 text-5xl font-bold text-white">Quick start</h2>

        <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
          Integrate applications with our OpenID Connect in simple four steps
        </p>
      </div>

      <div className="relative mx-auto max-w-4xl">
        <div className="absolute left-5 top-5 h-full w-px bg-zinc-800" />

        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={step.title} className="relative flex gap-6 ">
              <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
                <step.icon size={18} />
              </div>

              <div
                className="flex-1 rounded-xl border border-zinc-800 bg-zinc-950 p-5
              shadow-[inset_0_0px_7px_rgba(255,255,255,0.1)]"
              >
                <span className="text-xs text-zinc-500">STEP {index + 1}</span>

                <h3 className="mt-1 text-xl font-semibold text-white">
                  {step.title}
                </h3>

                <p className="mt-1 text-zinc-400 text-xs">{step.description}</p>

                {step.code && (
                  <pre className="mt-5 overflow-auto rounded-lg bg-zinc-900 p-4 text-sm text-green-500/70">
                    {step.code}
                  </pre>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
