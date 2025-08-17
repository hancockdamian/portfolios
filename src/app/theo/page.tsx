import type { Metadata } from "next";
import Link from "next/link";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import DecryptedText from "@/components/DecryptedText";
import TextType from "@/components/TextType";
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
                  src="/ProfilePic.png"
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
                <div className="w-full text-center">
                  {/* reserve height with an invisible copy of the longest line */}
                  <div className="relative w-full">
                    <span className="invisible block text-3xl font-semibold">
                      Text typing effect
                    </span>

                    {/* typed text sits on top, never wraps */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <TextType
                        text={[
                          "Welcome to my Portfolio",
                          "Full-stack dev in Perth",
                          "Happy Exploring!",
                        ]}
                        typingSpeed={75}
                        pauseDuration={10000}
                        showCursor={false}
                        className="text-3xl font-semibold text-white/90 whitespace-nowrap"
                        cursorCharacter="|"
                      />
                    </div>
                  </div>
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
          {/* Card 1 — Education */}
          <Link
            href="/theo/education"
            aria-label="Education"
            className={`${card} p-5 grid grid-rows-[auto_auto_1fr] justify-items-center gap-2 hover:no-underline`}
          >
            <SchoolRoundedIcon
              sx={{ fontSize: 100 }}
              className="text-white/90 mt-1"
            />
            <h3 className="text-lg font-medium tracking-wide text-white/90">
              Education
            </h3>
            <p className="text-sm text-white/70 text-center leading-snug">
              Curtin University — coursework, projects, and achievements.
            </p>
          </Link>

          {/* Card 2 — Work */}
          <Link
            href="/theo/work"
            aria-label="Work"
            className={`${card} p-5 grid grid-rows-[auto_auto_1fr] justify-items-center gap-2 hover:no-underline`}
          >
            <BusinessCenterRoundedIcon
              sx={{ fontSize: 100 }}
              className="text-white/90 mt-1"
            />
            <h3 className="text-lg font-medium tracking-wide text-white/90">
              Work
            </h3>
            <p className="text-sm text-white/70 text-center leading-snug">
              Pharmacy Halo — full-stack dev in C#, .NET & XAML; production apps
              and internal tooling.
            </p>
          </Link>

          {/* Card 3 — Projects */}
          <Link
            href="/theo/projects"
            aria-label="Projects"
            className={`${card} p-5 grid grid-rows-[auto_auto_1fr] justify-items-center gap-2 hover:no-underline`}
          >
            <TerminalRoundedIcon
              sx={{ fontSize: 100 }}
              className="text-white/90 mt-1"
            />
            <h3 className="text-lg font-medium tracking-wide text-white/90">
              Projects
            </h3>
            <p className="text-sm text-white/70 text-center leading-snug">
              A collection of current projects — from university work to
              personal builds.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
