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
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-24 sm:pt-40 sm:pb-32 flex flex-col justify-center min-h-[85vh]"
    >
      {/* 3-Column Desktop Horizontal Lockup matching Image 2 */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-4">
        {/* ================= LEFT COLUMN: MEHEDI HASAN + DIGITAL ================= */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-end text-center lg:text-right select-none z-10">
          <span className="text-xs sm:text-sm font-semibold tracking-widest text-zinc-300 uppercase font-mono mb-2 block">
            Mehedi Hasan
          </span>
          <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[120px] xl:text-[145px] font-display font-extrabold tracking-tighter text-white uppercase leading-[0.88]">
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
              <div className="lg:hidden relative w-[280px] sm:w-[320px] h-[400px] sm:h-[450px] rounded-[24px] overflow-hidden border-2 border-white/10 shadow-2xl bg-[#16171a]">
                <img
                  src={profileImage}
                  alt="Mehedi Hasan"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute -bottom-2 -left-2 w-14 h-14 rounded-full bg-[#c6ff00] text-black flex items-center justify-center text-xl shadow-xl border-2 border-[#0c0d0e]">
                  👋
                </div>
              </div>
            </>
          ) : (
            <div className="relative w-[300px] sm:w-[340px] xl:w-[360px] h-[430px] sm:h-[480px] rounded-[28px] overflow-hidden border-2 border-white/10 shadow-2xl bg-[#16171a]">
              <img
                src={profileImage}
                alt="Mehedi Hasan"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute -bottom-2 -left-2 w-16 h-16 rounded-full bg-[#c6ff00] text-black flex items-center justify-center text-2xl shadow-xl border-2 border-[#0c0d0e]">
                👋
              </div>
            </div>
          )}
        </div>

        {/* ================= RIGHT COLUMN: DEVELOPER + SUBTITLE ================= */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left select-none z-10">
          <h2 className="text-7xl sm:text-8xl md:text-9xl lg:text-[120px] xl:text-[145px] font-display font-extrabold tracking-tighter text-white uppercase leading-[0.88]">
            DEVELOPER
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-medium leading-relaxed max-w-xs mt-4">
            WordPress / Elementor / React &amp; Next.js development specialist
          </p>
        </div>
      </div>
    </section>
  );
}
