"use client";

import * as React from "react";

/**
 * Authentic Framer-style Tactile Grain & Ambient Matte Background.
 * Matches depalm.framer.ai in both Dark and Light modes.
 */
export function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none bg-[var(--background)] transition-colors duration-500"
    >
      {/* Ambient Vignette & Lighting Depth */}
      <div
        className="absolute inset-0 opacity-40 dark:opacity-70 transition-opacity duration-500 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(at 50% 0%, rgba(198, 255, 0, 0.04) 0px, transparent 60%),
            radial-gradient(at 0% 100%, rgba(198, 255, 0, 0.03) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(255, 255, 255, 0.02) 0px, transparent 50%)
          `,
        }}
      />

      {/* Signature High-Fidelity Tactile Film-Grain Noise (Matching Image 2) */}
      <svg
        className="fixed inset-0 h-full w-full opacity-60 dark:opacity-85 pointer-events-none mix-blend-overlay z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="framer-film-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.7"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#framer-film-grain)" />
      </svg>
    </div>
  );
}
