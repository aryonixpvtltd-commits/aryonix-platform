import { ProjectDetail } from "@/components/portfolio/project-detail";
import { getFallbackPortfolioProject } from "@/lib/fallback-portfolio";
import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getFallbackPortfolioProject(slug);
  const title = project ? `${project.title} Case Study` : "Project Case Study";
  const description = project?.summary ?? "Explore an ARYONIX portfolio case study with screenshots, stack, links and production details.";
  const image = project?.coverImage ?? "/brand/aryonix-banner.png";

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/portfolio/${slug}`
    },
    openGraph: {
      title: `${title} | ARYONIX`,
      description,
      url: `${siteConfig.url}/portfolio/${slug}`,
      images: [{ url: image, alt: title }]
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ARYONIX`,
      description,
      images: [image]
    }
  };
}

export default async function ProjectPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProjectDetail slug={slug} />;
}
