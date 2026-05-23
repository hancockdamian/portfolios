import Link from "next/link";

export default function VisualiserPage() {
  return (
    <main className="relative w-full min-h-screen overflow-hidden bg-black text-white flex flex-col">
      {/* Header / Nav */}
      <header className="absolute top-0 left-0 w-full p-8 z-10 flex items-center justify-between">
        <Link
          href="/"
          className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          go back
        </Link>
        <h1 className="text-xl font-medium tracking-widest text-gray-300">
          visualiser
        </h1>
      </header>

      {/* Visualiser Container */}
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-600 animate-pulse font-medium tracking-wide">
          waiting for audio stream...
        </p>
      </div>
    </main>
  );
}
