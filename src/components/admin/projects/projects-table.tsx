"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Star,
  CheckCircle,
  XCircle,
  Loader2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  FolderKanban,
} from "lucide-react";
import type { ProjectItem, PaginationMeta } from "@/types";

export interface ProjectsTableProps {
  projects: ProjectItem[];
  pagination: PaginationMeta;
  isLoading: boolean;
  onPageChange: (newPage: number) => void;
  onEdit: (project: ProjectItem) => void;
  onDelete: (project: ProjectItem) => void;
  onTogglePublished: (project: ProjectItem) => Promise<void>;
  onToggleFeatured: (project: ProjectItem) => Promise<void>;
  onAddNew: () => void;
  updatingIds: Record<string, "published" | "featured" | undefined>;
}

export function ProjectsTable({
  projects,
  pagination,
  isLoading,
  onPageChange,
  onEdit,
  onDelete,
  onTogglePublished,
  onToggleFeatured,
  onAddNew,
  updatingIds,
}: ProjectsTableProps) {
  const [search, setSearch] = React.useState("");
  const [filterTab, setFilterTab] = React.useState<"all" | "published" | "draft" | "featured">("all");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

  // Derive unique categories from loaded projects
  const categories = React.useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [projects]);

  // Client-side search and filtering across currently loaded projects
  const filteredProjects = React.useMemo(() => {
    return projects.filter((p) => {
      const q = search.toLowerCase();
      const matchesSearch =
        search === "" ||
        p.title.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        (Array.isArray(p.technologies) && p.technologies.some((t) => t.toLowerCase().includes(q)));

      if (!matchesSearch) return false;

      if (filterTab === "published" && !p.published) return false;
      if (filterTab === "draft" && p.published) return false;
      if (filterTab === "featured" && !p.featured) return false;

      if (selectedCategory !== "all" && p.category !== selectedCategory) return false;

      return true;
    });
  }, [projects, search, filterTab, selectedCategory]);

  const counts = React.useMemo(() => {
    const published = projects.filter((p) => p.published).length;
    const featured = projects.filter((p) => p.featured).length;
    return {
      all: projects.length,
      published,
      draft: projects.length - published,
      featured,
    };
  }, [projects]);

  return (
    <div className="space-y-4">
      {/* Search & Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 p-4 rounded-2xl bg-[#101827]/80 border border-white/10 shadow-lg">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects by title, slug, tech, or category..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
            <button
              type="button"
              onClick={() => setFilterTab("all")}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                filterTab === "all"
                  ? "bg-violet-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              All ({counts.all})
            </button>
            <button
              type="button"
              onClick={() => setFilterTab("published")}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                filterTab === "published"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Published ({counts.published})
            </button>
            <button
              type="button"
              onClick={() => setFilterTab("draft")}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                filterTab === "draft"
                  ? "bg-slate-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Draft ({counts.draft})
            </button>
            <button
              type="button"
              onClick={() => setFilterTab("featured")}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                filterTab === "featured"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Featured ({counts.featured})
            </button>
          </div>

          {/* Category Dropdown Filter */}
          {categories.length > 0 && (
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="all" className="bg-[#101827] text-white">
                All Categories ({categories.length})
              </option>
              {categories.map((c) => (
                <option key={c} value={c} className="bg-[#101827] text-white">
                  {c}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Projects Table Container */}
      <div className="rounded-2xl bg-[#101827]/80 border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-white/5 border-b border-white/10">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Project Title & Thumbnail
                </th>
                <th scope="col" className="px-2.5 py-3 font-semibold">
                  Slug
                </th>
                <th scope="col" className="px-2.5 py-3 font-semibold">
                  Category
                </th>
                <th scope="col" className="px-2 py-3 font-semibold text-center">
                  Order
                </th>
                <th scope="col" className="px-2.5 py-3 font-semibold text-center">
                  Status
                </th>
                <th scope="col" className="px-2 py-3 font-semibold text-center">
                  Featured
                </th>
                <th scope="col" className="px-2.5 py-3 font-semibold">
                  Completed
                </th>
                <th scope="col" className="px-3 py-3 font-semibold text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                // Skeletons
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-10 bg-white/10 rounded-lg" />
                        <div>
                          <div className="h-4 w-40 bg-white/10 rounded mb-1.5" />
                          <div className="h-3 w-56 bg-white/5 rounded" />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-4 w-24 bg-white/10 rounded" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-5 w-20 bg-white/10 rounded-full" />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="h-4 w-6 bg-white/10 rounded mx-auto" />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="h-6 w-20 bg-white/10 rounded-full mx-auto" />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="h-6 w-8 bg-white/10 rounded-lg mx-auto" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-3 w-16 bg-white/10 rounded" />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="h-7 w-20 bg-white/10 rounded-lg ml-auto" />
                    </td>
                  </tr>
                ))
              ) : filteredProjects.length === 0 ? (
                // Empty State
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center">
                    <div className="max-w-sm mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 mx-auto">
                        <FolderKanban className="w-6 h-6 text-cyan-400" />
                      </div>
                      <h4 className="text-base font-bold text-white">
                        {search || filterTab !== "all" || selectedCategory !== "all"
                          ? "No matching projects found"
                          : "No projects in catalog yet"}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {search || filterTab !== "all" || selectedCategory !== "all"
                          ? "Try clearing your filters or searching with different keywords."
                          : "Create your first portfolio project with case study, thumbnail, and live links."}
                      </p>
                      {search || filterTab !== "all" || selectedCategory !== "all" ? (
                        <button
                          type="button"
                          onClick={() => {
                            setSearch("");
                            setFilterTab("all");
                            setSelectedCategory("all");
                          }}
                          className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 font-medium border border-white/10 transition-colors"
                        >
                          Clear Filters
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={onAddNew}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-xs font-semibold shadow-md shadow-violet-600/30 transition-all"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add First Project</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                // Rows
                filteredProjects.map((project) => {
                  const isUpdatingPublished =
                    updatingIds[project._id] === "published";
                  const isUpdatingFeatured =
                    updatingIds[project._id] === "featured";

                  const completionDateFormatted = project.completionDate
                    ? new Date(project.completionDate).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })
                    : "—";

                  return (
                    <tr
                      key={project._id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      {/* Project Title & Thumbnail */}
                      <td className="px-4 py-3">
                        <div className="flex items-start gap-3">
                          <div className="relative w-12 h-10 rounded-lg overflow-hidden bg-black/40 border border-white/10 flex-shrink-0 mt-0.5">
                            {project.thumbnail ? (
                              <Image
                                src={project.thumbnail}
                                alt={project.title}
                                fill
                                className="object-cover"
                                sizes="48px"
                                unoptimized={project.thumbnail.startsWith("http")}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-400 text-[10px]">
                                No img
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <span className="font-semibold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                              {project.title}
                            </span>
                            <p className="text-xs text-slate-400 line-clamp-1 max-w-sm mt-0.5">
                              {project.shortDescription}
                            </p>
                            {/* Technologies preview */}
                            {project.technologies && project.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1.5">
                                {project.technologies.slice(0, 3).map((tech, i) => (
                                  <span
                                    key={i}
                                    className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10 max-w-[150px] truncate"
                                    title={tech}
                                  >
                                    {tech}
                                  </span>
                                ))}
                                {project.technologies.length > 3 && (
                                  <span className="text-[9px] text-slate-400 self-center">
                                    +{project.technologies.length - 3}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Slug */}
                      <td className="px-2.5 py-3">
                        <span className="font-mono text-xs text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-1 rounded-md">
                          /{project.slug}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="px-2.5 py-3">
                        <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-violet-500/15 text-violet-300 border border-violet-500/30 whitespace-nowrap">
                          {project.category}
                        </span>
                      </td>

                      {/* Order */}
                      <td className="px-2 py-3 text-center">
                        <span className="text-xs font-mono text-slate-300">
                          {project.order ?? 0}
                        </span>
                      </td>

                      {/* Status / Toggle Published */}
                      <td className="px-2.5 py-3 text-center">
                        <button
                          type="button"
                          onClick={() => onTogglePublished(project)}
                          disabled={isUpdatingPublished}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all ${
                            project.published
                              ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25"
                              : "bg-slate-500/15 text-slate-400 border-slate-500/30 hover:bg-slate-500/25"
                          }`}
                          title={`Click to ${project.published ? "unpublish" : "publish"}`}
                        >
                          {isUpdatingPublished ? (
                            <Loader2 className="w-3 h-3 animate-spin text-cyan-400" />
                          ) : project.published ? (
                            <CheckCircle className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <XCircle className="w-3 h-3 text-slate-400" />
                          )}
                          <span>{project.published ? "Published" : "Draft"}</span>
                        </button>
                      </td>

                      {/* Featured / Toggle Featured */}
                      <td className="px-2 py-3 text-center">
                        <button
                          type="button"
                          onClick={() => onToggleFeatured(project)}
                          disabled={isUpdatingFeatured}
                          className={`p-1.5 rounded-lg border transition-all ${
                            project.featured
                              ? "bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30"
                              : "bg-white/5 text-slate-400 border-white/10 hover:text-amber-400 hover:bg-white/10"
                          }`}
                          title={`Click to ${project.featured ? "unfeature" : "feature on homepage"}`}
                        >
                          {isUpdatingFeatured ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                          ) : (
                            <Star
                              className={`w-3.5 h-3.5 ${
                                project.featured ? "fill-amber-400 text-amber-400" : ""
                              }`}
                            />
                          )}
                        </button>
                      </td>

                      {/* Completion Date */}
                      <td className="px-2.5 py-3 text-xs text-slate-400 whitespace-nowrap">
                        {completionDateFormatted}
                      </td>

                      {/* Actions */}
                      <td className="px-3 py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Preview Link */}
                          {project.published ? (
                            <Link
                              href={`/portfolio/${project.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/20 transition-all"
                              title="Preview Project Case Study"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          ) : (
                            <span
                              className="p-1.5 rounded-lg text-slate-600 cursor-not-allowed"
                              title="Unpublished project is not publicly accessible"
                            >
                              <ExternalLink className="w-3.5 h-3.5 opacity-40" />
                            </span>
                          )}

                          {/* Edit Button */}
                          <button
                            type="button"
                            onClick={() => onEdit(project)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/20 transition-all"
                            title="Edit Project"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => onDelete(project)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-white/10 bg-white/[0.02] text-xs text-slate-400">
            <div>
              Showing page <span className="font-semibold text-white">{pagination.page}</span> of{" "}
              <span className="font-semibold text-white">{pagination.totalPages}</span> (
              {pagination.totalItems} total)
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onPageChange(pagination.page - 1)}
                disabled={!pagination.hasPrevPage || isLoading}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed border border-white/10 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <button
                type="button"
                onClick={() => onPageChange(pagination.page + 1)}
                disabled={!pagination.hasNextPage || isLoading}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed border border-white/10 transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
