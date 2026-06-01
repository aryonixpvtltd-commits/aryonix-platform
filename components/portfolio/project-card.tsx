"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Images } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { PortfolioRecord } from "@/components/portfolio/portfolio-types";

export function ProjectCard({
  project,
  index = 0
}: {
  project: PortfolioRecord;
  index?: number;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      className="panel group overflow-hidden rounded-2xl"
    >
      <Link href={`/portfolio/${project.slug}`} className="block">
        <div className="relative h-64 overflow-hidden border-b border-line bg-[#05091f]">
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(77,163,255,.45),transparent_28%),linear-gradient(135deg,rgba(26,111,255,.24),rgba(255,255,255,.04))]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
          <div className="absolute left-5 top-5 rounded-full border border-line bg-background/55 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-secondary backdrop-blur-md">
            {project.category?.name ?? "Project"}
          </div>
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-2xl font-semibold text-text">{project.title}</p>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-accent">
                {project.summary}
              </p>
            </div>
            <div className="hidden items-center gap-2 rounded-xl border border-line bg-background/55 px-3 py-2 text-xs text-accent backdrop-blur-md sm:flex">
              <Images size={15} />
              {project.screenshots.length}
            </div>
          </div>
        </div>
      </Link>
      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          {project.techStack.slice(0, 5).map((tech) => (
            <span key={tech} className="rounded-full border border-line px-3 py-1 text-xs text-accent">
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href={`/portfolio/${project.slug}`} className="inline-flex min-h-10 items-center justify-center rounded-xl border border-secondary/40 bg-primary/15 px-4 py-2 text-center text-sm font-semibold text-text transition hover:bg-primary/25">
            View Project
          </Link>
          <div className="flex flex-wrap gap-2">
            {project.liveUrl ? (
              <a className="grid size-10 place-items-center rounded-xl border border-line text-accent transition hover:border-secondary/50 hover:text-text" href={project.liveUrl} aria-label="Live demo">
                <ExternalLink size={17} />
              </a>
            ) : null}
            {project.githubUrl ? (
              <a className="inline-flex min-h-10 items-center justify-center rounded-xl border border-line px-4 py-2 text-center text-sm font-semibold text-accent transition hover:border-secondary/50 hover:text-text" href={project.githubUrl} target="_blank" rel="noreferrer">
                GitHub Repository <Github className="ml-2" size={16} />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
