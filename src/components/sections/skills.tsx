"use client";

import * as React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import {
  Layers,
  Globe,
  ShoppingCart,
  Boxes,
  Code,
  FileCode,
  Atom,
  Server,
  Database,
  Cpu,
  Sparkles,
  Zap,
  Trophy,
  CheckCircle2,
  Calendar,
  HeartHandshake,
} from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { cn } from "@/lib/utils";

interface SkillItem {
  name: string;
  level: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface SkillCategory {
  id: string;
  number: string;
  title: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: "primary" | "secondary";
  skills: SkillItem[];
}

const CATEGORIES: SkillCategory[] = [
  {
    id: "wordpress",
    number: "01",
    title: "WordPress Ecosystem",
    tagline: "Core Specialization & Production Experience",
    icon: Globe,
    accentColor: "primary",
    skills: [
      {
        name: "WordPress Core & Architecture",
        level: "Advanced",
        icon: Globe,
        description: "Custom themes, plugin setup, site architecture, and speed optimization.",
      },
      {
        name: "Elementor Pro",
        level: "Advanced",
        icon: Layers,
        description: "Pixel-perfect visual design, theme builder templates, and responsive layouts.",
      },
      {
        name: "WooCommerce",
        level: "Proficient",
        icon: ShoppingCart,
        description: "E-commerce store setup, product filtering, payment gateways, and checkout flows.",
      },
      {
        name: "Crocoblock & JetEngine",
        level: "Proficient",
        icon: Boxes,
        description: "Custom post types, dynamic listings, relations, and advanced filters.",
      },
    ],
  },
  {
    id: "frontend",
    number: "02",
    title: "Frontend Engineering",
    tagline: "Modern JavaScript & Component Architecture",
    icon: Zap,
    accentColor: "secondary",
    skills: [
      {
        name: "React 19",
        level: "Advanced",
        icon: Atom,
        description: "Functional components, custom hooks, state management, and modern patterns.",
      },
      {
        name: "Next.js (App Router)",
        level: "Advanced",
        icon: Zap,
        description: "Server Components (RSC), SSR, SEO optimization, and metadata architecture.",
      },
      {
        name: "Tailwind CSS v4",
        level: "Advanced",
        icon: Sparkles,
        description: "Utility-first responsive layouts, custom themes, dark mode, and micro-interactions.",
      },
      {
        name: "TypeScript",
        level: "Proficient",
        icon: Cpu,
        description: "Type safety, interfaces, strict compiler options, and generic utilities.",
      },
      {
        name: "Modern JavaScript (ES6+)",
        level: "Advanced",
        icon: FileCode,
        description: "Asynchronous programming, DOM manipulation, browser APIs, and clean syntax.",
      },
      {
        name: "Semantic HTML5 & CSS3",
        level: "Advanced",
        icon: Code,
        description: "Accessible markup, modern flexbox/grid layouts, and cross-browser consistency.",
      },
    ],
  },
  {
    id: "backend",
    number: "03",
    title: "Backend & Database Foundations",
    tagline: "Server Architecture & Data Layer",
    icon: Server,
    accentColor: "primary",
    skills: [
      {
        name: "Node.js",
        level: "Foundational",
        icon: Server,
        description: "JavaScript runtime, asynchronous I/O, server scripts, and npm tooling.",
      },
      {
        name: "Express.js",
        level: "Foundational",
        icon: Code,
        description: "RESTful API routes, middleware architecture, CORS, and request validation.",
      },
      {
        name: "MongoDB & Mongoose",
        level: "Foundational",
        icon: Database,
        description: "NoSQL document models, schemas, indexes, and queries.",
      },
    ],
  },
];

const TOTAL_CATEGORIES = CATEGORIES.length;

export function SkillsSection() {
  const scrollTrackRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Monitor scroll progress across the dedicated sticky height track
  const { scrollYProgress } = useScroll({
    target: scrollTrackRef,
    offset: ["start start", "end end"],
  });

  // Track the active card index from scroll position
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (progress < 0.27) {
      setActiveIndex(0);
    } else if (progress < 0.63) {
      setActiveIndex(1);
    } else {
      setActiveIndex(2);
    }
  });

  // Card 0 (WordPress) animations
  const card0Opacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.32, 1],
    shouldReduceMotion ? [1, 1, 0, 0] : [1, 1, 0, 0]
  );
  const card0Y = useTransform(
    scrollYProgress,
    [0, 0.22, 0.32, 1],
    shouldReduceMotion ? [0, 0, 0, 0] : [0, 0, -32, -32]
  );
  const card0Scale = useTransform(
    scrollYProgress,
    [0, 0.22, 0.32, 1],
    shouldReduceMotion ? [1, 1, 1, 1] : [1, 1, 0.96, 0.96]
  );

  // Card 1 (Frontend) animations
  const card1Opacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.32, 0.58, 0.68, 1],
    shouldReduceMotion ? [0, 0, 1, 1, 0, 0] : [0, 0, 1, 1, 0, 0]
  );
  const card1Y = useTransform(
    scrollYProgress,
    [0, 0.22, 0.32, 0.58, 0.68, 1],
    shouldReduceMotion ? [0, 0, 0, 0, 0, 0] : [32, 32, 0, 0, -32, -32]
  );
  const card1Scale = useTransform(
    scrollYProgress,
    [0, 0.22, 0.32, 0.58, 0.68, 1],
    shouldReduceMotion ? [1, 1, 1, 1, 1, 1] : [0.96, 0.96, 1, 1, 0.96, 0.96]
  );

  // Card 2 (Backend) animations
  const card2Opacity = useTransform(
    scrollYProgress,
    [0, 0.58, 0.68, 1],
    shouldReduceMotion ? [0, 0, 1, 1] : [0, 0, 1, 1]
  );
  const card2Y = useTransform(
    scrollYProgress,
    [0, 0.58, 0.68, 1],
    shouldReduceMotion ? [0, 0, 0, 0] : [32, 32, 0, 0]
  );
  const card2Scale = useTransform(
    scrollYProgress,
    [0, 0.58, 0.68, 1],
    shouldReduceMotion ? [1, 1, 1, 1] : [0.96, 0.96, 1, 1]
  );

  return (
    <section id="skills" className="relative">
      {/* Scroll-Driven Sticky Card Track */}
      <div
        ref={scrollTrackRef}
        className="relative h-[280vh] sm:h-[300vh]"
      >
        {/* Sticky Viewport Stage */}
        <div className="sticky top-16 sm:top-20 z-10 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] max-h-[820px] flex flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="container-custom max-w-4xl mx-auto w-full">
            {/* Section Header & Sticky Progress Indicator */}
            <div className="mb-6 sm:mb-8 text-center space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-1 text-xs font-medium text-[var(--primary)] shadow-xs">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Technical Capabilities</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-[var(--foreground)]">
                My Technical Toolkit
              </h2>
              <p className="text-xs sm:text-sm text-[var(--muted)] max-w-md mx-auto">
                Scroll down to explore core specializations one category at a time.
              </p>

              {/* Progress Indicator (01/03) */}
              <div className="pt-2 flex items-center justify-center gap-3">
                <span className="font-mono text-xs font-bold text-[var(--foreground)] tracking-wider">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(TOTAL_CATEGORIES).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  {CATEGORIES.map((_, idx) => (
                    <span
                      key={idx}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        idx === activeIndex
                          ? "w-7 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]"
                          : "w-1.5 bg-[var(--border)]"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Central Sticky Card Presentation Stage */}
            <div className="relative w-full min-h-[360px] sm:min-h-[400px] lg:min-h-[420px]">
              {/* Card 0: WordPress Ecosystem */}
              <motion.div
                style={{
                  opacity: card0Opacity,
                  y: card0Y,
                  scale: card0Scale,
                  pointerEvents: activeIndex === 0 ? "auto" : "none",
                }}
                aria-hidden={activeIndex !== 0}
                className="absolute inset-0 glass rounded-3xl p-6 sm:p-8 lg:p-10 border border-[var(--border)] shadow-2xl overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-[var(--primary)]/10 blur-2xl pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-[var(--border)]">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-[var(--primary)] shadow-sm">
                        <Globe className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                          {CATEGORIES[0].title}
                        </h3>
                        <p className="font-mono text-xs text-[var(--primary)]">
                          {CATEGORIES[0].tagline}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[var(--surface-subtle)] px-3 py-1 font-mono text-xs font-bold text-[var(--primary)] border border-[var(--border)]">
                      01 / 03
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {CATEGORIES[0].skills.map((skill) => {
                      const Icon = skill.icon;
                      return (
                        <div
                          key={skill.name}
                          className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-all duration-300 hover:border-[var(--primary)] hover:-translate-y-1 hover:shadow-md hover:shadow-[var(--primary)]/10"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--surface-subtle)] text-[var(--primary)] transition-transform duration-200 group-hover:scale-110">
                              <Icon className="h-4 w-4" />
                            </div>
                            <span className="rounded-full bg-[var(--surface-subtle)] px-2 py-0.5 text-[10px] font-mono font-medium text-[var(--muted)]">
                              {skill.level}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                            {skill.name}
                          </h4>
                          <p className="mt-1 text-[11px] leading-relaxed text-[var(--muted)]">
                            {skill.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--muted)]">
                  <span>80+ Completed WordPress Client Websites</span>
                  <span className="font-mono text-[11px] text-[var(--primary)]">Scroll down for next card &darr;</span>
                </div>
              </motion.div>

              {/* Card 1: Frontend Engineering */}
              <motion.div
                style={{
                  opacity: card1Opacity,
                  y: card1Y,
                  scale: card1Scale,
                  pointerEvents: activeIndex === 1 ? "auto" : "none",
                }}
                aria-hidden={activeIndex !== 1}
                className="absolute inset-0 glass rounded-3xl p-6 sm:p-8 lg:p-10 border border-[var(--border)] shadow-2xl overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-[var(--secondary)]/10 blur-2xl pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border)]">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-[var(--secondary)] shadow-sm">
                        <Zap className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                          {CATEGORIES[1].title}
                        </h3>
                        <p className="font-mono text-xs text-[var(--secondary)]">
                          {CATEGORIES[1].tagline}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[var(--surface-subtle)] px-3 py-1 font-mono text-xs font-bold text-[var(--secondary)] border border-[var(--border)]">
                      02 / 03
                    </span>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {CATEGORIES[1].skills.map((skill) => {
                      const Icon = skill.icon;
                      return (
                        <div
                          key={skill.name}
                          className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 sm:p-3.5 transition-all duration-300 hover:border-[var(--secondary)] hover:-translate-y-1 hover:shadow-md hover:shadow-[var(--secondary)]/10"
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--surface-subtle)] text-[var(--secondary)] transition-transform duration-200 group-hover:scale-110">
                              <Icon className="h-3.5 w-3.5" />
                            </div>
                            <span className="rounded-full bg-[var(--surface-subtle)] px-1.5 py-0.5 text-[9px] font-mono font-medium text-[var(--muted)]">
                              {skill.level}
                            </span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-[var(--foreground)] group-hover:text-[var(--secondary)] transition-colors">
                            {skill.name}
                          </h4>
                          <p className="mt-1 text-[10px] leading-relaxed text-[var(--muted)] line-clamp-2">
                            {skill.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--muted)]">
                  <span>Component-Driven React 19 &amp; Next.js App Router</span>
                  <span className="font-mono text-[11px] text-[var(--secondary)]">Scroll down for next card &darr;</span>
                </div>
              </motion.div>

              {/* Card 2: Backend & Database Foundations */}
              <motion.div
                style={{
                  opacity: card2Opacity,
                  y: card2Y,
                  scale: card2Scale,
                  pointerEvents: activeIndex === 2 ? "auto" : "none",
                }}
                aria-hidden={activeIndex !== 2}
                className="absolute inset-0 glass rounded-3xl p-6 sm:p-8 lg:p-10 border border-[var(--border)] shadow-2xl overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-[var(--primary)]/10 blur-2xl pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-[var(--border)]">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-[var(--primary)] shadow-sm">
                        <Server className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                          {CATEGORIES[2].title}
                        </h3>
                        <p className="font-mono text-xs text-[var(--primary)]">
                          {CATEGORIES[2].tagline}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[var(--surface-subtle)] px-3 py-1 font-mono text-xs font-bold text-[var(--primary)] border border-[var(--border)]">
                      03 / 03
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {CATEGORIES[2].skills.map((skill) => {
                      const Icon = skill.icon;
                      return (
                        <div
                          key={skill.name}
                          className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-all duration-300 hover:border-[var(--primary)] hover:-translate-y-1 hover:shadow-md hover:shadow-[var(--primary)]/10 flex flex-col justify-between min-h-[170px]"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--surface-subtle)] text-[var(--primary)] transition-transform duration-200 group-hover:scale-110">
                                <Icon className="h-4.5 w-4.5" />
                              </div>
                              <span className="rounded-full bg-[var(--surface-subtle)] px-2 py-0.5 text-[10px] font-mono font-medium text-[var(--muted)]">
                                {skill.level}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                              {skill.name}
                            </h4>
                          </div>
                          <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">
                            {skill.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--muted)]">
                  <span>Server-side Architecture, REST APIs &amp; NoSQL Data Modeling</span>
                  <span className="font-mono text-[11px] text-[var(--primary)]">Continue scrolling for achievements &darr;</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Following Section: Highlight Trophy Banner */}
      <div className="container-custom py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative overflow-hidden rounded-3xl border border-[var(--primary)]/30 bg-gradient-to-br from-[#0c1222] via-[#10182f] to-[#080d1a] p-8 sm:p-12 lg:p-16 shadow-2xl text-center"
        >
          {/* Ambient Lighting Orbs inside Banner */}
          <div
            className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-[var(--primary)]/20 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-[var(--secondary)]/20 blur-3xl"
            aria-hidden="true"
          />

          {/* Banner Header */}
          <div className="relative z-10 max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-3.5 py-1 text-xs font-semibold text-violet-300">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Proven Production Track Record</span>
            </div>

            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
              Delivering Excellence Across Every Project
            </h3>

            <p className="text-sm sm:text-base leading-relaxed text-slate-300 max-w-xl mx-auto">
              Combining 3+ years of specialized WordPress craftsmanship with modern React architecture
              to build responsive, fast-loading websites that drive business results.
            </p>
          </div>

          {/* Central Highlighted Trophy Card */}
          <div className="relative z-10 mt-10 max-w-xl mx-auto">
            <div className="relative rounded-3xl border-2 border-violet-500/50 bg-gradient-to-b from-violet-950/60 via-slate-900/80 to-[#080d1a]/95 p-8 sm:p-10 shadow-[0_0_60px_-15px_rgba(139,92,246,0.4)] backdrop-blur-xl">
              {/* Top Trophy Emblem */}
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-500 text-slate-950 shadow-lg shadow-amber-400/30 transform transition-transform duration-300 hover:scale-105">
                <Trophy className="h-8 w-8" />
              </div>

              {/* Large Animated Counter */}
              <div className="mt-5">
                <div className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight font-sans">
                  <AnimatedCounter to={80} suffix="+" duration={2.2} />
                </div>
                <h4 className="mt-2 text-lg sm:text-xl font-bold text-cyan-300">
                  WordPress Projects Successfully Delivered
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Over 80 custom client websites completed with precision—including Elementor Pro layouts,
                  WooCommerce online stores, and dynamic Crocoblock architectures.
                </p>
              </div>

              {/* Trust Pillars */}
              <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  Elementor Pro
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  WooCommerce
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  Custom Layouts
                </span>
              </div>
            </div>
          </div>

          {/* Supporting Metrics Row */}
          <div className="relative z-10 mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            {/* Metric 1 */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md text-left flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400 shrink-0">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="font-sans text-2xl font-bold text-white">
                  <AnimatedCounter to={3} suffix="+ Years" duration={1.6} />
                </p>
                <p className="text-xs text-slate-300">
                  Professional Web Experience &amp; Dedicated Training
                </p>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md text-left flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 shrink-0">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <div>
                <p className="font-sans text-2xl font-bold text-white">
                  <AnimatedCounter to={100} suffix="%" duration={2.0} />
                </p>
                <p className="text-xs text-slate-300">
                  Client Commitment, Clear Communication &amp; Quality
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
