"use client";

import * as React from "react";
import {
  FolderKanban,
  Plus,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { ProjectsTable } from "./projects-table";
import { ProjectFormModal } from "./project-form-modal";
import { DeleteProjectModal } from "./delete-project-modal";
import {
  getAdminProjects,
  createAdminProject,
  updateAdminProject,
  deleteAdminProject,
  toggleProjectPublished,
  toggleProjectFeatured,
  type CreateProjectInput,
  type UpdateProjectInput,
} from "@/services/admin.service";
import type { ProjectItem, PaginationMeta } from "@/types";

export function ProjectsManager() {
  const [projects, setProjects] = React.useState<ProjectItem[]>([]);
  const [pagination, setPagination] = React.useState<PaginationMeta>({
    page: 1,
    limit: 20,
    totalItems: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [successNotice, setSuccessNotice] = React.useState<string | null>(null);

  // Form Modal State
  const [isFormModalOpen, setIsFormModalOpen] = React.useState(false);
  const [editingProject, setEditingProject] = React.useState<ProjectItem | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [deletingProject, setDeletingProject] = React.useState<ProjectItem | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  // In-flight status toggles
  const [updatingIds, setUpdatingIds] = React.useState<
    Record<string, "published" | "featured" | undefined>
  >({});

  const showSuccess = (msg: string) => {
    setSuccessNotice(msg);
    setTimeout(() => {
      setSuccessNotice((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  const fetchProjects = React.useCallback(async (page = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getAdminProjects({ page, limit: 20 });
      setProjects(res.projects);
      setPagination(res.pagination);
    } catch (err) {
      console.error("[Projects Manager] Failed to load projects:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load projects catalog. Verify backend server is running."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Safe effect initialization avoiding synchronous setState in effect body
  React.useEffect(() => {
    let active = true;
    const loadInitial = async () => {
      try {
        const res = await getAdminProjects({ page: currentPage, limit: 20 });
        if (active) {
          setProjects(res.projects);
          setPagination(res.pagination);
          setIsLoading(false);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load projects catalog. Verify backend server is running."
          );
          setIsLoading(false);
        }
      }
    };
    void loadInitial();
    return () => {
      active = false;
    };
  }, [currentPage]);

  // Existing categories across all loaded projects
  const existingCategories = React.useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [projects]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleAddNew = () => {
    setEditingProject(null);
    setIsFormModalOpen(true);
  };

  const handleEdit = (project: ProjectItem) => {
    setEditingProject(project);
    setIsFormModalOpen(true);
  };

  const handleDeletePrompt = (project: ProjectItem) => {
    setDeletingProject(project);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = async (
    data: CreateProjectInput | UpdateProjectInput
  ) => {
    setIsSubmitting(true);
    try {
      if (editingProject) {
        const updated = await updateAdminProject(editingProject._id, data);
        setProjects((prev) =>
          prev.map((p) => (p._id === updated._id ? updated : p))
        );
        showSuccess(`Project "${updated.title}" updated successfully.`);
      } else {
        const created = await createAdminProject(data as CreateProjectInput);
        setProjects((prev) => [created, ...prev]);
        showSuccess(`Project "${created.title}" added to portfolio.`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      await deleteAdminProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      setIsDeleteModalOpen(false);
      setDeletingProject(null);
      showSuccess("Project deleted from database.");
    } catch (err) {
      console.error("[Projects Manager] Delete error:", err);
      setError(err instanceof Error ? err.message : "Failed to delete project.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTogglePublished = async (project: ProjectItem) => {
    const id = project._id;
    setUpdatingIds((prev) => ({ ...prev, [id]: "published" }));
    try {
      const updated = await toggleProjectPublished(id, project.published);
      setProjects((prev) =>
        prev.map((p) => (p._id === id ? { ...p, published: updated.published } : p))
      );
      showSuccess(
        `Project "${project.title}" is now ${
          updated.published ? "Published" : "Draft"
        }.`
      );
    } catch (err) {
      console.error("[Projects Manager] Toggle published error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update project published status."
      );
    } finally {
      setUpdatingIds((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const handleToggleFeatured = async (project: ProjectItem) => {
    const id = project._id;
    setUpdatingIds((prev) => ({ ...prev, [id]: "featured" }));
    try {
      const updated = await toggleProjectFeatured(id, project.featured);
      setProjects((prev) =>
        prev.map((p) => (p._id === id ? { ...p, featured: updated.featured } : p))
      );
      showSuccess(
        `Project "${project.title}" ${
          updated.featured ? "featured on homepage" : "removed from featured"
        }.`
      );
    } catch (err) {
      console.error("[Projects Manager] Toggle featured error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update project featured status."
      );
    } finally {
      setUpdatingIds((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-2xl bg-[#101827]/80 border border-white/10 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <FolderKanban className="w-5 h-5 text-cyan-400" />
              <span>Projects Management</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              {pagination.totalItems || projects.length} Total
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Publish case studies, upload ImgBB media, curate tech stacks, and highlight featured works.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => fetchProjects(currentPage)}
            disabled={isLoading}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-medium transition-all disabled:opacity-50"
            title="Refresh projects catalog"
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
            <span>Add New Project</span>
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
            onClick={() => fetchProjects(currentPage)}
            className="px-2.5 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-[11px] font-medium"
          >
            Retry
          </button>
        </div>
      )}

      {/* Projects Table */}
      <ProjectsTable
        projects={projects}
        pagination={pagination}
        isLoading={isLoading}
        onPageChange={handlePageChange}
        onEdit={handleEdit}
        onDelete={handleDeletePrompt}
        onTogglePublished={handleTogglePublished}
        onToggleFeatured={handleToggleFeatured}
        onAddNew={handleAddNew}
        updatingIds={updatingIds}
      />

      {/* Create / Edit Project Modal */}
      <ProjectFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingProject}
        existingCategories={existingCategories}
        isSubmitting={isSubmitting}
      />

      {/* Delete Confirmation Modal */}
      <DeleteProjectModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        project={deletingProject}
        isDeleting={isDeleting}
      />
    </div>
  );
}
