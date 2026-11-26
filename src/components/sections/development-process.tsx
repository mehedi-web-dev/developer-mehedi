"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  Compass,
  BarChart3,
  ClipboardList,
  Code2,
  CheckCircle2,
  Send,
  Rocket,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: "primary" | "secondary";
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Requirements & Discovery",
    description:
      "Understand project requirements, business goals, target audience, and client expectations.",
    icon: Compass,
    accentColor: "primary",
  },
  {
    step: "02",
    title: "Research & Analysis",
    description:
      "Analyze competitors and review on-page and technical SEO requirements.",
    icon: BarChart3,
    accentColor: "secondary",
  },
  {
    step: "03",
    title: "Planning & Proposal",
    description:
      "Prepare a customized project plan, define the scope, and provide a clear quotation.",
    icon: ClipboardList,
    accentColor: "primary",
  },
  {
    step: "04",
    title: "Design & Development",
    description:
      "Create the website design and develop the agreed functionality.",
    icon: Code2,
    accentColor: "secondary",
  },
  {
    step: "05",
    title: "Revisions & Quality Check",
    description:
      "Apply requested revisions and test responsiveness, performance, usability, and functionality.",
    icon: CheckCircle2,
    accentColor: "primary",
  },
  {
    step: "06",
    title: "Final Delivery",
    description:
      "Complete the final quality review and deliver the finished website to the client.",
    icon: Send,
    accentColor: "secondary",
  },
];

export function DevelopmentProcessSection() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking across the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 80%"],
  });

  // Animated rocket vertical progression along the connecting path
  const rocketTop = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["100%", "100%"] : ["0%", "100%"]
  );

  // Subtle rocket tilt based on scroll progress
  const rocketRotate = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    shouldReduceMotion ? [0, 0, 0, 0, 0, 0] : [0, 18, -14, 18, -14, 0]
  );

  // SVG path drawing progression
  const pathLength = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [0.08, 1]
  );

  return (
    <section id="process" className="py-20 sm:py-28 border-t border-[var(--border)] relative overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto space-y-3 mb-16 sm:mb-24"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-1 text-xs font-medium text-[var(--primary)] shadow-xs">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Workflow &amp; Methodology</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-[var(--foreground)]">
            My Development Process
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-[var(--muted)]">
            From the first conversation to the final launch, every step is carefully planned and executed.
          </p>
        </motion.div>

        {/* Timeline Stage */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          {/* Central Connecting SVG Guideline (Dotted Curved Path) */}
          <div className="absolute left-6 sm:left-8 lg:left-1/2 -translate-x-1/2 top-4 bottom-8 w-6 h-[calc(100%-2rem)] pointer-events-none flex justify-center">
            {/* Background Static Dotted Track */}
            <div className="h-full w-0.5 border-l-2 border-dashed border-[var(--border)]" />

            {/* Dynamic Animated Gradient Line */}
            <svg
              className="absolute inset-0 h-full w-full overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="process-line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="var(--secondary)" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="1" />
                </linearGradient>
              </defs>
              <motion.line
                x1="12"
                y1="0"
                x2="12"
                y2="100%"
                stroke="url(#process-line-gradient)"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                style={{ pathLength }}
              />
            </svg>

            {/* Animated Rocket Traveling along the Timeline */}
            <motion.div
              style={{
                top: rocketTop,
                rotate: rocketRotate,
              }}
              className="absolute -translate-y-1/2 z-30 flex items-center justify-center will-change-transform"
            >
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[var(--primary)] via-violet-600 to-[var(--secondary)] text-white shadow-lg shadow-[var(--primary)]/40 border-2 border-white/40">
                <Rocket className="h-5 w-5 transform -rotate-45" />
                {/* Ambient propulsion glow */}
                <span className="absolute -bottom-1 h-3 w-3 rounded-full bg-cyan-400 blur-xs opacity-75 animate-ping" />
              </div>
            </motion.div>
          </div>

          {/* Timeline Steps Stack */}
          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={step.step}
                  className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
                >
                  {/* Left Column (Desktop) */}
                  <div
                    className={cn(
                      "pl-14 sm:pl-16 lg:pl-0 lg:col-span-5",
                      isEven ? "lg:text-right" : "lg:order-3 lg:text-left"
                    )}
                  >
                    <motion.div
                      initial={{
                        opacity: 0,
                        x: shouldReduceMotion ? 0 : isEven ? -30 : 30,
                        y: shouldReduceMotion ? 0 : 20,
                        scale: 0.98,
                      }}
                      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                      className="glass rounded-3xl p-6 sm:p-8 border border-[var(--border)] shadow-md hover:border-[var(--primary)]/60 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative group overflow-hidden"
                    >
                      {/* Subtle Ambient Corner Aura */}
                      <div
                        className={cn(
                          "absolute top-0 -mt-12 h-36 w-36 rounded-full blur-2xl pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity",
                          isEven
                            ? "right-0 -mr-12 bg-[var(--primary)]"
                            : "left-0 -ml-12 bg-[var(--secondary)]"
                        )}
                      />

                      <div
                        className={cn(
                          "flex items-center gap-3 mb-4",
                          isEven ? "lg:flex-row-reverse" : "flex-row"
                        )}
                      >
                        <span className="inline-flex items-center rounded-full bg-[var(--surface-subtle)] border border-[var(--border)] px-3 py-1 font-mono text-xs font-bold text-[var(--primary)] shadow-xs">
                          Step {step.step}
                        </span>

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[var(--primary)]/10 to-[var(--secondary)]/10 text-[var(--primary)] group-hover:scale-105 transition-transform duration-200">
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>

                      <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                        {step.title}
                      </h3>

                      <p className="mt-2.5 text-sm leading-relaxed text-[var(--muted)]">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Center Node Marker (Desktop & Mobile) */}
                  <div className="absolute left-6 sm:left-8 lg:static lg:left-auto lg:col-span-2 lg:order-2 flex justify-center -translate-x-1/2 lg:translate-x-0">
                    <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border-2 border-[var(--primary)] bg-[var(--surface)] text-[var(--foreground)] shadow-md shadow-[var(--primary)]/20 z-10 transition-transform duration-200 hover:scale-110">
                      <span className="font-mono text-[11px] font-bold">
                        {step.step}
                      </span>
                    </div>
                  </div>

                  {/* Empty Spacer Column for Zigzag layout (Desktop) */}
                  <div
                    className={cn(
                      "hidden lg:block lg:col-span-5",
                      isEven ? "lg:order-3" : "lg:order-1"
                    )}
                    aria-hidden="true"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
