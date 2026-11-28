"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { getSiteSettings } from "@/services";
import type { SiteSettings } from "@/types";

export interface AboutSectionProps {
  siteSettings?: SiteSettings | null;
  hideDesktopSlot?: boolean;
}

export function AboutSection({
  siteSettings: initialSettings,
  hideDesktopSlot = false,
}: AboutSectionProps = {}) {
  const [settings, setSettings] = React.useState<SiteSettings | null>(initialSettings || null);

  React.useEffect(() => {
    if (!initialSettings) {
      getSiteSettings().then((data) => {
        if (data) setSettings(data);
      });
    }
  }, [initialSettings]);

  const portraitImage =
    settings?.personalInfo?.profileImage?.trim() || "/mehedi-avatar.png";

  return (
    <section id="about" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-white/5">
      <div className="bg-gradient-to-b from-[#141517] to-[#101113] rounded-3xl p-8 sm:p-14 border border-white/10 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Bio & Counters */}
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-widest text-[#c6ff00] font-mono font-semibold block mb-2">
              About Me
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight mb-6">
              Bridging Creative Vision with Engineering Precision
            </h2>
            <p className="text-zinc-300 text-base leading-relaxed mb-4">
              Over the past 3+ years, I have specialized in WordPress and modern frontend web engineering—delivering more than 80 successful projects for international businesses, creative agencies, and founders.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed mb-8">
              Whether building bespoke Elementor Pro layouts, high-converting WooCommerce stores, or lightning-fast web applications with Next.js, React, and TypeScript, my goal is always the same: clean, scalable code and designs that convert.
            </p>

            {/* Animated Counters Grid */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-white/10 mb-8">
              <div>
                <div className="text-3xl sm:text-5xl font-display font-extrabold text-[#c6ff00]">
                  <AnimatedCounter from={0} to={3} suffix="+" />
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 font-medium mt-1">
                  Years Experience
                </p>
              </div>
              <div>
                <div className="text-3xl sm:text-5xl font-display font-extrabold text-[#c6ff00]">
                  <AnimatedCounter from={0} to={80} suffix="+" />
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 font-medium mt-1">
                  Projects Completed
                </p>
              </div>
              <div>
                <div className="text-3xl sm:text-5xl font-display font-extrabold text-[#c6ff00]">
                  <AnimatedCounter from={0} to={100} suffix="%" />
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 font-medium mt-1">
                  Client Satisfaction
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/#contact"
                className="px-6 py-3 rounded-full bg-[#c6ff00] hover:bg-[#d4ff33] text-black font-semibold text-sm transition-all flex items-center gap-2"
              >
                <span>Let&apos;s Connect</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <a
                href="mailto:mehedi.dev81@gmail.com"
                className="text-xs font-mono text-zinc-400 hover:text-white transition-colors"
              >
                mehedi.dev81@gmail.com
              </a>
            </div>
          </div>

          {/* Right Column: On Desktop, Sticky 3D Card flips back to Portrait here! On Mobile, shows standard card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-[340px] h-[476px] hidden lg:block" />
            <div className="lg:hidden w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden border border-white/15 bg-zinc-900 shadow-2xl relative">
              <img
                src={portraitImage}
                alt="Mehedi Hasan - Portrait"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 text-xs">
                <span className="text-[#c6ff00] font-bold block font-mono">
                  3+ Yrs Remote Engineering
                </span>
                <span className="text-zinc-300">
                  Global Clients &amp; Scalable Web Architecture
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
