import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { checkAdminAuthorization } from "@/lib/auth/server";
import { FAQsManager } from "@/components/admin/faqs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "FAQs Management | Admin Portal",
  description: "Create, edit, reorder, and activate portfolio frequently asked questions.",
};

export default async function AdminFAQsPage() {
  const authCheck = await checkAdminAuthorization();

  if (authCheck.status === "unauthenticated") {
    redirect("/login");
  }

  if (authCheck.status === "unauthorized") {
    redirect("/login?reason=unauthorized");
  }

  return <FAQsManager />;
}
