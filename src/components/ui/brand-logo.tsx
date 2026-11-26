"use client";

import * as React from "react";
import Link from "next/link";
import { Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BrandLogoProps {
  className?: string;
  size?: "header" | "footer";
  onClick?: () => void;
}

export function BrandLogo({
  className,
  size = "header",
  onClick,
}: BrandLogoProps) {
  const isFooter = size === "footer";

  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn(
        "group flex items-center gap-2.5 rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
        className
      )}
      aria-label="Mehedi Hasan — Home"
    >
      {/* Brand Emblem */}
      <div
        className={cn(
          "relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] via-violet-600 to-[var(--secondary)] text-white shadow-md shadow-[var(--primary)]/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[var(--primary)]/35",
          isFooter ? "h-9 w-9" : "h-9 w-9 sm:h-10 sm:w-10"
        )}
      >
        <Code2
          className={cn(
            "transition-transform duration-300 group-hover:rotate-6",
            isFooter ? "h-5 w-5" : "h-5 w-5 sm:h-5.5 sm:w-5.5"
          )}
          aria-hidden="true"
        />
        {/* Subtle inner highlight */}
        <span className="absolute inset-0 rounded-xl border border-white/20 pointer-events-none" />
      </div>

      {/* Brand Typographic Lockup */}
      <div className="flex flex-col text-left leading-none">
        <span
          className={cn(
            "font-sans font-bold tracking-tight text-[var(--foreground)] transition-colors group-hover:text-[var(--primary)]",
            isFooter ? "text-base sm:text-lg" : "text-base sm:text-[17px]"
          )}
        >
          Mehedi Hasan
        </span>
        <span className="mt-1 font-mono text-[10px] tracking-wider uppercase text-[var(--muted)]">
          WordPress &amp; Frontend Dev
        </span>
      </div>
    </Link>
  );
}
