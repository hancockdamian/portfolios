import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-dvh relative overflow-hidden bg-[#e9dfd6] text-[#1a1a1a]">
      {/* animated gradient bg */}
      <div className="absolute inset-0 bg-animated" />
      {/* grain overlay */}
      <div className="pointer-events-none absolute inset-0 mix-blend-overlay grain opacity-40" />

      {/* top nav */}
      <header className="sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mt-3 flex items-center justify-between rounded-2xl bg-white/30 px-3 py-2 backdrop-blur-md ring-1 ring-black/10">
            <div className="flex items-center gap-2">
              <span className="text-l tracking-tight">Hancock Solutions</span>
            </div>
            <a
              href="mailto:contact@example.com"
              className="rounded-full bg-white/60 px-4 py-2 text-sm font-medium ring-1 ring-black/10 hover:bg-white transition"
            >
              Contact
            </a>
          </div>
        </div>
      </header>

      {/* hero card */}
      <main className="relative z-0 mx-auto grid max-w-5xl place-items-center px-4 sm:px-6">
        <section className="mt-24 mb-20 w-full">
          <div className="mx-auto max-w-3xl rounded-xl bg-white/70 p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-md ring-1 ring-black/10">
            <p className="text-[15px] leading-7 tracking-wide text-[#27303a]">
              We craft software solutions in Perth, with over 5 years experience in software.
            </p>
          </div>
        </section>
      </main>

      {/* footer (optional) */}
      <footer className="pb-10" />
    </div>
  );
}
