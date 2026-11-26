"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Layers,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  Code2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getServices } from "@/services";
import type { ServiceItem, PaginationMeta } from "@/types";

export function ServicesCatalog() {
  const [services, setServices] = React.useState<ServiceItem[]>([]);
  const [pagination, setPagination] = React.useState<PaginationMeta | undefined>(undefined);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const loadServices = React.useCallback((targetPage: number) => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    getServices({ page: targetPage, limit: 12 })
      .then((res) => {
        if (isMounted) {
          setServices(res.services);
          setPagination(res.pagination);
          setPage(targetPage);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Unable to load services from the server. Please check your connection or retry.");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  React.useEffect(() => {
    let isMounted = true;
    getServices({ page: 1, limit: 12 })
      .then((res) => {
        if (isMounted) {
          setServices(res.services);
          setPagination(res.pagination);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Unable to load services from the server. Please check your connection or retry.");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="py-12 sm:py-20">
      <div className="container-custom">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-subtle)] px-3.5 py-1.5 text-xs font-medium text-[var(--primary)]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Comprehensive Solutions
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl text-[var(--foreground)]"
          >
            Professional Web &amp; WordPress Services
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg leading-relaxed text-[var(--muted)]"
          >
            Tailored digital craftsmanship combining bespoke WordPress development, Elementor Pro design,
            WooCommerce optimization, and modern React/Next.js frontend engineering.
          </motion.p>
        </div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 animate-pulse space-y-5"
              >
                <div className="h-12 w-12 rounded-2xl bg-[var(--surface-hover)]" />
                <div className="h-6 w-3/4 rounded bg-[var(--surface-hover)]" />
                <div className="h-20 w-full rounded bg-[var(--surface-hover)]" />
                <div className="space-y-2 pt-4 border-t border-[var(--border)]">
                  <div className="h-4 w-5/6 rounded bg-[var(--surface-hover)]" />
                  <div className="h-4 w-4/6 rounded bg-[var(--surface-hover)]" />
                  <div className="h-4 w-3/6 rounded bg-[var(--surface-hover)]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State with Retry */}
        {!isLoading && error && (
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-12 text-center max-w-lg mx-auto space-y-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 mx-auto">
              <AlertCircle className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-[var(--foreground)]">Services Unavailable</h3>
            <p className="text-sm text-[var(--muted)]">{error}</p>
            <button
              type="button"
              onClick={() => loadServices(page)}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[var(--primary-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            >
              Retry Loading Services
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && services.length === 0 && (
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-12 sm:p-16 text-center max-w-xl mx-auto space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[var(--surface-subtle)] text-[var(--muted)] mx-auto">
              <HelpCircle className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--foreground)]">No Services Published Yet</h3>
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              Our service offerings are currently being updated in the catalog. You can still discuss custom
              requirements directly by reaching out.
            </p>
            <div className="pt-2">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3 text-xs font-semibold text-white hover:bg-[var(--primary-hover)] transition-colors shadow-md"
              >
                Inquire Directly
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Services Grid */}
        {!isLoading && !error && services.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="glass rounded-3xl p-8 border border-[var(--border)] hover:border-[var(--primary)] hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--primary)]/10 transition-all duration-300 flex flex-col justify-between group shadow-sm"
                >
                  <div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-[var(--primary)]/10 to-[var(--secondary)]/10 text-[var(--primary)] mb-6 transition-transform group-hover:scale-105">
                      <Layers className="h-7 w-7" />
                    </div>

                    <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                      {service.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                      {service.shortDescription}
                    </p>

                    {/* Features list */}
                    {Array.isArray(service.features) && service.features.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-[var(--border)]">
                        <span className="block text-[11px] font-mono font-medium uppercase tracking-wider text-[var(--muted)] mb-3">
                          What&apos;s Included
                        </span>
                        <ul className="space-y-2.5">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs text-[var(--foreground)]">
                              <CheckCircle2 className="h-4 w-4 text-[var(--secondary)] shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Technologies tags if available */}
                    {Array.isArray(service.technologies) && service.technologies.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-[var(--border)] flex flex-wrap gap-1.5">
                        {service.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="rounded-md bg-[var(--surface-subtle)] px-2.5 py-0.5 text-[10px] font-mono text-[var(--muted)] border border-[var(--border)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-6 border-t border-[var(--border)]">
                    <Link
                      href="/#contact"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--surface-subtle)] py-2.5 text-xs font-semibold text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all"
                    >
                      <span>Inquire About This Service</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination Controls (when supported and totalPages > 1) */}
            {pagination && pagination.totalPages > 1 && (
              <div className="mt-14 flex items-center justify-center gap-4">
                <button
                  type="button"
                  disabled={!pagination.hasPrevPage}
                  onClick={() => loadServices(page - 1)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--foreground)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--surface-hover)] transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>
                <span className="font-mono text-xs text-[var(--muted)]">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  type="button"
                  disabled={!pagination.hasNextPage}
                  onClick={() => loadServices(page + 1)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--foreground)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--surface-hover)] transition-colors"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        )}

        {/* Global CTA Banner */}
        <div className="mt-20 glass rounded-3xl p-8 sm:p-12 border border-[var(--border)] text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] text-white mx-auto shadow-md">
              <Code2 className="h-6 w-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)]">
              Need a Custom Solution for Your Business?
            </h3>
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              Whether you need a brand-new WordPress website, a WooCommerce rebuild, or a high-performance
              Next.js application, I am here to bring your vision to life.
            </p>
            <div className="pt-2">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/20 hover:bg-[var(--primary-hover)] transition-all"
              >
                Let&apos;s Discuss Your Project
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
