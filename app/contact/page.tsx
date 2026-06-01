import { Github, Instagram, Mail, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { SocialCards } from "@/components/social/social-cards";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Contact",
  description: "Start a premium web design or development project with ARYONIX."
};

export default function ContactPage() {
  return (
    <section className="min-h-screen pt-36">
      <div className="container-shell grid gap-10 pb-24 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-secondary">
            Contact
          </p>
          <h1 className="mt-5 text-balance text-4xl font-semibold text-text sm:text-5xl md:text-7xl">
            Tell us what you want to build.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-accent">
            Share the business goal, timeline and platform scope. Aryonix will
            respond with a clear next step.
          </p>
          <div className="mt-9 grid gap-3 text-sm text-accent">
            <a className="inline-flex items-center gap-3 hover:text-text" href={siteConfig.social.email.href}>
              <Mail size={18} /> {siteConfig.social.email.handle}
            </a>
            <a className="inline-flex items-center gap-3 hover:text-text" href={siteConfig.social.whatsapp.href} target="_blank" rel="noreferrer">
              <MessageCircle size={18} /> {siteConfig.social.whatsapp.handle}
            </a>
            <a className="inline-flex items-center gap-3 hover:text-text" href={siteConfig.social.instagram.href} target="_blank" rel="noreferrer">
              <Instagram size={18} /> {siteConfig.social.instagram.handle}
            </a>
            <a className="inline-flex items-center gap-3 hover:text-text" href={siteConfig.social.github.href} target="_blank" rel="noreferrer">
              <Github size={18} /> {siteConfig.social.github.handle}
            </a>
          </div>
        </div>
        <ContactForm />
      </div>
      <div className="container-shell pb-24">
        <div className="mb-8">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-secondary">
            Social Media
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-text md:text-5xl">
            Reach Aryonix through the official channels.
          </h2>
        </div>
        <SocialCards />
      </div>
    </section>
  );
}
