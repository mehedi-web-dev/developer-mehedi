import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { checkAdminAuthorization } from "@/lib/auth/server";
import { AdminOverview } from "@/components/admin/admin-overview";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard Overview | Admin Portal",
  description: "Live overview of portfolio metrics and content management.",
};

export default async function AdminPage() {
  const authCheck = await checkAdminAuthorization();

  if (authCheck.status === "unauthenticated") {
    redirect("/login");
  }

  if (authCheck.status === "unauthorized") {
    redirect("/login?reason=unauthorized");
  }

  return <AdminOverview user={authCheck.user} />;
}
