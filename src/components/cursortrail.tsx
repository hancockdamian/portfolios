"use client";

import React, { useRef, useEffect } from "react";

interface Point {
  x: number;
  y: number;
  time: number;
  velocity: number;
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

    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;
    let hasPrev = false;

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      let velocity = 0;

      if (hasPrev) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        const dt = now - lastTime;
        const dist = Math.sqrt(dx * dx + dy * dy);
        velocity = dt > 0 ? dist / dt : 0; // px per ms
      }

      pointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        time: now,
        velocity,
      });

      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;
      hasPrev = true;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationId: number;

    const pixelSize = 5;
    const step = pixelSize;

    const unitOffsets: { x: number; y: number; distSq: number }[] = [];
    const maxBaseRadius = 1;

    for (let y = -1; y <= 1; y += step / 40) {
      for (let x = -1; x <= 1; x += step / 40) {
        const dSq = x * x + y * y;
        if (dSq <= maxBaseRadius) {
          unitOffsets.push({ x, y, distSq: dSq });
        }
      }
    }

    const lifetime = 250;

    const draw = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pointsRef.current = pointsRef.current.filter(
        (p) => now - p.time < lifetime
      );

      for (const p of pointsRef.current) {
        const age = now - p.time;
        const lifeAlpha = 1 - age / lifetime;

        const baseRadius = 5;
        const maxExtra = 25;
        const velocityScale = Math.min(p.velocity * 50, maxExtra);
        const radius = baseRadius + velocityScale;

        for (let y = -radius; y <= radius; y += pixelSize) {
          for (let x = -radius; x <= radius; x += pixelSize) {
            const distSq = x * x + y * y;
            if (distSq <= radius * radius) {
              const radialAlpha = 1 - distSq / (radius * radius);
              const alpha = lifeAlpha * radialAlpha;
              if (alpha <= 0) continue;

              ctx.fillStyle = `rgba(255, 0, 127, ${alpha})`;
              ctx.fillRect(p.x + x, p.y + y, pixelSize, pixelSize);
            }
          }
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
