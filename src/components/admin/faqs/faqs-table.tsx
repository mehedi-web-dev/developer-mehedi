"use client";

import * as React from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Loader2,
  HelpCircle,
} from "lucide-react";
import type { FAQItem } from "@/types";

export interface FAQsTableProps {
  faqs: FAQItem[];
  isLoading: boolean;
  onEdit: (faq: FAQItem) => void;
  onDelete: (faq: FAQItem) => void;
  onToggleActive: (faq: FAQItem) => Promise<void>;
  onAddNew: () => void;
  updatingIds: Record<string, "active" | undefined>;
}

export function FAQsTable({
  faqs,
  isLoading,
  onEdit,
  onDelete,
  onToggleActive,
  onAddNew,
  updatingIds,
}: FAQsTableProps) {
  const [search, setSearch] = React.useState("");
  const [filterTab, setFilterTab] = React.useState<"all" | "active" | "inactive">("all");

  const filteredFaqs = React.useMemo(() => {
    return faqs.filter((f) => {
      const q = search.toLowerCase();
      const matchesSearch =
        search === "" ||
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      if (filterTab === "active" && !f.active) return false;
      if (filterTab === "inactive" && f.active) return false;

      return true;
    });
  }, [faqs, search, filterTab]);

  const counts = React.useMemo(() => {
    const active = faqs.filter((f) => f.active).length;
    return {
      all: faqs.length,
      active,
      inactive: faqs.length - active,
    };
  }, [faqs]);

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
            placeholder="Search FAQs by question or answer keywords..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setFilterTab("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filterTab === "all"
                ? "bg-cyan-600 text-white shadow-sm"
                : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
            }`}
          >
            All ({counts.all})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("active")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filterTab === "active"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
            }`}
          >
            Active ({counts.active})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("inactive")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filterTab === "inactive"
                ? "bg-slate-600 text-white shadow-sm"
                : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
            }`}
          >
            Inactive ({counts.inactive})
          </button>
        </div>
      </div>

      {/* FAQs Table */}
      <div className="rounded-2xl bg-[#101827]/80 border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-white/5 border-b border-white/10">
              <tr>
                <th scope="col" className="px-5 py-3.5 font-semibold">
                  Question & Answer
                </th>
                <th scope="col" className="px-4 py-3.5 font-semibold text-center">
                  Order
                </th>
                <th scope="col" className="px-4 py-3.5 font-semibold text-center">
                  Status
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
                      <div className="h-4 w-52 bg-white/10 rounded mb-1.5" />
                      <div className="h-3 w-80 bg-white/5 rounded" />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="h-4 w-6 bg-white/10 rounded mx-auto" />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="h-6 w-20 bg-white/10 rounded-full mx-auto" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-3 w-16 bg-white/10 rounded" />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="h-7 w-16 bg-white/10 rounded-lg ml-auto" />
                    </td>
                  </tr>
                ))
              ) : filteredFaqs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="max-w-sm mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 mx-auto">
                        <HelpCircle className="w-6 h-6 text-cyan-400" />
                      </div>
                      <h4 className="text-base font-bold text-white">
                        {search || filterTab !== "all"
                          ? "No matching FAQs found"
                          : "No FAQs added yet"}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {search || filterTab !== "all"
                          ? "Try clearing filters or search keywords."
                          : "Create frequently asked questions for your homepage FAQ accordion."}
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
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md shadow-cyan-600/30 transition-all"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add First FAQ</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredFaqs.map((f) => {
                  const isUpdatingActive = updatingIds[f._id] === "active";
                  const dateStr = f.createdAt
                    ? new Date(f.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "—";

                  return (
                    <tr
                      key={f._id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      {/* Question & Answer */}
                      <td className="px-5 py-4">
                        <div className="space-y-1 max-w-xl">
                          <p className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                            {f.question}
                          </p>
                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                            {f.answer}
                          </p>
                        </div>
                      </td>

                      {/* Order */}
                      <td className="px-4 py-4 text-center">
                        <span className="text-xs font-mono text-slate-300">
                          {f.order ?? 0}
                        </span>
                      </td>

                      {/* Active Status Toggle */}
                      <td className="px-4 py-4 text-center">
                        <button
                          type="button"
                          onClick={() => onToggleActive(f)}
                          disabled={isUpdatingActive}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all ${
                            f.active
                              ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25"
                              : "bg-slate-500/15 text-slate-400 border-slate-500/30 hover:bg-slate-500/25"
                          }`}
                          title={`Click to ${f.active ? "deactivate" : "activate"}`}
                        >
                          {isUpdatingActive ? (
                            <Loader2 className="w-3 h-3 animate-spin text-cyan-400" />
                          ) : f.active ? (
                            <CheckCircle className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <XCircle className="w-3 h-3 text-slate-400" />
                          )}
                          <span>{f.active ? "Active" : "Inactive"}</span>
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
                            onClick={() => onEdit(f)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/20 transition-all"
                            title="Edit FAQ"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDelete(f)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all"
                            title="Delete FAQ"
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
