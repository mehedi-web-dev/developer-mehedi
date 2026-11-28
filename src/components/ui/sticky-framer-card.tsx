"use client";

import * as React from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";

export interface StickyFramerCardProps {
  portraitImage: string;
  workspaceImage?: string;
  className?: string;
}

export function StickyFramerCard({
  portraitImage,
  workspaceImage = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80",
  className = "",
}: StickyFramerCardProps) {
  // Container ref spanning Hero + Expectations + About
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth springs for high-fidelity Framer feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 20,
    restDelta: 0.001,
  });

  // Exact Framer motion mapped transforms:
  // Progress 0.0 (Hero): centered, front face (portrait)
  // Progress 0.45 (Expectations): translated right ~320px, rotated 180deg (back face: workspace)
  // Progress 0.90 (About): translated right ~320px, rotated 340deg (-20deg tilt, front face: portrait)
  const x = useTransform(smoothProgress, [0, 0.35, 0.75, 1], ["0px", "320px", "320px", "320px"]);
  const rotateY = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [0, 180, 340, 340]);
  const rotateZ = useTransform(smoothProgress, [0, 0.35, 0.75, 1], [0, 9.5, 5, 5]);
  const scale = useTransform(smoothProgress, [0, 0.35, 0.75, 1], [1, 0.91, 1, 1]);

  // "Hi" badge toggle animation state (cycles between "Hi" and "👋")
  const [badgeState, setBadgeState] = React.useState<"hi" | "wave">("hi");

  React.useEffect(() => {
    const interval = setInterval(() => {
      setBadgeState((prev) => (prev === "hi" ? "wave" : "hi"));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ perspective: "2000px" }}
    >
      {/* Sticky viewport holder */}
      <div className="sticky top-28 z-30 flex justify-center pointer-events-none">
        <motion.div
          style={{
            x,
            rotateY,
            rotateZ,
            scale,
            transformStyle: "preserve-3d",
          }}
          className="pointer-events-auto relative w-[310px] sm:w-[340px] h-[430px] sm:h-[476px] rounded-[24px] cursor-pointer"
        >
          {/* ================= FRONT FACE (Portrait) ================= */}
          <div
            className="absolute inset-0 w-full h-full rounded-[24px] overflow-hidden border-2 border-white/10 bg-[#16171a] shadow-2xl"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <img
              src={portraitImage}
              alt="Mehedi Hasan - Portrait"
              className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-5">
              <div>
                <p className="text-white font-bold text-sm">Mehedi Hasan</p>
                <p className="text-[#c6ff00] text-xs font-mono">WordPress &amp; Frontend Dev</p>
              </div>
            </div>
          </div>

          {/* ================= BACK FACE (Workspace / Desk) ================= */}
          <div
            className="absolute inset-0 w-full h-full rounded-[24px] overflow-hidden border-2 border-white/10 bg-[#16171a] shadow-2xl"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <img
              src={workspaceImage}
              alt="Mehedi Hasan - Workspace"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-5">
              <div>
                <p className="text-white font-bold text-sm">Dev Workspace</p>
                <p className="text-[#c6ff00] text-xs font-mono">High-Performance Engineering</p>
              </div>
            </div>
          </div>

          {/* ================= FLOATING 3D "HI" / WAVING BADGE ================= */}
          <div
            className="absolute -bottom-3 -left-3 z-40 w-16 h-16 rounded-full bg-[#c6ff00] text-black shadow-xl border-2 border-white dark:border-[#0c0d0e] flex items-center justify-center overflow-hidden select-none"
            style={{
              transform: "translateZ(40px)",
            }}
          >
            <AnimatePresence mode="wait">
              {badgeState === "hi" ? (
                <motion.div
                  key="badge-hi"
                  initial={{ y: 16, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -16, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full flex items-center justify-center font-display font-black text-xl text-black tracking-tight"
                >
                  Hi
                </motion.div>
              ) : (
                <motion.div
                  key="badge-wave"
                  initial={{ y: 16, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -16, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full flex items-center justify-center text-2xl leading-none"
                >
                  <motion.span
                    animate={{ rotate: [0, 16, -10, 16, 0] }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="inline-block origin-bottom-right"
                  >
                    👋
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
