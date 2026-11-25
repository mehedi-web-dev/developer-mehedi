"use client";

import * as React from "react";
import {
  Mail,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { ContactsTable } from "./contacts-table";
import { ContactDetailModal } from "./contact-detail-modal";
import { DeleteContactModal } from "./delete-contact-modal";
import {
  getAdminContacts,
  updateContactStatus,
  deleteAdminContact,
} from "@/services/admin.service";
import type { ContactItem } from "@/types";

export function ContactsManager() {
  const [contacts, setContacts] = React.useState<ContactItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [successNotice, setSuccessNotice] = React.useState<string | null>(null);

  const [activeContact, setActiveContact] = React.useState<ContactItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = React.useState(false);

  const [deletingContact, setDeletingContact] = React.useState<ContactItem | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const [isUpdatingStatus, setIsUpdatingStatus] = React.useState(false);

  const showSuccess = (msg: string) => {
    setSuccessNotice(msg);
    setTimeout(() => {
      setSuccessNotice((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  const fetchContacts = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getAdminContacts({ limit: 100 });
      setContacts(res.contacts);
    } catch (err) {
      console.error("[Contacts Manager] Failed to load messages:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load contact messages. Verify backend server is running."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    let active = true;
    const loadInitial = async () => {
      try {
        const res = await getAdminContacts({ limit: 100 });
        if (active) {
          setContacts(res.contacts);
          setIsLoading(false);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load contact messages. Verify backend server is running."
          );
          setIsLoading(false);
        }
      }
    };
    void loadInitial();
    return () => {
      active = false;
    };
  }, []);

  const handleViewDetail = (c: ContactItem) => {
    setActiveContact(c);
    setIsDetailOpen(true);
  };

  const handleDeletePrompt = (c: ContactItem) => {
    setDeletingContact(c);
    setIsDeleteOpen(true);
  };

  const handleStatusChange = async (id: string, status: "new" | "read" | "replied") => {
    setIsUpdatingStatus(true);
    try {
      const updated = await updateContactStatus(id, status);
      setContacts((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: updated.status } : c))
      );
      if (activeContact && activeContact._id === id) {
        setActiveContact((prev) => (prev ? { ...prev, status: updated.status } : null));
      }
      showSuccess(`Inquiry status updated to "${status.toUpperCase()}".`);
    } catch (err) {
      console.error("[Contacts Manager] Status update failed:", err);
      setError(err instanceof Error ? err.message : "Failed to update status.");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleConfirmDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      await deleteAdminContact(id);
      setContacts((prev) => prev.filter((c) => c._id !== id));
      setIsDeleteOpen(false);
      setDeletingContact(null);
      if (activeContact?._id === id) {
        setIsDetailOpen(false);
        setActiveContact(null);
      }
      showSuccess("Inquiry removed from inbox.");
    } catch (err) {
      console.error("[Contacts Manager] Delete failed:", err);
      setError(err instanceof Error ? err.message : "Failed to delete message.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-2xl bg-[#101827]/80 border border-white/10 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <Mail className="w-5 h-5 text-rose-400" />
              <span>Contact Messages & Inquiries</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">
              {contacts.length} Total
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Review incoming inquiries, track reply workflows, and manage client communications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchContacts}
            disabled={isLoading}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-medium transition-all disabled:opacity-50"
            title="Refresh messages"
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin text-rose-400" : ""}`}
            />
          </button>
        </div>
      </div>

      {successNotice && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-300 text-xs animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{successNotice}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between text-rose-300 text-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
          <button
            type="button"
            onClick={fetchContacts}
            className="px-2.5 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-[11px] font-medium"
          >
            Retry
          </button>
        </div>
      )}

      <ContactsTable
        contacts={contacts}
        isLoading={isLoading}
        onViewDetail={handleViewDetail}
        onDelete={handleDeletePrompt}
      />

      <ContactDetailModal
        contact={activeContact}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onStatusChange={handleStatusChange}
        onDeletePrompt={handleDeletePrompt}
        isUpdatingStatus={isUpdatingStatus}
      />

      <DeleteContactModal
        contact={deletingContact}
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
