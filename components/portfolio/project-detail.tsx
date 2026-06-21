"use client";

import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { PortfolioRecord } from "@/components/portfolio/portfolio-types";
import { getFallbackPortfolioProject } from "@/lib/fallback-portfolio";

export function ProjectDetail({ slug }: { slug: string }) {
  const [project, setProject] = useState<PortfolioRecord | null>(() => getFallbackPortfolioProject(slug));

  useEffect(() => {
    async function load() {
      try {
        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), 2200);
        const response = await fetch(`/api/projects/${slug}`, { signal: controller.signal });
        window.clearTimeout(timeout);

        if (response.ok) {
          const data = await response.json();
          const fallbackProject = getFallbackPortfolioProject(slug);
          setProject(fallbackProject ?? data);
        }
      } catch {
        setProject(getFallbackPortfolioProject(slug));
      }
    }

    setProject(getFallbackPortfolioProject(slug));
    load();
  }, [slug]);

  if (!project) {
    return <section className="min-h-screen pt-36"><div className="container-shell text-accent">Project not found.</div></section>;
  }

  return (
    <section className="min-h-screen pt-36">
      <div className="container-shell pb-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-secondary">
              {project.category?.name ?? "Case Study"}
            </p>
            <h1 className="mt-5 text-balance text-5xl font-semibold text-text md:text-7xl">
              {project.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-accent">{project.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.liveUrl ? (
                <Button href={project.liveUrl}>
                  Learn More <ExternalLink className="ml-2" size={16} />
                </Button>
              ) : null}
              {project.githubUrl ? (
                <Button href={project.githubUrl} variant="secondary">
                  GitHub <Github className="ml-2" size={16} />
                </Button>
              ) : null}
            </div>
          </div>
          <div className="panel overflow-hidden rounded-2xl p-3">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#05091f]">
              {project.coverImage ? (
                <Image src={project.coverImage} alt={project.title} fill className="object-cover" priority />
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(77,163,255,.45),transparent_28%),linear-gradient(135deg,rgba(26,111,255,.24),rgba(255,255,255,.04))]" />
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            ["Client", project.client ?? "ARYONIX"],
            ["Year", project.year?.toString() ?? "2026"],
            ["Stack", project.techStack.join(", ")]
          ].map(([label, value]) => (
            <div key={label} className="panel rounded-2xl p-6">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-secondary">{label}</p>
              <p className="mt-3 text-lg font-semibold text-text">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {[
            ["Challenge", project.challenge],
            ["Solution", project.solution],
            ["Impact", project.impact]
          ].map(([label, value]) => (
            <div key={label} className="panel rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-text">{label}</h2>
              <p className="mt-4 text-sm leading-7 text-accent">{value || project.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-secondary">Screenshots</p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {(project.screenshots.length ? project.screenshots : [{ url: project.coverImage ?? "", alt: project.title }])
              .filter((screenshot) => screenshot.url)
              .map((screenshot, index) => (
                <div key={`${screenshot.url}-${index}`} className="panel overflow-hidden rounded-2xl p-3">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#05091f]">
                    <Image src={screenshot.url} alt={screenshot.alt} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
