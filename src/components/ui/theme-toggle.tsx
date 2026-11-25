"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMounted } from "@/hooks";

export interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

/**
 * Accessible theme switcher supporting light, dark, and system modes.
 * Prevents hydration mismatch via client-side mount detection with useSyncExternalStore.
 */
export function ThemeToggle({ className, showLabel = false }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    // Skeleton placeholder to prevent hydration mismatch and visual flash
    return (
      <button
        type="button"
        disabled
        aria-label="Toggle theme loading placeholder"
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] opacity-50 transition-colors",
          className
        )}
      >
        <span className="h-4 w-4" />
      </button>
    );
  }

  const cycleTheme = () => {
    if (theme === "system") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("system");
    }
  };

  const getIcon = () => {
    if (theme === "system") {
      return <Monitor className="h-4 w-4 text-[var(--accent)]" />;
    }
    return resolvedTheme === "dark" ? (
      <Moon className="h-4 w-4 text-[var(--secondary)]" />
    ) : (
      <Sun className="h-4 w-4 text-[var(--primary)]" />
    );
  };

  const getLabel = () => {
    if (theme === "system") return "System";
    return theme === "dark" ? "Dark" : "Light";
  };

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={`Current theme: ${getLabel()}. Click to switch theme.`}
      title={`Theme: ${getLabel()} (click to cycle)`}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2 text-sm font-medium text-[var(--foreground)] transition-all hover:border-[var(--primary)] hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] active:scale-95",
        showLabel ? "px-3 py-1.5" : "h-9 w-9",
        className
      )}
    >
      <span className="transition-transform duration-200 group-hover:rotate-12">{getIcon()}</span>
      {showLabel && <span className="capitalize">{getLabel()}</span>}
    </button>
  );
}
