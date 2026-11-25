"use client";

import * as React from "react";
import Image from "next/image";
import {
  X,
  Plus,
  Sparkles,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Star,
  UploadCloud,
  RefreshCw,
  User,
} from "lucide-react";
import { uploadSingleImage, type CreateReviewInput, type UpdateReviewInput } from "@/services/admin.service";
import type { ReviewItem } from "@/types";

export interface ReviewFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateReviewInput | UpdateReviewInput) => Promise<void>;
  initialData?: ReviewItem | null;
  isSubmitting: boolean;
}

interface ReviewFormContentProps {
  initialData?: ReviewItem | null;
  onClose: () => void;
  onSubmit: (data: CreateReviewInput | UpdateReviewInput) => Promise<void>;
  isSubmitting: boolean;
}

function ReviewFormContent({
  initialData,
  onClose,
  onSubmit,
  isSubmitting,
}: ReviewFormContentProps) {
  const isEditing = Boolean(initialData);

  const [clientName, setClientName] = React.useState(initialData?.clientName || "");
  const [clientPosition, setClientPosition] = React.useState(initialData?.clientPosition || "");
  const [clientImage, setClientImage] = React.useState(initialData?.clientImage || "");
  const [review, setReview] = React.useState(initialData?.review || "");
  const [rating, setRating] = React.useState(initialData?.rating ?? 5);
  const [featured, setFeatured] = React.useState(initialData?.featured ?? false);
  const [approved, setApproved] = React.useState(initialData?.approved ?? true);
  const [order, setOrder] = React.useState(initialData?.order ?? 0);

  const [formError, setFormError] = React.useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    setFormError(null);
    try {
      const res = await uploadSingleImage(file);
      setClientImage(res.url || res.displayUrl);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to upload avatar");
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!clientName.trim()) {
      setFormError("Client name is required.");
      return;
    }
    if (clientName.length > 100) {
      setFormError("Client name cannot exceed 100 characters.");
      return;
    }
    if (!review.trim()) {
      setFormError("Review text is required.");
      return;
    }
    if (review.length > 2000) {
      setFormError("Review text cannot exceed 2000 characters.");
      return;
    }
    if (rating < 1 || rating > 5) {
      setFormError("Rating must be between 1 and 5 stars.");
      return;
    }

    const payload: CreateReviewInput = {
      clientName: clientName.trim(),
      clientPosition: clientPosition.trim(),
      clientImage: clientImage.trim(),
      review: review.trim(),
      rating: Number(rating),
      featured,
      approved,
      order: Number(order) || 0,
    };

    try {
      await onSubmit(payload);
      onClose();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to save review.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              {isEditing ? "Edit Testimonial" : "Add Client Review"}
            </h2>
            <p className="text-xs text-slate-400">
              {isEditing
                ? "Update client endorsement, ratings, and approval state."
                : "Record client feedback and testimonials for portfolio display."}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex justify-between">
              <span>Client Name *</span>
              <span className="text-[10px] text-slate-400 font-normal">
                {clientName.length}/100
              </span>
            </label>
            <input
              type="text"
              required
              maxLength={100}
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g. John Anderson"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Position & Organization
            </label>
            <input
              type="text"
              maxLength={150}
              value={clientPosition}
              onChange={(e) => setClientPosition(e.target.value)}
              placeholder="e.g. Founder at TechCorp"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            />
          </div>
        </div>

        {/* Rating Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
            <span>Rating *</span>
            <span className="text-amber-400 font-bold text-xs">{rating} of 5 Stars</span>
          </label>
          <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
            {[1, 2, 3, 4, 5].map((starValue) => (
              <button
                key={starValue}
                type="button"
                onClick={() => setRating(starValue)}
                className="p-1 rounded-lg hover:scale-110 transition-transform focus:outline-none"
              >
                <Star
                  className={`w-6 h-6 transition-colors ${
                    starValue <= rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-600 hover:text-slate-400"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Review Text */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex justify-between">
            <span>Client Testimonial *</span>
            <span className="text-[10px] text-slate-400 font-normal">
              {review.length}/2000
            </span>
          </label>
          <textarea
            required
            rows={4}
            maxLength={2000}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="What did the client say about the experience, project outcome, and quality of work?..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
          />
        </div>

        {/* Avatar Upload / URL */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">
            Client Avatar (Image URL or Upload)
          </label>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-black/40 border border-white/10 flex items-center justify-center flex-shrink-0">
              {clientImage ? (
                <Image
                  src={clientImage}
                  alt={clientName || "Avatar"}
                  fill
                  className="object-cover"
                  sizes="48px"
                  unoptimized={clientImage.startsWith("http")}
                />
              ) : (
                <User className="w-5 h-5 text-slate-400" />
              )}
            </div>

            <div className="flex-1 min-w-0 space-y-1">
              <input
                type="url"
                value={clientImage}
                onChange={(e) => setClientImage(e.target.value)}
                placeholder="https://example.com/client-photo.jpg"
                className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingImage || isSubmitting}
                  className="inline-flex items-center gap-1.5 text-[11px] text-amber-400 hover:text-amber-300 font-medium"
                >
                  {isUploadingImage ? (
                    <RefreshCw className="w-3 h-3 animate-spin" />
                  ) : (
                    <UploadCloud className="w-3 h-3" />
                  )}
                  <span>{isUploadingImage ? "Uploading to ImgBB..." : "Upload photo"}</span>
                </button>
                {clientImage && (
                  <button
                    type="button"
                    onClick={() => setClientImage("")}
                    className="text-[11px] text-rose-400 hover:text-rose-300"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Switches: Approved, Featured, Order */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/10">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Display Order
            </label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(parseInt(e.target.value, 10) || 0)}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center justify-between sm:justify-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div>
              <label className="text-xs font-semibold text-white block">
                Approved
              </label>
              <span className="text-[10px] text-slate-400 block">
                Visible on public site
              </span>
            </div>
            <input
              type="checkbox"
              checked={approved}
              onChange={(e) => setApproved(e.target.checked)}
              className="w-5 h-5 rounded accent-emerald-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between sm:justify-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div>
              <label className="text-xs font-semibold text-white block">
                Featured
              </label>
              <span className="text-[10px] text-slate-400 block">
                Showcase prominently
              </span>
            </div>
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-5 h-5 rounded accent-amber-500 cursor-pointer"
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-violet-600 hover:from-amber-500 hover:to-violet-500 text-white text-xs font-semibold shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : isEditing ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Update Review</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Create Review</span>
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
}

export function ReviewFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
}: ReviewFormModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={isSubmitting ? undefined : onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#101827] border border-white/10 shadow-2xl p-6 sm:p-8 text-slate-100 z-10 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        <ReviewFormContent
          key={initialData?._id || "new-review"}
          initialData={initialData}
          onClose={onClose}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
