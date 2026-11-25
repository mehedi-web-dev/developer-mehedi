"use client";

import * as React from "react";
import { AlertTriangle, Trash2, X, Loader2 } from "lucide-react";
import type { ReviewItem } from "@/types";

export interface DeleteReviewModalProps {
  review: ReviewItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
  isDeleting: boolean;
}

export function DeleteReviewModal({
  review,
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
}: DeleteReviewModalProps) {
  if (!isOpen || !review) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={isDeleting ? undefined : onClose}
        aria-hidden="true"
      />

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

        <h3 className="text-lg font-bold text-white mb-2">Delete Review</h3>
        <p className="text-sm text-slate-300 mb-4 leading-relaxed">
          Are you sure you want to delete the testimonial from{" "}
          <span className="font-semibold text-rose-300">
            &ldquo;{review.clientName}&rdquo;
          </span>
          ? This will remove it from database records and the portfolio website.
        </p>

        <div className="p-3 rounded-xl bg-white/5 border border-white/10 mb-6 text-xs text-slate-400 space-y-1">
          <div className="flex justify-between">
            <span>Client Rating:</span>
            <span className="text-amber-400 font-semibold">{review.rating} / 5 Stars</span>
          </div>
          {review.clientPosition && (
            <div className="flex justify-between">
              <span>Position:</span>
              <span className="text-slate-300">{review.clientPosition}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Status:</span>
            <span className={review.approved ? "text-emerald-400" : "text-slate-400"}>
              {review.approved ? "Approved" : "Pending"}
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
            onClick={() => onConfirm(review._id)}
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
                <span>Delete Review</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
