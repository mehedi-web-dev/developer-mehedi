"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";
import { getSiteSettings } from "@/services";
import type { SiteSettings } from "@/types";

export interface HeroSectionProps {
  siteSettings?: SiteSettings | null;
  hideDesktopCard?: boolean;
}

export function HeroSection({
  siteSettings: initialSettings,
  hideDesktopCard = false,
}: HeroSectionProps = {}) {
  const [settings, setSettings] = React.useState<SiteSettings | null>(initialSettings || null);
  const [imageError, setImageError] = React.useState(false);

  React.useEffect(() => {
    if (!initialSettings) {
      getSiteSettings().then((data) => {
        if (data) setSettings(data);
      });
    }
  }, [initialSettings]);

  const profileImage =
    settings?.personalInfo?.profileImage?.trim() ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80";

  return (
    <section id="hero" className="relative px-4 sm:px-6 max-w-6xl mx-auto pt-32 pb-20">
      <div className="flex flex-col items-center text-center">
        {/* Eyebrow Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono uppercase tracking-widest text-[#c6ff00] mb-8"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Mehedi Hasan</span>
        </motion.div>

        {/* Big Editorial Headline */}
        <div className="w-full relative py-4 sm:py-8">
          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-8xl md:text-9xl font-display font-extrabold tracking-tighter uppercase text-white leading-none select-none"
          >
            <div className="flex justify-between items-baseline w-full">
              <span className="text-left">DIGITAL</span>
              <span className="text-right text-[#c6ff00]">DEV</span>
            </div>
            <div className="text-center text-zinc-600 sm:text-zinc-500 text-4xl sm:text-7xl md:text-8xl mt-2 tracking-tight">
              DEVELOPER
            </div>
          </motion.h1>

          {/* Central Card Slot */}
          <div className="my-8 sm:my-10 flex justify-center">
            {hideDesktopCard ? (
              <>
                {/* On Desktop: Placeholder space where Sticky 3D Card sits */}
                <div className="hidden lg:block w-[340px] h-[476px]" />
                {/* On Mobile: Standard Card */}
                <div className="lg:hidden">
                  <TiltCard className="w-64 sm:w-80 h-80 sm:h-96 rounded-3xl overflow-hidden border-2 border-white/10 bg-[#16171a] shadow-2xl relative">
                    {!imageError ? (
                      <img
                        src={profileImage}
                        alt="Mehedi Hasan"
                        className="w-full h-full object-cover grayscale contrast-125"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-tr from-[#141517] to-[#252830] flex items-center justify-center">
                        <span className="text-7xl font-display font-extrabold text-[#c6ff00]">M</span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-[#c6ff00] text-black font-extrabold font-display flex items-center justify-center text-sm shadow-lg border-2 border-black/40">
                      Hi
                    </div>
                  </TiltCard>
                </div>
              </>
            ) : (
              <TiltCard className="w-64 sm:w-80 h-80 sm:h-96 rounded-3xl overflow-hidden border-2 border-white/10 bg-[#16171a] shadow-2xl relative">
                {!imageError ? (
                  <img
                    src={profileImage}
                    alt="Mehedi Hasan"
                    className="w-full h-full object-cover grayscale contrast-125"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-[#141517] to-[#252830] flex items-center justify-center">
                    <span className="text-7xl font-display font-extrabold text-[#c6ff00]">M</span>
                  </div>
                )}
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-[#c6ff00] text-black font-extrabold font-display flex items-center justify-center text-sm shadow-lg border-2 border-black/40">
                  Hi
                </div>
              </TiltCard>
            )}
          </div>

          {/* Subheadline & Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg sm:text-2xl text-zinc-300 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            WordPress / Elementor / React &amp; Next.js specialist
          </motion.p>
          <p className="text-sm text-zinc-500 mt-2 max-w-xl mx-auto">
            Strategy, clean code, and high-performance web architecture combined for measurable business growth.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/#contact"
              className="px-8 py-3.5 rounded-full bg-[#c6ff00] hover:bg-[#d4ff33] text-black font-semibold text-sm tracking-wide transition-all shadow-lg shadow-[#c6ff00]/20 flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <span>Schedule a Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white font-medium text-sm transition-all"
            >
              Explore Portfolio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
