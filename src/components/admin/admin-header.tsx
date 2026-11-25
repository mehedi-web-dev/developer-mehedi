"use client";

import { useRouter } from "next/navigation";
import { Menu, LogOut, ExternalLink, ShieldCheck } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { authClient } from "@/lib/auth/client";
import type { User } from "@/types";
import Link from "next/link";

export interface AdminHeaderProps {
  user: User;
  onOpenMobileMenu: () => void;
}

export function AdminHeader({ user, onOpenMobileMenu }: AdminHeaderProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("[Admin Header] Sign out error:", error);
      router.push("/login");
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 bg-[#080B14]/80 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Portal Breadcrumb Badge */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-500/15 text-violet-300 border border-violet-500/30">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Admin Console</span>
          </span>
          <span className="text-slate-400 hidden sm:inline">/</span>
          <span className="text-xs sm:text-sm font-medium text-slate-300">
            Mehedi Hasan Portfolio
          </span>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Public site link */}
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 border border-white/10 transition-all"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </Link>

        {/* Theme switcher */}
        <ThemeToggle />

        {/* User Identity Chip */}
        <div className="hidden sm:flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-white/10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
            {user.name ? user.name.slice(0, 2).toUpperCase() : "AD"}
          </div>
          <div className="hidden xl:flex flex-col text-left">
            <span className="text-xs font-semibold text-white leading-tight">
              {user.name || "Administrator"}
            </span>
            <span className="text-[10px] text-cyan-400 font-medium">
              Verified Admin
            </span>
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          type="button"
          onClick={handleSignOut}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/30 transition-all"
          title="Sign out of administrative session"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    </header>
  );
}
