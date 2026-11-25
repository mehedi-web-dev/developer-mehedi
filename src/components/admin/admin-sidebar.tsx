"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  FolderKanban,
  MessageSquareQuote,
  HelpCircle,
  Mail,
  Settings,
  ExternalLink,
  ShieldCheck,
  LogOut,
  X,
} from "lucide-react";
import { authClient } from "@/lib/auth/client";
import type { User } from "@/types";

export interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  exact?: boolean;
}

export const ADMIN_NAV_ITEMS: NavItem[] = [
  {
    name: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    name: "Services",
    href: "/admin/services",
    icon: Briefcase,
    badge: "Active",
  },
  {
    name: "Projects",
    href: "/admin/projects",
    icon: FolderKanban,
    badge: "07C",
  },
  {
    name: "Reviews",
    href: "/admin/reviews",
    icon: MessageSquareQuote,
    badge: "07D",
  },
  {
    name: "FAQs",
    href: "/admin/faqs",
    icon: HelpCircle,
    badge: "07D",
  },
  {
    name: "Contacts",
    href: "/admin/contacts",
    icon: Mail,
    badge: "07D",
  },
  {
    name: "Site Settings",
    href: "/admin/settings",
    icon: Settings,
    badge: "07D",
  },
];

export interface AdminSidebarProps {
  user: User;
  onCloseMobile?: () => void;
  isMobile?: boolean;
}

export function AdminSidebar({ user, onCloseMobile, isMobile = false }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("[Admin Sidebar] Sign out failed:", error);
      router.push("/login");
    }
  };

  const isActive = (item: NavItem) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  return (
    <aside
      className={`flex flex-col h-full bg-[#080B14]/95 dark:bg-[#080B14]/95 border-r border-white/10 ${
        isMobile ? "w-full" : "w-64"
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
        <Link
          href="/admin"
          onClick={onCloseMobile}
          className="flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform">
            <span className="text-white font-black text-sm tracking-tighter">MH</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-sm tracking-tight group-hover:text-cyan-400 transition-colors">
              Mehedi Hasan
            </span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-cyan-400" />
              <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider">
                Admin Portal
              </span>
            </div>
          </div>
        </Link>

        {isMobile && onCloseMobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        <div className="px-3 pb-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Management
        </div>

        {ADMIN_NAV_ITEMS.map((item) => {
          const active = isActive(item);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                active
                  ? "bg-gradient-to-r from-violet-600/20 to-cyan-500/10 text-white border border-violet-500/30 shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon
                  className={`w-4 h-4 flex-shrink-0 transition-colors ${
                    active
                      ? "text-cyan-400"
                      : "text-slate-400 group-hover:text-slate-300"
                  }`}
                />
                <span className="truncate">{item.name}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    item.badge === "Active"
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                      : "bg-white/5 text-slate-400 border border-white/10"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        <div className="pt-4 pb-2 px-3 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Public Website
        </div>

        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all group"
        >
          <div className="flex items-center gap-3">
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
            <span>View Public Site</span>
          </div>
          <span className="text-[10px] text-slate-400">Live</span>
        </Link>
      </div>

      {/* Admin User Card / Footer */}
      <div className="p-4 border-t border-white/10 bg-black/20">
        <div className="flex items-center justify-between gap-3 p-2 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {user.name ? user.name.slice(0, 2).toUpperCase() : "AD"}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">
                {user.name || "Administrator"}
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                {user.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors flex-shrink-0"
            title="Sign out of Admin Portal"
            aria-label="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
