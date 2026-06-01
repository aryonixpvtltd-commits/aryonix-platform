export const siteConfig = {
  name: "ARYONIX",
  tagline: "DESIGN • DEVELOP • DEPLOY",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aryonix.in",
  email: "aryonixpvtltd@gmail.com",
  whatsapp: "9359368382",
  instagram: "https://www.instagram.com/aryonix.in",
  github: "https://github.com/aryonixpvtltd-commits",
  social: {
    instagram: {
      label: "Instagram",
      handle: "@aryonix.in",
      href: "https://www.instagram.com/aryonix.in"
    },
    github: {
      label: "GitHub",
      handle: "aryonixpvtltd-commits",
      href: "https://github.com/aryonixpvtltd-commits"
    },
    email: {
      label: "Email",
      handle: "aryonixpvtltd@gmail.com",
      href: "mailto:aryonixpvtltd@gmail.com"
    },
    whatsapp: {
      label: "WhatsApp",
      handle: "+91 9359368382",
      href: "https://wa.me/919359368382"
    }
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ]
};
