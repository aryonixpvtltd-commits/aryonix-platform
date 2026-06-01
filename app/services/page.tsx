import { ServicesSection } from "@/components/sections/services-section";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata = {
  title: "Services",
  description: "Premium web design, UI/UX, full stack development and website maintenance services by ARYONIX."
};

export default function ServicesPage() {
  return (
    <div className="pt-28">
      <ServicesSection />
      <CtaSection />
    </div>
  );
}
