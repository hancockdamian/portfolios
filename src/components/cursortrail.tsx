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
  pixelSize = 6,
  baseRadius = 2.5,
  maxExtraRadius = 15,
  velocityMultiplier = 20,
  lifetime = 150,
  color = "255, 0, 127",
}: CursorTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointsRef = useRef<Point[]>([]);
  const bufferCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const buffer = bufferCanvasRef.current!;
    const bctx = buffer.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      buffer.width = Math.ceil(canvas.width / pixelSize);
      buffer.height = Math.ceil(canvas.height / pixelSize);
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
        x: e.clientX / pixelSize,
        y: e.clientY / pixelSize,
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
    bctx.globalCompositeOperation = "source-over";

    const draw = () => {
      const now = performance.now();
      bctx.clearRect(0, 0, buffer.width, buffer.height);

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
        const radius = (baseRadius + velocityScale) / pixelSize;

        const gradient = bctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          radius
        );
        gradient.addColorStop(0, `rgba(${color}, ${lifeAlpha})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);

        bctx.fillStyle = gradient;
        bctx.beginPath();
        bctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        bctx.fill();
      }

      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        buffer,
        0,
        0,
        buffer.width,
        buffer.height,
        0,
        0,
        canvas.width,
        canvas.height
      );

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
    <>
      <canvas ref={bufferCanvasRef} style={{ display: "none" }} />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </>
  );
}
