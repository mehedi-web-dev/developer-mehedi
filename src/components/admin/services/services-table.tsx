"use client";

import * as React from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Star,
  CheckCircle,
  XCircle,
  Loader2,
  Sparkles,
} from "lucide-react";
import type { ServiceItem } from "@/types";

export interface ServicesTableProps {
  services: ServiceItem[];
  isLoading: boolean;
  onEdit: (service: ServiceItem) => void;
  onDelete: (service: ServiceItem) => void;
  onTogglePublished: (service: ServiceItem) => Promise<void>;
  onToggleFeatured: (service: ServiceItem) => Promise<void>;
  onAddNew: () => void;
  updatingIds: Record<string, "published" | "featured" | undefined>;
}

export function ServicesTable({
  services,
  isLoading,
  onEdit,
  onDelete,
  onTogglePublished,
  onToggleFeatured,
  onAddNew,
  updatingIds,
}: ServicesTableProps) {
  const [search, setSearch] = React.useState("");
  const [filterTab, setFilterTab] = React.useState<"all" | "published" | "draft" | "featured">("all");

  const filteredServices = React.useMemo(() => {
    return services.filter((s) => {
      const matchesSearch =
        search === "" ||
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.slug.toLowerCase().includes(search.toLowerCase()) ||
        s.shortDescription.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) return false;

      if (filterTab === "published") return s.published;
      if (filterTab === "draft") return !s.published;
      if (filterTab === "featured") return s.featured;
      return true;
    });
  }, [services, search, filterTab]);

  const counts = React.useMemo(() => {
    const published = services.filter((s) => s.published).length;
    const featured = services.filter((s) => s.featured).length;
    return {
      all: services.length,
      published,
      draft: services.length - published,
      featured,
    };
  }, [services]);

  return (
    <div className="space-y-4">
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-2xl bg-[#101827]/80 border border-white/10">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search services by title, slug, or description..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setFilterTab("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filterTab === "all"
                ? "bg-violet-600 text-white shadow-sm shadow-violet-600/30"
                : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
            }`}
          >
            All ({counts.all})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("published")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filterTab === "published"
                ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/30"
                : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
            }`}
          >
            Published ({counts.published})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("draft")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filterTab === "draft"
                ? "bg-slate-600 text-white shadow-sm"
                : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
            }`}
          >
            Draft ({counts.draft})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("featured")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filterTab === "featured"
                ? "bg-amber-600 text-white shadow-sm shadow-amber-600/30"
                : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
            }`}
          >
            Featured ({counts.featured})
          </button>
        </div>
      </div>

      {/* Services Table Container */}
      <div className="rounded-2xl bg-[#101827]/80 border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-white/5 border-b border-white/10">
              <tr>
                <th scope="col" className="px-5 py-3.5 font-semibold">
                  Service Title & Overview
                </th>
                <th scope="col" className="px-4 py-3.5 font-semibold">
                  Slug
                </th>
                <th scope="col" className="px-4 py-3.5 font-semibold text-center">
                  Order
                </th>
                <th scope="col" className="px-4 py-3.5 font-semibold text-center">
                  Status
                </th>
                <th scope="col" className="px-4 py-3.5 font-semibold text-center">
                  Featured
                </th>
                <th scope="col" className="px-4 py-3.5 font-semibold">
                  Created
                </th>
                <th scope="col" className="px-5 py-3.5 font-semibold text-right">
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
                      <div className="h-4 w-44 bg-white/10 rounded mb-2" />
                      <div className="h-3 w-64 bg-white/5 rounded" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-4 w-28 bg-white/10 rounded" />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="h-4 w-6 bg-white/10 rounded mx-auto" />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="h-6 w-20 bg-white/10 rounded-full mx-auto" />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="h-6 w-12 bg-white/10 rounded-full mx-auto" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-3 w-20 bg-white/10 rounded" />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="h-7 w-16 bg-white/10 rounded-lg ml-auto" />
                    </td>
                  </tr>
                ))
              ) : filteredServices.length === 0 ? (
                // Empty State
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="max-w-sm mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 mx-auto">
                        <Sparkles className="w-6 h-6 text-violet-400" />
                      </div>
                      <h4 className="text-base font-bold text-white">
                        {search || filterTab !== "all"
                          ? "No matching services found"
                          : "No services created yet"}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {search || filterTab !== "all"
                          ? "Try adjusting your search query or switching filter tabs."
                          : "Start building your offerings catalog by adding your first service."}
                      </p>
                      {search || filterTab !== "all" ? (
                        <button
                          type="button"
                          onClick={() => {
                            setSearch("");
                            setFilterTab("all");
                          }}
                          className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 font-medium border border-white/10 transition-colors"
                        >
                          Clear Filters
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={onAddNew}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md shadow-violet-600/30 transition-all"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add First Service</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                // Rows
                filteredServices.map((service) => {
                  const isUpdatingPublished =
                    updatingIds[service._id] === "published";
                  const isUpdatingFeatured =
                    updatingIds[service._id] === "featured";

                  const createdDate = service.createdAt
                    ? new Date(service.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "—";

                  return (
                    <tr
                      key={service._id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      {/* Title & Short Description */}
                      <td className="px-5 py-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 text-xs font-semibold flex-shrink-0 mt-0.5">
                            {service.icon?.slice(0, 2).toUpperCase() || "SV"}
                          </div>
                          <div className="min-w-0">
                            <span className="font-semibold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                              {service.title}
                            </span>
                            <p className="text-xs text-slate-400 line-clamp-1 max-w-sm mt-0.5">
                              {service.shortDescription}
                            </p>
                            {/* Tags preview */}
                            {service.features && service.features.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1.5">
                                {service.features.slice(0, 2).map((f, i) => (
                                  <span
                                    key={i}
                                    className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10"
                                  >
                                    {f}
                                  </span>
                                ))}
                                {service.features.length > 2 && (
                                  <span className="text-[9px] text-slate-400 self-center">
                                    +{service.features.length - 2} more
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Slug */}
                      <td className="px-4 py-4">
                        <span className="font-mono text-xs text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-1 rounded-md">
                          /{service.slug}
                        </span>
                      </td>

                      {/* Order */}
                      <td className="px-4 py-4 text-center">
                        <span className="text-xs font-mono text-slate-300">
                          {service.order ?? 0}
                        </span>
                      </td>

                      {/* Status / Toggle Published */}
                      <td className="px-4 py-4 text-center">
                        <button
                          type="button"
                          onClick={() => onTogglePublished(service)}
                          disabled={isUpdatingPublished}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all ${
                            service.published
                              ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25"
                              : "bg-slate-500/15 text-slate-400 border-slate-500/30 hover:bg-slate-500/25"
                          }`}
                          title={`Click to ${service.published ? "unpublish" : "publish"}`}
                        >
                          {isUpdatingPublished ? (
                            <Loader2 className="w-3 h-3 animate-spin text-cyan-400" />
                          ) : service.published ? (
                            <CheckCircle className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <XCircle className="w-3 h-3 text-slate-400" />
                          )}
                          <span>{service.published ? "Published" : "Draft"}</span>
                        </button>
                      </td>

                      {/* Featured / Toggle Featured */}
                      <td className="px-4 py-4 text-center">
                        <button
                          type="button"
                          onClick={() => onToggleFeatured(service)}
                          disabled={isUpdatingFeatured}
                          className={`p-1.5 rounded-lg border transition-all ${
                            service.featured
                              ? "bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30"
                              : "bg-white/5 text-slate-400 border-white/10 hover:text-amber-400 hover:bg-white/10"
                          }`}
                          title={`Click to ${service.featured ? "unfeature" : "feature on homepage"}`}
                        >
                          {isUpdatingFeatured ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                          ) : (
                            <Star
                              className={`w-3.5 h-3.5 ${
                                service.featured ? "fill-amber-400 text-amber-400" : ""
                              }`}
                            />
                          )}
                        </button>
                      </td>

                      {/* Created */}
                      <td className="px-4 py-4 text-xs text-slate-400">
                        {createdDate}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => onEdit(service)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/20 transition-all"
                            title="Edit Service"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDelete(service)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all"
                            title="Delete Service"
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
      </div>
    </div>
  );
}
