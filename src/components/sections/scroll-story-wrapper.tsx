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

  // Precise X translation from center (0px) to right column (350px on desktop)
  const x = useTransform(smoothProgress, [0, 0.28, 0.72, 1], ["0px", "350px", "350px", "350px"]);
  // 3D Flip:
  // 0 -> 180deg (reveals Back face: developer desk) during Expectations
  // 180 -> 340deg (-20deg tilt, reveals Front face: Mehedi portrait) during About
  const rotateY = useTransform(smoothProgress, [0, 0.35, 0.75, 1], [0, 180, 340, 340]);
  const rotateZ = useTransform(smoothProgress, [0, 0.3, 0.75, 1], [0, 7.5, 4, 4]);
  const scale = useTransform(smoothProgress, [0, 0.28, 0.75, 1], [1, 0.94, 1, 1]);

  // "Hi" / waving hand badge toggle animation state
  const [badgeState, setBadgeState] = React.useState<"hi" | "wave">("wave");

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
        <div className="sticky top-32 flex justify-center w-full">
          <motion.div
            style={{
              x,
              rotateY,
              rotateZ,
              scale,
              transformStyle: "preserve-3d",
            }}
            className="pointer-events-auto relative w-[320px] xl:w-[350px] h-[450px] xl:h-[490px] rounded-[28px] cursor-pointer shadow-2xl"
          >
            {/* FRONT FACE: Mehedi Hasan Portrait */}
            <div
              className="absolute inset-0 w-full h-full rounded-[28px] overflow-hidden border-2 border-white/10 bg-[#16171a] shadow-2xl"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <img
                src={portraitImage}
                alt="Mehedi Hasan"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* BACK FACE: Developer Desk Workspace */}
            <div
              className="absolute inset-0 w-full h-full rounded-[28px] overflow-hidden border-2 border-white/10 bg-[#16171a] shadow-2xl"
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <img
                src={workspaceImage}
                alt="Developer Desk"
                className="w-full h-full object-cover"
              />
            </div>

            {/* FLOATING 3D "HI" / WAVING BADGE (Anchored at Bottom-Left corner, matching Image 2) */}
            <div
              className="absolute -bottom-5 -left-5 z-40 w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#c6ff00] text-black shadow-2xl border-4 border-[#0c0d0e] flex items-center justify-center overflow-hidden"
              style={{
                transform: "translateZ(45px)",
              }}
            >
              <motion.div
                animate={{ y: badgeState === "hi" ? "0%" : "-50%" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-start h-[200%] w-full"
              >
                <div className="h-1/2 w-full flex items-center justify-center font-display font-extrabold text-xl select-none text-black">
                  Hi
                </div>
                <div className="h-1/2 w-full flex items-center justify-center text-3xl select-none">
                  ✋
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
