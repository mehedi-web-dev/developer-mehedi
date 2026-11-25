import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { checkAdminAuthorization } from "@/lib/auth/server";
import { SettingsManager } from "@/components/admin/settings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Site Settings | Admin Portal",
  description: "Configure profile information, availability, social links, and portfolio settings.",
};

export default async function AdminSettingsPage() {
  const authCheck = await checkAdminAuthorization();

  if (authCheck.status === "unauthenticated") {
    redirect("/login");
  }

  if (authCheck.status === "unauthorized") {
    redirect("/login?reason=unauthorized");
  }

  return <SettingsManager />;
}
