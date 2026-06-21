import { siteConfig } from "@/lib/site";

export function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
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
            areaServed: "IN",
            availableLanguage: ["English", "Hindi", "Marathi"]
          }
        ],
        makesOffer: [
          "Starter Website",
          "Business Website",
          "Premium Custom Website",
          "E-commerce Website",
          "Custom Quote"
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
      },
      {
        "@type": "WebSite",
        name: `${siteConfig.name} Premium Agency Website`,
        url: siteConfig.url,
        publisher: {
          "@type": "Organization",
          name: siteConfig.name
        }
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          ["How fast can ARYONIX launch a website?", "A focused starter website can move quickly once content and scope are clear. Larger business websites, e-commerce builds and custom apps are scoped after discovery."],
          ["Do you build only portfolio websites?", "No. ARYONIX is positioned as a premium agency for business websites, custom web applications, dashboards, admin panels and launch-ready digital systems."],
          ["Can you handle design and development together?", "Yes. The workflow covers strategy, UI/UX, responsive frontend, backend integrations, database workflows, QA and deployment support."]
        ].map(([name, text]) => ({
          "@type": "Question",
          name,
          acceptedAnswer: {
            "@type": "Answer",
            text
          }
        }))
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
