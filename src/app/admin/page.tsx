import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { checkAdminAuthorization } from "@/lib/auth/server";
import { AdminLanding } from "@/components/admin/admin-landing";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Dashboard | Mehedi Hasan",
  description: "Administrative portal for Mehedi Hasan portfolio management.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const authCheck = await checkAdminAuthorization();

  if (authCheck.status === "unauthenticated") {
    redirect("/login");
  }

  if (authCheck.status === "unauthorized") {
    redirect("/login?reason=unauthorized");
  }

  return <AdminLanding user={authCheck.user} session={authCheck.session} />;
}
