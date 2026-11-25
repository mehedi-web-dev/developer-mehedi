"use client";

import * as React from "react";
import { AlertTriangle, Trash2, X, Loader2 } from "lucide-react";
import type { ProjectItem } from "@/types";

export interface DeleteProjectModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
  isDeleting: boolean;
}

export function DeleteProjectModal({
  project,
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
}: DeleteProjectModalProps) {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={isDeleting ? undefined : onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md rounded-2xl bg-[#101827] border border-rose-500/30 shadow-2xl p-6 text-slate-100 z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <h3 className="text-lg font-bold text-white mb-2">Delete Project</h3>
        <p className="text-sm text-slate-300 mb-4 leading-relaxed">
          Are you sure you want to permanently delete{" "}
          <span className="font-semibold text-rose-300">
            &ldquo;{project.title}&rdquo;
          </span>
          ? This will remove the project from your database and public portfolio listings.
        </p>

        <div className="p-3 rounded-xl bg-white/5 border border-white/10 mb-6 text-xs text-slate-400 space-y-1">
          <div className="flex justify-between">
            <span>Slug:</span>
            <span className="font-mono text-cyan-300">/{project.slug}</span>
          </div>
          <div className="flex justify-between">
            <span>Category:</span>
            <span className="text-slate-200">{project.category}</span>
          </div>
          <div className="flex justify-between">
            <span>Visibility:</span>
            <span className={project.published ? "text-emerald-400 font-medium" : "text-slate-400"}>
              {project.published ? "Published" : "Draft"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(project._id)}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-lg shadow-rose-600/20 transition-all disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                <span>Delete Project</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
