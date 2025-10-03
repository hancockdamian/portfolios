"use client";

import CursorTrail from "@/components/cursortrail";

export default function Page() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-gray-300">
      <CursorTrail></CursorTrail>

      <div className="absolute inset-0 flex items-center justify-center">
        <section className="rounded-2xl p-6 text-black text-6xl text-center">
          Damian Hancock
        </section>
      </div>
    </main>
  );
}