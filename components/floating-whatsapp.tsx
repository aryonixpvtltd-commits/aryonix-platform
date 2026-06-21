import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function FloatingWhatsApp() {
  return (
    <a
      href={siteConfig.social.whatsapp.href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with ARYONIX on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex size-14 items-center justify-center rounded-2xl border border-emerald-300/40 bg-emerald-400 text-[#03110b] shadow-[0_18px_60px_rgba(52,211,153,0.35)] transition hover:-translate-y-0.5 hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200"
    >
      <MessageCircle size={24} />
    </a>
  );
}
