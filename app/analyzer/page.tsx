import type { Metadata } from "next";
import { WebsiteAnalyzer } from "@/components/analyzer/website-analyzer";

export const metadata: Metadata = {
  title: "Website Analyzer | ARYONIX",
  description: "Run a premium ARYONIX demo audit for design, mobile, SEO and speed improvement opportunities."
};

export default function AnalyzerPage() {
  return <WebsiteAnalyzer />;
}
