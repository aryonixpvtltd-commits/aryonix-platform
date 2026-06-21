import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/portfolio", "/about", "/contact"];
  const projectRoutes = [
    "/portfolio/student-toolkit",
    "/portfolio/cgpa-calculator",
    "/portfolio/aqi-dashboard",
    "/portfolio/aryonix-platform"
  ];

  return [...routes, ...projectRoutes].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : route.startsWith("/portfolio/") ? "monthly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/portfolio/") ? 0.75 : 0.7
  }));
}
