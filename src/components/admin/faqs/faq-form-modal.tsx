"use client";

import * as React from "react";
import {
  X,
  Plus,
  Sparkles,
  Loader2,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import type { CreateFAQInput, UpdateFAQInput } from "@/services/admin.service";
import type { FAQItem } from "@/types";

export interface FAQFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateFAQInput | UpdateFAQInput) => Promise<void>;
  initialData?: FAQItem | null;
  isSubmitting: boolean;
}

interface FAQFormContentProps {
  initialData?: FAQItem | null;
  onClose: () => void;
  onSubmit: (data: CreateFAQInput | UpdateFAQInput) => Promise<void>;
  isSubmitting: boolean;
}

function FAQFormContent({
  initialData,
  onClose,
  onSubmit,
  isSubmitting,
}: FAQFormContentProps) {
  const isEditing = Boolean(initialData);

  const [question, setQuestion] = React.useState(initialData?.question || "");
  const [answer, setAnswer] = React.useState(initialData?.answer || "");
  const [active, setActive] = React.useState(initialData?.active ?? true);
  const [order, setOrder] = React.useState(initialData?.order ?? 0);

  const [formError, setFormError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!question.trim()) {
      setFormError("Question is required.");
      return;
    }
    if (question.length > 300) {
      setFormError("Question cannot exceed 300 characters.");
      return;
    }
    if (!answer.trim()) {
      setFormError("Answer is required.");
      return;
    }
    if (answer.length > 3000) {
      setFormError("Answer cannot exceed 3000 characters.");
      return;
    }

    const payload: CreateFAQInput = {
      question: question.trim(),
      answer: answer.trim(),
      active,
      order: Number(order) || 0,
    };

    try {
      await onSubmit(payload);
      onClose();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to save FAQ.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              {isEditing ? "Edit FAQ" : "Create New FAQ"}
            </h2>
            <p className="text-xs text-slate-400">
              {isEditing
                ? "Update question text, answer, and visibility."
                : "Add frequently asked questions to guide prospective clients."}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {formError && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-rose-300 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
          <span>{formError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex justify-between">
            <span className="flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Question *</span>
            </span>
            <span className="text-[10px] text-slate-400 font-normal">
              {question.length}/300
            </span>
          </label>
          <input
            type="text"
            required
            maxLength={300}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g. What is your typical turnaround time for a custom Next.js web application?"
            className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex justify-between">
            <span>Detailed Answer *</span>
            <span className="text-[10px] text-slate-400 font-normal">
              {answer.length}/3000
            </span>
          </label>
          <textarea
            required
            rows={5}
            maxLength={3000}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Provide a clear, reassuring, and thorough explanation of your process, deliverables, or pricing structure..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Display Order
            </label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(parseInt(e.target.value, 10) || 0)}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="flex items-center justify-between sm:justify-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div>
              <label className="text-xs font-semibold text-white block">
                Active Status
              </label>
              <span className="text-[10px] text-slate-400 block">
                Visible on public FAQ accordion
              </span>
            </div>
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="w-5 h-5 rounded accent-cyan-500 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-white text-xs font-semibold shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : isEditing ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Update FAQ</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Create FAQ</span>
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
}

export function FAQFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
}: FAQFormModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={isSubmitting ? undefined : onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#101827] border border-white/10 shadow-2xl p-6 sm:p-8 text-slate-100 z-10 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        <FAQFormContent
          key={initialData?._id || "new-faq"}
          initialData={initialData}
          onClose={onClose}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
