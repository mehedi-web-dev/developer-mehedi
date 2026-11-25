"use client";

import * as React from "react";
import {
  Briefcase,
  Plus,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { ServicesTable } from "./services-table";
import { ServiceFormModal } from "./service-form-modal";
import { DeleteServiceModal } from "./delete-service-modal";
import {
  getAdminServices,
  createAdminService,
  updateAdminService,
  deleteAdminService,
  toggleServicePublished,
  toggleServiceFeatured,
  type CreateServiceInput,
  type UpdateServiceInput,
} from "@/services/admin.service";
import type { ServiceItem } from "@/types";

export function ServicesManager() {
  const [services, setServices] = React.useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [successNotice, setSuccessNotice] = React.useState<string | null>(null);

  // Form modal state
  const [isFormModalOpen, setIsFormModalOpen] = React.useState(false);
  const [editingService, setEditingService] = React.useState<ServiceItem | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [deletingService, setDeletingService] = React.useState<ServiceItem | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  // Inline toggle progress
  const [updatingIds, setUpdatingIds] = React.useState<
    Record<string, "published" | "featured" | undefined>
  >({});

  const showSuccess = (msg: string) => {
    setSuccessNotice(msg);
    setTimeout(() => {
      setSuccessNotice((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  const fetchServices = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getAdminServices({ limit: 100 });
      setServices(res.services);
    } catch (err) {
      console.error("[Services Manager] Failed to load services:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load services catalog. Ensure backend server is running."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    let active = true;
    const loadInitial = async () => {
      try {
        const res = await getAdminServices({ limit: 100 });
        if (active) {
          setServices(res.services);
          setIsLoading(false);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load services catalog. Ensure backend server is running."
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

  // Handle open Create
  const handleAddNew = () => {
    setEditingService(null);
    setIsFormModalOpen(true);
  };

  // Handle open Edit
  const handleEdit = (service: ServiceItem) => {
    setEditingService(service);
    setIsFormModalOpen(true);
  };

  // Handle open Delete
  const handleDeletePrompt = (service: ServiceItem) => {
    setDeletingService(service);
    setIsDeleteModalOpen(true);
  };

  // Submit Create or Edit
  const handleFormSubmit = async (
    data: CreateServiceInput | UpdateServiceInput
  ) => {
    setIsSubmitting(true);
    try {
      if (editingService) {
        const updated = await updateAdminService(editingService._id, data);
        setServices((prev) =>
          prev.map((s) => (s._id === updated._id ? updated : s))
        );
        showSuccess(`Service "${updated.title}" updated successfully.`);
      } else {
        const created = await createAdminService(data as CreateServiceInput);
        setServices((prev) => [created, ...prev]);
        showSuccess(`Service "${created.title}" created successfully.`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Confirm Delete
  const handleConfirmDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      await deleteAdminService(id);
      setServices((prev) => prev.filter((s) => s._id !== id));
      setIsDeleteModalOpen(false);
      setDeletingService(null);
      showSuccess("Service removed from catalog.");
    } catch (err) {
      console.error("[Services Manager] Delete failed:", err);
      setError(err instanceof Error ? err.message : "Failed to delete service.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Quick Toggle Published
  const handleTogglePublished = async (service: ServiceItem) => {
    const id = service._id;
    setUpdatingIds((prev) => ({ ...prev, [id]: "published" }));
    try {
      const updated = await toggleServicePublished(id, service.published);
      setServices((prev) =>
        prev.map((s) => (s._id === id ? { ...s, published: updated.published } : s))
      );
      showSuccess(
        `Service "${service.title}" is now ${
          updated.published ? "Published" : "Draft"
        }.`
      );
    } catch (err) {
      console.error("[Services Manager] Toggle published error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update published status."
      );
    } finally {
      setUpdatingIds((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  // Quick Toggle Featured
  const handleToggleFeatured = async (service: ServiceItem) => {
    const id = service._id;
    setUpdatingIds((prev) => ({ ...prev, [id]: "featured" }));
    try {
      const updated = await toggleServiceFeatured(id, service.featured);
      setServices((prev) =>
        prev.map((s) => (s._id === id ? { ...s, featured: updated.featured } : s))
      );
      showSuccess(
        `Service "${service.title}" ${
          updated.featured ? "marked as featured" : "removed from featured"
        }.`
      );
    } catch (err) {
      console.error("[Services Manager] Toggle featured error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update featured status."
      );
    } finally {
      setUpdatingIds((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-2xl bg-[#101827]/80 border border-white/10 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <Briefcase className="w-5 h-5 text-cyan-400" />
              <span>Services Management</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/30">
              {services.length} Total
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Create, update, toggle visibility, and order your professional offerings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchServices}
            disabled={isLoading}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-medium transition-all disabled:opacity-50"
            title="Refresh services list"
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin text-cyan-400" : ""}`}
            />
          </button>
          <button
            type="button"
            onClick={handleAddNew}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-xs font-semibold shadow-lg shadow-violet-500/20 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
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
            onClick={fetchServices}
            className="px-2.5 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-[11px] font-medium"
          >
            Retry
          </button>
        </div>
      )}

      {/* Services Table */}
      <ServicesTable
        services={services}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDeletePrompt}
        onTogglePublished={handleTogglePublished}
        onToggleFeatured={handleToggleFeatured}
        onAddNew={handleAddNew}
        updatingIds={updatingIds}
      />

      {/* Create / Edit Form Modal */}
      <ServiceFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingService}
        isSubmitting={isSubmitting}
      />

      {/* Delete Confirmation Modal */}
      <DeleteServiceModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        service={deletingService}
        isDeleting={isDeleting}
      />
    </div>
  );
}
