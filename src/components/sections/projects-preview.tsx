"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ProjectItem } from "@/types";

export interface ProjectsPreviewSectionProps {
  initialProjects?: ProjectItem[] | null;
}

interface ProjectCardData {
  id: string;
  title: string;
  badge: string;
  subtitle: string;
  image: string;
  slug: string;
  technologies: string[];
  liveUrl?: string;
}

const FEATURED_STACK_PROJECTS: ProjectCardData[] = [
  {
    id: "1",
    title: "MeetMate AI",
    badge: "Web Design & SaaS",
    subtitle:
      "Bespoke design and full frontend development for an automated AI meeting intelligence platform, focused on enterprise conversion and interactive UI.",
    image: "https://framerusercontent.com/images/tbAYKmuCPrc8idgXtBNAyxXWA.png",
    slug: "meetmate-ai-saas",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://meetmate.ai",
  },
  {
    id: "2",
    title: "Rawink Tattoo",
    badge: "Branding & Custom Web",
    subtitle:
      "Raw Ink Tattoo, a creative and professional studio. Complete digital identity and dynamic portfolio showcase with artist profiles and instant booking.",
    image: "https://framerusercontent.com/images/odZb6sCBuXZLQUkegaYdvpoPck.png",
    slug: "rawink-creative-studio",
    technologies: ["WordPress", "Elementor Pro", "Custom CSS", "ACF Pro"],
    liveUrl: "https://rawink.nl",
  },
  {
    id: "3",
    title: "Gijs.nl",
    badge: "Web Design & E-Commerce",
    subtitle:
      "Elegant and functional website for a custom shutter and home maintenance specialist, engineered for uncompromising build quality and effortless usability.",
    image: "https://framerusercontent.com/images/8tYnYpe4DeBFntYlkXLzk8HvC9A.png",
    slug: "gijs-luxe-shutters",
    technologies: ["WooCommerce", "WordPress", "Custom Checkout", "Speed Optimization"],
    liveUrl: "https://gijs.nl",
  },
];

/**
 * Single Stacking Card with Scroll-linked Scaling
 */
function StackingProjectCard({
  project,
  index,
  total,
}: {
  project: ProjectCardData;
  index: number;
  total: number;
}) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  // Calculate top sticky offset so each card stacks cleanly with slight staggered header exposure
  const topOffset = 110 + index * 24;

  return (
    <div
      ref={cardRef}
      className="sticky w-full mb-12 sm:mb-16 last:mb-0"
      style={{
        top: `${topOffset}px`,
        zIndex: index + 1,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group relative w-full bg-[#141517] rounded-[28px] sm:rounded-[36px] border border-white/10 overflow-hidden shadow-2xl hover:border-[#c6ff00]/40 transition-all duration-300"
      >
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Project Media (Left 7 Columns) */}
              <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-zinc-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-5 left-5 z-10">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-xs font-semibold text-[#c6ff00] font-mono">
                    {project.badge}
                  </span>
                </div>
              </div>

              {/* Project Details (Right 5 Columns) */}
              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-gradient-to-br from-[#141517] to-[#111214]">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                      Case Study 0{index + 1}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-black group-hover:bg-[#c6ff00] transition-colors">
                      <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white mb-4 group-hover:text-[#c6ff00] transition-colors leading-tight">
                    {project.title}
                  </h3>

                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
                    {project.subtitle}
                  </p>
                </div>

                {/* Technologies Pills */}
                <div className="pt-6 border-t border-white/10">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/5 text-[11px] font-mono text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </a>
        ) : (
          <Link href="/#contact" className="block">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Project Media (Left 7 Columns) */}
              <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-zinc-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-5 left-5 z-10">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-xs font-semibold text-[#c6ff00] font-mono">
                    {project.badge}
                  </span>
                </div>
              </div>

              {/* Project Details (Right 5 Columns) */}
              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-gradient-to-br from-[#141517] to-[#111214]">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                      Case Study 0{index + 1}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-black group-hover:bg-[#c6ff00] transition-colors">
                      <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white mb-4 group-hover:text-[#c6ff00] transition-colors leading-tight">
                    {project.title}
                  </h3>

                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
                    {project.subtitle}
                  </p>
                </div>

                {/* Technologies Pills */}
                <div className="pt-6 border-t border-white/10">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/5 text-[11px] font-mono text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}
      </motion.div>
    </div>
  );
}

export function ProjectsPreviewSection({ initialProjects }: ProjectsPreviewSectionProps = {}) {
  const displayProjects =
    initialProjects && initialProjects.length > 0
      ? initialProjects.slice(0, 3).map((p, i) => ({
          id: p._id,
          title: p.title,
          badge: p.category || FEATUREFEAT_BADGE(i),
          subtitle: p.shortDescription || p.description || FEATURED_STACK_PROJECTS[i].subtitle,
          image: p.thumbnail || FEATURED_STACK_PROJECTS[i].image,
          slug: p.slug,
          technologies:
            Array.isArray(p.technologies) && p.technologies.length > 0
              ? p.technologies
              : FEATURED_STACK_PROJECTS[i].technologies,
        }))
      : FEATURED_STACK_PROJECTS;

  return (
    <section id="portfolio-preview" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-white/5">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-[#c6ff00] font-mono font-semibold block mb-2">
            Selected Works
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight mb-4">
            Featured Projects
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            These selected projects reflect my passion for combining strategy and creativity — solving real business challenges through purposeful design and clean code.
          </p>
        </div>
        <Link
          href="/#contact"
          className="px-7 py-3 rounded-full bg-[#c6ff00] hover:bg-[#d4ff33] text-black font-semibold text-xs uppercase tracking-wider transition-all self-start sm:self-auto shadow-lg shadow-[#c6ff00]/20 whitespace-nowrap"
        >
          Start a Project
        </Link>
      </div>

      {/* Sticky Stacking Cards Container */}
      <div className="relative w-full">
        {displayProjects.map((project, idx) => (
          <StackingProjectCard
            key={project.id}
            project={project}
            index={idx}
            total={displayProjects.length}
          />
        ))}
      </div>
    </section>
  );
}

function FEATUREFEAT_BADGE(index: number): string {
  const badges = ["Web Design & SaaS", "Branding & Custom Web", "Web Design & E-Commerce"];
  return badges[index % badges.length];
}
