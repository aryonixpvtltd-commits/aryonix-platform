import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ARYONIX",
    short_name: "ARYONIX",
    description: "Premium web development and digital product studio.",
    start_url: "/",
    display: "standalone",
    background_color: "#04071A",
    theme_color: "#1A6FFF",
    icons: [
      {
        src: "/brand/aryonix-logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      }
    ]
  };
}
