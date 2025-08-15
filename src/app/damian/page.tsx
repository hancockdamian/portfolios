"use client";

import PixelTrail from "@/components/PixelTrail";

export default function Page() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-gray-300">
      <PixelTrail
        gridSize={70}
        trailSize={0.12}
        maxAge={1000}
        interpolate={0.8}
        color="#bb307f"
        gooeyFilter={{ id: "custom-goo-filter", strength: 1 }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <section className="rounded-2xl p-6 text-black text-6xl text-center">
          Damian Hancock
        </section>
      </div>
    </main>
  );
}