"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Sparkles, FolderGit2, AlertCircle } from "lucide-react";
import { getFeaturedProjects } from "@/services";
import type { ProjectItem } from "@/types";

export interface ProjectsPreviewSectionProps {
  initialProjects?: ProjectItem[] | null;
}

function ProjectCard({ project }: { project: ProjectItem }) {
  const [imageError, setImageError] = React.useState(false);
  const detailHref = project.slug
    ? `/portfolio/${encodeURIComponent(project.slug)}`
    : "/portfolio";

  return (
    <div className="glass rounded-3xl overflow-hidden border border-[var(--border)] hover:border-[var(--secondary)] hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--secondary)]/10 transition-all duration-300 flex flex-col group shadow-sm">
      {/* Thumbnail Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-[var(--surface-hover)]">
        {project.thumbnail && !imageError ? (
          <Image
            src={project.thumbnail}
            alt={project.title || "Project preview"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-950/20 to-cyan-950/20 text-[var(--muted)]">
            <FolderGit2 className="h-10 w-10 opacity-50" />
          </div>
        )}
        {project.category && (
          <div className="absolute top-3 left-3 rounded-full bg-[var(--background)]/85 px-3 py-1 text-[11px] font-mono font-medium backdrop-blur-md text-[var(--foreground)] shadow-sm border border-[var(--border)]">
            {project.category}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--secondary)] transition-colors">
            {project.title}
          </h3>
          {project.shortDescription && (
            <p className="mt-2 text-xs leading-relaxed text-[var(--muted)] line-clamp-3">
              {project.shortDescription}
            </p>
          )}
        </div>

        {/* Technologies tags */}
        {Array.isArray(project.technologies) && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.technologies
              .filter(Boolean)
              .slice(0, 4)
              .map((tech, idx) => (
                <span
                  key={`${tech}-${idx}`}
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
            href={detailHref}
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
  );
}

export function ProjectsPreviewSection({ initialProjects }: ProjectsPreviewSectionProps) {
  const hasInitial = initialProjects !== undefined && initialProjects !== null;
  const [projects, setProjects] = React.useState<ProjectItem[]>(() =>
    hasInitial ? initialProjects.slice(0, 3) : []
  );
  const [isLoading, setIsLoading] = React.useState(!hasInitial);
  const [error, setError] = React.useState<string | null>(null);

  const loadProjects = React.useCallback(() => {
    setIsLoading(true);
    setError(null);
    getFeaturedProjects()
      .then((data) => {
        setProjects(Array.isArray(data) ? data.slice(0, 3) : []);
      })
      .catch(() => {
        setError("Unable to load featured projects from the server at this moment.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  React.useEffect(() => {
    if (hasInitial) return;

    let isMounted = true;
    getFeaturedProjects()
      .then((data) => {
        if (isMounted) {
          setProjects(Array.isArray(data) ? data.slice(0, 3) : []);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Unable to load featured projects from the server at this moment.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [hasInitial]);

  const displayedProjects = projects.slice(0, 3);

  return (
    <section id="portfolio-preview" className="py-20 sm:py-28 border-t border-[var(--border)] bg-[var(--surface-subtle)]/40">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--secondary)] shadow-sm">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          <div className="glass rounded-3xl border border-[var(--border)] bg-[var(--surface)]/60 p-8 sm:p-10 text-center max-w-md mx-auto space-y-3 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 mx-auto border border-amber-500/20">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-[var(--foreground)]">Projects Unavailable</h3>
            <p className="text-xs text-[var(--muted)] leading-relaxed">{error}</p>
            <button
              type="button"
              onClick={loadProjects}
              className="mt-2 rounded-xl bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--primary-hover)] transition-colors shadow-md shadow-[var(--primary)]/20 cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && displayedProjects.length === 0 && (
          <div className="glass rounded-3xl border border-[var(--border)] bg-[var(--surface)]/60 p-10 sm:p-14 text-center max-w-lg mx-auto space-y-4 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--surface-subtle)] text-[var(--secondary)] mx-auto border border-[var(--border)] shadow-inner">
              <FolderGit2 className="h-7 w-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[var(--foreground)]">No Featured Projects Yet</h3>
              <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                Featured project case studies are currently being curated. Explore the complete portfolio archive to view all completed works.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--surface-subtle)] px-4 py-2.5 text-xs font-semibold text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--secondary)] hover:text-[var(--secondary)] transition-all shadow-sm"
              >
                <span>Explore All Projects</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Projects Grid: Responsive and perfectly balanced for 1, 2, or 3 cards */}
        {!isLoading && !error && displayedProjects.length > 0 && (
          <>
            {displayedProjects.length === 1 && (
              <div className="max-w-md mx-auto">
                <ProjectCard project={displayedProjects[0]} />
              </div>
            )}
            {displayedProjects.length === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8">
                {displayedProjects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            )}
            {displayedProjects.length >= 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedProjects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
