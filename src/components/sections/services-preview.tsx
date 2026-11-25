"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Layers, CheckCircle2, Sparkles, AlertCircle } from "lucide-react";
import { getFeaturedServices } from "@/services";
import type { ServiceItem } from "@/types";

export function ServicesPreviewSection() {
  const [services, setServices] = React.useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const loadServices = React.useCallback(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    getFeaturedServices()
      .then((data) => {
        if (isMounted) {
          setServices(data.slice(0, 3));
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Unable to load services from the server at this moment.");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  React.useEffect(() => {
    let isMounted = true;
    getFeaturedServices()
      .then((data) => {
        if (isMounted) {
          setServices(data.slice(0, 3));
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Unable to load services from the server at this moment.");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="services-preview" className="py-20 sm:py-28 border-t border-[var(--border)]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--primary)]">
              <Sparkles className="h-3 w-3" />
              What I Offer
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-[var(--foreground)]">
              Featured Services
            </h2>
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              Tailored web solutions combining custom WordPress development, bespoke Elementor design,
              and modern frontend engineering.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors group self-start md:self-auto"
          >
            <span>View All Services</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 animate-pulse space-y-4"
              >
                <div className="h-12 w-12 rounded-2xl bg-[var(--surface-hover)]" />
                <div className="h-6 w-3/4 rounded-lg bg-[var(--surface-hover)]" />
                <div className="h-16 w-full rounded-lg bg-[var(--surface-hover)]" />
                <div className="space-y-2 pt-4 border-t border-[var(--border)]">
                  <div className="h-4 w-5/6 rounded bg-[var(--surface-hover)]" />
                  <div className="h-4 w-4/6 rounded bg-[var(--surface-hover)]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center max-w-md mx-auto space-y-3">
            <AlertCircle className="h-8 w-8 text-amber-500 mx-auto" />
            <h3 className="text-base font-bold text-[var(--foreground)]">Services Unavailable</h3>
            <p className="text-xs text-[var(--muted)]">{error}</p>
            <button
              type="button"
              onClick={loadServices}
              className="mt-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--primary-hover)] transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && services.length === 0 && (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-12 text-center max-w-lg mx-auto space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-subtle)] text-[var(--muted)] mx-auto">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-[var(--foreground)]">No Services Listed Yet</h3>
            <p className="text-sm text-[var(--muted)]">
              Featured services are being published. Please check back shortly or explore the services catalog.
            </p>
            <div className="pt-2">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--primary)] hover:underline"
              >
                Go to Services Page
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Services List */}
        {!isLoading && !error && services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service._id}
                className="glass rounded-3xl p-8 border border-[var(--border)] hover:border-[var(--primary)] transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl hover:shadow-[var(--primary)]/5"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[var(--primary)]/10 to-[var(--secondary)]/10 text-[var(--primary)] mb-6 transition-transform group-hover:scale-110">
                    <Layers className="h-6 w-6" />
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                    {service.shortDescription}
                  </p>

                  {Array.isArray(service.features) && service.features.length > 0 && (
                    <ul className="mt-6 space-y-2.5 pt-6 border-t border-[var(--border)]">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-xs text-[var(--foreground)]">
                          <CheckCircle2 className="h-4 w-4 text-[var(--secondary)] shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--primary)] group-hover:text-[var(--primary-hover)] transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
