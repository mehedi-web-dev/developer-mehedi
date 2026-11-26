"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
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

interface SkillItem {
  name: string;
  level: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface SkillCategory {
  id: string;
  title: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: "primary" | "secondary";
  skills: SkillItem[];
}

const WORDPRESS_CATEGORY: SkillCategory = {
  id: "wordpress",
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
};

const FRONTEND_CATEGORY: SkillCategory = {
  id: "frontend",
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
};

const BACKEND_CATEGORY: SkillCategory = {
  id: "backend",
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
};

const cardMotionVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto space-y-3 mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-1 text-xs font-medium text-[var(--primary)] shadow-xs">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-[var(--foreground)]">
            My Technical Toolkit
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[var(--muted)]">
            A specialized skillset combining bespoke WordPress engineering with modern React
            and Next.js application development.
          </p>
        </motion.div>

        {/* Two-Column Side-by-Side Content Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Card 1 (Left): WordPress Ecosystem & Backend Foundations */}
          <motion.div
            variants={cardMotionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="glass rounded-3xl p-6 sm:p-8 lg:p-10 border border-[var(--border)] shadow-xl relative overflow-hidden space-y-8 hover:border-[var(--primary)]/40 transition-colors duration-300"
          >
            {/* Ambient Corner Aura */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-[var(--primary)]/10 blur-2xl pointer-events-none" />

            {/* Part A: WordPress Ecosystem */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-[var(--primary)] shadow-sm">
                  <WORDPRESS_CATEGORY.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                    {WORDPRESS_CATEGORY.title}
                  </h3>
                  <p className="font-mono text-xs text-[var(--primary)]">
                    {WORDPRESS_CATEGORY.tagline}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-5">
                {WORDPRESS_CATEGORY.skills.map((skill) => {
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

            {/* Part B: Backend & Database Foundations */}
            <div className="pt-6 border-t border-[var(--border)]">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-[var(--primary)] shadow-sm">
                  <BACKEND_CATEGORY.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--foreground)]">
                    {BACKEND_CATEGORY.title}
                  </h3>
                  <p className="font-mono text-xs text-[var(--muted)]">
                    {BACKEND_CATEGORY.tagline}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                {BACKEND_CATEGORY.skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={skill.name}
                      className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3.5 transition-all duration-300 hover:border-[var(--primary)] hover:-translate-y-1 hover:shadow-md hover:shadow-[var(--primary)]/10"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--surface-subtle)] text-[var(--primary)]">
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <span className="rounded-full bg-[var(--surface-subtle)] px-1.5 py-0.5 text-[9px] font-mono font-medium text-[var(--muted)]">
                          {skill.level}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                        {skill.name}
                      </h4>
                      <p className="mt-1 text-[10px] leading-relaxed text-[var(--muted)]">
                        {skill.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Card 2 (Right): Modern Frontend Engineering */}
          <motion.div
            variants={cardMotionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="glass rounded-3xl p-6 sm:p-8 lg:p-10 border border-[var(--border)] shadow-xl relative overflow-hidden space-y-6 hover:border-[var(--secondary)]/40 transition-colors duration-300"
          >
            {/* Ambient Corner Aura */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-[var(--secondary)]/10 blur-2xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-[var(--secondary)] shadow-sm">
                <FRONTEND_CATEGORY.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  {FRONTEND_CATEGORY.title}
                </h3>
                <p className="font-mono text-xs text-[var(--secondary)]">
                  {FRONTEND_CATEGORY.tagline}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {FRONTEND_CATEGORY.skills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-all duration-300 hover:border-[var(--secondary)] hover:-translate-y-1 hover:shadow-md hover:shadow-[var(--secondary)]/10"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--surface-subtle)] text-[var(--secondary)] transition-transform duration-200 group-hover:scale-110">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="rounded-full bg-[var(--surface-subtle)] px-2 py-0.5 text-[10px] font-mono font-medium text-[var(--muted)]">
                        {skill.level}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[var(--foreground)] group-hover:text-[var(--secondary)] transition-colors">
                      {skill.name}
                    </h4>
                    <p className="mt-1 text-[11px] leading-relaxed text-[var(--muted)]">
                      {skill.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Scroll-Triggered Highlight Section (Video-Inspired Trophy Banner) */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-16 sm:mt-24 relative overflow-hidden rounded-3xl border border-[var(--primary)]/30 bg-gradient-to-br from-[#0c1222] via-[#10182f] to-[#080d1a] p-8 sm:p-12 lg:p-16 shadow-2xl text-center"
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
