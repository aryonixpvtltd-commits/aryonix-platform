import { AboutPreview } from "@/components/sections/about-preview";
import { BuiltInPublicSection } from "@/components/sections/built-in-public-section";
import { CtaSection } from "@/components/sections/cta-section";
import { Hero } from "@/components/sections/hero";
import { HeroStatsSection } from "@/components/sections/hero-stats-section";
import { InstagramShowcase } from "@/components/sections/instagram-showcase";
import { PortfolioShowcase } from "@/components/sections/portfolio-showcase";
import { PortfolioStatsSection } from "@/components/sections/portfolio-stats-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesSection } from "@/components/sections/services-section";
import { SocialProofSection } from "@/components/sections/social-proof-section";
import { StatsSection } from "@/components/sections/stats-section";
import { TechnologiesSection } from "@/components/sections/technologies-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { TrustedBy } from "@/components/sections/trusted-by";
import { WhyChoose } from "@/components/sections/why-choose";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HeroStatsSection />
      <ServicesSection />
      <TechnologiesSection />
      <TrustedBy />
      <PortfolioShowcase />
      <PortfolioStatsSection />
      <ProcessSection />
      <WhyChoose />
      <InstagramShowcase />
      <SocialProofSection />
      <BuiltInPublicSection />
      <AboutPreview />
      <TestimonialsSection />
      <StatsSection />
      <CtaSection />
    </>
  );
}
