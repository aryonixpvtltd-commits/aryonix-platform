"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const ConsultantPanel = dynamic(
  () => import("@/components/chatbot/consultant-panel").then((module) => module.ConsultantPanel),
  { ssr: false }
);

export function AryonixChatbot() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if (event.altKey && event.key.toLowerCase() === "c") {
        event.preventDefault();
        setLoaded(true);
        setOpen((current) => !current);
      }
    }

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  function openConsultant() {
    setLoaded(true);
    setOpen(true);
  }

  return (
    <>
      {!open ? (
        <div className="group fixed bottom-5 right-5 z-[60] sm:bottom-6 sm:right-6">
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -3, scale: 1.025 }}
            whileTap={{ scale: 0.97 }}
            onClick={openConsultant}
            className="relative flex h-16 items-center gap-3 overflow-hidden rounded-[20px] border border-secondary/45 bg-[#07122f]/95 px-3.5 pr-4 text-white shadow-[0_22px_70px_rgba(26,111,255,0.4),0_0_34px_rgba(77,163,255,0.22)] backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Open ARYONIX AI website consultant"
            aria-haspopup="dialog"
          >
            <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(77,163,255,0.13),transparent)]" />
            <span className="relative grid size-11 shrink-0 place-items-center rounded-2xl border border-secondary/35 bg-primary/15">
              <span className="absolute inset-2 animate-pulse rounded-full bg-secondary/30 blur-md" />
              <Sparkles className="relative text-secondary" size={21} />
              <span className="absolute -right-0.5 -top-0.5 size-3 rounded-full border-2 border-[#07122f] bg-emerald-400" />
            </span>
            <span className="relative hidden text-left sm:block">
              <span className="block text-[11px] font-medium text-white/60">Need help choosing?</span>
              <span className="block text-sm font-semibold">Ask ARYONIX AI</span>
            </span>
            <span className="absolute inset-0 animate-[pulse_2.8s_ease-in-out_infinite] rounded-[20px] ring-1 ring-secondary/20" />
          </motion.button>
          <span className="pointer-events-none absolute bottom-full right-0 mb-3 w-max translate-y-1 rounded-xl border border-line bg-[#07102a]/95 px-3 py-2 text-xs text-accent opacity-0 shadow-panel backdrop-blur-xl transition duration-200 group-hover:translate-y-0 group-hover:opacity-100">
            Need help choosing your website?
          </span>
        </div>
      ) : null}

      {loaded ? <ConsultantPanel open={open} onOpenChange={setOpen} /> : null}
    </>
  );
}
