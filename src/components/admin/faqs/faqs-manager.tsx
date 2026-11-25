"use client";

import * as React from "react";
import {
  HelpCircle,
  Plus,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { FAQsTable } from "./faqs-table";
import { FAQFormModal } from "./faq-form-modal";
import { DeleteFAQModal } from "./delete-faq-modal";
import {
  getAdminFAQs,
  createAdminFAQ,
  updateAdminFAQ,
  deleteAdminFAQ,
  toggleFAQActive,
  type CreateFAQInput,
  type UpdateFAQInput,
} from "@/services/admin.service";
import type { FAQItem } from "@/types";

export function FAQsManager() {
  const [faqs, setFaqs] = React.useState<FAQItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [successNotice, setSuccessNotice] = React.useState<string | null>(null);

  const [isFormModalOpen, setIsFormModalOpen] = React.useState(false);
  const [editingFAQ, setEditingFAQ] = React.useState<FAQItem | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [deletingFAQ, setDeletingFAQ] = React.useState<FAQItem | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const [updatingIds, setUpdatingIds] = React.useState<
    Record<string, "active" | undefined>
  >({});

  const showSuccess = (msg: string) => {
    setSuccessNotice(msg);
    setTimeout(() => {
      setSuccessNotice((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  const fetchFaqs = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getAdminFAQs({ limit: 100 });
      setFaqs(res.faqs);
    } catch (err) {
      console.error("[FAQs Manager] Failed to load FAQs:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load FAQs. Verify backend server is running."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    let active = true;
    const loadInitial = async () => {
      try {
        const res = await getAdminFAQs({ limit: 100 });
        if (active) {
          setFaqs(res.faqs);
          setIsLoading(false);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load FAQs. Verify backend server is running."
          );
          setIsLoading(false);
        }
      }
    };
    void loadInitial();
    return () => {
      active = false;
    };
  }, []);

  const handleAddNew = () => {
    setEditingFAQ(null);
    setIsFormModalOpen(true);
  };

  const handleEdit = (faq: FAQItem) => {
    setEditingFAQ(faq);
    setIsFormModalOpen(true);
  };

  const handleDeletePrompt = (faq: FAQItem) => {
    setDeletingFAQ(faq);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = async (data: CreateFAQInput | UpdateFAQInput) => {
    setIsSubmitting(true);
    try {
      if (editingFAQ) {
        const updated = await updateAdminFAQ(editingFAQ._id, data);
        setFaqs((prev) =>
          prev.map((f) => (f._id === updated._id ? updated : f))
        );
        showSuccess(`FAQ updated successfully.`);
      } else {
        const created = await createAdminFAQ(data as CreateFAQInput);
        setFaqs((prev) => [created, ...prev]);
        showSuccess(`FAQ added successfully.`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      await deleteAdminFAQ(id);
      setFaqs((prev) => prev.filter((f) => f._id !== id));
      setIsDeleteModalOpen(false);
      setDeletingFAQ(null);
      showSuccess("FAQ deleted successfully.");
    } catch (err) {
      console.error("[FAQs Manager] Delete error:", err);
      setError(err instanceof Error ? err.message : "Failed to delete FAQ.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleActive = async (faq: FAQItem) => {
    const id = faq._id;
    setUpdatingIds((prev) => ({ ...prev, [id]: "active" }));
    try {
      const updated = await toggleFAQActive(id, faq.active);
      setFaqs((prev) =>
        prev.map((item) => (item._id === id ? { ...item, active: updated.active } : item))
      );
      showSuccess(
        `FAQ status set to ${updated.active ? "Active" : "Inactive"}.`
      );
    } catch (err) {
      console.error("[FAQs Manager] Toggle active error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to update FAQ status."
      );
    } finally {
      setUpdatingIds((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-2xl bg-[#101827]/80 border border-white/10 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <HelpCircle className="w-5 h-5 text-cyan-400" />
              <span>FAQs Management</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              {faqs.length} Total
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Create, edit, reorder, and activate frequently asked questions for the client FAQ section.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchFaqs}
            disabled={isLoading}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-medium transition-all disabled:opacity-50"
            title="Refresh FAQs"
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin text-cyan-400" : ""}`}
            />
          </button>
          <button
            type="button"
            onClick={handleAddNew}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-white text-xs font-semibold shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>Add New FAQ</span>
          </button>
        </div>
      </div>

      {successNotice && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-300 text-xs animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{successNotice}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between text-rose-300 text-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
          <button
            type="button"
            onClick={fetchFaqs}
            className="px-2.5 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-[11px] font-medium"
          >
            Retry
          </button>
        </div>
      )}

      <FAQsTable
        faqs={faqs}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDeletePrompt}
        onToggleActive={handleToggleActive}
        onAddNew={handleAddNew}
        updatingIds={updatingIds}
      />

      <FAQFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingFAQ}
        isSubmitting={isSubmitting}
      />

      <DeleteFAQModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        faq={deletingFAQ}
        isDeleting={isDeleting}
      />
    </div>
  );
}
