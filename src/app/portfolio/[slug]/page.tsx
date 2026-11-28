import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Share2,
} from "lucide-react";
import { WhatsAppIcon, GithubIcon } from "@/components/ui/icons";
import { getProjectBySlug, getProjects, FALLBACK_PROJECTS } from "@/services";
import type { ProjectItem } from "@/types";

interface ProjectDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Mehedi Hasan",
      description: "The requested project case study could not be found.",
    };
  }

  const title = `${project.title} — Case Study | Mehedi Hasan`;
  const description =
    project.shortDescription ||
    `${project.title} case study by Mehedi Hasan, WordPress and Frontend Specialist.`;

  return {
    title,
    description,
    keywords: [
      project.title,
      project.category,
      ...(Array.isArray(project.technologies) ? project.technologies : []),
      "Mehedi Hasan Portfolio",
    ],
    openGraph: {
      title,
      description,
      type: "article",
      images: project.thumbnail ? [{ url: project.thumbnail, alt: project.title }] : [],
    },
  };
}

export async function generateStaticParams() {
  return FALLBACK_PROJECTS.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Get other projects as related projects
  const relatedProjects = FALLBACK_PROJECTS.filter(
    (p) => p.slug.toLowerCase() !== project.slug.toLowerCase()
  ).slice(0, 2);

  const formattedDate = project.completionDate
    ? new Date(project.completionDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "Recent Delivery";

  return (
    <main className="min-h-screen pt-28 pb-20 px-4 sm:px-6 max-w-6xl mx-auto selection:bg-[#c6ff00] selection:text-black">
      {/* Back to Projects Navigation */}
      <div className="mb-8">
        <Link
          href="/#portfolio-preview"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#c6ff00]" />
          <span>Back to Projects</span>
        </Link>
      </div>

      {/* Case Study Header Lockup */}
      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3.5 py-1 rounded-full bg-[#c6ff00]/10 border border-[#c6ff00]/30 text-xs font-mono font-semibold text-[#c6ff00]">
            {project.category}
          </span>
          <span className="text-xs font-mono text-zinc-500">
            Case Study • {formattedDate}
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-white mb-6 leading-[1.05]">
          {project.title}
        </h1>

        <p className="text-zinc-300 text-base sm:text-xl leading-relaxed max-w-3xl">
          {project.shortDescription}
        </p>

        {/* Action Buttons & Links */}
        <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-white/10">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#c6ff00] hover:bg-[#d4ff33] text-black font-semibold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#c6ff00]/20"
            >
              <span>Visit Live Website</span>
              <ExternalLink className="w-4 h-4 stroke-[2.5]" />
            </a>
          )}

          <a
            href={`https://wa.me/8801318352581?text=${encodeURIComponent(
              `Hi Mehedi, I saw your case study on ${project.title} and would like to discuss a similar project!`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.05] hover:bg-[#25D366]/20 border border-white/15 hover:border-[#25D366]/40 text-xs font-semibold text-zinc-200 hover:text-white transition-all"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
            <span>Discuss Similar Project</span>
          </a>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white transition-all"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Source Code</span>
            </a>
          )}
        </div>
      </header>

      {/* Hero Featured Media */}
      <section className="mb-16">
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/15 bg-zinc-950 shadow-2xl group">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-out"
          />
        </div>
      </section>

      {/* Main Grid: Case Study Content (8 cols) + Meta Sidebar (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Case Study Narrative */}
        <div className="lg:col-span-8 space-y-10 text-zinc-300 leading-relaxed">
          {project.description ? (
            <div className="prose prose-invert max-w-none space-y-8">
              {project.description.split("\n\n").map((block, idx) => {
                const trimmed = block.trim();
                if (trimmed.startsWith("### ")) {
                  return (
                    <h2
                      key={idx}
                      className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight pt-4 border-t border-white/10 flex items-center gap-3"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#c6ff00]" />
                      <span>{trimmed.replace("### ", "")}</span>
                    </h2>
                  );
                }
                if (trimmed.startsWith("- ")) {
                  const items = trimmed.split("\n").filter((l) => l.trim().startsWith("- "));
                  return (
                    <ul key={idx} className="space-y-3 pl-2">
                      {items.map((it, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-zinc-300">
                          <CheckCircle2 className="w-5 h-5 text-[#c6ff00] shrink-0 mt-0.5" />
                          <span>{it.replace(/^- \*\*(.*?)\*\*:?/, "$1 —").replace(/^- /, "")}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={idx} className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                    {trimmed}
                  </p>
                );
              })}
            </div>
          ) : (
            <p className="text-zinc-400 text-base">{project.shortDescription}</p>
          )}

          {/* Project Gallery If Multiple Images */}
          {Array.isArray(project.gallery) && project.gallery.length > 1 && (
            <div className="pt-8 border-t border-white/10">
              <h3 className="text-xl font-display font-bold text-white mb-6">
                Interface Previews
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.gallery.slice(1).map((img, i) => (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 aspect-video"
                  >
                    <img
                      src={img}
                      alt={`${project.title} screenshot ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Project Meta Card & Consultation Widget */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl border border-white/10 bg-[#141517]/80 backdrop-blur-md p-6 sm:p-8 space-y-6 shadow-xl">
            <div>
              <span className="text-xs font-mono uppercase text-zinc-500 tracking-wider block mb-1">
                Project Category
              </span>
              <p className="text-sm font-semibold text-white">{project.category}</p>
            </div>

            <div className="border-t border-white/10 pt-4">
              <span className="text-xs font-mono uppercase text-zinc-500 tracking-wider block mb-1">
                Completion Date
              </span>
              <p className="text-sm font-semibold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#c6ff00]" />
                <span>{formattedDate}</span>
              </p>
            </div>

            <div className="border-t border-white/10 pt-4">
              <span className="text-xs font-mono uppercase text-zinc-500 tracking-wider block mb-2">
                Technologies &amp; Architecture
              </span>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.liveUrl && (
              <div className="border-t border-white/10 pt-4">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#c6ff00] hover:bg-[#d4ff33] text-black font-semibold text-xs uppercase tracking-wider transition-all"
                >
                  <span>Launch Live Site</span>
                  <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                </a>
              </div>
            )}
          </div>

          {/* Quick Contact Card */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#161719] to-[#0f1012] p-6 sm:p-8 text-center space-y-4 shadow-xl">
            <span className="w-10 h-10 rounded-full bg-[#c6ff00]/10 text-[#c6ff00] flex items-center justify-center mx-auto text-lg font-bold">
              ⚡
            </span>
            <h3 className="text-lg font-bold text-white">
              Want a high-converting website like this?
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Guaranteed launch within 7–10 days with clean architecture, speed optimization, and responsive design.
            </p>
            <Link
              href="/#contact"
              className="block w-full py-2.5 rounded-full bg-white hover:bg-zinc-200 text-black font-semibold text-xs uppercase tracking-wider transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </aside>
      </div>

      {/* Related Projects Section */}
      {relatedProjects.length > 0 && (
        <section className="mt-24 pt-16 border-t border-white/10">
          <div className="flex items-center justify-between gap-4 mb-10">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#c6ff00] font-mono font-semibold block mb-1">
                More Case Studies
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white">
                Other Featured Work
              </h2>
            </div>
            <Link
              href="/#portfolio-preview"
              className="text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4 text-[#c6ff00]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedProjects.map((rel) => (
              <Link
                key={rel._id}
                href={`/portfolio/${rel.slug}`}
                className="group block rounded-3xl border border-white/10 bg-[#141517] overflow-hidden hover:border-[#c6ff00]/40 transition-all shadow-xl"
              >
                <div className="aspect-[16/10] overflow-hidden bg-zinc-900 relative">
                  <img
                    src={rel.thumbnail}
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-[#c6ff00]">
                      {rel.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 sm:p-8 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white group-hover:text-[#c6ff00] transition-colors mb-2">
                      {rel.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2">
                      {rel.shortDescription}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-black group-hover:bg-[#c6ff00] transition-colors shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
