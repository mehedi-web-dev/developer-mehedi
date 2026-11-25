import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { checkAdminAuthorization } from "@/lib/auth/server";
import { ContactsManager } from "@/components/admin/contacts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Messages | Admin Portal",
  description: "Review client inquiries, manage status workflows, and track communications.",
};

export default async function AdminContactsPage() {
  const authCheck = await checkAdminAuthorization();

  if (authCheck.status === "unauthenticated") {
    redirect("/login");
  }

  if (authCheck.status === "unauthorized") {
    redirect("/login?reason=unauthorized");
  }

  return <ContactsManager />;
}
