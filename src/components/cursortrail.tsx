"use client";

import React, { useRef, useEffect } from "react";

interface CursorTrailProps {
  pixelSize?: number;
  baseRadius?: number;
  maxExtraRadius?: number;
  velocityMultiplier?: number;
  lifetime?: number;
  color?: string;
}

interface Point {
  x: number;
  y: number;
  time: number;
  velocity: number;
}

export default function CursorTrail({
  pixelSize = 5,
  baseRadius = 2.5,
  maxExtraRadius = 15,
  velocityMultiplier = 20,
  lifetime = 150,
  color = "255, 0, 127",
}: CursorTrailProps) {
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
        velocity = dt > 0 ? dist / dt : 0;
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

    const draw = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pointsRef.current = pointsRef.current.filter(
        (p) => now - p.time < lifetime
      );

      for (const p of pointsRef.current) {
        const age = now - p.time;
        const lifeAlpha = 1 - age / lifetime;

        const velocityScale = Math.min(
          p.velocity * velocityMultiplier,
          maxExtraRadius
        );
        const radius = baseRadius + velocityScale;

        for (let y = -radius; y <= radius; y += pixelSize) {
          for (let x = -radius; x <= radius; x += pixelSize) {
            const distSq = x * x + y * y;
            if (distSq <= radius * radius) {
              const radialAlpha = 1 - distSq / (radius * radius);
              const alpha = lifeAlpha * radialAlpha;
              if (alpha <= 0) continue;

              ctx.fillStyle = `rgba(${color}, ${alpha})`;
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
  }, [
    pixelSize,
    baseRadius,
    maxExtraRadius,
    velocityMultiplier,
    lifetime,
    color,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
