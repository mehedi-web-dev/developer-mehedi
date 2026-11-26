"use client";

import * as React from "react";

interface Particle {
  id: number;
  top: string;
  left: string;
  size: number;
  color: "violet" | "cyan";
  duration: number;
  delay: number;
}

const PARTICLES: Particle[] = [
  { id: 1, top: "12%", left: "15%", size: 4, color: "violet", duration: 14, delay: 0 },
  { id: 2, top: "24%", left: "82%", size: 3, color: "cyan", duration: 18, delay: 2 },
  { id: 3, top: "38%", left: "28%", size: 5, color: "cyan", duration: 22, delay: 5 },
  { id: 4, top: "48%", left: "70%", size: 4, color: "violet", duration: 16, delay: 1 },
  { id: 5, top: "62%", left: "18%", size: 3, color: "cyan", duration: 20, delay: 4 },
  { id: 6, top: "72%", left: "85%", size: 5, color: "violet", duration: 24, delay: 3 },
  { id: 7, top: "84%", left: "32%", size: 4, color: "cyan", duration: 15, delay: 6 },
  { id: 8, top: "18%", left: "55%", size: 3, color: "violet", duration: 19, delay: 7 },
  { id: 9, top: "54%", left: "44%", size: 4, color: "cyan", duration: 23, delay: 2.5 },
  { id: 10, top: "90%", left: "68%", size: 3, color: "violet", duration: 17, delay: 4.5 },
  { id: 11, top: "30%", left: "9%", size: 4, color: "violet", duration: 21, delay: 3.5 },
  { id: 12, top: "76%", left: "50%", size: 3, color: "cyan", duration: 25, delay: 1.5 },
];

export function AnimatedBackground() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId: number;

    const handlePointerMove = (e: PointerEvent) => {
      // Calculate normalized offset from center (-1 to 1)
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth - 0.5) * 2;
      const normY = (e.clientY / innerHeight - 0.5) * 2;

      // Subtle max displacement of 14px
      targetX = normX * 14;
      targetY = normY * 14;
    };

    const updateParallax = () => {
      // Smooth lerp interpolation for silky motion
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    animationFrameId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
    >
      {/* Parallax Container */}
      <div ref={containerRef} className="absolute inset-[-20px] will-change-transform">
        {/* Futuristic SVG Grid Pattern */}
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)] opacity-[0.035] dark:opacity-[0.065] transition-opacity duration-500">
          <svg
            className="h-full w-full stroke-slate-900 dark:stroke-cyan-300"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="futuristic-matrix-grid"
                width="56"
                height="56"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 56 0 L 0 0 0 56"
                  fill="none"
                  strokeWidth="1"
                />
                <circle cx="56" cy="56" r="1.2" className="fill-violet-600 dark:fill-violet-400" />
                <circle cx="0" cy="0" r="1.2" className="fill-cyan-600 dark:fill-cyan-400" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#futuristic-matrix-grid)" />
          </svg>
        </div>

        {/* Ambient Gradient Orbs */}
        {/* Orb 1: Violet - Top Left / Center */}
        <div
          className="absolute -top-24 -left-20 sm:top-[-10%] sm:left-[-5%] h-[480px] w-[480px] sm:h-[680px] sm:w-[680px] rounded-full blur-[90px] sm:blur-[130px] opacity-60 dark:opacity-100 transition-opacity duration-500 animate-bg-orb-1"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.28) 0%, rgba(139, 92, 246, 0.08) 50%, transparent 70%)",
          }}
        />

        {/* Orb 2: Cyan - Top Right / Middle Right */}
        <div
          className="absolute top-[20%] -right-24 sm:top-[15%] sm:right-[-5%] h-[420px] w-[420px] sm:h-[620px] sm:w-[620px] rounded-full blur-[80px] sm:blur-[120px] opacity-60 dark:opacity-100 transition-opacity duration-500 animate-bg-orb-2"
          style={{
            background:
              "radial-gradient(circle, rgba(34, 211, 238, 0.24) 0%, rgba(34, 211, 238, 0.06) 50%, transparent 70%)",
          }}
        />

        {/* Orb 3: Violet & Cyan Deep Fusion - Bottom Left / Center */}
        <div
          className="absolute bottom-[-10%] left-[20%] sm:bottom-[-8%] sm:left-[25%] h-[450px] w-[450px] sm:h-[600px] sm:w-[600px] rounded-full blur-[100px] sm:blur-[140px] opacity-60 dark:opacity-100 transition-opacity duration-500 animate-bg-orb-3"
          style={{
            background:
              "radial-gradient(circle, rgba(124, 58, 237, 0.22) 0%, rgba(34, 211, 238, 0.12) 45%, transparent 70%)",
          }}
        />

        {/* Subtle Floating Glowing Particles */}
        {PARTICLES.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full opacity-60 dark:opacity-90 transition-opacity duration-500 animate-bg-particle"
            style={{
              top: particle.top,
              left: particle.left,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
              backgroundColor:
                particle.color === "violet"
                  ? "rgba(139, 92, 246, 0.85)"
                  : "rgba(34, 211, 238, 0.85)",
              boxShadow:
                particle.color === "violet"
                  ? "0 0 10px 1px rgba(139, 92, 246, 0.6)"
                  : "0 0 10px 1px rgba(34, 211, 238, 0.6)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
