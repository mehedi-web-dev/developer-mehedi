"use client";

import * as React from "react";
import {
  Search,
  Trash2,
  ExternalLink,
  Inbox,
} from "lucide-react";
import type { ContactItem } from "@/types";

export interface ContactsTableProps {
  contacts: ContactItem[];
  isLoading: boolean;
  onViewDetail: (contact: ContactItem) => void;
  onDelete: (contact: ContactItem) => void;
}

export function ContactsTable({
  contacts,
  isLoading,
  onViewDetail,
  onDelete,
}: ContactsTableProps) {
  const [search, setSearch] = React.useState("");
  const [filterTab, setFilterTab] = React.useState<"all" | "new" | "read" | "replied">("all");

  const filteredContacts = React.useMemo(() => {
    return contacts.filter((c) => {
      const q = search.toLowerCase();
      const matchesSearch =
        search === "" ||
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.subject.toLowerCase().includes(q) ||
        c.message.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      if (filterTab !== "all" && c.status !== filterTab) return false;

      return true;
    });
  }, [contacts, search, filterTab]);

  const counts = React.useMemo(() => {
    const newCount = contacts.filter((c) => c.status === "new").length;
    const readCount = contacts.filter((c) => c.status === "read").length;
    const repliedCount = contacts.filter((c) => c.status === "replied").length;
    return {
      all: contacts.length,
      new: newCount,
      read: readCount,
      replied: repliedCount,
    };
  }, [contacts]);

  const getStatusBadge = (st: ContactItem["status"]) => {
    switch (st) {
      case "new":
        return "bg-rose-500/20 text-rose-300 border-rose-500/30";
      case "read":
        return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
      case "replied":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30";
    }
  };

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
            placeholder="Search inquiries by sender, email, subject, or text..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setFilterTab("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filterTab === "all"
                ? "bg-violet-600 text-white shadow-sm"
                : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
            }`}
          >
            All ({counts.all})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("new")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filterTab === "new"
                ? "bg-rose-600 text-white shadow-sm"
                : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
            }`}
          >
            New ({counts.new})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("read")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filterTab === "read"
                ? "bg-cyan-600 text-white shadow-sm"
                : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
            }`}
          >
            Read ({counts.read})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("replied")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filterTab === "replied"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
            }`}
          >
            Replied ({counts.replied})
          </button>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="rounded-2xl bg-[#101827]/80 border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-white/5 border-b border-white/10">
              <tr>
                <th scope="col" className="px-5 py-3.5 font-semibold">
                  Sender
                </th>
                <th scope="col" className="px-4 py-3.5 font-semibold">
                  Subject & Snippet
                </th>
                <th scope="col" className="px-4 py-3.5 font-semibold text-center">
                  Status
                </th>
                <th scope="col" className="px-4 py-3.5 font-semibold">
                  Received
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
                      <div className="h-4 w-32 bg-white/10 rounded mb-1.5" />
                      <div className="h-3 w-40 bg-white/5 rounded" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-4 w-48 bg-white/10 rounded mb-1.5" />
                      <div className="h-3 w-64 bg-white/5 rounded" />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="h-6 w-16 bg-white/10 rounded-full mx-auto" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-3 w-20 bg-white/10 rounded" />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="h-7 w-20 bg-white/10 rounded-lg ml-auto" />
                    </td>
                  </tr>
                ))
              ) : filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="max-w-sm mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 mx-auto">
                        <Inbox className="w-6 h-6 text-violet-400" />
                      </div>
                      <h4 className="text-base font-bold text-white">
                        {search || filterTab !== "all"
                          ? "No matching messages found"
                          : "No inquiries in inbox yet"}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {search || filterTab !== "all"
                          ? "Try clearing filters or search queries."
                          : "Messages submitted via the portfolio contact form will appear here."}
                      </p>
                      {(search || filterTab !== "all") && (
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
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredContacts.map((c) => {
                  const dateStr = c.createdAt
                    ? new Date(c.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "—";

                  return (
                    <tr
                      key={c._id}
                      className={`hover:bg-white/[0.02] transition-colors group cursor-pointer ${
                        c.status === "new" ? "bg-rose-500/[0.02]" : ""
                      }`}
                      onClick={() => onViewDetail(c)}
                    >
                      {/* Sender */}
                      <td className="px-5 py-4">
                        <div className="space-y-0.5">
                          <p className="font-semibold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                            {c.status === "new" && (
                              <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
                            )}
                            <span>{c.name}</span>
                          </p>
                          <p className="text-xs font-mono text-slate-400">
                            {c.email}
                          </p>
                        </div>
                      </td>

                      {/* Subject & Message Preview */}
                      <td className="px-4 py-4">
                        <div className="space-y-0.5 max-w-md">
                          <p className="font-medium text-slate-200 line-clamp-1">
                            {c.subject}
                          </p>
                          <p className="text-xs text-slate-400 line-clamp-1">
                            {c.message}
                          </p>
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="px-4 py-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${getStatusBadge(
                            c.status
                          )}`}
                        >
                          {c.status}
                        </span>
                      </td>

                      {/* Received Date */}
                      <td className="px-4 py-4 text-xs text-slate-400 whitespace-nowrap">
                        {dateStr}
                      </td>

                      {/* Actions */}
                      <td
                        className="px-5 py-4 text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => onViewDetail(c)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/20 transition-all text-xs inline-flex items-center gap-1"
                            title="Open Message"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">View</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => onDelete(c)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all"
                            title="Delete Inquiry"
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
