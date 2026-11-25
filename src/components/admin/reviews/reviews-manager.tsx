"use client";

import * as React from "react";
import {
  MessageSquareQuote,
  Plus,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { ReviewsTable } from "./reviews-table";
import { ReviewFormModal } from "./review-form-modal";
import { DeleteReviewModal } from "./delete-review-modal";
import {
  getAdminReviews,
  createAdminReview,
  updateAdminReview,
  deleteAdminReview,
  toggleReviewApproved,
  toggleReviewFeatured,
  type CreateReviewInput,
  type UpdateReviewInput,
} from "@/services/admin.service";
import type { ReviewItem } from "@/types";

export function ReviewsManager() {
  const [reviews, setReviews] = React.useState<ReviewItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [successNotice, setSuccessNotice] = React.useState<string | null>(null);

  const [isFormModalOpen, setIsFormModalOpen] = React.useState(false);
  const [editingReview, setEditingReview] = React.useState<ReviewItem | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [deletingReview, setDeletingReview] = React.useState<ReviewItem | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const [updatingIds, setUpdatingIds] = React.useState<
    Record<string, "approved" | "featured" | undefined>
  >({});

  const showSuccess = (msg: string) => {
    setSuccessNotice(msg);
    setTimeout(() => {
      setSuccessNotice((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  const fetchReviews = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getAdminReviews({ limit: 100 });
      setReviews(res.reviews);
    } catch (err) {
      console.error("[Reviews Manager] Failed to load reviews:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load reviews. Verify backend server is running."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    let active = true;
    const loadInitial = async () => {
      try {
        const res = await getAdminReviews({ limit: 100 });
        if (active) {
          setReviews(res.reviews);
          setIsLoading(false);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load reviews. Verify backend server is running."
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
    setEditingReview(null);
    setIsFormModalOpen(true);
  };

  const handleEdit = (r: ReviewItem) => {
    setEditingReview(r);
    setIsFormModalOpen(true);
  };

  const handleDeletePrompt = (r: ReviewItem) => {
    setDeletingReview(r);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = async (data: CreateReviewInput | UpdateReviewInput) => {
    setIsSubmitting(true);
    try {
      if (editingReview) {
        const updated = await updateAdminReview(editingReview._id, data);
        setReviews((prev) =>
          prev.map((r) => (r._id === updated._id ? updated : r))
        );
        showSuccess(`Review from "${updated.clientName}" updated.`);
      } else {
        const created = await createAdminReview(data as CreateReviewInput);
        setReviews((prev) => [created, ...prev]);
        showSuccess(`Testimonial from "${created.clientName}" created.`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      await deleteAdminReview(id);
      setReviews((prev) => prev.filter((r) => r._id !== id));
      setIsDeleteModalOpen(false);
      setDeletingReview(null);
      showSuccess("Review deleted successfully.");
    } catch (err) {
      console.error("[Reviews Manager] Delete error:", err);
      setError(err instanceof Error ? err.message : "Failed to delete review.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleApproved = async (r: ReviewItem) => {
    const id = r._id;
    setUpdatingIds((prev) => ({ ...prev, [id]: "approved" }));
    try {
      const updated = await toggleReviewApproved(id, Boolean(r.approved));
      setReviews((prev) =>
        prev.map((item) => (item._id === id ? { ...item, approved: updated.approved } : item))
      );
      showSuccess(
        `Review from "${r.clientName}" is now ${
          updated.approved ? "Approved" : "Pending"
        }.`
      );
    } catch (err) {
      console.error("[Reviews Manager] Toggle approved error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update review approval status."
      );
    } finally {
      setUpdatingIds((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const handleToggleFeatured = async (r: ReviewItem) => {
    const id = r._id;
    setUpdatingIds((prev) => ({ ...prev, [id]: "featured" }));
    try {
      const updated = await toggleReviewFeatured(id, Boolean(r.featured));
      setReviews((prev) =>
        prev.map((item) => (item._id === id ? { ...item, featured: updated.featured } : item))
      );
      showSuccess(
        `Review from "${r.clientName}" ${
          updated.featured ? "marked as featured" : "removed from featured"
        }.`
      );
    } catch (err) {
      console.error("[Reviews Manager] Toggle featured error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update review featured status."
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
              <MessageSquareQuote className="w-5 h-5 text-amber-400" />
              <span>Reviews & Testimonials Management</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
              {reviews.length} Total
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Moderate client testimonials, edit ratings, upload avatars, and approve reviews for public portfolio display.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchReviews}
            disabled={isLoading}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-medium transition-all disabled:opacity-50"
            title="Refresh testimonials"
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin text-amber-400" : ""}`}
            />
          </button>
          <button
            type="button"
            onClick={handleAddNew}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-violet-600 hover:from-amber-500 hover:to-violet-500 text-white text-xs font-semibold shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Review</span>
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
            onClick={fetchReviews}
            className="px-2.5 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-[11px] font-medium"
          >
            Retry
          </button>
        </div>
      )}

      <ReviewsTable
        reviews={reviews}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDeletePrompt}
        onToggleApproved={handleToggleApproved}
        onToggleFeatured={handleToggleFeatured}
        onAddNew={handleAddNew}
        updatingIds={updatingIds}
      />

      <ReviewFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingReview}
        isSubmitting={isSubmitting}
      />

      <DeleteReviewModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        review={deletingReview}
        isDeleting={isDeleting}
      />
    </div>
  );
}
