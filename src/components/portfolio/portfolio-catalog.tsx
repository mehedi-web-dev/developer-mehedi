"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ExternalLink,
  FolderGit2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Layers,
} from "lucide-react";
import { getProjects } from "@/services";
import type { ProjectItem, PaginationMeta } from "@/types";
import { cn } from "@/lib/utils";

export function PortfolioCatalog() {
  const [projects, setProjects] = React.useState<ProjectItem[]>([]);
  const [pagination, setPagination] = React.useState<PaginationMeta | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [availableCategories, setAvailableCategories] = React.useState<string[]>(["All"]);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const loadProjects = React.useCallback((targetPage: number, category?: string) => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    const filterCategory = category && category !== "All" ? category : undefined;

    getProjects({ page: targetPage, limit: 9, category: filterCategory })
      .then((res) => {
        if (isMounted) {
          setProjects(res.projects);
          setPagination(res.pagination);
          setPage(targetPage);

          // Dynamically collect discovered categories from real data
          if (res.projects.length > 0) {
            setAvailableCategories((prev) => {
              const set = new Set(prev);
              res.projects.forEach((p) => {
                if (p.category) set.add(p.category);
              });
              return Array.from(set);
            });
          }

          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Unable to load portfolio projects from the server. Please check your connection or retry.");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  React.useEffect(() => {
    let isMounted = true;
    getProjects({ page: 1, limit: 9 })
      .then((res) => {
        if (isMounted) {
          setProjects(res.projects);
          setPagination(res.pagination);

          if (res.projects.length > 0) {
            setAvailableCategories((prev) => {
              const set = new Set(prev);
              res.projects.forEach((p) => {
                if (p.category) set.add(p.category);
              });
              return Array.from(set);
            });
          }

          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Unable to load portfolio projects from the server. Please check your connection or retry.");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    loadProjects(1, category);
  };

  return (
    <div className="py-12 sm:py-20">
      <div className="container-custom">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-subtle)] px-3.5 py-1.5 text-xs font-medium text-[var(--secondary)]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Curated Showcase
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl text-[var(--foreground)]"
          >
            Portfolio &amp; Client Projects
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg leading-relaxed text-[var(--muted)]"
          >
            Explore real-world case studies spanning custom WordPress implementations, bespoke Elementor Pro
            themes, WooCommerce online stores, and high-performance frontend web applications.
          </motion.p>
        </div>

        {/* Category Filters (when categories exist) */}
        {availableCategories.length > 1 && (
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
            {availableCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategorySelect(cat)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--secondary)]",
                  selectedCategory === cat
                    ? "bg-[var(--secondary)] text-[var(--background)] font-bold shadow-md shadow-[var(--secondary)]/20"
                    : "border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--secondary)] hover:text-[var(--foreground)]"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden animate-pulse"
              >
                <div className="aspect-video w-full bg-[var(--surface-hover)]" />
                <div className="p-6 space-y-4">
                  <div className="h-4 w-1/3 rounded bg-[var(--surface-hover)]" />
                  <div className="h-6 w-3/4 rounded bg-[var(--surface-hover)]" />
                  <div className="h-16 w-full rounded bg-[var(--surface-hover)]" />
                  <div className="h-4 w-1/2 rounded bg-[var(--surface-hover)]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State with Retry */}
        {!isLoading && error && (
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-12 text-center max-w-lg mx-auto space-y-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 mx-auto">
              <AlertCircle className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-[var(--foreground)]">Projects Unavailable</h3>
            <p className="text-sm text-[var(--muted)]">{error}</p>
            <button
              type="button"
              onClick={() => loadProjects(page, selectedCategory)}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--secondary)] px-6 py-2.5 text-xs font-semibold text-[var(--background)] hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--secondary)]"
            >
              Retry Loading Projects
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && projects.length === 0 && (
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-12 sm:p-16 text-center max-w-xl mx-auto space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[var(--surface-subtle)] text-[var(--muted)] mx-auto">
              <FolderGit2 className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--foreground)]">No Projects Found</h3>
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              {selectedCategory !== "All"
                ? `No projects found under the "${selectedCategory}" category. Try selecting "All" to view other work.`
                : "Project case studies are being published to the catalog. Check back soon for new case studies."}
            </p>
            {selectedCategory !== "All" && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleCategorySelect("All")}
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] px-5 py-2.5 text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--surface-hover)] transition-colors"
                >
                  Clear Category Filter
                </button>
              </div>
            )}
          </div>
        )}

        {/* Projects Grid */}
        {!isLoading && !error && projects.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="glass rounded-3xl overflow-hidden border border-[var(--border)] hover:border-[var(--secondary)] hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--secondary)]/10 transition-all duration-300 flex flex-col group shadow-sm"
                >
                  {/* Thumbnail Image */}
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="relative aspect-video w-full overflow-hidden bg-[var(--surface-hover)] block"
                  >
                    {project.thumbnail ? (
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-950/20 to-cyan-950/20 text-[var(--muted)]">
                        <FolderGit2 className="h-10 w-10 opacity-50" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3 rounded-full bg-[var(--background)]/85 px-3 py-1 text-[11px] font-mono font-medium backdrop-blur-md text-[var(--foreground)] shadow-sm">
                      {project.category}
                    </div>
                  </Link>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                    <div>
                      <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--secondary)] transition-colors">
                        <Link href={`/portfolio/${project.slug}`}>
                          {project.title}
                        </Link>
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-[var(--muted)] line-clamp-3">
                        {project.shortDescription}
                      </p>
                    </div>

                    {/* Technologies tags */}
                    {Array.isArray(project.technologies) && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.technologies.slice(0, 4).map((tech, idx) => (
                          <span
                            key={idx}
                            className="rounded-md bg-[var(--surface-subtle)] px-2 py-0.5 text-[10px] font-mono text-[var(--muted)] border border-[var(--border)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Links */}
                    <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
                      <Link
                        href={`/portfolio/${project.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--foreground)] hover:text-[var(--secondary)] transition-colors"
                      >
                        <span>Case Study</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-[var(--muted)] hover:text-[var(--secondary)] transition-colors"
                          aria-label={`Visit live website for ${project.title}`}
                        >
                          <span>Live Site</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination Controls */}
            {pagination && pagination.totalPages > 1 && (
              <div className="mt-14 flex items-center justify-center gap-4">
                <button
                  type="button"
                  disabled={!pagination.hasPrevPage}
                  onClick={() => loadProjects(page - 1, selectedCategory)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--foreground)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--surface-hover)] transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>
                <span className="font-mono text-xs text-[var(--muted)]">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  type="button"
                  disabled={!pagination.hasNextPage}
                  onClick={() => loadProjects(page + 1, selectedCategory)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--foreground)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--surface-hover)] transition-colors"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        )}

        {/* Global CTA */}
        <div className="mt-20 glass rounded-3xl p-8 sm:p-12 border border-[var(--border)] text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[var(--secondary)] to-[var(--primary)] text-white mx-auto shadow-md">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)]">
              Have an Idea for Your Next Web Project?
            </h3>
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              From conception to launch, I specialize in building custom digital experiences that elevate your brand and drive results.
            </p>
            <div className="pt-2">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/20 hover:bg-[var(--primary-hover)] transition-all"
              >
                Let&apos;s Build Together
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
