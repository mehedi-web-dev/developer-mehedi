"use client";

import * as React from "react";
import Image from "next/image";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Star,
  CheckCircle,
  XCircle,
  Loader2,
  User,
  MessageSquareQuote,
} from "lucide-react";
import type { ReviewItem } from "@/types";

export interface ReviewsTableProps {
  reviews: ReviewItem[];
  isLoading: boolean;
  onEdit: (review: ReviewItem) => void;
  onDelete: (review: ReviewItem) => void;
  onToggleApproved: (review: ReviewItem) => Promise<void>;
  onToggleFeatured: (review: ReviewItem) => Promise<void>;
  onAddNew: () => void;
  updatingIds: Record<string, "approved" | "featured" | undefined>;
}

export function ReviewsTable({
  reviews,
  isLoading,
  onEdit,
  onDelete,
  onToggleApproved,
  onToggleFeatured,
  onAddNew,
  updatingIds,
}: ReviewsTableProps) {
  const [search, setSearch] = React.useState("");
  const [filterTab, setFilterTab] = React.useState<"all" | "approved" | "pending" | "featured">("all");

  const filteredReviews = React.useMemo(() => {
    return reviews.filter((r) => {
      const q = search.toLowerCase();
      const matchesSearch =
        search === "" ||
        r.clientName.toLowerCase().includes(q) ||
        (r.clientPosition && r.clientPosition.toLowerCase().includes(q)) ||
        r.review.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      if (filterTab === "approved" && !r.approved) return false;
      if (filterTab === "pending" && r.approved) return false;
      if (filterTab === "featured" && !r.featured) return false;

      return true;
    });
  }, [reviews, search, filterTab]);

  const counts = React.useMemo(() => {
    const approved = reviews.filter((r) => r.approved).length;
    const featured = reviews.filter((r) => r.featured).length;
    return {
      all: reviews.length,
      approved,
      pending: reviews.length - approved,
      featured,
    };
  }, [reviews]);

  return (
    <div className="space-y-4">
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-2xl bg-[#101827]/80 border border-white/10 shadow-lg">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reviews by client, position, or quote..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setFilterTab("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filterTab === "all"
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
            }`}
          >
            All ({counts.all})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("approved")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filterTab === "approved"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
            }`}
          >
            Approved ({counts.approved})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("pending")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filterTab === "pending"
                ? "bg-slate-600 text-white shadow-sm"
                : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
            }`}
          >
            Pending ({counts.pending})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("featured")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filterTab === "featured"
                ? "bg-violet-600 text-white shadow-sm"
                : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
            }`}
          >
            Featured ({counts.featured})
          </button>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="rounded-2xl bg-[#101827]/80 border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-white/5 border-b border-white/10">
              <tr>
                <th scope="col" className="px-5 py-3.5 font-semibold">
                  Client & Testimonial
                </th>
                <th scope="col" className="px-4 py-3.5 font-semibold">
                  Rating
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
                  Date
                </th>
                <th scope="col" className="px-5 py-3.5 font-semibold text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-5 py-4">
                      <div className="h-4 w-40 bg-white/10 rounded mb-1.5" />
                      <div className="h-3 w-64 bg-white/5 rounded" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-4 w-20 bg-white/10 rounded" />
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
                      <div className="h-7 w-16 bg-white/10 rounded-lg ml-auto" />
                    </td>
                  </tr>
                ))
              ) : filteredReviews.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="max-w-sm mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 mx-auto">
                        <MessageSquareQuote className="w-6 h-6 text-amber-400" />
                      </div>
                      <h4 className="text-base font-bold text-white">
                        {search || filterTab !== "all"
                          ? "No matching testimonials found"
                          : "No client reviews recorded yet"}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {search || filterTab !== "all"
                          ? "Try clearing filters or search queries."
                          : "Add your first client endorsement to feature on the homepage."}
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
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-md shadow-amber-600/30 transition-all"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add First Review</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredReviews.map((r) => {
                  const isUpdatingApproved = updatingIds[r._id] === "approved";
                  const isUpdatingFeatured = updatingIds[r._id] === "featured";
                  const dateStr = r.createdAt
                    ? new Date(r.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "—";

                  return (
                    <tr
                      key={r._id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      {/* Client & Review */}
                      <td className="px-5 py-4">
                        <div className="flex items-start gap-3">
                          <div className="relative w-9 h-9 rounded-full overflow-hidden bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            {r.clientImage ? (
                              <Image
                                src={r.clientImage}
                                alt={r.clientName}
                                fill
                                className="object-cover"
                                sizes="36px"
                                unoptimized={r.clientImage.startsWith("http")}
                              />
                            ) : (
                              <User className="w-4 h-4 text-slate-400" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <span className="font-semibold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                              {r.clientName}
                            </span>
                            {r.clientPosition && (
                              <p className="text-[11px] text-slate-400 line-clamp-1">
                                {r.clientPosition}
                              </p>
                            )}
                            <p className="text-xs text-slate-300 line-clamp-2 mt-1 italic max-w-md">
                              &ldquo;{r.review}&rdquo;
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Rating */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < r.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-slate-600"
                              }`}
                            />
                          ))}
                          <span className="text-xs font-semibold text-white ml-1">
                            {r.rating}.0
                          </span>
                        </div>
                      </td>

                      {/* Order */}
                      <td className="px-4 py-4 text-center">
                        <span className="text-xs font-mono text-slate-300">
                          {r.order ?? 0}
                        </span>
                      </td>

                      {/* Approval Toggle */}
                      <td className="px-4 py-4 text-center">
                        <button
                          type="button"
                          onClick={() => onToggleApproved(r)}
                          disabled={isUpdatingApproved}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all ${
                            r.approved
                              ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25"
                              : "bg-slate-500/15 text-slate-400 border-slate-500/30 hover:bg-slate-500/25"
                          }`}
                          title={`Click to ${r.approved ? "unapprove" : "approve"}`}
                        >
                          {isUpdatingApproved ? (
                            <Loader2 className="w-3 h-3 animate-spin text-amber-400" />
                          ) : r.approved ? (
                            <CheckCircle className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <XCircle className="w-3 h-3 text-slate-400" />
                          )}
                          <span>{r.approved ? "Approved" : "Pending"}</span>
                        </button>
                      </td>

                      {/* Featured Toggle */}
                      <td className="px-4 py-4 text-center">
                        <button
                          type="button"
                          onClick={() => onToggleFeatured(r)}
                          disabled={isUpdatingFeatured}
                          className={`p-1.5 rounded-lg border transition-all ${
                            r.featured
                              ? "bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30"
                              : "bg-white/5 text-slate-400 border-white/10 hover:text-amber-400 hover:bg-white/10"
                          }`}
                          title={`Click to ${r.featured ? "unfeature" : "feature on homepage"}`}
                        >
                          {isUpdatingFeatured ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                          ) : (
                            <Star
                              className={`w-3.5 h-3.5 ${
                                r.featured ? "fill-amber-400 text-amber-400" : ""
                              }`}
                            />
                          )}
                        </button>
                      </td>

                      {/* Created Date */}
                      <td className="px-4 py-4 text-xs text-slate-400 whitespace-nowrap">
                        {dateStr}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => onEdit(r)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/20 transition-all"
                            title="Edit Review"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDelete(r)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all"
                            title="Delete Review"
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
