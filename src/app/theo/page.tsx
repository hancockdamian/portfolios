import type { Metadata } from "next";
import DecryptedText from "@/components/DecryptedText";
import MetaBalls from "@/components/MetaBalls";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Theo — Home",
  description: "Theo's portfolio home",
};

const card =
  "rounded-xl border border-white/15 bg-white/10 backdrop-blur-md shadow-md " +
  "transition-[background-color,box-shadow,backdrop-filter,border-color] duration-200 ease-out " +
  "hover:bg-white/15 hover:border-white/30 hover:backdrop-blur-lg hover:shadow-lg " +
  "hover:ring-1 hover:ring-white/30 ring-inset " +
  "focus-visible:ring-2 focus-visible:ring-white/40 outline-none";

const staticCard =
  "rounded-xl border border-white/15 bg-white/10 backdrop-blur-md shadow-md " +
  "transition-[background-color,box-shadow,backdrop-filter,border-color] duration-200 ease-out " +
  "focus-visible:ring-2 focus-visible:ring-white/40 ring-inset outline-none";

const decryptSpeed = 60;

export default function TheoHome() {
  return (
    <section className="mx-auto max-w-6xl p-6 h-full">
      {/* Outer layout: big left card + 320px right column */}
      <div className="grid grid-cols-[1fr_320px] gap-6 min-h-[730px]">
        {/* LEFT: big main card */}
        <div className="rounded-xl border border-white/15 bg-white/10 backdrop-blur-md shadow-md h-full p-6">
          {/* Inside big card: sidebar (160px) + two tiles */}
          <div className="grid h-full grid-cols-[160px_1fr] gap-6">
            {/* Sidebar column */}
            <div className="flex h-full flex-col gap-6">
              <div className="w-30 aspect-square mx-auto rounded-full border border-white/15 bg-white/10 backdrop-blur-md shadow-md relative overflow-hidden">
                <Image
                  src="/IMG_4266.jpg"
                  alt="Theo portrait"
                  fill
                  className="object-cover"
                  sizes="112px"
                  priority
                />
              </div>

              <div className={`${staticCard} flex-1 p-6`}></div>
            </div>

            {/* Right side: two equal tiles */}
            <div className="grid h-full grid-rows-[1fr_1fr] gap-6">
              {/* Top tile: bio */}
              <div className={`${staticCard} p-6 flex flex-col`}>
                <div className="text-center">
                  <DecryptedText
                    text="Welcome to my portfolio"
                    animateOn="view"
                    revealDirection="start"
                    speed={decryptSpeed}
                    sequential
                    maxIterations={5}
                    className="text-4xl font-semibold text-white/90"
                  />
                </div>

                <div className="mt-6 space-y-3 text-base leading-relaxed text-white/80">
                  <p>
                    I’m a Curtin University graduate and full-stack developer
                    based in Perth, Western Australia.
                  </p>
                  <p>
                    I currently build and maintain applications at Pharmacy
                    Halo, working across UI, services, and data layers.
                  </p>
                  <p>
                    My core stack is C#, XAML, and modern .NET, delivering
                    reliable, performant, user-focused solutions.
                  </p>
                  <p>
                    I apply security best practices throughout secure bydefault
                    patterns, code reviews, and dependency hygiene.
                  </p>
                </div>
              </div>

              <div className={`${staticCard} p-0 relative overflow-hidden`}>
                <div className="absolute inset-0">
                  <MetaBalls
                    color="#ffffff"
                    cursorBallColor="#ffffff"
                    cursorBallSize={2}
                    ballCount={15}
                    animationSize={20}
                    enableMouseInteraction={true}
                    enableTransparency={true}
                    hoverSmoothness={0.05}
                    clumpFactor={1}
                    speed={0.4}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: 320px column with 3 cards */}
        <div className="grid h-full grid-rows-[repeat(3,1fr)] gap-4">
          <div className={card} tabIndex={0} />
          <div className={card} tabIndex={0} />
          <div className={card} tabIndex={0} />
        </div>
      </div>
    </section>
  );
}
