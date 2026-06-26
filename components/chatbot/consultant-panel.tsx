"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  ExternalLink,
  Gauge,
  LoaderCircle,
  MessageCircle,
  Minus,
  RotateCcw,
  Send,
  Settings,
  Sparkles,
  UserRound,
  X
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  buildConversationSummary,
  businessTypeIcons,
  createRecommendation,
  emptyLeadForm,
  emptyQualification,
  estimatorSteps,
  portfolioCards,
  pricingCards,
  serviceCards,
  suggestedQuestions,
  welcomeCards
} from "@/components/chatbot/consultant-data";
import type {
  ChatMessage,
  ConsultantScreen,
  LeadForm,
  Qualification,
  Recommendation
} from "@/components/chatbot/consultant-data";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

type ConsultantPanelProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const particles = [
  { left: "9%", top: "17%", delay: 0 },
  { left: "78%", top: "12%", delay: 0.7 },
  { left: "21%", top: "64%", delay: 1.1 },
  { left: "88%", top: "71%", delay: 1.8 },
  { left: "56%", top: "43%", delay: 2.2 }
];

export function ConsultantPanel({ open, onOpenChange }: ConsultantPanelProps) {
  const reducedMotion = useReducedMotion();
  const [screen, setScreen] = useState<ConsultantScreen>("welcome");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [qualification, setQualification] = useState<Qualification>(emptyQualification);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [leadForm, setLeadForm] = useState<LeadForm>(emptyLeadForm);
  const [leadStatus, setLeadStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [leadError, setLeadError] = useState("");
  const [projectIndex, setProjectIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messageId = useRef(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && open) onOpenChange(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenChange, open]);

  useEffect(() => {
    if (!open || !scrollRef.current) return;
    const richScreens: ConsultantScreen[] = ["welcome", "services", "pricing", "portfolio", "lead", "success"];
    scrollRef.current.scrollTo({
      top: richScreens.includes(screen) ? 0 : scrollRef.current.scrollHeight,
      behavior: reducedMotion ? "auto" : "smooth"
    });
  }, [messages, open, reducedMotion, screen, thinking]);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const currentStep = estimatorSteps[stepIndex];

  const requirements = useMemo(
    () => [
      qualification.pages,
      qualification.booking === "Yes" ? "Booking system" : "",
      qualification.payment === "Yes" ? "Payment gateway" : "",
      qualification.admin === "Yes" ? "Admin dashboard" : ""
    ].filter(Boolean),
    [qualification]
  );

  function addMessage(role: ChatMessage["role"], text: string) {
    setMessages((current) => [...current, { id: messageId.current++, role, text }]);
  }

  function resetConsultant() {
    setScreen("welcome");
    setMessages([]);
    setQualification(emptyQualification);
    setRecommendation(null);
    setStepIndex(0);
    setLeadForm(emptyLeadForm);
    setLeadStatus("idle");
    setLeadError("");
  }

  function startEstimator(initialType?: string) {
    const next = initialType
      ? { ...emptyQualification, projectType: initialType }
      : emptyQualification;
    setQualification(next);
    setRecommendation(null);
    setMessages(initialType ? [{ id: messageId.current++, role: "user", text: initialType }] : []);
    setStepIndex(initialType ? 1 : 0);
    setScreen("estimator");
  }

  function answerEstimator(value: string) {
    if (!currentStep || thinking) return;
    const nextQualification = { ...qualification, [currentStep.key]: value };
    setQualification(nextQualification);
    addMessage("user", value);
    setThinking(true);

    timerRef.current = setTimeout(() => {
      setThinking(false);
      if (stepIndex === estimatorSteps.length - 1) {
        const result = createRecommendation(nextQualification);
        setRecommendation(result);
        addMessage("assistant", `Great choice. Based on your requirements, I recommend the ${result.packageName}.`);
        setLeadForm((current) => ({
          ...current,
          budget: result.budget,
          timeline: result.timeline,
          projectDetails: buildConversationSummary(nextQualification, result)
        }));
        setScreen("estimate");
        return;
      }

      setStepIndex((current) => current + 1);
    }, reducedMotion ? 100 : 650);
  }

  async function handleQuestion(question: string) {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || thinking) return;

    const normalized = trimmedQuestion.toLowerCase();
    const nextMessages: ChatMessage[] = [
      ...messages,
      { id: messageId.current++, role: "user", text: trimmedQuestion }
    ];
    setMessages(nextMessages);
    setInput("");
    setScreen("chat");
    setThinking(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmedQuestion,
          messages: nextMessages.map((message) => ({ role: message.role, text: message.text }))
        })
      });
      const data = await response.json().catch(() => ({}));
      setThinking(false);

      if (!response.ok || typeof data.reply !== "string") {
        throw new Error("Chatbot response failed.");
      }

      addMessage("assistant", data.reply);

      if (normalized.includes("cost") || normalized.includes("price")) {
        setScreen("pricing");
        return;
      }
      if (normalized.includes("work") || normalized.includes("portfolio") || normalized.includes("recent")) {
        setScreen("portfolio");
        return;
      }
      if (normalized.includes("consultation") || normalized.includes("human") || normalized.includes("book")) {
        setScreen("lead");
        return;
      }
      if (normalized.includes("service") || normalized.includes("design") || normalized.includes("develop")) {
        setScreen("services");
        return;
      }
    } catch {
      setThinking(false);
      addMessage("assistant", "ARYONIX can help you plan a premium website, web application, UI/UX system or AI chatbot. Tell me your business type, features, budget and timeline, and I will recommend the right path.");
    }
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLeadStatus("loading");
    setLeadError("");

    const activeRecommendation = recommendation ?? createRecommendation(qualification);
    const conversationSummary = buildConversationSummary(qualification, activeRecommendation);

    try {
      const response = await fetch("/api/chatbot-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadForm.name,
          business: leadForm.business,
          phone: leadForm.phone,
          email: leadForm.email,
          businessType: qualification.projectType || "Website consultation",
          budget: leadForm.budget,
          timeline: leadForm.timeline,
          requirement: leadForm.projectDetails,
          conversationSummary,
          leadScore: activeRecommendation.leadScore,
          estimatedPackage: activeRecommendation.packageName,
          requirements
        })
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setLeadError(data.errors?.join(" ") ?? "Could not submit your consultation request.");
        setLeadStatus("error");
        return;
      }

      setLeadStatus("success");
      setScreen("success");
    } catch {
      setLeadError("Network error. Please try again or talk to ARYONIX on WhatsApp.");
      setLeadStatus("error");
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <>
        <motion.button
          key="aryonix-ai-backdrop"
          type="button"
          aria-label="Minimize ARYONIX AI"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onOpenChange(false)}
          className="fixed inset-0 z-[69] cursor-default bg-black/10 backdrop-blur-[2px]"
        />
        <motion.section
          key="aryonix-ai-panel"
          role="dialog"
          aria-modal="true"
          aria-label="ARYONIX AI website consultant"
          initial={{ opacity: 0, y: 34, scale: 0.965 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 26, scale: 0.975 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          drag={isMobile ? "y" : false}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0, bottom: 0.22 }}
          onDragEnd={(_, info) => {
            if (isMobile && info.offset.y > 110) onOpenChange(false);
          }}
          className="fixed inset-x-2 bottom-2 z-[70] flex h-[calc(100dvh-16px)] flex-col overflow-hidden rounded-[22px] border border-secondary/25 bg-[#05091f]/95 shadow-[0_32px_120px_rgba(0,0,0,0.78),0_0_72px_rgba(26,111,255,0.18)] backdrop-blur-2xl sm:inset-x-auto sm:bottom-6 sm:right-6 sm:h-[min(720px,calc(100dvh-48px))] sm:w-[440px]"
        >
          <div className="absolute left-1/2 top-1.5 z-10 h-1 w-10 -translate-x-1/2 rounded-full bg-white/20 sm:hidden" />
          <ConsultantBackground />
          <ConsultantHeader
            onClose={() => onOpenChange(false)}
            onReset={resetConsultant}
            showBack={screen !== "welcome"}
            onBack={() => setScreen("welcome")}
          />

          <div ref={scrollRef} className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={screen}
                initial={{ opacity: 0, x: reducedMotion ? 0 : 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reducedMotion ? 0 : -8 }}
                transition={{ duration: reducedMotion ? 0.01 : 0.22 }}
              >
                {screen === "welcome" ? (
                  <WelcomeScreen onSelect={startEstimator} onQuestion={handleQuestion} />
                ) : null}
                {screen === "chat" ? (
                  <Conversation messages={messages} thinking={thinking} />
                ) : null}
                {screen === "services" ? (
                  <ServicesScreen onEstimate={() => startEstimator()} />
                ) : null}
                {screen === "pricing" ? (
                  <PricingScreen onEstimate={() => startEstimator()} />
                ) : null}
                {screen === "portfolio" ? (
                  <PortfolioScreen index={projectIndex} onIndexChange={setProjectIndex} />
                ) : null}
                {screen === "estimator" && currentStep ? (
                  <EstimatorScreen
                    messages={messages}
                    thinking={thinking}
                    step={currentStep}
                    stepIndex={stepIndex}
                    onAnswer={answerEstimator}
                  />
                ) : null}
                {screen === "estimate" && recommendation ? (
                  <EstimateScreen
                    recommendation={recommendation}
                    qualification={qualification}
                    onLead={() => setScreen("lead")}
                    onRestart={() => startEstimator()}
                  />
                ) : null}
                {screen === "lead" ? (
                  <LeadScreen
                    form={leadForm}
                    status={leadStatus}
                    error={leadError}
                    onChange={(key, value) => setLeadForm((current) => ({ ...current, [key]: value }))}
                    onSubmit={submitLead}
                  />
                ) : null}
                {screen === "success" ? (
                  <SuccessScreen onReset={resetConsultant} />
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>

          {!["lead", "success"].includes(screen) ? (
            <ConsultantComposer
              value={input}
              disabled={thinking}
              onChange={setInput}
              onSubmit={() => handleQuestion(input)}
            />
          ) : null}
        </motion.section>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function ConsultantBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="grid-mask absolute inset-0 opacity-20" />
      <div className="absolute -left-20 -top-20 size-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-16 size-72 rounded-full bg-secondary/[0.08] blur-3xl" />
      {particles.map((particle) => (
        <motion.span
          key={`${particle.left}-${particle.top}`}
          className="absolute size-1 rounded-full bg-secondary/40 shadow-[0_0_12px_rgba(77,163,255,0.7)]"
          style={{ left: particle.left, top: particle.top }}
          animate={{ y: [0, -12, 0], opacity: [0.2, 0.75, 0.2] }}
          transition={{ duration: 4.5, repeat: Infinity, delay: particle.delay }}
        />
      ))}
    </div>
  );
}

