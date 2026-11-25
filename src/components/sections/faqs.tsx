"use client";

import * as React from "react";
import { ChevronDown, HelpCircle, AlertCircle } from "lucide-react";
import { getActiveFAQs } from "@/services";
import type { FAQItem } from "@/types";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const [faqs, setFaqs] = React.useState<FAQItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const loadFaqs = React.useCallback(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    getActiveFAQs()
      .then((data) => {
        if (isMounted) {
          setFaqs(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Unable to load FAQs from the server at this moment.");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  React.useEffect(() => {
    let isMounted = true;
    getActiveFAQs()
      .then((data) => {
        if (isMounted) {
          setFaqs(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Unable to load FAQs from the server at this moment.");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 sm:py-28 border-t border-[var(--border)] bg-[var(--surface-subtle)]/40">
      <div className="container-custom max-w-4xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--secondary)]">
            <HelpCircle className="h-3 w-3" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-[var(--foreground)]">
            Questions &amp; Answers
          </h2>
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            Clear insights regarding project workflow, technologies, WordPress development, and timelines.
          </p>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="mt-14 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 animate-pulse space-y-3"
              >
                <div className="h-5 w-2/3 rounded bg-[var(--surface-hover)]" />
                <div className="h-4 w-5/6 rounded bg-[var(--surface-hover)]" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="mt-14 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center max-w-md mx-auto space-y-3">
            <AlertCircle className="h-8 w-8 text-amber-500 mx-auto" />
            <h3 className="text-base font-bold text-[var(--foreground)]">FAQs Unavailable</h3>
            <p className="text-xs text-[var(--muted)]">{error}</p>
            <button
              type="button"
              onClick={loadFaqs}
              className="mt-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--primary-hover)] transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && faqs.length === 0 && (
          <div className="mt-14 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-12 text-center max-w-lg mx-auto space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-subtle)] text-[var(--muted)] mx-auto">
              <HelpCircle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-[var(--foreground)]">No FAQs Published Yet</h3>
            <p className="text-sm text-[var(--muted)]">
              Got specific questions about working together? Reach out directly using the contact form below.
            </p>
          </div>
        )}

        {/* Accordion List */}
        {!isLoading && !error && faqs.length > 0 && (
          <div className="mt-14 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq._id}
                  className={cn(
                    "rounded-2xl border transition-all duration-200 overflow-hidden",
                    isOpen
                      ? "border-[var(--primary)] bg-[var(--surface)] shadow-md shadow-[var(--primary)]/5"
                      : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-subtle)]"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between p-6 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                  >
                    <span className="text-base font-semibold text-[var(--foreground)] pr-4">
                      {faq.question}
                    </span>
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--surface-subtle)] text-[var(--muted)] transition-transform duration-200",
                        isOpen && "rotate-180 bg-[var(--primary)]/10 text-[var(--primary)]"
                      )}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm leading-relaxed text-[var(--muted)] border-t border-[var(--border)]/50 animate-in fade-in-50 duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
