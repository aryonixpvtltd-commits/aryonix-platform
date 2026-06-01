import { AboutPreview } from "@/components/sections/about-preview";
import { ProcessSection } from "@/components/sections/process-section";
import { WhyChoose } from "@/components/sections/why-choose";

export const metadata = {
  title: "About",
  description: "ARYONIX is a premium technology studio for modern businesses and digital products."
};

export default function AboutPage() {
  return (
    <div className="pt-28">
      <AboutPreview />
      <ProcessSection />
      <WhyChoose />
    </div>
  );
}
