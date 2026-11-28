"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { HeroSection } from "./hero";
import { ExpectationsSection } from "./expectations";
import { AboutSection } from "./about";
import type { SiteSettings } from "@/types";

export interface ScrollStoryWrapperProps {
  siteSettings?: SiteSettings | null;
}

export function ScrollStoryWrapper({ siteSettings }: ScrollStoryWrapperProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Responsive X offset for desktop:
  // Starts centered (0px) in Hero.
  // Translates to right column (~350px on desktop) during Expectations and About.
  const x = useTransform(smoothProgress, [0, 0.28, 0.75, 1], ["0px", "350px", "350px", "350px"]);
  // 3D Flip:
  // 0 -> 180deg (reveals Back face: workspace) during Expectations
  // 180 -> 340deg (-20deg tilt, reveals Front face: portrait) during About
  const rotateY = useTransform(smoothProgress, [0, 0.35, 0.75, 1], [0, 180, 340, 340]);
  const rotateZ = useTransform(smoothProgress, [0, 0.3, 0.75, 1], [0, 8.5, 4.5, 4.5]);
  const scale = useTransform(smoothProgress, [0, 0.28, 0.75, 1], [1, 0.92, 1, 1]);

  // "Hi" badge toggle animation state (cycles between "Hi" and "👋")
  const [badgeState, setBadgeState] = React.useState<"hi" | "wave">("hi");

  React.useEffect(() => {
    const interval = setInterval(() => {
      setBadgeState((prev) => (prev === "hi" ? "wave" : "hi"));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const portraitImage =
    siteSettings?.personalInfo?.profileImage?.trim() ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80";

  const workspaceImage =
    "https://framerusercontent.com/images/Nf63tXddU52SRtJJgRHqk7zzD2g.png";

  return (
    <div ref={containerRef} className="relative w-full">
      {/* ================= DESKTOP STICKY 3D FLIPPING CARD ================= */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-30" style={{ perspective: "2200px" }}>
        <div className="sticky top-32 flex justify-center w-full">
          <motion.div
            style={{
              x,
              rotateY,
              rotateZ,
              scale,
              transformStyle: "preserve-3d",
            }}
            className="pointer-events-auto relative w-[340px] h-[476px] rounded-[24px] cursor-pointer shadow-2xl"
          >
            {/* FRONT FACE: Portrait */}
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

            {/* BACK FACE: Desk / Workspace */}
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

            {/* FLOATING 3D "HI" / WAVING BADGE */}
            <div
              className="absolute -bottom-3 -left-3 z-40 w-16 h-16 rounded-full bg-[#c6ff00] text-black shadow-xl border-2 border-[#0c0d0e] flex items-center justify-center overflow-hidden"
              style={{
                transform: "translateZ(40px)",
              }}
            >
              <motion.div
                animate={{ y: badgeState === "hi" ? "0%" : "-50%" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-start h-[200%] w-full"
              >
                <div className="h-1/2 w-full flex items-center justify-center font-display font-extrabold text-base select-none">
                  Hi
                </div>
                <div className="h-1/2 w-full flex items-center justify-center text-xl select-none">
                  👋
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ================= SECTIONS IN SCROLL FLOW ================= */}
      {/* 1. Hero Section */}
      <HeroSection siteSettings={siteSettings} hideDesktopCard={true} />

      {/* 2. Expectations Section */}
      <ExpectationsSection hideDesktopSlot={false} />

      {/* 3. About Section */}
      <AboutSection siteSettings={siteSettings} hideDesktopSlot={true} />
    </div>
  );
}
