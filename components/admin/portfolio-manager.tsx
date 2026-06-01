"use client";

import { Edit3, ImagePlus, Plus, Save, Search, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { PortfolioCategory, PortfolioRecord, PortfolioScreenshot } from "@/components/portfolio/portfolio-types";

type ProjectFormState = {
  id?: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  challenge: string;
  solution: string;
  impact: string;
  year: string;
  client: string;
  categoryId: string;
  categoryName: string;
  coverImage: string;
  liveUrl: string;
  githubUrl: string;
  techStack: string;
  featured: boolean;
  published: boolean;
  screenshots: PortfolioScreenshot[];
};

const emptyForm: ProjectFormState = {
  title: "",
  slug: "",
  summary: "",
  description: "",
  challenge: "",
  solution: "",
  impact: "",
  year: "",
  client: "",
  categoryId: "",
  categoryName: "",
  coverImage: "",
  liveUrl: "",
  githubUrl: "",
  techStack: "",
  featured: false,
  published: true,
  screenshots: []
};

function formFromProject(project: PortfolioRecord): ProjectFormState {
  return {
    id: project.id,
    title: project.title,
    slug: project.slug,
    summary: project.summary,
    description: project.description,
    challenge: project.challenge ?? "",
    solution: project.solution ?? "",
    impact: project.impact ?? "",
    year: project.year?.toString() ?? "",
    client: project.client ?? "",
    categoryId: project.category?.id ?? project.categoryId ?? "",
    categoryName: project.category?.name ?? "",
    coverImage: project.coverImage ?? "",
    liveUrl: project.liveUrl ?? "",
    githubUrl: project.githubUrl ?? "",
    techStack: project.techStack.join(", "),
    featured: Boolean(project.featured),
    published: project.published !== false,
    screenshots: project.screenshots ?? []
  };
}

function toPayload(form: ProjectFormState) {
  return {
    title: form.title,
    slug: form.slug || undefined,
    summary: form.summary,
    description: form.description,
    challenge: form.challenge || undefined,
    solution: form.solution || undefined,
    impact: form.impact || undefined,
    year: form.year ? Number(form.year) : undefined,
    client: form.client || undefined,
    categoryId: form.categoryId || undefined,
    categoryName: form.categoryId ? undefined : form.categoryName,
    coverImage: form.coverImage || undefined,
    liveUrl: form.liveUrl || undefined,
    githubUrl: form.githubUrl || undefined,
    techStack: form.techStack.split(",").map((item) => item.trim()).filter(Boolean),
    featured: form.featured,
    published: form.published,
    screenshots: form.screenshots.filter((item) => item.url)
  };
}

export function PortfolioManager() {
  const [projects, setProjects] = useState<PortfolioRecord[]>([]);
  const [categories, setCategories] = useState<PortfolioCategory[]>([]);
  const [form, setForm] = useState<ProjectFormState>(emptyForm);
  const [query, setQuery] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [status, setStatus] = useState("Loading portfolio...");
  const [saving, setSaving] = useState(false);

  async function load() {
    const [projectsResponse, categoriesResponse] = await Promise.all([
      fetch("/api/projects?drafts=true"),
      fetch("/api/categories")
    ]);

    if (projectsResponse.ok) {
      setProjects(await projectsResponse.json());
    } else {
      setStatus("Admin API requires an authenticated ADMIN user.");
    }

    if (categoriesResponse.ok) {
      setCategories(await categoriesResponse.json());
    }
  }

  useEffect(() => {
    load().finally(() => setStatus(""));
  }, []);

  const filteredProjects = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    if (!normalized) return projects;
    return projects.filter((project) =>
      [project.title, project.summary, project.category?.name ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(normalized)
    );
  }, [projects, query]);

  function updateField(field: keyof ProjectFormState, value: string | boolean | PortfolioScreenshot[]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function updateScreenshot(index: number, field: keyof PortfolioScreenshot, value: string) {
    setForm((current) => ({
      ...current,
      screenshots: current.screenshots.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      )
    }));
  }

  async function uploadScreenshots(files: FileList | null) {
    if (!files?.length) return;
    const body = new FormData();
    Array.from(files).forEach((file) => body.append("files", file));
    setStatus("Uploading screenshots...");

    const response = await fetch("/api/admin/uploads", {
      method: "POST",
      body
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      setStatus(error.error ?? "Upload failed. Check Cloudinary configuration.");
      return;
    }

    const data = await response.json();
    setForm((current) => ({
      ...current,
      screenshots: [
        ...current.screenshots,
        ...data.uploads.map((item: PortfolioScreenshot, index: number) => ({
          ...item,
          order: current.screenshots.length + index
        }))
      ]
    }));
    setStatus("Screenshots uploaded.");
  }

  async function saveProject() {
    setSaving(true);
    setStatus("Saving project...");
    const endpoint = form.id ? `/api/admin/projects/${form.id}` : "/api/projects";
    const response = await fetch(endpoint, {
      method: form.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toPayload(form))
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      setStatus(error.errors?.join(" ") ?? error.error ?? "Project save failed.");
      setSaving(false);
      return;
    }

    await load();
    setForm(emptyForm);
    setStatus("Project saved.");
    setSaving(false);
  }

  async function deleteProject(project: PortfolioRecord) {
    const confirmed = window.confirm(`Delete ${project.title}?`);
    if (!confirmed) return;

    const response = await fetch(`/api/admin/projects/${project.id}`, {
      method: "DELETE"
    });

    if (response.ok) {
      await load();
      if (form.id === project.id) setForm(emptyForm);
      setStatus("Project deleted.");
    } else {
      setStatus("Delete failed.");
    }
  }

  async function addCategory() {
    if (!categoryName.trim()) return;
    const response = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: categoryName })
    });

    if (response.ok) {
      setCategoryName("");
      await load();
      setStatus("Category saved.");
    } else {
      setStatus("Category save failed.");
    }
  }

  return (
    <section className="min-h-screen pt-36">
      <div className="container-shell pb-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-secondary">Admin Portfolio</p>
            <h1 className="mt-5 text-4xl font-semibold text-text md:text-6xl">Portfolio management system.</h1>
            <p className="mt-5 max-w-2xl text-accent">Add, edit, delete, categorize and publish Aryonix case studies with screenshots, links and technologies.</p>
          </div>
          <Button onClick={() => setForm(emptyForm)} type="button">
            <Plus className="mr-2" size={16} /> New Project
          </Button>
        </div>

        {status ? (
          <div className="panel mt-8 rounded-2xl p-4 text-sm text-accent">{status}</div>
        ) : null}

        <div className="mt-8 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <div className="panel rounded-2xl p-4">
              <label className="flex h-12 items-center gap-3 rounded-xl border border-line bg-white/[0.04] px-4 text-accent">
                <Search size={18} />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search admin projects..." className="w-full bg-transparent text-sm text-text outline-none" />
              </label>
            </div>
            <div className="grid gap-3">
              {filteredProjects.map((project) => (
                <article key={project.id} className="panel rounded-2xl p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-secondary">{project.category?.name ?? "Uncategorized"}</p>
                      <h2 className="mt-2 text-xl font-semibold text-text">{project.title}</h2>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-accent">{project.summary}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setForm(formFromProject(project))} className="grid size-10 place-items-center rounded-xl border border-line text-accent hover:text-text" aria-label="Edit project">
                        <Edit3 size={16} />
                      </button>
                      <button onClick={() => deleteProject(project)} className="grid size-10 place-items-center rounded-xl border border-line text-accent hover:border-red-400/50 hover:text-red-200" aria-label="Delete project">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="panel rounded-2xl p-5">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold text-text">{form.id ? "Edit Project" : "Add Project"}</h2>
              {form.id ? (
                <button onClick={() => setForm(emptyForm)} className="grid size-10 place-items-center rounded-xl border border-line text-accent hover:text-text" aria-label="Clear form">
                  <X size={16} />
                </button>
              ) : null}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["title", "Title"],
                ["slug", "Slug"],
                ["client", "Client"],
                ["year", "Year"],
                ["coverImage", "Cover image URL"],
                ["liveUrl", "Live demo URL"],
                ["githubUrl", "GitHub URL"],
                ["techStack", "Technologies, comma-separated"]
              ].map(([field, label]) => (
                <label key={field} className="grid gap-2 text-sm font-medium text-text">
                  {label}
                  <input value={String(form[field as keyof ProjectFormState] ?? "")} onChange={(event) => updateField(field as keyof ProjectFormState, event.target.value)} className="h-12 rounded-xl border border-line bg-white/[0.04] px-4 text-sm outline-none focus:border-secondary" />
                </label>
              ))}
            </div>

            <div className="mt-4 grid gap-4">
              {[
                ["summary", "Summary", 3],
                ["description", "Description", 5],
                ["challenge", "Challenge", 3],
                ["solution", "Solution", 3],
                ["impact", "Impact", 3]
              ].map(([field, label, rows]) => (
                <label key={String(field)} className="grid gap-2 text-sm font-medium text-text">
                  {label}
                  <textarea value={String(form[field as keyof ProjectFormState] ?? "")} onChange={(event) => updateField(field as keyof ProjectFormState, event.target.value)} rows={Number(rows)} className="rounded-xl border border-line bg-white/[0.04] p-4 text-sm outline-none focus:border-secondary" />
                </label>
              ))}
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-text">
                Category
                <select value={form.categoryId} onChange={(event) => updateField("categoryId", event.target.value)} className="h-12 rounded-xl border border-line bg-[#05091f] px-4 text-sm outline-none focus:border-secondary">
                  <option value="">Use new category name</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-medium text-text">
                New category name
                <input value={form.categoryName} onChange={(event) => updateField("categoryName", event.target.value)} className="h-12 rounded-xl border border-line bg-white/[0.04] px-4 text-sm outline-none focus:border-secondary" />
              </label>
            </div>

            <div className="mt-4 flex flex-wrap gap-4">
              <label className="inline-flex items-center gap-2 text-sm text-accent">
                <input type="checkbox" checked={form.featured} onChange={(event) => updateField("featured", event.target.checked)} />
                Featured
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-accent">
                <input type="checkbox" checked={form.published} onChange={(event) => updateField("published", event.target.checked)} />
                Published
              </label>
            </div>

            <div className="mt-6 rounded-2xl border border-line bg-white/[0.035] p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-semibold text-text">Screenshots Gallery</h3>
                <label className="inline-flex h-10 cursor-pointer items-center justify-center rounded-xl border border-line px-4 text-sm text-accent hover:text-text">
                  <ImagePlus className="mr-2" size={16} /> Upload
                  <input type="file" multiple accept="image/*" onChange={(event) => uploadScreenshots(event.target.files)} className="hidden" />
                </label>
              </div>
              <div className="mt-4 grid gap-3">
                {form.screenshots.map((screenshot, index) => (
                  <div key={index} className="grid gap-2 md:grid-cols-[1fr_0.7fr_auto]">
                    <input value={screenshot.url} onChange={(event) => updateScreenshot(index, "url", event.target.value)} placeholder="Screenshot URL" className="h-11 rounded-xl border border-line bg-white/[0.04] px-3 text-sm outline-none focus:border-secondary" />
                    <input value={screenshot.alt} onChange={(event) => updateScreenshot(index, "alt", event.target.value)} placeholder="Alt text" className="h-11 rounded-xl border border-line bg-white/[0.04] px-3 text-sm outline-none focus:border-secondary" />
                    <button onClick={() => updateField("screenshots", form.screenshots.filter((_, itemIndex) => itemIndex !== index))} className="grid size-11 place-items-center rounded-xl border border-line text-accent hover:text-red-200" aria-label="Remove screenshot">
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
                <button onClick={() => updateField("screenshots", [...form.screenshots, { url: "", alt: "", order: form.screenshots.length }])} className="h-11 rounded-xl border border-line text-sm text-accent hover:text-text">
                  Add screenshot URL
                </button>
              </div>
            </div>

            <Button onClick={saveProject} disabled={saving} type="button" className="mt-6 w-full">
              <Save className="mr-2" size={16} /> {saving ? "Saving..." : "Save Project"}
            </Button>

            <div className="mt-6 rounded-2xl border border-line bg-white/[0.035] p-4">
              <h3 className="font-semibold text-text">Manage Categories</h3>
              <div className="mt-4 flex gap-2">
                <input value={categoryName} onChange={(event) => setCategoryName(event.target.value)} placeholder="New category" className="h-11 flex-1 rounded-xl border border-line bg-white/[0.04] px-3 text-sm outline-none focus:border-secondary" />
                <button onClick={addCategory} className="h-11 rounded-xl border border-line px-4 text-sm text-accent hover:text-text">Add</button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <span key={category.id} className="rounded-full border border-line px-3 py-1 text-xs text-accent">
                    {category.name} {category._count ? `(${category._count.projects})` : ""}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
