import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { checkAdminAuthorization } from "@/lib/auth/server";
import { ServicesManager } from "@/components/admin/services";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services Management | Admin Portal",
  description: "Manage portfolio services, pricing, deliverables, and publication status.",
};

export default async function AdminServicesPage() {
  const authCheck = await checkAdminAuthorization();

  if (authCheck.status === "unauthenticated") {
    redirect("/login");
  }

  if (authCheck.status === "unauthorized") {
    redirect("/login?reason=unauthorized");
  }

  return <ServicesManager />;
}
