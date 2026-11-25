import type { Metadata } from "next";
import { Settings } from "lucide-react";
import { ComingSoon } from "@/components/admin/coming-soon";

export const metadata: Metadata = {
  title: "Site Settings | Admin Portal",
};

export default function AdminSettingsPage() {
  return (
    <ComingSoon
      title="Site Settings & Profile"
      description="Personal info, availability indicator, social links, resume URL, and skills configuration will be delivered in Phase 07D."
      phase="Phase 07D"
      icon={<Settings className="w-8 h-8 text-cyan-400" />}
    />
  );
}
