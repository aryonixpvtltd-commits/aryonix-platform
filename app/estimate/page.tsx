import type { Metadata } from "next";
import { WebsiteEstimator } from "@/components/estimator/website-estimator";

export const metadata: Metadata = {
  title: "Website Cost Estimator",
  description: "Estimate your ARYONIX website package, investment range and delivery timeline."
};

export default function EstimatePage() {
  return <WebsiteEstimator />;
}
