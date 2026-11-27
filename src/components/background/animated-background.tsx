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
  desktopOnly?: boolean;
}

const PARTICLES: Particle[] = [
  { id: 1, top: "14%", left: "12%", size: 3.5, color: "violet", duration: 16, delay: 0 },
  { id: 2, top: "22%", left: "84%", size: 3, color: "cyan", duration: 20, delay: 2 },
  { id: 3, top: "36%", left: "24%", size: 4, color: "cyan", duration: 24, delay: 4 },
  { id: 4, top: "45%", left: "72%", size: 3.5, color: "violet", duration: 18, delay: 1 },
  { id: 5, top: "58%", left: "16%", size: 3, color: "cyan", duration: 22, delay: 3 },
  { id: 6, top: "68%", left: "86%", size: 4, color: "violet", duration: 26, delay: 2.5 },
  { id: 7, top: "82%", left: "30%", size: 3.5, color: "cyan", duration: 17, delay: 5 },
  { id: 8, top: "16%", left: "58%", size: 3, color: "violet", duration: 21, delay: 6 },
  { id: 9, top: "52%", left: "42%", size: 3.5, color: "cyan", duration: 25, delay: 1.5 },
  { id: 10, top: "92%", left: "66%", size: 3, color: "violet", duration: 19, delay: 4 },
  { id: 11, top: "28%", left: "8%", size: 3, color: "violet", duration: 23, delay: 3.5, desktopOnly: true },
  { id: 12, top: "74%", left: "52%", size: 3, color: "cyan", duration: 27, delay: 0.5, desktopOnly: true },
  { id: 13, top: "8%", left: "38%", size: 3.5, color: "cyan", duration: 20, delay: 4.5, desktopOnly: true },
  { id: 14, top: "88%", left: "18%", size: 3, color: "violet", duration: 22, delay: 2.2, desktopOnly: true },
];

/**
 * Premium, futuristic, high-performance animated background.
 *
 * Features:
 * - Deep navy canvas (dark) & soft off-white (light) with ambient lighting.
 * - Multi-layer gentle mouse-responsive parallax (grid, orbs, particles) with lerp damping.
 * - Subtle animated gradient mesh with violet & cyan ambient lighting.
 * - Fine architectural SVG matrix grid with radial vignette mask.
 * - Minimal, non-distracting floating glowing particles.
 * - Micro-noise SVG texture for matte tactile depth and banding prevention.
 * - Automatic pause when tab is hidden or minimized (visibilitychange).
 * - Full prefers-reduced-motion support and mobile/touch optimizations.
 * - Zero React state updates on mousemove (pure DOM transforms).
 */
