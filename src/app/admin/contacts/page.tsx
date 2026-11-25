import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { ComingSoon } from "@/components/admin/coming-soon";

export const metadata: Metadata = {
  title: "Contact Messages | Admin Portal",
};

export default function AdminContactsPage() {
  return (
    <ComingSoon
      title="Contact Messages & Inquiries"
      description="Inquiry inbox, message status tracker (new/read/replied), and spam filtering will be delivered in Phase 07D."
      phase="Phase 07D"
      icon={<Mail className="w-8 h-8 text-cyan-400" />}
    />
  );
}
