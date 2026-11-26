"use client";

import * as React from "react";
import Image from "next/image";
import { CheckCircle2, Monitor, Palette, Sparkles } from "lucide-react";
import { getSiteSettings } from "@/services";
import type { SiteSettings } from "@/types";

export interface AboutSectionProps {
  siteSettings?: SiteSettings | null;
}

export function AboutSection({ siteSettings: initialSettings }: AboutSectionProps = {}) {
  const [settings, setSettings] = React.useState<SiteSettings | null>(initialSettings || null);
  const [imageError, setImageError] = React.useState(false);

  React.useEffect(() => {
    if (!initialSettings) {
      getSiteSettings().then((data) => {
        if (data) setSettings(data);
      });
    }
  }, [initialSettings]);

  const profileImage = settings?.personalInfo?.profileImage?.trim() || "";

  return (
    <section id="about" className="py-20 sm:py-28 border-t border-[var(--border)] bg-[var(--surface-subtle)]/50">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Left Column: Visual Highlight Card with Dynamic Profile Image */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass rounded-3xl p-6 sm:p-8 border border-[var(--border)] shadow-xl relative overflow-hidden space-y-6">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-[var(--primary)]/10 blur-2xl pointer-events-none" />

              {/* Profile Image Display when configured */}
              {profileImage && !imageError && (
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-lg group">
                  <Image
                    src={profileImage}
                    alt="Mehedi Hasan - WordPress & Frontend Developer"
                    fill
                    sizes="(max-width: 1024px) 100vw, 440px"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    onError={() => setImageError(true)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080B14]/85 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#080B14]/85 text-white backdrop-blur-md border border-white/15 shadow-sm">
                      Mehedi Hasan
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono text-[var(--secondary)] bg-[#080B14]/85 backdrop-blur-md border border-[var(--secondary)]/30 shadow-sm">
                      3+ Yrs Exp
                    </span>
                  </div>
                </div>
              )}

              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--primary)] font-semibold">
                  Profile Spotlight
                </span>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  Crafting Websites with Precision &amp; Purpose
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                  Based in Bangladesh, I partner with businesses, agencies, and entrepreneurs worldwide
                  to build robust, responsive websites that load fast and convert visitors into loyal customers.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-[var(--border)] text-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-[var(--primary)] shrink-0" />
                  <span className="text-[var(--foreground)]">3+ Years of Professional Web Experience</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-[var(--primary)] shrink-0" />
                  <span className="text-[var(--foreground)]">80+ Successfully Delivered WordPress Projects</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-[var(--primary)] shrink-0" />
                  <span className="text-[var(--foreground)]">Expertise in Custom Themes, Elementor &amp; WooCommerce</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-[var(--primary)] shrink-0" />
                  <span className="text-[var(--foreground)]">Modern Frontend Architecture with React &amp; Next.js</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Bio and Core Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--primary)]">
              <Sparkles className="h-3 w-3" />
              About Mehedi Hasan
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-[var(--foreground)]">
              Bridging Creative Design &amp; Technical Execution
            </h2>

            <p className="text-base leading-relaxed text-[var(--muted)]">
              My core focus is delivering seamless, responsive, and performance-optimized websites. Over
              the past three years, I have specialized in WordPress development—delivering over 80
              projects encompassing custom Elementor layouts, WooCommerce stores, and dynamic content
              structures with Crocoblock.
            </p>

            <p className="text-base leading-relaxed text-[var(--muted)]">
              Alongside WordPress mastery, I actively develop modern frontend applications using React,
              Next.js, TypeScript, and Tailwind CSS. This combined background allows me to select the
              right tool for each project, ensuring clean code, intuitive user interfaces, and reliable
              long-term maintainability.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-all hover:border-[var(--primary)]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-[var(--primary)] mb-3">
                  <Palette className="h-5 w-5" />
                </div>
                <h4 className="text-base font-bold text-[var(--foreground)]">Design-Minded Engineering</h4>
                <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
                  Careful attention to typography, spacing, subtle interactions, and cross-browser consistency.
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-all hover:border-[var(--secondary)]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-[var(--secondary)] mb-3">
                  <Monitor className="h-5 w-5" />
                </div>
                <h4 className="text-base font-bold text-[var(--foreground)]">Responsive &amp; Accessible</h4>
                <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
                  Mobile-first layouts tested across screen sizes, optimized for fast rendering and accessibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
