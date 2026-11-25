import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { checkAdminAuthorization } from "@/lib/auth/server";
import { ProjectsManager } from "@/components/admin/projects";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects Management | Admin Portal",
  description: "Curate portfolio case studies, upload ImgBB media, and manage published states.",
};

export default async function AdminProjectsPage() {
  const authCheck = await checkAdminAuthorization();

  if (authCheck.status === "unauthenticated") {
    redirect("/login");
  }

  if (authCheck.status === "unauthorized") {
    redirect("/login?reason=unauthorized");
  }

  return <ProjectsManager />;
}
