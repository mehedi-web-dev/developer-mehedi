import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { checkAdminAuthorization } from "@/lib/auth/server";
import { AdminLayoutShell } from "@/components/admin/admin-layout-shell";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Portal | Mehedi Hasan",
  description: "Administrative console and portfolio management for Mehedi Hasan.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authCheck = await checkAdminAuthorization();

  if (authCheck.status === "unauthenticated") {
    redirect("/login");
  }

  if (authCheck.status === "unauthorized") {
    redirect("/login?reason=unauthorized");
  }

  return (
    <AdminLayoutShell user={authCheck.user}>
      {children}
    </AdminLayoutShell>
  );
}
