import type { Metadata } from "next";
import { FolderKanban } from "lucide-react";
import { ComingSoon } from "@/components/admin/coming-soon";

export const metadata: Metadata = {
  title: "Projects Management | Admin Portal",
};

export default function AdminProjectsPage() {
  return (
    <ComingSoon
      title="Projects Management"
      description="The full projects portfolio management suite (case studies, gallery uploads, tech tags, and live links) will be delivered in Phase 07C."
      phase="Phase 07C"
      icon={<FolderKanban className="w-8 h-8 text-cyan-400" />}
    />
  );
}
