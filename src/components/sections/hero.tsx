"use client";

import * as React from "react";
import type { SiteSettings } from "@/types";

export interface HeroSectionProps {
  siteSettings?: SiteSettings | null;
  hideDesktopCard?: boolean;
}

export function HeroSection({
  siteSettings,
  hideDesktopCard = false,
}: HeroSectionProps = {}) {
  const profileImage =
    siteSettings?.personalInfo?.profileImage?.trim() || "/mehedi-avatar.png";

  return (
    <section
      id="hero"
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32 flex flex-col justify-center min-h-[85vh] overflow-x-hidden"
    >
      {/* 3-Column Desktop Horizontal Lockup matching Reference */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-4">
        {/* ================= LEFT COLUMN: MEHEDI HASAN + DIGITAL ================= */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-end text-center lg:text-right select-none z-10">
          <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-white/90 uppercase mb-2 block">
            Mehedi Hasan
          </span>
          <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[135px] font-display font-extrabold tracking-tighter text-white uppercase leading-[0.88]">
            DIGITAL
          </h1>
        </div>

        {/* ================= CENTER COLUMN: PORTRAIT CARD ================= */}
        <div className="lg:col-span-4 flex justify-center items-center relative z-20 my-4 lg:my-0">
          {hideDesktopCard ? (
            <>
              {/* Desktop: Slot reserved for the 3D Sticky Flipping Card */}
              <div className="hidden lg:block w-[320px] xl:w-[350px] h-[450px] xl:h-[490px]" />
              {/* Mobile: In-flow Portrait Card with Lime Waving Badge */}
              <div className="lg:hidden relative w-[260px] xs:w-[280px] sm:w-[320px] h-[360px] xs:h-[400px] sm:h-[440px] rounded-[28px] overflow-hidden border-2 border-white/10 shadow-2xl bg-[#16171a]">
                <img
                  src={profileImage}
                  alt="Mehedi Hasan"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute -bottom-2 -left-2 w-14 h-14 rounded-full bg-[#c6ff00] text-black flex items-center justify-center text-xl shadow-xl border-2 border-[#0c0d0e]">
                  ✋
                </div>
              </div>
            </>
          ) : (
            <div className="relative w-[280px] sm:w-[340px] xl:w-[360px] h-[380px] sm:h-[460px] rounded-[28px] overflow-hidden border-2 border-white/10 shadow-2xl bg-[#16171a]">
              <img
                src={profileImage}
                alt="Mehedi Hasan"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute -bottom-2 -left-2 w-14 h-14 rounded-full bg-[#c6ff00] text-black flex items-center justify-center text-xl shadow-xl border-2 border-[#0c0d0e]">
                ✋
              </div>
            </div>
          )}
        </div>

        {/* ================= RIGHT COLUMN: DEVELOPER + SUBTITLE ================= */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left select-none z-10">
          <h2 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[135px] font-display font-extrabold tracking-tighter text-white uppercase leading-[0.88]">
            DEVELOPER
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-medium leading-relaxed max-w-xs mt-3 sm:mt-4">
            WordPress / Elementor / React &amp; Next.js development specialist
          </p>
        </div>
      </div>
    </section>
  );
}
