'use client';

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

// Loader with central muon symbol, revolving dots, and percent bar
const DOTS = 6;
const DOT_RADIUS = 40; // px

export default function Loader() {
  const [percent, setPercent] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);
  const dotsRotatorRef = useRef<HTMLDivElement>(null);

  // Animate rotation of the dots container only
  useEffect(() => {
    if (!dotsRotatorRef.current) return;
    const tl = gsap.to(dotsRotatorRef.current, {
      rotate: 360,
      duration: 2,
      repeat: -1,
      ease: "linear",
      transformOrigin: "60px 60px",
    });
    return () => {
      tl.kill();
    };
  }, []);

  // Simulate loading progress
  useEffect(() => {
    const start = Date.now();
    let frame: number;
    function animate() {
      const elapsed = Date.now() - start;
      const prog = Math.min(100, Math.floor((elapsed / 1000) * 100));
      if (prog < 90) setPercent(prog);
      else setPercent((p) => (p < 99 ? p + 1 : 100));
      if (prog < 100) frame = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black bg-opacity-95 transition-opacity"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ width: 120, height: 120 }}
        ref={loaderRef}
      >
        {/* Revolving dots */}
        <div
          className="absolute left-0 top-0 w-full h-full"
          style={{ willChange: 'transform' }}
          id="dots-rotator"
          ref={dotsRotatorRef}
        >
          {[...Array(DOTS)].map((_, i) => {
            const angle = (i * 360) / DOTS;
            // Use CSS rotate+translate for static SSR positions
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "#6366f1",
                  boxShadow: "0 0 8px #6366f1a0",
                  transform: `rotate(${angle}deg) translateY(-${DOT_RADIUS}px) translate(-50%, -50%)`,
                }}
              />
            );
          })}
        </div>
        {/* Muon symbol */}
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            background: "#00FFC8",
            width: 56,
            height: 56,
            position: "absolute",
            left: 32,
            top: 32,
            zIndex: 2,
            boxShadow: "0 0 24px #00FFC888",
          }}
        >
          <span
            style={{
              fontFamily: "serif",
              fontWeight: 900,
              fontSize: 38,
              color: "#181818",
              letterSpacing: -2,
            }}
          >
            μ
          </span>
        </div>
      </div>
      {/* Percent bar */}
      <div className="w-48 mt-8">
        <div className="h-2 rounded bg-gray-800 overflow-hidden">
          <div
            className="h-2 bg-indigo-500 rounded"
            style={{ width: `${percent}%`, transition: "width 0.3s" }}
          ></div>
        </div>
        <div className="text-center text-xs text-gray-400 mt-2 tracking-widest">
          {percent}%
        </div>
      </div>
    </div>
  );
}
