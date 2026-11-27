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
} from "lucide-react";
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
        <div className="sticky top-14 sm:top-20 z-10 min-h-[calc(100dvh-3.5rem)] sm:min-h-[calc(100vh-5rem)] max-h-[860px] flex flex-col justify-center px-2.5 sm:px-6 lg:px-8 py-1 sm:py-6">
          <div className="w-full max-w-4xl mx-auto">
            {/* Section Header & Sticky Progress Indicator */}
            <div className="mb-1.5 xs:mb-2 sm:mb-5 lg:mb-8 text-center space-y-0.5 sm:space-y-2">
              <div className="hidden sm:inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-0.5 sm:px-3.5 sm:py-1 text-[11px] sm:text-xs font-medium text-[var(--primary)] shadow-xs">
                <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span>Technical Capabilities</span>
              </div>
              <h2 className="text-lg xs:text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
                My Technical Toolkit
              </h2>
              <p className="hidden xs:block text-[11px] sm:text-sm text-[var(--muted)] max-w-md mx-auto">
                Scroll down to explore core specializations one category at a time.
              </p>

              {/* Progress Indicator (01/03) */}
              <div className="pt-0.5 sm:pt-1.5 flex items-center justify-center gap-2 sm:gap-3">
                <span className="font-mono text-[10px] sm:text-xs font-bold text-[var(--foreground)] tracking-wider">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(TOTAL_CATEGORIES).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  {CATEGORIES.map((_, idx) => (
                    <span
                      key={idx}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        idx === activeIndex
                          ? "w-5 sm:w-7 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]"
                          : "w-1.5 bg-[var(--border)]"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Central Sticky Card Presentation Stage */}
            <div className="relative w-full min-h-[440px] xs:min-h-[460px] sm:min-h-[490px] lg:min-h-[430px] max-h-[calc(100dvh-6.5rem)] sm:max-h-none">
              {/* Card 0: WordPress Ecosystem */}
              <motion.div
                style={{
                  opacity: card0Opacity,
                  y: card0Y,
                  scale: card0Scale,
                  pointerEvents: activeIndex === 0 ? "auto" : "none",
                }}
                aria-hidden={activeIndex !== 0}
                className="absolute inset-0 glass rounded-2xl sm:rounded-3xl p-2.5 xs:p-3 sm:p-5 lg:p-8 border border-[var(--border)] shadow-2xl overflow-y-auto overflow-x-hidden sm:overflow-hidden flex flex-col justify-between scrollbar-none"
              >
                <div className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl pointer-events-none" aria-hidden="true">
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-[var(--primary)]/10 blur-2xl" />
                </div>

                <div>
                  <div className="flex items-center justify-between pb-1.5 sm:pb-3 mb-1.5 sm:mb-3.5 border-b border-[var(--border)] gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <div className="flex h-7 w-7 xs:h-8 xs:w-8 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-violet-500/10 text-[var(--primary)] shadow-sm">
                        <Globe className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm xs:text-base sm:text-2xl font-bold tracking-tight text-[var(--foreground)] leading-tight">
                          {CATEGORIES[0].title}
                        </h3>
                        <p className="font-mono text-[9px] xs:text-[10px] sm:text-xs text-[var(--primary)]">
                          {CATEGORIES[0].tagline}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full bg-[var(--surface-subtle)] px-2 py-0.5 sm:px-3 sm:py-1 font-mono text-[9px] sm:text-xs font-bold text-[var(--primary)] border border-[var(--border)]">
                      01 / 03
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 xs:gap-1.5 sm:gap-3">
                    {CATEGORIES[0].skills.map((skill) => {
                      const Icon = skill.icon;
                      return (
                        <div
                          key={skill.name}
                          className="group rounded-xl sm:rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-1.5 xs:p-2 sm:p-3.5 transition-all duration-300 hover:border-[var(--primary)] hover:-translate-y-0.5 hover:shadow-md hover:shadow-[var(--primary)]/10"
                        >
                          <div className="flex items-center justify-between mb-0.5 sm:mb-1.5 gap-1.5">
                            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                              <div className="flex h-5 w-5 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-subtle)] text-[var(--primary)] transition-transform duration-200 group-hover:scale-110">
                                <Icon className="h-2.5 w-2.5 sm:h-4 sm:w-4" />
                              </div>
                              <h4 className="text-xs sm:text-sm font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                                {skill.name}
                              </h4>
                            </div>
                            <span className="shrink-0 rounded-full bg-[var(--surface-subtle)] px-1.5 py-0.2 sm:px-2 sm:py-0.5 text-[8px] sm:text-[10px] font-mono font-medium text-[var(--muted)]">
                              {skill.level}
                            </span>
                          </div>
                          <p className="text-[9.5px] xs:text-[10px] sm:text-[11px] leading-tight sm:leading-relaxed text-[var(--muted)] line-clamp-2 sm:line-clamp-none">
                            {skill.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-1 sm:pt-3 mt-1 sm:mt-3 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-1 text-[9.5px] xs:text-[10px] sm:text-xs text-[var(--muted)]">
                  <span>80+ Completed WordPress Client Websites</span>
                  <span className="font-mono text-[9px] sm:text-[11px] text-[var(--primary)]">Scroll down for next card &darr;</span>
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
                className="absolute inset-0 glass rounded-2xl sm:rounded-3xl p-2.5 xs:p-3 sm:p-5 lg:p-8 border border-[var(--border)] shadow-2xl overflow-y-auto overflow-x-hidden sm:overflow-hidden flex flex-col justify-between scrollbar-none"
              >
                <div className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl pointer-events-none" aria-hidden="true">
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-[var(--secondary)]/10 blur-2xl" />
                </div>

                <div>
                  <div className="flex items-center justify-between pb-1.5 sm:pb-3 mb-1 sm:mb-3 border-b border-[var(--border)] gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <div className="flex h-7 w-7 xs:h-8 xs:w-8 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-cyan-500/10 text-[var(--secondary)] shadow-sm">
                        <Zap className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm xs:text-base sm:text-2xl font-bold tracking-tight text-[var(--foreground)] leading-tight">
                          {CATEGORIES[1].title}
                        </h3>
                        <p className="font-mono text-[9px] xs:text-[10px] sm:text-xs text-[var(--secondary)]">
                          {CATEGORIES[1].tagline}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full bg-[var(--surface-subtle)] px-2 py-0.5 sm:px-3 sm:py-1 font-mono text-[9px] sm:text-xs font-bold text-[var(--secondary)] border border-[var(--border)]">
                      02 / 03
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 xs:gap-1.5 sm:gap-2.5">
                    {CATEGORIES[1].skills.map((skill) => {
                      const Icon = skill.icon;
                      return (
                        <div
                          key={skill.name}
                          className="group rounded-xl sm:rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-1.5 xs:p-2 sm:p-3 transition-all duration-300 hover:border-[var(--secondary)] hover:-translate-y-0.5 hover:shadow-md hover:shadow-[var(--secondary)]/10"
                        >
                          <div className="flex items-center justify-between mb-0.5 gap-1.5">
                            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                              <div className="flex h-5 w-5 xs:h-6 xs:w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-md bg-[var(--surface-subtle)] text-[var(--secondary)] transition-transform duration-200 group-hover:scale-110">
                                <Icon className="h-2.5 w-2.5 xs:h-3 xs:w-3 sm:h-3.5 sm:w-3.5" />
                              </div>
                              <h4 className="text-xs sm:text-sm font-bold text-[var(--foreground)] group-hover:text-[var(--secondary)] transition-colors">
                                {skill.name}
                              </h4>
                            </div>
                            <span className="shrink-0 rounded-full bg-[var(--surface-subtle)] px-1.5 py-0.2 text-[8px] sm:text-[9px] font-mono font-medium text-[var(--muted)]">
                              {skill.level}
                            </span>
                          </div>
                          <p className="text-[9px] xs:text-[9.5px] sm:text-[11px] leading-tight text-[var(--muted)] line-clamp-1 sm:line-clamp-2">
                            {skill.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-1 sm:pt-2.5 mt-1 sm:mt-2.5 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-1 text-[9.5px] xs:text-[10px] sm:text-xs text-[var(--muted)]">
                  <span>Component-Driven React 19 &amp; Next.js App Router</span>
                  <span className="font-mono text-[9px] sm:text-[11px] text-[var(--secondary)]">Scroll down for next card &darr;</span>
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
                className="absolute inset-0 glass rounded-2xl sm:rounded-3xl p-2.5 xs:p-3 sm:p-5 lg:p-8 border border-[var(--border)] shadow-2xl overflow-y-auto overflow-x-hidden sm:overflow-hidden flex flex-col justify-between scrollbar-none"
              >
                <div className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl pointer-events-none" aria-hidden="true">
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-[var(--primary)]/10 blur-2xl" />
                </div>

                <div>
                  <div className="flex items-center justify-between pb-1.5 sm:pb-3 mb-1.5 sm:mb-3.5 border-b border-[var(--border)] gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <div className="flex h-7 w-7 xs:h-8 xs:w-8 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-violet-500/10 text-[var(--primary)] shadow-sm">
                        <Server className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm xs:text-base sm:text-2xl font-bold tracking-tight text-[var(--foreground)] leading-tight">
                          {CATEGORIES[2].title}
                        </h3>
                        <p className="font-mono text-[9px] xs:text-[10px] sm:text-xs text-[var(--primary)]">
                          {CATEGORIES[2].tagline}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full bg-[var(--surface-subtle)] px-2 py-0.5 sm:px-3 sm:py-1 font-mono text-[9px] sm:text-xs font-bold text-[var(--primary)] border border-[var(--border)]">
                      03 / 03
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 xs:gap-2 sm:gap-3 lg:gap-4">
                    {CATEGORIES[2].skills.map((skill, idx) => {
                      const Icon = skill.icon;
                      return (
                        <div
                          key={skill.name}
                          className={cn(
                            "group rounded-xl sm:rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-2 xs:p-2.5 sm:p-3.5 lg:p-5 transition-all duration-300 hover:border-[var(--primary)] hover:-translate-y-0.5 hover:shadow-md hover:shadow-[var(--primary)]/10 flex flex-col justify-between min-h-[85px] sm:min-h-[110px] lg:min-h-[140px]",
                            idx === 2 ? "sm:col-span-2 sm:max-w-md sm:mx-auto sm:w-full lg:col-span-1 lg:max-w-none" : ""
                          )}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1 sm:mb-2 gap-1.5">
                              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                                <div className="flex h-5 w-5 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-[var(--surface-subtle)] text-[var(--primary)] transition-transform duration-200 group-hover:scale-110">
                                  <Icon className="h-2.5 w-2.5 sm:h-4 sm:w-4" />
                                </div>
                                <h4 className="text-xs sm:text-sm font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                                  {skill.name}
                                </h4>
                              </div>
                              <span className="shrink-0 rounded-full bg-[var(--surface-subtle)] px-1.5 py-0.2 sm:px-2 sm:py-0.5 text-[8px] sm:text-[10px] font-mono font-medium text-[var(--muted)]">
                                {skill.level}
                              </span>
                            </div>
                          </div>
                          <p className="mt-0.5 sm:mt-1.5 text-[9px] xs:text-[10px] sm:text-xs leading-tight sm:leading-relaxed text-[var(--muted)] line-clamp-1 sm:line-clamp-none">
                            {skill.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-1 sm:pt-3 mt-1 sm:mt-3 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-1 text-[9.5px] xs:text-[10px] sm:text-xs text-[var(--muted)]">
                  <span>Server-side Architecture, REST APIs &amp; NoSQL Data Modeling</span>
                  <span className="font-mono text-[9px] sm:text-[11px] text-[var(--primary)]">Modern Web Standards &bull; Full-Stack</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
