import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { Navbar } from "@/components/navbar";
import { StructuredData } from "@/components/structured-data";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "ARYONIX | Premium Web Development Studio",
    template: "%s | ARYONIX"
  },
  description:
    "ARYONIX designs, develops and deploys premium websites, business platforms and custom web applications for startups and growing businesses.",
  keywords: [
    "Aryonix",
    "premium web development",
    "startup website agency",
    "custom web application development",
    "Next.js agency",
    "UI UX design",
    "full stack development",
    "business websites",
    "portfolio websites"
  ],
  authors: [{ name: "ARYONIX" }],
  icons: {
    icon: "/brand/aryonix-logo.png",
    apple: "/brand/aryonix-logo.png"
  },
  alternates: {
    canonical: siteConfig.url
  },
  openGraph: {
    title: "ARYONIX | Premium Website and Web Application Agency",
    description:
      "Premium digital agency for startup websites, business platforms, custom applications and conversion-focused product experiences.",
    url: siteConfig.url,
    siteName: "ARYONIX",
    type: "website",
    emails: [siteConfig.email],
    images: [
      {
        url: "/brand/aryonix-banner.png",
        width: 1536,
        height: 1024,
        alt: "ARYONIX premium technology studio"
      }
    ]
  },
  other: {
    "profile:instagram": siteConfig.instagram,
    "profile:github": siteConfig.github,
    "aryonix:social:instagram": siteConfig.instagram,
    "aryonix:social:github": siteConfig.github
  },
  twitter: {
    card: "summary_large_image",
    title: "ARYONIX | Premium Web Development Studio",
    description:
      "Premium websites and custom web applications for startups and growing businesses.",
    images: ["/brand/aryonix-banner.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <div className="noise" />
        <StructuredData />
        <Navbar />
        <main>{children}</main>
        <FloatingWhatsApp />
        <Footer />
      </body>
    </html>
  );
}
