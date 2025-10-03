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

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const points = pointsRef.current;
      const total = points.length;

      for (let i = 0; i < total; i++) {
        const p = points[i];
        const alpha = i / total;

        ctx.fillStyle = `rgba(255, 0, 127, ${alpha})`;
        ctx.fillRect(p.x - 25, p.y - 25, 50, 50);
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
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
