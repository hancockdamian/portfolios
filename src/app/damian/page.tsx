"use client";

import CursorTrail from "@/components/cursortrail";
import ModelViewer from "@/components/ModelViewer";
import Image from "next/image";
import { useState, useRef } from "react";
import Link from "next/link";

export default function Page() {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const totalSeconds = 178; // 2 minutes and 58 seconds

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      setProgress(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      );
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = Number(e.target.value);
    setProgress(newProgress);
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime =
        (newProgress / 100) * audioRef.current.duration;
    }
  };

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden flex flex-col">
      {/* Background Dot Grid Animation */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes grid-breathe {
              0% { transform: scale(1) translate(0, 0); }
              33% { transform: scale(1.05) translate(1%, 1.5%); }
              66% { transform: scale(0.95) translate(-1%, -1%); }
              100% { transform: scale(1) translate(0, 0); }
            }
            .animate-grid-breathe {
              animation: grid-breathe 25s ease-in-out infinite;
            }
          `,
        }}
      />
      <div className="fixed -inset-[50%] w-[200%] h-[200%] -z-50 pointer-events-none bg-white bg-[radial-gradient(#d1d5db_1.5px,transparent_1.5px)] bg-[size:24px_24px] animate-grid-breathe" />

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
          <section className="relative z-10 flex flex-col space-y-4">
            {/* Pink Star Background */}
            <Image
              src="/pink-star.svg"
              alt="Pink Star"
              width={450}
              height={450}
              className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain pointer-events-none opacity-90"
            />

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
        <div className="w-full max-w-5xl px-8 mt-12 overflow-hidden">
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
                  {item === 1 ? (
                    <Link
                      href="/visualiser"
                      className="w-full h-full bg-gray-300/30 backdrop-blur-md border border-gray-300/50 rounded-3xl flex items-center justify-center cursor-pointer shadow-xl hover:bg-gray-400/40 hover:scale-[1.02] transition-all"
                    >
                      <span className="text-gray-600 font-medium">
                        visualiser
                      </span>
                    </Link>
                  ) : (
                    <div className="w-full h-full bg-gray-300/30 backdrop-blur-md border border-gray-300/50 rounded-3xl flex items-center justify-center cursor-pointer shadow-xl hover:bg-gray-400/40 hover:scale-[1.02] transition-all">
                      <span className="text-gray-600 font-medium">
                        coming soon...
                      </span>
                    </div>
                  )}
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
                  {item === 1 ? (
                    <Link
                      href="/visualiser"
                      className="w-full h-full bg-gray-300/30 backdrop-blur-md border border-gray-300/50 rounded-3xl flex items-center justify-center cursor-pointer shadow-xl hover:bg-gray-400/40 hover:scale-[1.02] transition-all"
                    >
                      <span className="text-gray-600 font-medium">
                        visualiser
                      </span>
                    </Link>
                  ) : (
                    <div className="w-full h-full bg-gray-300/30 backdrop-blur-md border border-gray-300/50 rounded-3xl flex items-center justify-center cursor-pointer shadow-xl hover:bg-gray-400/40 hover:scale-[1.02] transition-all">
                      <span className="text-gray-600 font-medium">
                        coming soon...
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 2: Future Content --- */}
      <section className="w-full flex flex-col items-center justify-center pt-4 pb-16">
        <div className="flex flex-col md:flex-row items-center justify-center gap-16 max-w-5xl w-full px-8 z-10">
          {/* Left Column: Record & Liquid Glass Player */}
          <div className="flex-1 flex flex-col items-center w-full max-w-md gap-6 relative">
            {/* Title Section */}
            <div className="flex flex-col items-center text-center gap-1">
              <p className="text-gray-500 text-m">favourite album</p>
              <h3 className="text-gray-600 text-xl font-medium">
                feeble little horse - girl with fish
              </h3>
            </div>

            {/* Record Image */}
            <a
              href="https://feeblelittlehorse.bandcamp.com/album/girl-with-fish"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
            >
              <Image
                src="/record.svg"
                alt="Record"
                width={320}
                height={320}
                className="object-contain drop-shadow-xl"
              />
            </a>

            {/* Song Title */}
            <div className="flex flex-col items-center text-center z-10 -mb-2">
              <h4 className="text-gray-600 text-xl font-medium tracking-tight">
                pocket
              </h4>
            </div>

            {/* Subtle liquid color glow behind the standalone glass elements */}
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-pink-300/30 rounded-full mix-blend-multiply filter blur-2xl animate-pulse -z-10"></div>
            <div className="absolute bottom-0 right-10 w-32 h-32 bg-blue-300/30 rounded-full mix-blend-multiply filter blur-2xl animate-pulse delay-700 -z-10"></div>

            {/* Hidden Audio Element */}
            <audio
              ref={audioRef}
              src="/pocket.mp3"
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
            />

            {/* Standalone Glass Progress Bar */}
            <div className="w-full flex flex-col gap-2 mt-2 z-10 px-4">
              <div className="relative w-full bg-gray-300/30 backdrop-blur-md rounded-full h-2 shadow-xl">
                {/* Transparent Glass Fill */}
                <div
                  className="absolute top-0 left-0 h-full bg-gray-400/40 rounded-full shadow-[0_0_8px_rgba(156,163,175,0.5)] pointer-events-none"
                  style={{ width: `${progress}%` }}
                ></div>
                {/* Interactive Hidden Slider */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={progress}
                  onChange={handleSeek}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-300 opacity-100 font-medium px-1">
                <span>
                  {formatTime(Math.floor((progress / 100) * totalSeconds))}
                </span>
                <span>2:58</span>
              </div>
            </div>

            {/* Standalone Glass Controls */}
            <div className="flex items-center justify-center gap-8 z-10 mt-2">
              <button className="flex items-center justify-center hover:scale-110 transition-transform cursor-pointer group drop-shadow-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 fill-gray-300/70 group-hover:fill-gray-400/90 transition-colors"
                >
                  <path d="M7 6c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1zm3.66 6.82l5.77 4.07c.66.47 1.58-.01 1.58-.82V7.93c0-.81-.91-1.28-1.58-.82l-5.77 4.07c-.57.4-.57 1.24 0 1.64z" />
                </svg>
              </button>
              <button
                onClick={togglePlay}
                className="flex items-center justify-center hover:scale-110 transition-transform cursor-pointer group drop-shadow-2xl z-20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={`w-12 h-12 fill-gray-300/70 group-hover:fill-gray-400/90 transition-colors ${
                    isPlaying ? "" : "ml-1"
                  }`}
                >
                  {isPlaying ? (
                    <path d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2zm6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2z" />
                  ) : (
                    <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z" />
                  )}
                </svg>
              </button>
              <button className="flex items-center justify-center hover:scale-110 transition-transform cursor-pointer group drop-shadow-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 fill-gray-300/70 group-hover:fill-gray-400/90 transition-colors"
                >
                  <path d="M7.58 16.89l5.77-4.07c.56-.4.56-1.24 0-1.63L7.58 7.11C6.91 6.65 6 7.12 6 7.93v8.14c0 .81.91 1.28 1.58.82zM16 7v10c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1s-1 .45-1 1z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column: Text */}
          <div className="relative z-10 flex-1 flex flex-col gap-6 text-lg text-gray-800 leading-relaxed font-medium">
            {/* Yellow Swirl Background */}
            <div className="absolute -z-10 -inset-x-8 -inset-y-8 md:-inset-12 pointer-events-none opacity-80">
              <Image
                src="/yellow-swirl.svg"
                alt="Yellow Swirl"
                fill
                className="object-fill"
              />
            </div>

            <p>
              feeble little horse&apos;s{" "}
              <em className="text-black font-semibold">girl with fish</em> feels
              like sprinting through a sun-soaked field with a thunderstorm on
              your heels.
            </p>
            <p>
              every track swings between bliss and chaos — layers of fuzz
              collapse into delicate whispers, melodies bloom inside the
              distortion like flowers pushing through concrete.
            </p>
            <p>
              it&apos;s jagged and tender, noisy and heartbreakingly pretty. the
              crescendos don&apos;t just build, they swell like waves, pulling
              you under and spitting you out dizzy, grinning, soaked in feedback
              and feeling.
            </p>
          </div>
        </div>
      </section>

      {/* --- Section 3: Room Tour --- */}
      <section className="w-full flex flex-col items-center justify-center pt-8 pb-24">
        <div className="flex flex-col md:flex-row items-center justify-center gap-16 max-w-5xl w-full px-8 z-10">
          {/* Left Column: Text */}
          <div className="relative z-10 flex-1 flex flex-col gap-6 text-lg text-gray-800 leading-relaxed font-medium">
            {/* Plant Background */}
            <div className="absolute -z-10 -inset-x-8 -inset-y-8 md:-inset-12 pointer-events-none opacity-50">
              <Image
                src="/plant.svg"
                alt="Plant Background"
                fill
                className="object-contain"
              />
            </div>

            <p>
              tiny room update: i adopted a new little plant friend to keep the
              space lively. my monstera, sadly, didn’t make it through the
              chaos… but don’t count her out just yet — she’s in the middle of a
              dramatic resurrection arc. fingers crossed for a comeback.
            </p>
          </div>

          {/* Right Column: 3D Model */}
          <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md gap-2 relative">
            <div className="flex flex-col items-center text-center">
              <p className="text-gray-500 text-m">room tour</p>
            </div>
            <div className="w-full flex justify-center items-center relative cursor-grab active:cursor-grabbing">
              <ModelViewer
                src="/models/Room.glb"
                width={400}
                height={400}
                rotation={[0, Math.PI + 0.8, 0]}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
