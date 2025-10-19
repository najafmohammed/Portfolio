"use client";

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevPathRef = useRef(pathname);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Resize canvas to device pixel ratio
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
      const { innerWidth, innerHeight } = window;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      canvas.width = Math.floor(innerWidth * dpr);
      canvas.height = Math.floor(innerHeight * dpr);
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Trigger transition on route change
  useEffect(() => {
    if (pathname !== prevPathRef.current) {
      setIsTransitioning(true);
      prevPathRef.current = pathname;
    }
  }, [pathname]);

  // Pixel reveal animation using canvas compositing (destination-out)
  useEffect(() => {
    if (!isTransitioning) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const durationMs = 900;

    const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const animate = (now: number) => {
      if (startTimeRef.current == null) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const t = Math.min(1, elapsed / durationMs);

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const maxDist = Math.hypot(centerX, centerY);

      // Grid sizing for pixelation
      const columnsTarget = 60;
      const rowsTarget = 34;
      const cellW = Math.max(6, Math.floor(width / columnsTarget));
      const cellH = Math.max(6, Math.floor(height / rowsTarget));
      const cols = Math.ceil(width / cellW);
      const rows = Math.ceil(height / cellH);

      // Black fill then punch transparent holes
      ctx.save();
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'destination-out';
      // Center-out timing using distance-based delay per cell
      const spread = 0.35; // portion of the timeline used for radial wave
      const baseRadius = Math.hypot(cellW, cellH) * 0.85;

      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          const cx = c * cellW + cellW * 0.5;
          const cy = r * cellH + cellH * 0.5;
          const dist = Math.hypot(cx - centerX, cy - centerY);
          const norm = Math.min(1, dist / maxDist); // 0 at center -> 1 at corners
          const delay = norm * spread;
          const localT = Math.max(0, Math.min(1, (t - delay) / (1 - spread)));
          const eased = easeInOutCubic(localT);
          const radius = baseRadius * eased;

          if (radius > 0.001) {
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      ctx.restore();

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // Clear overlay and end transition
        ctx.clearRect(0, 0, width, height);
        startTimeRef.current = null;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        setIsTransitioning(false);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      startTimeRef.current = null;
    };
  }, [isTransitioning]);

  return (
    <div className="relative">
      {/* Pixel transition canvas overlay */}
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 z-[9999] pointer-events-none ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Page content */}
        <div className="transition-all duration-300 ease-in-out origin-center ">
          {children}
        </div>
    </div>
  );
}