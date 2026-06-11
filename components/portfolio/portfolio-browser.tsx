"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/portfolio/project-card";
import type { PortfolioCategory, PortfolioRecord } from "@/components/portfolio/portfolio-types";
import { fallbackPortfolioProjects } from "@/lib/fallback-portfolio";

export function PortfolioBrowser() {
  const [projects, setProjects] = useState<PortfolioRecord[]>(fallbackPortfolioProjects);
  const [categories, setCategories] = useState<PortfolioCategory[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const params = new URLSearchParams();
      if (query) params.set("search", query);
      if (category !== "all") params.set("category", category);

      const [projectsResponse, categoriesResponse] = await Promise.all([
        fetch(`/api/projects?${params.toString()}`),
        fetch("/api/categories")
      ]);

      if (projectsResponse.ok) {
        const data = await projectsResponse.json();
        const fallback = fallbackPortfolioProjects.filter((project) => {
          const matchesQuery = query
            ? `${project.title} ${project.summary} ${project.description}`
                .toLowerCase()
                .includes(query.toLowerCase())
            : true;
          const matchesCategory = category === "all" || project.category?.slug === category;
          return matchesQuery && matchesCategory;
        });
        setProjects(data.length ? data : fallback);
      } else {
        setProjects(
          fallbackPortfolioProjects.filter((project) => {
            const matchesQuery = query
              ? `${project.title} ${project.summary} ${project.description}`
                  .toLowerCase()
                  .includes(query.toLowerCase())
              : true;
            const matchesCategory = category === "all" || project.category?.slug === category;
            return matchesQuery && matchesCategory;
          })
        );
      }

      if (categoriesResponse.ok) {
        setCategories(await categoriesResponse.json());
      }

      setLoading(false);
    }

    const timer = window.setTimeout(load, 180);
    return () => window.clearTimeout(timer);
  }, [query, category]);

  const categoryOptions = useMemo(() => {
    const fromProjects = projects
      .map((project) => project.category)
      .filter((item): item is PortfolioCategory => Boolean(item));
    const map = new Map<string, PortfolioCategory>();
    [...categories, ...fromProjects].forEach((item) => map.set(item.slug, item));
    return Array.from(map.values());
  }, [categories, projects]);

  return (
    <section className="min-h-screen pt-36">
      <div className="container-shell pb-24">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Portfolio"
            title="Project systems built with premium craft and production thinking."
            description="Search by product type, filter by category and open each project for technologies, links and screenshot galleries."
          />
          <div className="panel w-full rounded-2xl p-3 lg:max-w-md">
            <label className="flex h-12 items-center gap-3 rounded-xl border border-line bg-white/[0.04] px-4 text-accent">
              <Search size={18} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search projects..."
                className="w-full bg-transparent text-sm text-text outline-none placeholder:text-accent/60"
              />
            </label>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-xl border border-line bg-white/[0.04] px-3 py-2 text-xs uppercase tracking-[0.18em] text-accent">
            <SlidersHorizontal size={14} />
            Filter
          </span>
          <button
            onClick={() => setCategory("all")}
            className={`rounded-xl border px-4 py-2 text-sm transition ${category === "all" ? "border-secondary bg-primary/20 text-text" : "border-line bg-white/[0.04] text-accent hover:text-text"}`}
          >
            All
          </button>
          {categoryOptions.map((item) => (
            <button
              key={item.slug}
              onClick={() => setCategory(item.slug)}
              className={`rounded-xl border px-4 py-2 text-sm transition ${category === item.slug ? "border-secondary bg-primary/20 text-text" : "border-line bg-white/[0.04] text-accent hover:text-text"}`}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {!loading && projects.length === 0 ? (
          <div className="panel mt-10 rounded-2xl p-8 text-center text-accent">
            No projects match this search yet.
          </div>
        ) : null}
      </div>
    </section>
  );
}
