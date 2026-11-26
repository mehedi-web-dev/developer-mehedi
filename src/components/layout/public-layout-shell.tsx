"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

export interface PublicLayoutShellProps {
  children: React.ReactNode;
}

/**
 * Public layout wrapper that selectively renders the public website's Navbar
 * and Footer for public portfolio routes, while excluding them from all /admin routes.
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

  // Public website pages receive the standard header, main container, and footer
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
