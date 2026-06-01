import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";
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
    "ARYONIX designs, develops and deploys premium websites, SaaS platforms and digital products built for growth.",
  keywords: [
    "Aryonix",
    "premium web development",
    "UI UX design",
    "full stack development",
    "business websites",
    "portfolio websites"
  ],
  authors: [{ name: "ARYONIX" }],
  alternates: {
    canonical: siteConfig.url
  },
  openGraph: {
    title: "ARYONIX | Design. Develop. Deploy.",
    description:
      "Premium technology studio for websites, SaaS platforms and digital products.",
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
      "We engineer digital experiences that move businesses forward.",
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
        <Footer />
      </body>
    </html>
  );
}
