"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import Threads from "@/components/threads";

export default function TheoGroupLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* OGL background layer */}
      <div className="fixed inset-0 -z-10">
        <Threads amplitude={1} distance={0.25} />
      </div>

      <header>
        <div className="mx-auto max-w-6xl px-6 py-4 pb-0 grid grid-cols-[1fr_320px] gap-6 items-center">
          <div className="h-14 w-full rounded-xl text-white border border-white/15 bg-white/10 backdrop-blur-md shadow-md flex items-center px-4">
            <nav className="flex items-center gap-4">
              <Link href="/" className="hover:underline">
                Root
              </Link>
              <Link href="/theo" className="hover:underline">
                Theo
              </Link>
            </nav>
          </div>
          <div className="h-14 w-full rounded-xl border border-white/15 bg-white/10 backdrop-blur-md shadow-md" />
        </div>
      </header>

      <main className="flex-1 grid grid-rows-[1fr_auto_1fr]">
        <div className="row-start-2">{children}</div>
      </main>

      <footer className="px-6 py-8 text-sm opacity-70">
        © {new Date().getFullYear()} Theo BigCock
      </footer>
    </div>
  );
}
