"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { AnimatedBackground } from "@/components/background";

export interface PublicLayoutShellProps {
  children: React.ReactNode;
}

/**
 * Public layout wrapper that selectively renders the public website's Navbar,
 * Animated Background, and Footer for public portfolio routes, while excluding
 * them from all /admin routes.
 */
export function PublicLayoutShell({ children }: PublicLayoutShellProps) {
  const pathname = usePathname();
  const isAdminRoute = Boolean(
    pathname && (pathname === "/admin" || pathname.startsWith("/admin/"))
  );

  // Admin routes have their own full-featured AdminLayoutShell (Sidebar + Header)
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // Public website pages receive the standard header, main container, animated background, and footer
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <main className="relative z-10 flex-1">{children}</main>
      <Footer />
    </>
  );
}
