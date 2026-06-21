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
      "Starter Website",
      "Business Website",
      "Custom Web Application",
      "UI/UX Design",
      "Website Maintenance",
      "Admin Dashboard Development"
    ].map((name) => ({
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      itemOffered: {
        "@type": "Service",
        name,
        provider: {
          "@type": "Organization",
          name: siteConfig.name
        }
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
