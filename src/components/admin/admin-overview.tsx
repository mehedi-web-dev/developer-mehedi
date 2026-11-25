"use client";

import * as React from "react";
import Link from "next/link";
import {
  Briefcase,
  FolderKanban,
  MessageSquareQuote,
  Mail,
  ExternalLink,
  Plus,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import {
  getAdminDashboardStats,
  getAdminServices,
  type DashboardStats,
} from "@/services/admin.service";
import type { User, ServiceItem } from "@/types";

export interface AdminOverviewProps {
  user: User;
}

export function AdminOverview({ user }: AdminOverviewProps) {
  const [stats, setStats] = React.useState<DashboardStats | null>(null);
  const [recentServices, setRecentServices] = React.useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const loadData = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [statsData, servicesData] = await Promise.all([
        getAdminDashboardStats(),
        getAdminServices({ limit: 5 }),
      ]);
      setStats(statsData);
      setRecentServices(servicesData.services);
    } catch (err) {
      console.error("[Admin Overview] Failed to fetch stats:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load dashboard metrics. Verify backend server is running."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    let active = true;
    const fetchInitial = async () => {
      try {
        const [statsData, servicesData] = await Promise.all([
          getAdminDashboardStats(),
          getAdminServices({ limit: 5 }),
        ]);
        if (active) {
          setStats(statsData);
          setRecentServices(servicesData.services);
          setIsLoading(false);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load dashboard metrics. Verify backend server is running."
          );
          setIsLoading(false);
        }
      }
    };
    void fetchInitial();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-violet-950/40 via-[#101827] to-[#080B14] border border-violet-500/20 shadow-xl relative overflow-hidden">
        {/* Subtle accent glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/30">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Authenticated Administrator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Welcome back, {user.name || "Mehedi Hasan"}
          </h1>
          <p className="text-slate-400 text-sm max-w-xl">
            Here is the live status of your developer portfolio backend. Manage your services, preview upcoming modules, and keep your content in sync.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={loadData}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-medium transition-all disabled:opacity-50"
            title="Refresh metrics"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-cyan-400" : ""}`} />
            <span>Refresh</span>
          </button>
          <Link
            href="/admin/services"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-xs font-semibold shadow-lg shadow-violet-500/20 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Manage Services</span>
          </Link>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between text-rose-300 text-sm">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
          <button
            type="button"
            onClick={loadData}
            className="px-3 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Services Card */}
        <div className="p-5 rounded-2xl bg-[#101827]/80 border border-white/10 hover:border-violet-500/40 transition-all group flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Services
            </span>
            <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400 group-hover:scale-105 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-white tracking-tight">
              {isLoading ? (
                <div className="h-8 w-16 bg-white/10 rounded animate-pulse" />
              ) : (
                stats?.services.total ?? 0
              )}
            </div>
            <div className="flex items-center justify-between mt-2 text-xs">
              <span className="text-slate-400">
                Published:{" "}
                <span className="text-emerald-400 font-semibold">
                  {isLoading ? "..." : stats?.services.published ?? 0}
                </span>
              </span>
              <Link
                href="/admin/services"
                className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1 group/link"
              >
                <span>Manage</span>
                <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Projects Card */}
        <div className="p-5 rounded-2xl bg-[#101827]/80 border border-white/10 hover:border-cyan-500/40 transition-all group flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Projects
            </span>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
              <FolderKanban className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-white tracking-tight">
              {isLoading ? (
                <div className="h-8 w-16 bg-white/10 rounded animate-pulse" />
              ) : (
                stats?.projects.total ?? 0
              )}
            </div>
            <div className="flex items-center justify-between mt-2 text-xs">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Phase 07C
              </span>
              <Link
                href="/admin/projects"
                className="text-slate-400 hover:text-slate-300 font-medium inline-flex items-center gap-1"
              >
                <span>View</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Testimonials Card */}
        <div className="p-5 rounded-2xl bg-[#101827]/80 border border-white/10 hover:border-amber-500/40 transition-all group flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Reviews & FAQs
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
              <MessageSquareQuote className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-3">
              <div className="text-3xl font-black text-white tracking-tight">
                {isLoading ? (
                  <div className="h-8 w-16 bg-white/10 rounded animate-pulse" />
                ) : (
                  stats?.reviews.total ?? 0
                )}
              </div>
              <span className="text-xs text-slate-400">
                / {isLoading ? "..." : stats?.faqs.total ?? 0} FAQs
              </span>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Phase 07D
              </span>
              <Link
                href="/admin/reviews"
                className="text-slate-400 hover:text-slate-300 font-medium inline-flex items-center gap-1"
              >
                <span>View</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Messages Card */}
        <div className="p-5 rounded-2xl bg-[#101827]/80 border border-white/10 hover:border-rose-500/40 transition-all group flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Inquiries
            </span>
            <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-white tracking-tight">
              {isLoading ? (
                <div className="h-8 w-16 bg-white/10 rounded animate-pulse" />
              ) : (
                stats?.contacts.total ?? 0
              )}
            </div>
            <div className="flex items-center justify-between mt-2 text-xs">
              <span className="text-slate-400">
                Unread:{" "}
                <span className="text-rose-400 font-semibold">
                  {isLoading ? "..." : stats?.contacts.unread ?? 0}
                </span>
              </span>
              <Link
                href="/admin/contacts"
                className="text-slate-400 hover:text-slate-300 font-medium inline-flex items-center gap-1"
              >
                <span>Inbox</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Services Snapshot & Quick System Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Services List (2 Cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#101827]/80 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-cyan-400" />
                <span>Services Catalog Snapshot</span>
              </h2>
              <p className="text-xs text-slate-400">
                Recently updated offerings on your portfolio
              </p>
            </div>
            <Link
              href="/admin/services"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {isLoading ? (
            <div className="space-y-3 pt-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-14 rounded-xl bg-white/5 animate-pulse"
                />
              ))}
            </div>
          ) : recentServices.length === 0 ? (
            <div className="text-center py-8 px-4 rounded-xl border border-dashed border-white/10">
              <p className="text-sm text-slate-400 mb-3">
                No services found in database yet.
              </p>
              <Link
                href="/admin/services"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create First Service</span>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {recentServices.map((service) => (
                <div
                  key={service._id}
                  className="py-3 flex items-center justify-between gap-4 group"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate group-hover:text-cyan-400 transition-colors">
                      {service.title}
                    </p>
                    <p className="text-xs text-slate-400 truncate max-w-md">
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        service.published
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                          : "bg-slate-500/15 text-slate-400 border border-slate-500/30"
                      }`}
                    >
                      {service.published ? "Published" : "Draft"}
                    </span>
                    {service.featured && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        Featured
                      </span>
                    )}
                    <Link
                      href="/admin/services"
                      className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors text-xs"
                      title="Edit Service"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* System Information & Quick Actions (1 Col) */}
        <div className="p-6 rounded-2xl bg-[#101827]/80 border border-white/10 space-y-5">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span>System & Quick Actions</span>
            </h2>
            <p className="text-xs text-slate-400">
              Admin session & portfolio links
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Admin Account</span>
                <span className="text-white font-medium truncate max-w-[150px]">
                  {user.email}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Role Status</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  {user.role?.toUpperCase() || "ADMIN"}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Backend API</span>
                <span className="text-emerald-400 font-mono text-[11px]">
                  Connected
                </span>
              </div>
            </div>

            <Link
              href="/admin/services"
              className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-200 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 text-cyan-400" />
                <span>Go to Services Manager</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-200 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <ExternalLink className="w-4 h-4 text-violet-400" />
                <span>Preview Public Homepage</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
