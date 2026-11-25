import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  FolderGit2,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { getProjectBySlug, getProjects } from "@/services";
import type { ProjectItem } from "@/types";

interface ProjectDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  let project: ProjectItem | null = null;

  try {
    project = await getProjectBySlug(slug);
  } catch {
    // Return standard fallback if fetch fails
  }

  if (!project) {
    return {
      title: "Project Not Found | Mehedi Hasan Portfolio",
      description: "The requested project case study could not be found.",
    };
  }

  const title = `${project.title} | Mehedi Hasan Portfolio`;
  const description =
    project.shortDescription ||
    (project.description ? project.description.slice(0, 160) : "Project case study by Mehedi Hasan");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: project.thumbnail ? [{ url: project.thumbnail }] : [],
    },
  };
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const { slug } = await params;

  let project: ProjectItem | null = null;
  let isNetworkError = false;

  try {
    project = await getProjectBySlug(slug);
  } catch (error) {
    console.error(`[Project Details Page] Error loading slug "${slug}":`, error);
    isNetworkError = true;
  }

  if (isNetworkError) {
    return (
      <div className="py-20 sm:py-28">
        <div className="container-custom max-w-xl text-center space-y-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 mx-auto">
            <FolderGit2 className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">
            Unable to Load Project
          </h1>
          <p className="text-sm text-[var(--muted)]">
            A network error occurred while retrieving this case study from the server.
          </p>
          <div className="pt-2">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
            >
              <ArrowLeft className="h-4 w-4" />
              Return to Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    notFound();
  }

  // Fetch up to 3 related projects in the same category (if available)
  let relatedProjects: ProjectItem[] = [];
  if (project.category) {
    try {
      const relatedRes = await getProjects({
        category: project.category,
        limit: 4,
      });
      relatedProjects = relatedRes.projects
        .filter((p) => p.slug !== project?.slug)
        .slice(0, 3);
    } catch {
      // Related projects failure does not block rendering the main page
    }
  }

  const formattedDate = project.completionDate
    ? new Date(project.completionDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : null;

  return (
    <article className="py-12 sm:py-20">
      <div className="container-custom max-w-5xl">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--muted)] hover:text-[var(--foreground)] transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to All Projects</span>
          </Link>
        </div>

        {/* Project Header */}
        <header className="space-y-4 pb-8 border-b border-[var(--border)]">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full bg-[var(--surface-subtle)] border border-[var(--border)] px-3.5 py-1 text-xs font-mono font-medium text-[var(--secondary)]">
              {project.category}
            </span>
            {project.featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 px-3 py-1 text-xs font-mono font-medium">
                <Sparkles className="h-3 w-3" />
                Featured Project
              </span>
            )}
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-[var(--foreground)]">
            {project.title}
          </h1>

          {project.shortDescription && (
            <p className="text-base sm:text-lg leading-relaxed text-[var(--muted)] max-w-3xl">
              {project.shortDescription}
            </p>
          )}

          {/* Quick Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-[var(--primary)]/20 hover:bg-[var(--primary-hover)] transition-all"
              >
                <span>Visit Live Website</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-xs font-semibold text-[var(--foreground)] hover:border-[var(--primary)] transition-all"
              >
                <GithubIcon className="h-4 w-4" />
                <span>View Source Code</span>
              </a>
            )}
          </div>
        </header>

        {/* Featured Main Image */}
        {project.thumbnail && (
          <div className="mt-8 relative aspect-video w-full rounded-3xl overflow-hidden border border-[var(--border)] bg-[var(--surface-hover)] shadow-xl">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover object-top"
            />
          </div>
        )}

        {/* Project Metadata & Body Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Content (Description) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="prose prose-invert max-w-none text-[var(--foreground)]">
              <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] mb-4">
                Project Overview
              </h2>
              <div className="whitespace-pre-line text-sm sm:text-base leading-relaxed text-[var(--muted)] space-y-4">
                {project.description}
              </div>
            </div>

            {/* Gallery Images (if available) */}
            {Array.isArray(project.gallery) && project.gallery.length > 0 && (
              <div className="pt-8 border-t border-[var(--border)] space-y-4">
                <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                  Project Gallery
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.gallery.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-video rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--surface-hover)] shadow-sm"
                    >
                      <Image
                        src={imgUrl}
                        alt={`${project.title} screenshot ${idx + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 500px"
                        className="object-cover object-top hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Project Details Sidebar */}
          <aside className="lg:col-span-4 glass rounded-3xl p-6 sm:p-8 border border-[var(--border)] space-y-6">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] pb-3 border-b border-[var(--border)]">
              Project Specification
            </h3>

            {/* Category */}
            <div>
              <span className="block text-xs text-[var(--muted)] mb-1">Category</span>
              <span className="text-sm font-semibold text-[var(--foreground)]">
                {project.category}
              </span>
            </div>

            {/* Completion Date */}
            {formattedDate && (
              <div>
                <span className="block text-xs text-[var(--muted)] mb-1">Completed Date</span>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--foreground)]">
                  <Calendar className="h-4 w-4 text-[var(--muted)]" />
                  {formattedDate}
                </span>
              </div>
            )}

            {/* Technologies */}
            {Array.isArray(project.technologies) && project.technologies.length > 0 && (
              <div>
                <span className="block text-xs text-[var(--muted)] mb-2">Technologies Used</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="rounded-md bg-[var(--surface-subtle)] px-2.5 py-1 text-xs font-mono text-[var(--foreground)] border border-[var(--border)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Direct Links */}
            <div className="pt-4 border-t border-[var(--border)] space-y-2.5">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] p-3 text-xs font-semibold hover:bg-[var(--primary)] hover:text-white transition-all"
                >
                  <span>Launch Live Project</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-xs font-semibold text-[var(--foreground)] hover:border-[var(--primary)] transition-all"
                >
                  <span>GitHub Repository</span>
                  <GithubIcon className="h-4 w-4" />
                </a>
              )}
            </div>
          </aside>
        </div>

        {/* Related Projects Section (if available) */}
        {relatedProjects.length > 0 && (
          <section className="mt-24 pt-12 border-t border-[var(--border)]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[var(--foreground)]">
                More in {project.category}
              </h2>
              <Link
                href="/portfolio"
                className="text-xs font-semibold text-[var(--secondary)] hover:underline inline-flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rel) => (
                <Link
                  key={rel._id}
                  href={`/portfolio/${rel.slug}`}
                  className="glass rounded-2xl overflow-hidden border border-[var(--border)] hover:border-[var(--secondary)] transition-all group flex flex-col"
                >
                  <div className="relative aspect-video w-full bg-[var(--surface-hover)] overflow-hidden">
                    {rel.thumbnail ? (
                      <Image
                        src={rel.thumbnail}
                        alt={rel.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[var(--muted)]">
                        <Layers className="h-8 w-8" />
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <h4 className="text-sm font-bold text-[var(--foreground)] group-hover:text-[var(--secondary)] transition-colors">
                      {rel.title}
                    </h4>
                    <p className="mt-1 text-xs text-[var(--muted)] line-clamp-2">
                      {rel.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
