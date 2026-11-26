"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Layers,
  Code2,
  Terminal,
  Zap,
  Download,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { getSiteSettings } from "@/services";
import type { SiteSettings } from "@/types";

export interface HeroSectionProps {
  siteSettings?: SiteSettings | null;
}

export function HeroSection({ siteSettings: initialSettings }: HeroSectionProps = {}) {
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
  const resumeUrl = settings?.personalInfo?.resumeUrl?.trim() || "";
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 lg:pt-28 lg:pb-36"
    >
      {/* Background ambient glowing orbs */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[var(--primary)]/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-[var(--secondary)]/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-custom relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Introduction & Pitch */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-start lg:col-span-7"
          >
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-subtle)] px-3.5 py-1.5 text-xs font-medium text-[var(--foreground)] shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>Available for Freelance &amp; Contract Projects</span>
            </div>

            {/* Introduction greeting */}
            <p className="mt-6 font-mono text-sm font-semibold tracking-wider text-[var(--primary)] uppercase">
              Hello, I&apos;m Mehedi Hasan
            </p>

            {/* Main Headline */}
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-6xl text-[var(--foreground)] leading-[1.1]">
              I Build Modern Websites &amp;{" "}
              <span className="bg-gradient-to-r from-[var(--primary)] via-violet-500 to-[var(--secondary)] bg-clip-text text-transparent">
                Digital Experiences
              </span>
              .
            </h1>

            {/* Supporting description */}
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              WordPress and Frontend Developer specializing in Elementor, React, and Next.js. I
              craft responsive, high-performing digital experiences designed for speed, usability,
              and real business results.
            </p>

            {/* Call To Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/25 transition-all hover:bg-[var(--primary-hover)] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
              >
                Let&apos;s Work Together
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-3.5 text-sm font-semibold text-[var(--foreground)] transition-all hover:border-[var(--primary)] hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
              >
                Explore My Work
              </Link>
              {resumeUrl ? (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={resumeUrl.endsWith(".pdf") ? "Mehedi-Hasan-Resume.pdf" : undefined}
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-3.5 text-sm font-semibold text-[var(--foreground)] transition-all hover:border-[var(--secondary)] hover:text-[var(--secondary)] hover:bg-[var(--surface-hover)] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--secondary)]"
                  aria-label="Download Mehedi Hasan's Resume (PDF)"
                >
                  <Download className="h-4 w-4 text-[var(--secondary)]" />
                  <span>Download Resume</span>
                </a>
              ) : null}
            </div>

            {/* Social Links & Trust Indicators */}
            <div className="mt-8 flex items-center gap-4 pt-4 border-t border-[var(--border)] w-full max-w-lg">
              <span className="text-xs font-medium text-[var(--muted)]">Connect directly:</span>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/mehedi-web-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition-all hover:border-[var(--primary)] hover:text-[var(--primary)]"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mehedi-hasan-dev81/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition-all hover:border-[var(--primary)] hover:text-[var(--primary)]"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Experience & Stats Summary */}
            <div className="mt-10 grid grid-cols-3 gap-6 sm:gap-8 w-full max-w-lg">
              <div>
                <p className="font-sans text-3xl font-extrabold text-[var(--foreground)]">3+</p>
                <p className="mt-1 text-xs text-[var(--muted)]">Years of Experience</p>
              </div>
              <div>
                <p className="font-sans text-3xl font-extrabold text-[var(--primary)]">80+</p>
                <p className="mt-1 text-xs text-[var(--muted)]">Completed Projects</p>
              </div>
              <div>
                <p className="font-sans text-3xl font-extrabold text-[var(--secondary)]">100%</p>
                <p className="mt-1 text-xs text-[var(--muted)]">Client Commitment</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive 3D-Inspired Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative flex items-center justify-center lg:col-span-5"
          >
            {/* Visual Glass Display Stage */}
            <div className="relative flex h-[380px] w-full max-w-[380px] items-center justify-center sm:h-[440px] sm:max-w-[440px]">
              {/* Concentric subtle gradient rings */}
              <div className="absolute inset-0 rounded-full border border-[var(--border)] border-dashed animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-8 rounded-full border border-[var(--primary)]/20" />
              <div className="absolute inset-16 rounded-full border border-[var(--secondary)]/20 animate-[pulse_4s_ease-in-out_infinite]" />

              {/* Central Profile Image or Monogram Fallback */}
              {profileImage && !imageError ? (
                <div className="relative group">
                  {/* Subtle ambient gradient aura behind the image */}
                  <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[var(--primary)] via-violet-600 to-[var(--secondary)] opacity-35 blur-xl group-hover:opacity-60 transition-opacity duration-500" />

                  {/* Outer Framed Glass Container */}
                  <div className="glass relative h-56 w-56 sm:h-64 sm:w-64 rounded-3xl p-2 border-2 border-white/15 shadow-2xl overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
                    <div className="relative h-full w-full rounded-2xl overflow-hidden bg-[var(--surface)]">
                      <Image
                        src={profileImage}
                        alt="Mehedi Hasan - WordPress & Frontend Developer"
                        fill
                        sizes="(max-width: 640px) 224px, 256px"
                        priority
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        onError={() => setImageError(true)}
                      />
                      {/* Subtle bottom gradient shadow */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080B14]/85 via-transparent to-transparent pointer-events-none" />

                      {/* Bottom Name Badge */}
                      <div className="absolute bottom-2.5 inset-x-2.5 text-center">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-[#080B14]/85 text-white backdrop-blur-md border border-white/15 shadow-md">
                          Mehedi Hasan &bull; Developer
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Central Premium Monogram Badge (Graceful Fallback) */
                <div className="glass relative flex h-48 w-48 flex-col items-center justify-center rounded-3xl p-6 shadow-2xl glow-primary">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] text-white shadow-lg shadow-[var(--primary)]/30">
                    <Code2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-3 text-lg font-bold tracking-tight text-[var(--foreground)]">
                    Mehedi Hasan
                  </h3>
                  <p className="text-[11px] font-mono text-[var(--primary)] uppercase tracking-wider">
                    Developer
                  </p>
                </div>
              )}

              {/* Floating Technology Cards */}
              <div className="absolute -top-4 -left-2 glass flex items-center gap-2 rounded-xl p-3 shadow-md animate-bounce [animation-duration:6s]">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                  <Layers className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-bold text-[var(--foreground)]">WordPress</span>
                  <span className="block text-[10px] text-[var(--muted)]">Customization &amp; Elementor</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-2 glass flex items-center gap-2 rounded-xl p-3 shadow-md animate-bounce [animation-duration:5s]">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-[var(--secondary)]">
                  <Zap className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-bold text-[var(--foreground)]">React &amp; Next.js</span>
                  <span className="block text-[10px] text-[var(--muted)]">Modern Web Apps</span>
                </div>
              </div>

              <div className="absolute top-1/2 -right-6 glass flex items-center gap-2 rounded-xl p-2.5 shadow-md hidden sm:flex">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-purple-500/10 text-[var(--primary)]">
                  <Terminal className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-medium text-[var(--foreground)]">Tailwind CSS</span>
              </div>

              <div className="absolute top-12 -left-6 glass flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-mono text-[var(--muted)] shadow-sm hidden sm:flex">
                <Sparkles className="h-3 w-3 text-amber-400" />
                80+ Projects Delivered
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
