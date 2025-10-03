"use client";

import React, { useRef, useEffect } from "react";

interface Point {
  x: number;
  y: number;
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointsRef = useRef<Point[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();

    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      pointsRef.current.push({ x: e.clientX, y: e.clientY });

      if (pointsRef.current.length > 50) {
        pointsRef.current.shift();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationId: number;

    const pixelSize = 5;
    const radius = 25;
    const step = pixelSize; // step matches pixel size for even spacing

    const pixelOffsets: { x: number; y: number }[] = [];

    for (let y = -radius; y <= radius; y += step) {
      for (let x = -radius; x <= radius; x += step) {
        if (x * x + y * y <= radius * radius) {
          pixelOffsets.push({ x, y });
        }
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const points = pointsRef.current;
      const total = points.length;

      for (let i = 0; i < total; i++) {
        const p = points[i];
        const trailAlpha = i / total;

        for (const offset of pixelOffsets) {
          const distSq = offset.x * offset.x + offset.y * offset.y;
          const maxDistSq = radius * radius;
          const radialAlpha = 0.8 - distSq / maxDistSq;

          const alpha = trailAlpha * radialAlpha;
          if (alpha <= 0) continue;

          ctx.fillStyle = `rgba(255, 0, 127, ${alpha})`;
          ctx.fillRect(p.x + offset.x, p.y + offset.y, pixelSize, pixelSize);
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
