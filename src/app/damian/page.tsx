"use client";

import PixelTrail from "@/components/PixelTrail";

export default function Page() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-gray-300">
      {/* Fullscreen PixelTrail */}
      <PixelTrail
        gridSize={50}
        trailSize={0.05}
        maxAge={150}
        interpolate={3}
        color="rgb(236, 15, 177)"
        gooeyFilter={{ id: "custom-goo-filter", strength: 0.5 }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <section className="rounded-2xl p-6 text-black text-6xl text-center">
          Damian Hancock
        </section>
      </div>
    </main>
  );
}