function ConsultantHeader({
  onClose,
  onReset,
  showBack,
  onBack
}: {
  onClose: () => void;
  onReset: () => void;
  showBack: boolean;
  onBack: () => void;
}) {
  return (
    <header className="relative flex min-h-[82px] items-center justify-between border-b border-line px-3.5 sm:px-4">
      <div className="flex min-w-0 items-center gap-3">
        {showBack ? (
          <IconButton label="Return to welcome" onClick={onBack}>
            <ArrowLeft size={16} />
          </IconButton>
        ) : (
          <AiOrb />
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-sm font-semibold text-text">ARYONIX AI</h2>
            <Sparkles size={13} className="text-secondary" />
          </div>
          <p className="mt-0.5 truncate text-[11px] text-accent">AI Website Consultant</p>
          <p className="mt-1 flex items-center gap-1.5 text-[10px] text-accent/70">
            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
            Online · Replies in under 30 seconds
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <IconButton label="Reset consultation" onClick={onReset}>
          <RotateCcw size={15} />
        </IconButton>
        <button
          type="button"
          disabled
          title="Consultant settings are coming soon"
          className="grid size-9 place-items-center rounded-xl border border-line bg-white/[0.035] text-accent/40"
          aria-label="Consultant settings coming soon"
        >
          <Settings size={15} />
        </button>
        <IconButton label="Minimize ARYONIX AI" onClick={onClose}>
          <Minus size={16} />
        </IconButton>
        <IconButton label="Close ARYONIX AI" onClick={onClose}>
          <X size={16} />
        </IconButton>
      </div>
    </header>
  );
}

function AiOrb() {
  return (
    <div className="relative grid size-11 shrink-0 place-items-center rounded-2xl border border-secondary/35 bg-primary/10">
      <motion.span
        className="absolute inset-2 rounded-full border border-secondary/50"
        animate={{ scale: [0.86, 1.08, 0.86], opacity: [0.45, 0.9, 0.45] }}
        transition={{ duration: 2.8, repeat: Infinity }}
      />
      <motion.span
        className="size-3.5 rounded-full bg-secondary shadow-[0_0_22px_rgba(77,163,255,0.95)]"
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      />
    </div>
  );
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="grid size-9 place-items-center rounded-xl border border-line bg-white/[0.035] text-accent transition hover:border-secondary/45 hover:bg-secondary/[0.09] hover:text-text focus:outline-none focus:ring-2 focus:ring-secondary/60"
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
}

function WelcomeScreen({
  onSelect,
  onQuestion
}: {
  onSelect: (type: string) => void;
  onQuestion: (question: string) => void;
}) {
  return (
    <div>
      <div className="py-2 text-center">
        <div className="mx-auto grid size-14 place-items-center rounded-[18px] border border-secondary/30 bg-secondary/[0.08] text-secondary shadow-[0_0_36px_rgba(26,111,255,0.18)]">
          <Sparkles size={24} />
        </div>
        <h3 className="mt-5 text-2xl font-semibold text-text">Welcome to ARYONIX AI</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-accent">
          I help businesses choose the right website, estimate pricing, explore our work, and connect with our team.
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2.5">
        {welcomeCards.map((card, index) => (
          <motion.button
            key={card.title}
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.045 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(card.type)}
            className="group min-w-0 rounded-[18px] border border-line bg-white/[0.04] p-3.5 text-left shadow-[0_14px_42px_rgba(0,0,0,0.18)] transition hover:border-secondary/45 hover:bg-secondary/[0.075]"
          >
            <span className="grid size-9 place-items-center rounded-xl border border-secondary/25 bg-primary/10 text-secondary transition group-hover:shadow-[0_0_22px_rgba(26,111,255,0.24)]">
              <card.icon size={17} />
            </span>
            <span className="mt-3 block text-xs font-semibold text-text">{card.title}</span>
            <span className="mt-1.5 block text-[11px] leading-4 text-accent/75">{card.description}</span>
          </motion.button>
        ))}
      </div>

      <div className="mt-6">
        <p className="text-[11px] font-medium uppercase text-accent/60">Popular questions</p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {suggestedQuestions.map((question) => (
            <motion.button
              key={question}
              type="button"
              whileHover={{ y: -2 }}
              onClick={() => onQuestion(question)}
              className="rounded-xl border border-secondary/20 bg-secondary/[0.06] px-3 py-2 text-[11px] font-medium text-accent transition hover:border-secondary/45 hover:text-text"
            >
              {question}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Conversation({ messages, thinking }: { messages: ChatMessage[]; thinking: boolean }) {
  return (
    <div className="space-y-4">
      <SectionIntro title="Consultation" description="Ask naturally. I’ll guide you toward the most useful next step." />
      <MessageList messages={messages} />
      {thinking ? <ThinkingIndicator /> : null}
    </div>
  );
}

function MessageList({ messages }: { messages: ChatMessage[] }) {
  return (
    <div className="space-y-3">
      {messages.map((message) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn("flex items-end gap-2", message.role === "user" && "justify-end")}
        >
          {message.role === "assistant" ? <MiniOrb /> : null}
          <div
            className={cn(
              "max-w-[84%] rounded-[18px] px-4 py-3 text-sm leading-6 shadow-[0_12px_36px_rgba(0,0,0,0.2)]",
              message.role === "assistant"
                ? "rounded-bl-md border border-line bg-white/[0.055] text-accent"
                : "rounded-br-md border border-secondary/35 bg-primary text-white shadow-[0_14px_34px_rgba(26,111,255,0.25)]"
            )}
          >
            {message.text}
          </div>
          {message.role === "user" ? (
            <span className="grid size-7 shrink-0 place-items-center rounded-lg border border-secondary/25 bg-secondary/10 text-secondary">
              <UserRound size={13} />
            </span>
          ) : null}
        </motion.div>
      ))}
    </div>
  );
}

function MiniOrb() {
  return (
    <span className="grid size-7 shrink-0 place-items-center rounded-lg border border-secondary/25 bg-primary/10">
      <span className="size-2 rounded-full bg-secondary shadow-[0_0_12px_rgba(77,163,255,0.8)]" />
    </span>
  );
}

function ThinkingIndicator() {
  return (
    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2">
      <MiniOrb />
      <div className="flex items-center gap-2 rounded-[16px] border border-line bg-white/[0.045] px-3.5 py-2.5">
        <span className="text-xs text-accent">ARYONIX AI is thinking</span>
        <span className="flex gap-1">
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              className="size-1.5 rounded-full bg-secondary"
              animate={{ y: [0, -4, 0], opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: index * 0.13 }}
            />
          ))}
        </span>
      </div>
    </motion.div>
  );
}

function SectionIntro({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-text">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-accent">{description}</p>
    </div>
  );
}

function ServicesScreen({ onEstimate }: { onEstimate: () => void }) {
  return (
    <div>
      <SectionIntro title="Services built around outcomes." description="Strategy, design and engineering work together as one delivery system." />
      <div className="mt-5 grid gap-2.5">
        {serviceCards.map((service) => (
          <div key={service.title} className="flex gap-3 rounded-[18px] border border-line bg-white/[0.04] p-3.5">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-secondary/25 bg-primary/10 text-secondary">
              <service.icon size={18} />
            </span>
            <div className="min-w-0">
              <h4 className="text-sm font-semibold text-text">{service.title}</h4>
              <p className="mt-1 text-xs leading-5 text-accent">{service.description}</p>
              <Link href="/services" className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-secondary">
                Learn more <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <PrimaryAction onClick={onEstimate}>Get a tailored recommendation</PrimaryAction>
    </div>
  );
}

function PricingScreen({ onEstimate }: { onEstimate: () => void }) {
  return (
    <div>
      <SectionIntro title="Clear starting ranges." description="Final proposals are tailored to scope, integrations and launch requirements." />
      <div className="mt-5 grid gap-3">
        {pricingCards.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative overflow-hidden rounded-[18px] border bg-white/[0.04] p-4",
              plan.popular ? "border-secondary/55 shadow-[0_0_34px_rgba(26,111,255,0.13)]" : "border-line"
            )}
          >
            {plan.popular ? (
              <span className="absolute right-3 top-3 rounded-lg border border-secondary/30 bg-secondary/10 px-2 py-1 text-[9px] font-semibold uppercase text-secondary">
                Popular
              </span>
            ) : null}
            <div className="pr-16">
              <h4 className="text-sm font-semibold text-text">{plan.name}</h4>
              <p className="mt-2 text-xl font-semibold text-text">{plan.price}</p>
              <p className="mt-1 flex items-center gap-1.5 text-[11px] text-accent">
                <Clock3 size={12} className="text-secondary" />
                {plan.timeline}
              </p>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {plan.features.map((feature) => (
                <span key={feature} className="rounded-lg border border-line bg-white/[0.035] px-2 py-1 text-[10px] text-accent">
                  {feature}
                </span>
              ))}
            </div>
            <button type="button" onClick={onEstimate} className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-text">
              Estimate my project <ArrowRight size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PortfolioScreen({ index, onIndexChange }: { index: number; onIndexChange: (index: number) => void }) {
  const project = portfolioCards[index];

  return (
    <div>
      <SectionIntro title="Recent ARYONIX work." description="Real interfaces, working deployments and transparent case studies." />
      <motion.article
        key={project.title}
        initial={{ opacity: 0, x: 14 }}
        animate={{ opacity: 1, x: 0 }}
        className="mt-5 overflow-hidden rounded-[20px] border border-line bg-white/[0.045]"
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-[#08102b]">
          <Image src={project.image} alt={`${project.title} preview`} fill sizes="400px" className="object-cover object-top" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#07102a] to-transparent" />
        </div>
        <div className="p-4">
          <p className="text-[10px] font-semibold uppercase text-secondary">{project.industry}</p>
          <h4 className="mt-1.5 text-lg font-semibold text-text">{project.title}</h4>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.technologies.map((technology) => (
              <span key={technology} className="rounded-lg border border-line px-2 py-1 text-[10px] text-accent">
                {technology}
              </span>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-primary text-xs font-semibold text-white">
              Visit website <ExternalLink size={13} />
            </a>
            <Link href={project.caseStudyUrl} className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-line bg-white/[0.04] text-xs font-semibold text-text">
              Case study <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </motion.article>
      <div className="mt-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onIndexChange((index - 1 + portfolioCards.length) % portfolioCards.length)}
          className="grid size-10 place-items-center rounded-xl border border-line text-accent hover:border-secondary/45 hover:text-text"
          aria-label="Previous project"
        >
          <ChevronLeft size={17} />
        </button>
        <div className="flex gap-1.5">
          {portfolioCards.map((item, itemIndex) => (
            <button
              key={item.title}
              type="button"
              onClick={() => onIndexChange(itemIndex)}
              className={cn("h-1.5 rounded-full transition-all", itemIndex === index ? "w-6 bg-secondary" : "w-1.5 bg-white/20")}
              aria-label={`Show ${item.title}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => onIndexChange((index + 1) % portfolioCards.length)}
          className="grid size-10 place-items-center rounded-xl border border-line text-accent hover:border-secondary/45 hover:text-text"
          aria-label="Next project"
        >
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
}

function EstimatorScreen({
  messages,
  thinking,
  step,
  stepIndex,
  onAnswer
}: {
  messages: ChatMessage[];
  thinking: boolean;
  step: (typeof estimatorSteps)[number];
  stepIndex: number;
  onAnswer: (value: string) => void;
}) {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase text-secondary">Project estimator</p>
          <p className="mt-1 text-xs text-accent">Step {stepIndex + 1} of {estimatorSteps.length}</p>
        </div>
        <div className="flex gap-1">
          {estimatorSteps.map((item, index) => (
            <span key={item.key} className={cn("h-1.5 w-7 rounded-full", index <= stepIndex ? "bg-secondary" : "bg-white/10")} />
          ))}
        </div>
      </div>
      <MessageList messages={messages} />
      {thinking ? (
        <div className="mt-4"><ThinkingIndicator /></div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
          <div className="flex items-start gap-2">
            <MiniOrb />
            <div className="rounded-[18px] rounded-bl-md border border-line bg-white/[0.055] px-4 py-3 text-sm leading-6 text-accent">
              {step.question}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {step.options.map((option) => {
              const Icon = businessTypeIcons[option];
              return (
                <motion.button
                  key={option}
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onAnswer(option)}
                  className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-secondary/20 bg-secondary/[0.06] px-3 py-2 text-xs font-semibold text-accent transition hover:border-secondary/50 hover:text-text"
                >
                  {Icon ? <Icon size={14} className="text-secondary" /> : null}
                  {option}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}

function EstimateScreen({
  recommendation,
  qualification,
  onLead,
  onRestart
}: {
  recommendation: Recommendation;
  qualification: Qualification;
  onLead: () => void;
  onRestart: () => void;
}) {
  return (
    <div>
      <div className="text-center">
        <div className="mx-auto grid size-14 place-items-center rounded-[18px] border border-emerald-300/25 bg-emerald-400/[0.08] text-emerald-300">
          <Check size={24} />
        </div>
        <p className="mt-4 text-[10px] font-semibold uppercase text-secondary">Your project recommendation</p>
        <h3 className="mt-2 text-2xl font-semibold text-text">{recommendation.packageName}</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-accent">{recommendation.summary}</p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2.5">
        <MetricCard icon={Clock3} label="Timeline" value={recommendation.timeline} />
        <MetricCard icon={Gauge} label="Budget" value={recommendation.budget} />
      </div>
      <div className="mt-2.5 rounded-[18px] border border-line bg-white/[0.04] p-4">
        <p className="text-[10px] font-semibold uppercase text-accent/60">Suggested technology</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {recommendation.technologies.map((technology) => (
            <span key={technology} className="rounded-lg border border-secondary/20 bg-secondary/[0.06] px-2.5 py-1.5 text-[10px] text-accent">
              {technology}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-2.5 rounded-[18px] border border-line bg-white/[0.04] p-4">
        <p className="text-[10px] font-semibold uppercase text-accent/60">Project snapshot</p>
        <div className="mt-3 grid gap-2 text-xs text-accent">
          <p>Type: <span className="text-text">{qualification.projectType}</span></p>
          <p>Scope: <span className="text-text">{qualification.pages}</span></p>
          <p>Relevant work: <span className="text-text">{recommendation.projects.join(", ")}</span></p>
        </div>
      </div>

      <PrimaryAction onClick={onLead}>Book free consultation</PrimaryAction>
      <button type="button" onClick={onRestart} className="mt-3 inline-flex w-full items-center justify-center gap-2 text-xs font-medium text-accent hover:text-text">
        <RotateCcw size={13} />
        Recalculate estimate
      </button>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value }: { icon: typeof Clock3; label: string; value: string }) {
  return (
    <div className="rounded-[18px] border border-line bg-white/[0.04] p-3.5">
      <Icon size={16} className="text-secondary" />
      <p className="mt-3 text-[10px] uppercase text-accent/60">{label}</p>
      <p className="mt-1 text-sm font-semibold text-text">{value}</p>
    </div>
  );
}

function LeadScreen({
  form,
  status,
  error,
  onChange,
  onSubmit
}: {
  form: LeadForm;
  status: "idle" | "loading" | "success" | "error";
  error: string;
  onChange: (key: keyof LeadForm, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div>
      <SectionIntro title="Let’s make the first call useful." description="Share your details and project context. ARYONIX will respond with a focused next step." />
      <form onSubmit={onSubmit} className="mt-5 grid gap-3">
        <Field label="Name" value={form.name} onChange={(value) => onChange("name", value)} autoComplete="name" />
        <Field label="Business" value={form.business} onChange={(value) => onChange("business", value)} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Email" value={form.email} onChange={(value) => onChange("email", value)} type="email" autoComplete="email" />
          <Field label="Phone" value={form.phone} onChange={(value) => onChange("phone", value)} type="tel" autoComplete="tel" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Budget" value={form.budget} onChange={(value) => onChange("budget", value)} />
          <Field label="Timeline" value={form.timeline} onChange={(value) => onChange("timeline", value)} />
        </div>
        <label className="grid gap-1.5 text-xs font-medium text-accent">
          Project details
          <textarea
            required
            minLength={15}
            maxLength={1600}
            rows={5}
            value={form.projectDetails}
            onChange={(event) => onChange("projectDetails", event.target.value)}
            className="resize-none rounded-xl border border-line bg-white/[0.04] p-3 text-sm leading-5 text-text outline-none focus:border-secondary/60"
          />
        </label>
        {status === "error" ? (
          <p className="rounded-xl border border-red-400/20 bg-red-400/[0.08] px-3 py-2 text-xs leading-5 text-red-200">{error}</p>
        ) : null}
        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-white shadow-[0_14px_40px_rgba(26,111,255,0.28)] transition hover:bg-secondary disabled:cursor-wait disabled:opacity-70"
        >
          {status === "loading" ? <LoaderCircle className="animate-spin" size={17} /> : <Send size={16} />}
          {status === "loading" ? "Sending consultation..." : "Request free consultation"}
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="grid min-w-0 gap-1.5 text-xs font-medium text-accent">
      {label}
      <input
        required
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        className="h-11 min-w-0 rounded-xl border border-line bg-white/[0.04] px-3 text-sm text-text outline-none focus:border-secondary/60"
      />
    </label>
  );
}

function SuccessScreen({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex min-h-[480px] flex-col items-center justify-center text-center">
      <motion.div
        initial={{ scale: 0.75, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="grid size-16 place-items-center rounded-[20px] border border-emerald-300/30 bg-emerald-400/10 text-emerald-300 shadow-[0_0_38px_rgba(52,211,153,0.16)]"
      >
        <Check size={29} />
      </motion.div>
      <h3 className="mt-6 text-2xl font-semibold text-text">Consultation request received.</h3>
      <p className="mt-3 max-w-xs text-sm leading-6 text-accent">ARYONIX will review your estimate and project details, then contact you with the best next step.</p>
      <a
        href={siteConfig.social.whatsapp.href}
        target="_blank"
        rel="noreferrer"
        className="mt-7 inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-400 px-5 text-sm font-semibold text-[#03110b] hover:bg-emerald-300"
      >
        <MessageCircle size={16} />
        Talk on WhatsApp
      </a>
      <button type="button" onClick={onReset} className="mt-4 text-xs font-semibold text-secondary hover:text-text">
        Start another consultation
      </button>
    </div>
  );
}

function ConsultantComposer({
  value,
  disabled,
  onChange,
  onSubmit
}: {
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
}) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (value.trim()) onSubmit();
      }}
      className="relative border-t border-line bg-[#05091f]/82 p-3 backdrop-blur-2xl"
    >
      <label htmlFor="aryonix-ai-message" className="sr-only">Message ARYONIX AI</label>
      <div className="flex items-end gap-2 rounded-[18px] border border-line bg-white/[0.045] p-2 focus-within:border-secondary/55 focus-within:shadow-[0_0_28px_rgba(26,111,255,0.12)]">
        <textarea
          id="aryonix-ai-message"
          rows={1}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              if (value.trim()) onSubmit();
            }
          }}
          placeholder="Ask ARYONIX AI anything..."
          className="max-h-24 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-text outline-none placeholder:text-accent/45"
        />
        <button
          type="submit"
          disabled={!value.trim() || disabled}
          className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-white shadow-[0_0_24px_rgba(26,111,255,0.3)] transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-35"
          aria-label="Send message"
        >
          <Send size={16} />
        </button>
      </div>
      <p className="mt-2 text-center text-[9px] text-accent/45">Consultant preview · Deterministic recommendations · Press Esc to minimize</p>
    </form>
  );
}

function PrimaryAction({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-white shadow-[0_14px_40px_rgba(26,111,255,0.28)] transition hover:bg-secondary"
    >
      {children}
      <ArrowRight size={16} />
    </button>
  );
}
