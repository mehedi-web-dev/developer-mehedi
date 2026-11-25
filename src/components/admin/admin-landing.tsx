"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  LogOut,
  ShieldCheck,
  User as UserIcon,
  Clock,
  Sparkles,
  Layers,
  FolderKanban,
  Star,
  HelpCircle,
  MessageSquare,
  Settings,
  Loader2,
} from "lucide-react";
import { authClient } from "@/lib/auth/client";
import type { User, Session } from "@/types";

interface AdminLandingProps {
  user: User;
  session: Session;
}

export function AdminLanding({ user, session }: AdminLandingProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
            router.refresh();
          },
          onError: () => {
            // Fallback navigation even if network has issues
            router.push("/login");
            router.refresh();
          },
        },
      });
    } catch {
      router.push("/login");
      router.refresh();
    }
  };

  const formattedExpiration = session?.expiresAt
    ? new Date(session.expiresAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "Active";

  return (
    <div className="py-12 sm:py-16">
      <div className="container-custom max-w-5xl space-y-10">
        {/* Top Header & Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-8 border-b border-[var(--border)]">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-subtle)] px-3 py-1 text-xs font-mono font-medium text-[var(--primary)]">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              Verified Administrator
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-[var(--foreground)]">
              Mehedi Hasan Admin
            </h1>
            <p className="text-sm text-[var(--muted)]">
              Secure administrative access and portfolio management foundation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-xs font-semibold text-red-500 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
            >
              {isLoggingOut ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Logging out...</span>
                </>
              ) : (
                <>
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Authenticated Session Card */}
        <div className="glass rounded-3xl p-8 border border-[var(--border)] shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] text-white shadow-md">
                <UserIcon className="h-7 w-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-[var(--foreground)]">
                    {user.name || "Administrator"}
                  </h2>
                  <span className="rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase">
                    {user.role || "admin"}
                  </span>
                </div>
                <p className="text-xs text-[var(--muted)] mt-0.5">{user.email}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--muted)] pt-4 md:pt-0 border-t md:border-t-0 border-[var(--border)]">
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-[var(--primary)]" />
                <span>Session Expires: {formattedExpiration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Phase 07B Preview Notification */}
        <div className="rounded-3xl border border-dashed border-[var(--border)] bg-[var(--surface-subtle)]/60 p-8 sm:p-12 text-center space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] mx-auto">
            <Sparkles className="h-6 w-6" />
          </div>

          <h3 className="text-xl font-bold text-[var(--foreground)]">
            Phase 07A Complete: Authentication &amp; Route Protection Active
          </h3>

          <p className="text-sm leading-relaxed text-[var(--muted)] max-w-2xl mx-auto">
            Server-side authorization is successfully enforced. Unauthenticated users and non-admin
            accounts are strictly blocked from accessing this route.
          </p>

          <p className="text-xs font-mono text-[var(--muted)] bg-[var(--surface)] inline-block px-4 py-2 rounded-xl border border-[var(--border)]">
            Dashboard management features (Services, Projects, Reviews, FAQs, Contacts &amp; Settings)
            will be implemented in Phase 07B.
          </p>

          {/* Upcoming Modules Preview */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-4xl mx-auto text-left">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-center space-y-1 opacity-70">
              <FolderKanban className="h-4 w-4 text-[var(--primary)] mx-auto" />
              <span className="block text-[11px] font-semibold text-[var(--foreground)]">Projects</span>
              <span className="block text-[9px] text-[var(--muted)]">Phase 07B</span>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-center space-y-1 opacity-70">
              <Layers className="h-4 w-4 text-[var(--secondary)] mx-auto" />
              <span className="block text-[11px] font-semibold text-[var(--foreground)]">Services</span>
              <span className="block text-[9px] text-[var(--muted)]">Phase 07B</span>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-center space-y-1 opacity-70">
              <Star className="h-4 w-4 text-amber-400 mx-auto" />
              <span className="block text-[11px] font-semibold text-[var(--foreground)]">Reviews</span>
              <span className="block text-[9px] text-[var(--muted)]">Phase 07B</span>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-center space-y-1 opacity-70">
              <HelpCircle className="h-4 w-4 text-emerald-400 mx-auto" />
              <span className="block text-[11px] font-semibold text-[var(--foreground)]">FAQs</span>
              <span className="block text-[9px] text-[var(--muted)]">Phase 07B</span>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-center space-y-1 opacity-70">
              <MessageSquare className="h-4 w-4 text-blue-400 mx-auto" />
              <span className="block text-[11px] font-semibold text-[var(--foreground)]">Inquiries</span>
              <span className="block text-[9px] text-[var(--muted)]">Phase 07B</span>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-center space-y-1 opacity-70">
              <Settings className="h-4 w-4 text-violet-400 mx-auto" />
              <span className="block text-[11px] font-semibold text-[var(--foreground)]">Settings</span>
              <span className="block text-[9px] text-[var(--muted)]">Phase 07B</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
