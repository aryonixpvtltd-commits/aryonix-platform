import { NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/knowledge/knowledge";
import { prisma } from "@/lib/prisma";

type IncomingMessage = {
  role: "user" | "assistant";
  text: string;
};

const unrelatedReply =
  "I specialize in helping businesses with websites, web applications, UI/UX, and AI solutions offered by ARYONIX. I'd be happy to help you with those.";

const allowedSignals = [
  "website",
  "web app",
  "application",
  "aryonix",
  "price",
  "pricing",
  "cost",
  "budget",
  "portfolio",
  "service",
  "design",
  "ui",
  "ux",
  "seo",
  "chatbot",
  "ai",
  "dashboard",
  "ecommerce",
  "consultation",
  "business",
  "landing",
  "support",
  "timeline",
  "project",
  "contact",
  "whatsapp"
];

function isRelevant(message: string) {
  const normalized = message.toLowerCase();
  return allowedSignals.some((signal) => normalized.includes(signal));
}

function fallbackReply(message: string) {
  const normalized = message.toLowerCase();
  if (!isRelevant(message)) return unrelatedReply;

  if (normalized.includes("price") || normalized.includes("cost") || normalized.includes("budget")) {
    return "ARYONIX pricing is shared as planning ranges: landing pages around INR 8,000-15,000, portfolio websites around INR 10,000-25,000, business websites around INR 20,000-40,000 and ecommerce around INR 40,000-80,000. Final pricing depends on pages, features, integrations, content readiness and timeline. What type of website are you planning?";
  }

  if (normalized.includes("portfolio") || normalized.includes("work")) {
    return "ARYONIX portfolio work includes Student Toolkit, CGPA Calculator, AQI Dashboard and the Aryonix Platform. I can point you to relevant examples based on whether you need a business website, dashboard, ecommerce site or custom web app.";
  }

  if (normalized.includes("timeline") || normalized.includes("long")) {
    return "Typical timelines are 5-10 days for focused landing pages, 2-4 weeks for business websites and 4-12+ weeks for ecommerce or custom web applications. The exact timeline depends on content, approvals and integrations.";
  }

  if (normalized.includes("service") || normalized.includes("design") || normalized.includes("develop")) {
    return "ARYONIX offers website design and development, custom web applications, UI/UX design, ecommerce websites, AI chatbot integration and ongoing support. Tell me your business type, pages, features, budget and timeline, and I can recommend the right package.";
  }

  return "ARYONIX can help you plan a premium website, web application, UI/UX system or AI chatbot. To recommend the right package, tell me your business type, website type, required features, budget range and timeline.";
}

function normalizeMessages(value: unknown): IncomingMessage[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is IncomingMessage => {
      if (!item || typeof item !== "object") return false;
      const candidate = item as Record<string, unknown>;
      return (candidate.role === "user" || candidate.role === "assistant") && typeof candidate.text === "string";
    })
    .slice(-12)
    .map((item) => ({ role: item.role, text: item.text.slice(0, 1400) }));
}

async function callGemini(systemPrompt: string, messages: IncomingMessage[]) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const contents = [
    {
      role: "user",
      parts: [{ text: systemPrompt }]
    },
    ...messages.map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: message.text }]
    }))
  ];

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.35,
          topP: 0.85,
          maxOutputTokens: 420
        }
      })
    }
  );

  if (!response.ok) return null;

  const data = await response.json() as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };

  return data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("").trim() || null;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ reply: fallbackReply("") });
  }

  const candidate = body as Record<string, unknown>;
  const message = typeof candidate.message === "string" ? candidate.message.trim().slice(0, 1400) : "";
  const messages = normalizeMessages(candidate.messages);

  if (!message) {
    return NextResponse.json({ reply: "Tell me what you want to build, and I will recommend the best ARYONIX path." });
  }

  if (!isRelevant(message)) {
    return NextResponse.json({ reply: unrelatedReply });
  }

  try {
    const dynamicKnowledge = await prisma.aIKnowledge.findMany({
      where: { isActive: true },
      orderBy: { updatedAt: "desc" },
      take: 80
    });
    const systemPrompt = buildSystemPrompt(dynamicKnowledge);
    const reply = await callGemini(systemPrompt, [...messages, { role: "user", text: message }]);
    return NextResponse.json({ reply: reply ?? fallbackReply(message) });
  } catch {
    return NextResponse.json({ reply: fallbackReply(message) });
  }
}
