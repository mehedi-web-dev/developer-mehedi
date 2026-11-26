"use client";

import * as React from "react";
import Image from "next/image";
import { Star, MessageSquareQuote, AlertCircle } from "lucide-react";
import { getApprovedReviews } from "@/services";
import type { ReviewItem } from "@/types";

export function ReviewsSection() {
  const [reviews, setReviews] = React.useState<ReviewItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const loadReviews = React.useCallback(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    getApprovedReviews()
      .then((data) => {
        if (isMounted) {
          setReviews(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Unable to load reviews from the server at this moment.");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  React.useEffect(() => {
    let isMounted = true;
    getApprovedReviews()
      .then((data) => {
        if (isMounted) {
          setReviews(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Unable to load reviews from the server at this moment.");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-20 sm:py-28 border-t border-[var(--border)]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--primary)]">
            <MessageSquareQuote className="h-3 w-3" />
            Client Feedback
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-[var(--foreground)]">
            What Clients Say
          </h2>
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            Genuine testimonials and ratings from clients and collaborators.
          </p>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 animate-pulse space-y-4"
              >
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="h-4 w-4 rounded bg-[var(--surface-hover)]" />
                  ))}
                </div>
                <div className="h-20 rounded bg-[var(--surface-hover)]" />
                <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)]">
                  <div className="h-10 w-10 rounded-full bg-[var(--surface-hover)]" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-4 w-1/2 rounded bg-[var(--surface-hover)]" />
                    <div className="h-3 w-1/3 rounded bg-[var(--surface-hover)]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="mt-14 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center max-w-md mx-auto space-y-3">
            <AlertCircle className="h-8 w-8 text-amber-500 mx-auto" />
            <h3 className="text-base font-bold text-[var(--foreground)]">Reviews Unavailable</h3>
            <p className="text-xs text-[var(--muted)]">{error}</p>
            <button
              type="button"
              onClick={loadReviews}
              className="mt-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--primary-hover)] transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && reviews.length === 0 && (
          <div className="mt-14 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-12 text-center max-w-lg mx-auto space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-subtle)] text-[var(--muted)] mx-auto">
              <MessageSquareQuote className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-[var(--foreground)]">No Reviews Published Yet</h3>
            <p className="text-sm text-[var(--muted)]">
              Verified client testimonials will appear here once approved by administration.
            </p>
          </div>
        )}

        {/* Reviews Grid */}
        {!isLoading && !error && reviews.length > 0 && (
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((rev) => (
              <div
                key={rev._id}
                className="glass rounded-3xl p-8 border border-[var(--border)] hover:border-[var(--primary)] hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--primary)]/10 transition-all duration-300 flex flex-col justify-between shadow-sm"
              >
                <div>
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-4" aria-label={`Rating: ${rev.rating} out of 5 stars`}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= rev.rating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-transparent text-[var(--border)]"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-sm leading-relaxed text-[var(--muted)] italic">
                    &ldquo;{rev.review}&rdquo;
                  </p>
                </div>

                {/* Client Information */}
                <div className="flex items-center gap-3 pt-6 mt-6 border-t border-[var(--border)]">
                  {rev.clientImage ? (
                    <div className="relative h-11 w-11 rounded-full overflow-hidden border border-[var(--border)]">
                      <Image
                        src={rev.clientImage}
                        alt={rev.clientName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] text-white text-xs font-bold uppercase shadow-sm">
                      {rev.clientName.slice(0, 2)}
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-bold text-[var(--foreground)]">
                      {rev.clientName}
                    </h4>
                    {rev.clientPosition && (
                      <p className="text-xs text-[var(--muted)]">
                        {rev.clientPosition}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
