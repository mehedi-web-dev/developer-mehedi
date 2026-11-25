"use client";

import * as React from "react";
import {
  X,
  Mail,
  Calendar,
  User,
  ExternalLink,
  Trash2,
  Loader2,
} from "lucide-react";
import type { ContactItem } from "@/types";

export interface ContactDetailModalProps {
  contact: ContactItem | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (id: string, status: "new" | "read" | "replied") => Promise<void>;
  onDeletePrompt: (contact: ContactItem) => void;
  isUpdatingStatus: boolean;
}

export function ContactDetailModal({
  contact,
  isOpen,
  onClose,
  onStatusChange,
  onDeletePrompt,
  isUpdatingStatus,
}: ContactDetailModalProps) {
  if (!isOpen || !contact) return null;

  const dateStr = contact.createdAt
    ? new Date(contact.createdAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : "—";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl rounded-2xl bg-[#101827] border border-white/10 shadow-2xl p-6 sm:p-8 text-slate-100 z-10 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10 mb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusBadge(
                  contact.status
                )}`}
              >
                {contact.status}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{dateStr}</span>
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight pt-1">
              {contact.subject}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sender Info Card */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-bold text-white">{contact.name}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <a
                href={`mailto:${contact.email}`}
                className="hover:text-cyan-400 hover:underline transition-colors"
              >
                {contact.email}
              </a>
            </div>
          </div>

          <a
            href={`mailto:${contact.email}?subject=Re: ${encodeURIComponent(contact.subject)}`}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-violet-600/30 hover:bg-violet-600/50 text-violet-200 text-xs font-semibold border border-violet-500/40 transition-colors self-start sm:self-auto"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open in Mail Client</span>
          </a>
        </div>

        {/* Full Message Content */}
        <div className="space-y-2 mb-8">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Inquiry Message
          </label>
          <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-sm text-slate-200 whitespace-pre-wrap leading-relaxed min-h-[140px]">
            {contact.message}
          </div>
        </div>

        {/* Status Actions & Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-400">Set Status:</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onStatusChange(contact._id, "new")}
                disabled={isUpdatingStatus || contact.status === "new"}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                  contact.status === "new"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/40 opacity-70 cursor-default"
                    : "bg-white/5 text-slate-400 hover:text-white border-white/10"
                }`}
              >
                New
              </button>
              <button
                type="button"
                onClick={() => onStatusChange(contact._id, "read")}
                disabled={isUpdatingStatus || contact.status === "read"}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                  contact.status === "read"
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 opacity-70 cursor-default"
                    : "bg-white/5 text-slate-400 hover:text-white border-white/10"
                }`}
              >
                Read
              </button>
              <button
                type="button"
                onClick={() => onStatusChange(contact._id, "replied")}
                disabled={isUpdatingStatus || contact.status === "replied"}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                  contact.status === "replied"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 opacity-70 cursor-default"
                    : "bg-white/5 text-slate-400 hover:text-white border-white/10"
                }`}
              >
                Replied
              </button>
            </div>
            {isUpdatingStatus && (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400 ml-1" />
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onDeletePrompt(contact);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-medium border border-rose-500/20 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Message</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium border border-white/10 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
