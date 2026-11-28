"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ProjectItem } from "@/types";

export interface ProjectsPreviewSectionProps {
  initialProjects?: ProjectItem[] | null;
}

const FALLBACK_PROJECTS: Array<{
  id: string;
  title: string;
  badge: string;
  subtitle: string;
  image: string;
  slug: string;
}> = [
  {
    id: "1",
    title: "MeetMate AI",
    badge: "Next.js / SaaS",
    subtitle: "Custom SaaS landing page and interactive application dashboard built for automated AI meeting intelligence.",
    image: "https://framerusercontent.com/images/tbAYKmuCPrc8idgXtBNAyxXWA.png",
    slug: "meetmate-ai-saas",
  },
  {
    id: "2",
    title: "Rawink Studio",
    badge: "WordPress / Branding",
    subtitle: "Bold, modern digital identity and dynamic portfolio showcase developed for a high-end creative tattoo studio.",
    image: "https://framerusercontent.com/images/odZb6sCBuXZLQUkegaYdvpoPck.png",
    slug: "rawink-creative-studio",
  },
  {
    id: "3",
    title: "Gijs Shutter Systems",
    badge: "WooCommerce",
    subtitle: "Elegant and functional webshop for custom shutters and home renovation specialists, focused on user trust and quotes.",
    image: "https://framerusercontent.com/images/8tYnYpe4DeBFntYlkXLzk8HvC9A.png",
    slug: "gijs-luxe-shutters",
  },
];

export function ProjectsPreviewSection({ initialProjects }: ProjectsPreviewSectionProps = {}) {
  const displayProjects =
    initialProjects && initialProjects.length > 0
      ? initialProjects.slice(0, 3).map((p) => ({
          id: p._id,
          title: p.title,
          badge: p.category || "Web Development",
          subtitle: p.shortDescription || p.description,
          image: p.thumbnail || FALLBACK_PROJECTS[0].image,
          slug: p.slug,
        }))
      : FALLBACK_PROJECTS;

  return (
    <section id="portfolio-preview" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#c6ff00] font-mono font-semibold block mb-2">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Featured Projects
          </h2>
        </div>
        <Link
          href="/portfolio"
          className="px-6 py-2.5 rounded-full bg-[#c6ff00] hover:bg-[#d4ff33] text-black font-semibold text-xs uppercase tracking-wider transition-all self-start sm:self-auto"
        >
          View All Projects
        </Link>
      </div>

      {/* 3-column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayProjects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="group cursor-pointer bg-[#141517] rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-[#c6ff00]/40 transition-colors shadow-xl"
          >
            <Link href={`/portfolio/${project.slug}`} className="flex flex-col h-full">
              {/* Cover Image */}
              <div className="relative aspect-[16/11] overflow-hidden bg-zinc-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-[#c6ff00]">
                  {project.badge}
                </span>
              </div>

              {/* Title & Description */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#c6ff00] transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-[#c6ff00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {project.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
