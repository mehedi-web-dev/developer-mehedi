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

  // Responsive X offset for desktop (starts at center 0px, moves to right column 330px)
  const x = useTransform(smoothProgress, [0, 0.28, 0.72, 1], ["0px", "330px", "330px", "330px"]);
  // 3D Flip:
  // 0 -> 180deg (reveals Back face: developer desk) during Expectations
  // 180 -> 340deg (-20deg tilt, reveals Front face: Mehedi portrait) during About
  const rotateY = useTransform(smoothProgress, [0, 0.35, 0.75, 1], [0, 180, 340, 340]);
  const rotateZ = useTransform(smoothProgress, [0, 0.3, 0.75, 1], [0, 8, 4, 4]);
  const scale = useTransform(smoothProgress, [0, 0.28, 0.75, 1], [1, 0.93, 1, 1]);

  // "Hi" badge toggle animation state (cycles between "Hi" and "👋")
  const [badgeState, setBadgeState] = React.useState<"hi" | "wave">("hi");

  React.useEffect(() => {
    const interval = setInterval(() => {
      setBadgeState((prev) => (prev === "hi" ? "wave" : "hi"));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const portraitImage =
    siteSettings?.personalInfo?.profileImage?.trim() || "/mehedi-avatar.png";

  const workspaceImage = "/developer-desk.jpg";

  return (
    <div ref={containerRef} className="relative w-full">
      {/* ================= DESKTOP STICKY 3D FLIPPING CARD ================= */}
      <div
        className="hidden lg:block absolute inset-0 pointer-events-none z-30"
        style={{ perspective: "2200px" }}
      >
        <div className="sticky top-28 flex justify-center w-full">
          <motion.div
            style={{
              x,
              rotateY,
              rotateZ,
              scale,
              transformStyle: "preserve-3d",
            }}
            className="pointer-events-auto relative w-[330px] h-[460px] rounded-[26px] cursor-pointer shadow-2xl"
          >
            {/* FRONT FACE: Mehedi Hasan Portrait */}
            <div
              className="absolute inset-0 w-full h-full rounded-[26px] overflow-hidden border-2 border-white/15 bg-[#16171a] shadow-2xl"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <img
                src={portraitImage}
                alt="Mehedi Hasan - WordPress & Frontend Developer"
                className="w-full h-full object-cover object-top filter contrast-110"
              />
              {/* Bottom text overlay with left padding so badge NEVER covers text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex items-end pl-18 pr-4 pb-4.5 pt-12">
                <div>
                  <p className="text-white font-bold text-sm tracking-tight leading-tight">
                    Mehedi Hasan
                  </p>
                  <p className="text-[#c6ff00] text-xs font-mono tracking-tight mt-0.5">
                    WordPress &amp; Frontend Dev
                  </p>
                </div>
              </div>
            </div>

            {/* BACK FACE: Developer Desk / Multi-Monitor Code Setup */}
            <div
              className="absolute inset-0 w-full h-full rounded-[26px] overflow-hidden border-2 border-white/15 bg-[#16171a] shadow-2xl"
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <img
                src={workspaceImage}
                alt="Developer Desk & Engineering Workspace"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex items-end pl-18 pr-4 pb-4.5 pt-12">
                <div>
                  <p className="text-white font-bold text-sm tracking-tight leading-tight">
                    Developer Workspace
                  </p>
                  <p className="text-[#c6ff00] text-xs font-mono tracking-tight mt-0.5">
                    Code, Architecture &amp; Design
                  </p>
                </div>
              </div>
            </div>

            {/* FLOATING 3D "HI" / WAVING BADGE */}
            <div
              className="absolute bottom-2 left-2 z-40 w-14 h-14 rounded-full bg-[#c6ff00] text-black shadow-2xl border-2 border-[#0c0d0e] flex items-center justify-center overflow-hidden"
              style={{
                transform: "translateZ(45px)",
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
