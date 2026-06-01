import { siteConfig } from "@/lib/site";

export function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    slogan: siteConfig.tagline,
    email: siteConfig.email,
    sameAs: [siteConfig.instagram, siteConfig.github],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: `+91${siteConfig.whatsapp}`,
        contactType: "sales",
        areaServed: "IN"
      }
    ],
    makesOffer: [
      "Web Design",
      "Full Stack Development",
      "UI/UX Design",
      "Business Websites",
      "Portfolio Websites",
      "Website Maintenance"
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
