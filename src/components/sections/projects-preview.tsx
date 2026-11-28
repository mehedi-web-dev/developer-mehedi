"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FALLBACK_PROJECTS } from "@/services";
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

  // Calculate top sticky offset so all cards stack cleanly with staggered header exposure
  const topOffset = 100 + index * 16;

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
        transition={{ duration: 0.5, delay: index * 0.08 }}
        className="group relative w-full bg-white dark:bg-[#141517] rounded-[28px] sm:rounded-[36px] border border-black/10 dark:border-white/10 overflow-hidden shadow-2xl hover:border-[#c6ff00]/60 transition-all duration-300"
      >
        <Link href={`/portfolio/${project.slug}`} className="block">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Project Media (Left 7 Columns) */}
            <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-zinc-900">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-5 left-5 z-10">
                <span className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-xs font-semibold text-[#c6ff00] font-mono">
                  {project.badge}
                </span>
              </div>
            </div>

            {/* Project Details (Right 5 Columns) */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-gradient-to-br from-zinc-50 to-white dark:from-[#141517] dark:to-[#111214]">
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Project 0{index + 1} of 0{total}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-zinc-600 dark:text-zinc-400 group-hover:text-black group-hover:bg-[#c6ff00] transition-colors">
                    <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>

                <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-zinc-900 dark:text-white mb-4 group-hover:text-[#65a30d] dark:group-hover:text-[#c6ff00] transition-colors leading-tight">
                  {project.title}
                </h3>

                <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
                  {project.subtitle}
                </p>
              </div>

              {/* Technologies Pills */}
              <div className="pt-6 border-t border-black/10 dark:border-white/10">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 6).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/[0.04] border border-black/5 dark:border-white/5 text-[11px] font-mono text-zinc-700 dark:text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 6 && (
                    <span className="px-2 py-1 rounded-lg bg-black/5 dark:bg-white/[0.04] text-[10px] font-mono text-zinc-500">
                      +{project.technologies.length - 6} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}

export function ProjectsPreviewSection({ initialProjects }: ProjectsPreviewSectionProps = {}) {
  const projectsList =
    initialProjects && initialProjects.length > 0
      ? initialProjects
      : FALLBACK_PROJECTS;

  const displayProjects: ProjectCardData[] = projectsList.map((p) => ({
    id: p._id,
    title: p.title,
    badge: p.category || "Full-Stack Web Development",
    subtitle: p.shortDescription || p.description || "",
    image: p.thumbnail,
    slug: p.slug,
    technologies: Array.isArray(p.technologies) ? p.technologies : [],
    liveUrl: p.liveUrl,
  }));

  return (
    <section id="portfolio-preview" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-black/10 dark:border-white/10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-[#65a30d] dark:text-[#c6ff00] font-mono font-semibold block mb-2">
            Selected Works
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
            Featured Projects ({displayProjects.length})
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
            These selected projects reflect my passion for combining strategy and creativity — delivering production-grade web applications, custom WordPress implementations, and e-commerce platforms.
          </p>
        </div>
        <Link
          href="/#contact"
          className="px-7 py-3 rounded-full bg-[#c6ff00] hover:bg-[#d4ff33] text-black font-semibold text-xs uppercase tracking-wider transition-all self-start sm:self-auto shadow-lg shadow-[#c6ff00]/20 whitespace-nowrap"
        >
          Start a Project
        </Link>
      </div>

      {/* Sticky Stacking Cards Container: Renders ALL projects */}
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
