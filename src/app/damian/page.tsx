"use client";

import CursorTrail from "@/components/cursortrail";
import ModelViewer from "@/components/ModelViewer";

export default function Page() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden bg-white bg-[radial-gradient(#d1d5db_1.5px,transparent_1.5px)] bg-[size:24px_24px] flex flex-col">
      <CursorTrail
        pixelSize={6}
        baseRadius={3}
        maxExtraRadius={25}
        velocityMultiplier={25}
        lifetime={150}
        color="255, 0, 127"
      />

      {/* --- Section 1: Hero --- */}
      <section className="w-full min-h-screen flex flex-col items-center justify-center py-16">
        <div className="flex flex-row items-center justify-between max-w-5xl w-full px-8">
          {/* Left Text Section */}
          <section className="flex flex-col space-y-4">
            <p className="text-sm text-gray-800">me.com</p>
            <h1 className="text-5xl font-semibold text-black">
              Damian Hancock
            </h1>
            <div className="text-md text-gray-900 leading-relaxed">
              <p>UI/UX Designer</p>
              <p>Robotics Software Engineer</p>
              <p className="mt-4">Freelance work available on request.</p>
            </div>
          </section>

          {/* Right 3D Model */}
          <div className="flex-shrink-0">
            <ModelViewer
              src="/models/DamianModel.glb"
              width={250}
              height={250}
            />
          </div>
        </div>

        {/* Horizontal Scrollable Placeholder Section */}
        <div className="w-full max-w-5xl px-8 mt-24 overflow-hidden">
          <style
            dangerouslySetInnerHTML={{
              __html: `
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 25s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `,
            }}
          />

          <div className="flex animate-scroll w-max pb-12 pt-8">
            {/* Set 1 */}
            <div className="flex gap-12 pr-12">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={`set1-${item}`}
                  className="flex-shrink-0 w-64 h-40 flex items-center justify-center"
                >
                  <div className="w-full h-full bg-gray-400/60 border-2 border-gray-400 rounded-3xl flex items-center justify-center cursor-pointer shadow-md hover:bg-gray-400/80 transition-colors">
                    <span className="text-gray-700 font-medium">
                      Link {item}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {/* Set 2 (Duplicate for seamless looping) */}
            <div className="flex gap-12 pr-12">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={`set2-${item}`}
                  className="flex-shrink-0 w-64 h-40 flex items-center justify-center"
                >
                  <div className="w-full h-full bg-gray-400/60 border-2 border-gray-400 rounded-3xl flex items-center justify-center cursor-pointer shadow-md hover:bg-gray-400/80 transition-colors">
                    <span className="text-gray-700 font-medium">
                      Link {item}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 2: Future Content --- */}
      <section className="w-full min-h-screen flex flex-col items-center justify-center">
        {/* Empty for now, but ready for your next section */}
      </section>
    </main>
  );
}