export function AnimatedBackground() {
  const gridRef = React.useRef<HTMLDivElement>(null);
  const orbsRef = React.useRef<HTMLDivElement>(null);
  const particlesRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    // Check user preferences & device capabilities
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isFinePointer = window.matchMedia(
      "(pointer: fine) and (hover: hover)"
    ).matches;

    if (prefersReducedMotion || !isFinePointer) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId: number | null = null;
    let isRunning = true;

    const handlePointerMove = (e: PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth - 0.5) * 2;
      const normY = (e.clientY / innerHeight - 0.5) * 2;

      // Subtle base displacement (max 14px)
      targetX = normX * 14;
      targetY = normY * 14;
    };

    const updateParallax = () => {
      if (!isRunning) return;

      // Silk-smooth lerp interpolation
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;

      // Layer 1: Background Grid (subtle 0.35x depth)
      if (gridRef.current) {
        gridRef.current.style.transform = `translate3d(${(currentX * 0.35).toFixed(2)}px, ${(currentY * 0.35).toFixed(2)}px, 0)`;
      }

      // Layer 2: Ambient Orbs (midground 0.65x depth)
      if (orbsRef.current) {
        orbsRef.current.style.transform = `translate3d(${(currentX * 0.65).toFixed(2)}px, ${(currentY * 0.65).toFixed(2)}px, 0)`;
      }

      // Layer 3: Particles (foreground 1.25x depth)
      if (particlesRef.current) {
        particlesRef.current.style.transform = `translate3d(${(currentX * 1.25).toFixed(2)}px, ${(currentY * 1.25).toFixed(2)}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updateParallax);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      } else {
        if (!isRunning) {
          isRunning = true;
          animationFrameId = requestAnimationFrame(updateParallax);
        }
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    animationFrameId = requestAnimationFrame(updateParallax);

    return () => {
      isRunning = false;
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none bg-[var(--background)] transition-colors duration-500"
    >
      {/* Subtle Static Mesh Gradient Base for Organic Lighting Variation */}
      <div
        className="absolute inset-0 opacity-40 dark:opacity-75 transition-opacity duration-500"
        style={{
          backgroundImage: `
            radial-gradient(at 0% 0%, rgba(139, 92, 246, 0.12) 0px, transparent 55%),
            radial-gradient(at 100% 0%, rgba(34, 211, 238, 0.10) 0px, transparent 55%),
            radial-gradient(at 50% 45%, rgba(124, 58, 237, 0.06) 0px, transparent 65%),
            radial-gradient(at 85% 95%, rgba(6, 182, 212, 0.09) 0px, transparent 55%),
            radial-gradient(at 15% 90%, rgba(139, 92, 246, 0.08) 0px, transparent 55%)
          `,
        }}
      />

      {/* Layer 1: Parallax Ambient Orbs */}
      <div ref={orbsRef} className="absolute inset-[-30px] will-change-transform">
        {/* Orb 1: Violet Aura - Top Left / Hero */}
        <div
          className="absolute -top-28 -left-24 sm:top-[-8%] sm:left-[-4%] h-[480px] w-[480px] sm:h-[680px] sm:w-[680px] rounded-full blur-[80px] sm:blur-[130px] opacity-55 dark:opacity-90 transition-opacity duration-500 animate-bg-orb-1"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.26) 0%, rgba(139, 92, 246, 0.07) 50%, transparent 70%)",
          }}
        />

        {/* Orb 2: Cyan Ambient Glow - Top Right / Header Navigation */}
        <div
          className="absolute top-[18%] -right-28 sm:top-[12%] sm:right-[-4%] h-[420px] w-[420px] sm:h-[620px] sm:w-[620px] rounded-full blur-[75px] sm:blur-[120px] opacity-55 dark:opacity-90 transition-opacity duration-500 animate-bg-orb-2"
          style={{
            background:
              "radial-gradient(circle, rgba(34, 211, 238, 0.22) 0%, rgba(34, 211, 238, 0.06) 50%, transparent 70%)",
          }}
        />

        {/* Orb 3: Deep Violet & Indigo Fusion - Center / Mid-Page Sections */}
        <div
          className="absolute top-[48%] left-[10%] sm:top-[44%] sm:left-[18%] h-[440px] w-[440px] sm:h-[620px] sm:w-[620px] rounded-full blur-[90px] sm:blur-[140px] opacity-50 dark:opacity-85 transition-opacity duration-500 animate-bg-orb-3"
          style={{
            background:
              "radial-gradient(circle, rgba(124, 58, 237, 0.20) 0%, rgba(59, 130, 246, 0.09) 45%, transparent 70%)",
          }}
        />

        {/* Orb 4: Teal & Cyan Ambient Wash - Lower Page / Portfolio & Contact */}
        <div
          className="absolute bottom-[-10%] right-[15%] sm:bottom-[-6%] sm:right-[20%] h-[460px] w-[460px] sm:h-[600px] sm:w-[600px] rounded-full blur-[90px] sm:blur-[135px] opacity-50 dark:opacity-85 transition-opacity duration-500 animate-bg-orb-4"
          style={{
            background:
              "radial-gradient(circle, rgba(6, 182, 212, 0.20) 0%, rgba(139, 92, 246, 0.08) 50%, transparent 70%)",
          }}
        />
      </div>

      {/* Layer 2: Fine Architectural SVG Grid Pattern with Vignette Radial Mask */}
      <div ref={gridRef} className="absolute inset-[-20px] will-change-transform">
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_75%_55%_at_50%_35%,black_40%,transparent_85%)] opacity-[0.04] dark:opacity-[0.075] transition-opacity duration-500">
          <svg
            className="h-full w-full stroke-slate-900 dark:stroke-cyan-300"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="futuristic-matrix-grid"
                width="52"
                height="52"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 52 0 L 0 0 0 52"
                  fill="none"
                  strokeWidth="0.8"
                />
                <circle cx="52" cy="52" r="1.1" className="fill-violet-600/70 dark:fill-violet-400/80" />
                <circle cx="0" cy="0" r="1.1" className="fill-cyan-600/70 dark:fill-cyan-400/80" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#futuristic-matrix-grid)" />
          </svg>
        </div>
      </div>

      {/* Layer 3: Minimal Floating Glowing Particles */}
      <div ref={particlesRef} className="absolute inset-[-20px] will-change-transform">
        {PARTICLES.map((particle) => (
          <div
            key={particle.id}
            className={`absolute rounded-full opacity-50 dark:opacity-85 transition-opacity duration-500 animate-bg-particle ${
              particle.desktopOnly ? "hidden sm:block" : ""
            }`}
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
                  ? "0 0 8px 1px rgba(139, 92, 246, 0.55)"
                  : "0 0 8px 1px rgba(34, 211, 238, 0.55)",
            }}
          />
        ))}
      </div>

      {/* Layer 4: Subtle Micro-Noise Texture for Tactile Matte Polish & Banding Prevention */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.018] dark:opacity-[0.032] pointer-events-none mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="bg-grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#bg-grain-filter)" />
      </svg>
    </div>
  );
}
