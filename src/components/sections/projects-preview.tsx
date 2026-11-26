"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Sparkles, FolderGit2, AlertCircle } from "lucide-react";
import { getFeaturedProjects } from "@/services";
import type { ProjectItem } from "@/types";

export function ProjectsPreviewSection() {
  const [projects, setProjects] = React.useState<ProjectItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const loadProjects = React.useCallback(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    getFeaturedProjects()
      .then((data) => {
        if (isMounted) {
          setProjects(data.slice(0, 3));
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Unable to load featured projects from the server at this moment.");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  React.useEffect(() => {
    let isMounted = true;
    getFeaturedProjects()
      .then((data) => {
        if (isMounted) {
          setProjects(data.slice(0, 3));
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Unable to load featured projects from the server at this moment.");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="portfolio-preview" className="py-20 sm:py-28 border-t border-[var(--border)] bg-[var(--surface-subtle)]/40">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--secondary)]">
              <Sparkles className="h-3 w-3" />
              Featured Work
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-[var(--foreground)]">
              Recent Projects
            </h2>
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              A curated selection of client solutions, custom WordPress implementations, and modern frontend web applications.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--secondary)] hover:text-cyan-400 transition-colors group self-start md:self-auto"
          >
            <span>Explore All Projects</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden animate-pulse"
              >
                <div className="aspect-video w-full bg-[var(--surface-hover)]" />
                <div className="p-6 space-y-4">
                  <div className="h-4 w-1/3 rounded bg-[var(--surface-hover)]" />
                  <div className="h-6 w-3/4 rounded bg-[var(--surface-hover)]" />
                  <div className="h-12 w-full rounded bg-[var(--surface-hover)]" />
                  <div className="h-4 w-1/2 rounded bg-[var(--surface-hover)]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center max-w-md mx-auto space-y-3">
            <AlertCircle className="h-8 w-8 text-amber-500 mx-auto" />
            <h3 className="text-base font-bold text-[var(--foreground)]">Projects Unavailable</h3>
            <p className="text-xs text-[var(--muted)]">{error}</p>
            <button
              type="button"
              onClick={loadProjects}
              className="mt-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--primary-hover)] transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && projects.length === 0 && (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-12 text-center max-w-lg mx-auto space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-subtle)] text-[var(--muted)] mx-auto">
              <FolderGit2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-[var(--foreground)]">No Projects Published Yet</h3>
            <p className="text-sm text-[var(--muted)]">
              Featured project case studies are being published. Please check back shortly or browse the complete portfolio archive.
            </p>
            <div className="pt-2">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--secondary)] hover:underline"
              >
                Go to Portfolio Page
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        {!isLoading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project._id}
                className="glass rounded-3xl overflow-hidden border border-[var(--border)] hover:border-[var(--secondary)] hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--secondary)]/10 transition-all duration-300 flex flex-col group shadow-sm"
              >
                {/* Thumbnail Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-[var(--surface-hover)]">
                  {project.thumbnail ? (
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
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
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--secondary)] transition-colors">
                      {project.title}
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

                  {/* Action links */}
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
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
