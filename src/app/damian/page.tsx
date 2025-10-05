"use client";

import CursorTrail from "@/components/cursortrail";
import ModelViewer from "@/components/ModelViewer";

export default function Page() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-gray-300 flex items-center justify-center">
      <CursorTrail
        pixelSize={6}
        baseRadius={3}
        maxExtraRadius={25}
        velocityMultiplier={25}
        lifetime={150}
        color="255, 0, 127"
      />

      <div className="flex flex-row items-center justify-between max-w-5xl w-full px-8">
        {/* Left Text Section */}
        <section className="flex flex-col space-y-4">
          <p className="text-sm text-gray-800">me.com</p>
          <h1 className="text-5xl font-semibold text-black">Damian Hancock</h1>
          <div className="text-md text-gray-900 leading-relaxed">
            <p>UI/UX Designer</p>
            <p>Robotics Software Engineer</p>
            <p className="mt-4">Freelance work available on request.</p>
          </div>
        </section>

        {/* Right 3D Model */}
        <div className="flex-shrink-0">
          <ModelViewer src="/models/DamianModel.glb" width={250} height={250} />
        </div>
      </div>
    </main>
  );
}