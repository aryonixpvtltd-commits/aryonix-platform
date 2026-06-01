import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { slugify, type ProjectPayload } from "@/lib/portfolio-validation";

export const projectInclude = {
  category: true,
  screenshots: {
    orderBy: { order: "asc" }
  }
} satisfies Prisma.ProjectInclude;

export type PortfolioProject = Prisma.ProjectGetPayload<{
  include: typeof projectInclude;
}>;

export async function ensureCategory(input: {
  categoryId?: string;
  categoryName?: string;
}) {
  if (input.categoryId) {
    return prisma.projectCategory.findUniqueOrThrow({
      where: { id: input.categoryId }
    });
  }

  const name = input.categoryName?.trim() || "Business";
  return prisma.projectCategory.upsert({
    where: { slug: slugify(name) },
    update: { name },
    create: {
      name,
      slug: slugify(name)
    }
  });
}

export async function listProjects(filters?: {
  search?: string;
  category?: string;
  includeDrafts?: boolean;
}) {
  return prisma.project.findMany({
    where: {
      ...(filters?.includeDrafts ? {} : { published: true }),
      ...(filters?.search
        ? {
            OR: [
              { title: { contains: filters.search, mode: "insensitive" } },
              { summary: { contains: filters.search, mode: "insensitive" } },
              { description: { contains: filters.search, mode: "insensitive" } }
            ]
          }
        : {}),
      ...(filters?.category && filters.category !== "all"
        ? { category: { slug: filters.category } }
        : {})
    },
    include: projectInclude,
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }]
  });
}

export async function createProject(data: ProjectPayload) {
  const category = await ensureCategory(data);

  return prisma.project.create({
    data: {
      title: data.title,
      slug: data.slug ?? slugify(data.title),
      summary: data.summary,
      description: data.description,
      challenge: data.challenge,
      solution: data.solution,
      impact: data.impact,
      year: data.year,
      client: data.client,
      categoryId: category.id,
      coverImage: data.coverImage,
      liveUrl: data.liveUrl,
      githubUrl: data.githubUrl,
      techStack: data.techStack,
      featured: data.featured ?? false,
      published: data.published ?? true,
      screenshots: {
        create: data.screenshots ?? []
      }
    },
    include: projectInclude
  });
}

export async function updateProject(id: string, data: ProjectPayload) {
  const category = await ensureCategory(data);

  return prisma.project.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug ?? slugify(data.title),
      summary: data.summary,
      description: data.description,
      challenge: data.challenge,
      solution: data.solution,
      impact: data.impact,
      year: data.year,
      client: data.client,
      categoryId: category.id,
      coverImage: data.coverImage,
      liveUrl: data.liveUrl,
      githubUrl: data.githubUrl,
      techStack: data.techStack,
      featured: data.featured ?? false,
      published: data.published ?? true,
      screenshots: {
        deleteMany: {},
        create: data.screenshots ?? []
      }
    },
    include: projectInclude
  });
}
