"use client";

import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarClock,
  ChartNoAxesColumnIncreasing,
  ExternalLink,
  Mail,
  MessageCircle,
  Phone,
  Search,
  UserRound
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type ChatbotLead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  business?: string;
  businessType: string;
  budget: string;
  timeline?: string;
  requirement: string;
  conversationSummary?: string;
  leadScore?: number;
  estimatedPackage?: string;
  requirements?: string[];
  status: string;
  createdAt: string;
};

export function ChatbotLeads() {
  const [leads, setLeads] = useState<ChatbotLead[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Loading chatbot leads...");

  useEffect(() => {
    fetch("/api/admin/chatbot-leads")
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load chatbot leads.");
        return response.json() as Promise<ChatbotLead[]>;
      })
      .then((data) => {
        setLeads(data);
        setStatus("");
      })
      .catch(() => setStatus("Chatbot leads could not be loaded."));
  }, []);

  const filteredLeads = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return leads;

    return leads.filter((lead) =>
      [
        lead.name,
        lead.business,
        lead.email,
        lead.phone,
        lead.businessType,
        lead.budget,
        lead.timeline,
        lead.estimatedPackage,
        lead.requirement,
        lead.conversationSummary
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalized)
    );
  }, [leads, query]);

  const leadsThisWeek = leads.filter((lead) => {
    const createdAt = new Date(lead.createdAt).getTime();
    return Date.now() - createdAt <= 7 * 24 * 60 * 60 * 1000;
  }).length;
  const qualifiedLeads = leads.filter((lead) => (lead.leadScore ?? 0) >= 75).length;

  return (
    <section className="relative min-h-screen overflow-hidden pt-32">
      <div className="grid-mask absolute inset-0 opacity-35" />
      <div className="absolute right-0 top-16 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="container-shell relative pb-24">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-medium text-accent transition hover:text-text">
          <ArrowLeft size={16} />
          Back to dashboard
        </Link>

        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Badge>Chatbot Leads</Badge>
            <h1 className="mt-5 text-balance text-4xl font-semibold text-text md:text-6xl">
              Conversations with buying intent.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-accent">
              Review every project brief submitted through the ARYONIX Assistant and follow up while the lead is warm.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Card className="p-5">
              <p className="text-3xl font-semibold text-text">{leads.length}</p>
              <p className="mt-2 text-sm text-accent">Total leads</p>
            </Card>
            <Card className="p-5">
              <p className="text-3xl font-semibold text-secondary">{leadsThisWeek}</p>
              <p className="mt-2 text-sm text-accent">Last 7 days</p>
            </Card>
            <Card className="p-5">
              <p className="text-3xl font-semibold text-emerald-300">{qualifiedLeads}</p>
              <p className="mt-2 text-sm text-accent">Qualified</p>
            </Card>
          </div>
        </div>

        <div className="mt-10 flex min-h-12 items-center gap-3 rounded-2xl border border-line bg-white/[0.04] px-4 backdrop-blur-xl focus-within:border-secondary/50">
          <Search size={18} className="shrink-0 text-accent" />
          <label htmlFor="lead-search" className="sr-only">Search chatbot leads</label>
          <input
            id="lead-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, business type, budget, email, or requirement..."
            className="h-12 min-w-0 flex-1 bg-transparent text-sm text-text outline-none placeholder:text-accent/50"
          />
          <span className="shrink-0 text-xs text-accent/70">{filteredLeads.length} shown</span>
        </div>

        {status ? (
          <Card className="mt-6 p-5 text-sm text-accent">{status}</Card>
        ) : filteredLeads.length ? (
          <div className="mt-6 grid gap-4">
            {filteredLeads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
          </div>
        ) : (
          <Card className="mt-6 p-8 text-center">
            <MessageCircle className="mx-auto text-secondary" size={28} />
            <p className="mt-4 font-semibold text-text">No matching chatbot leads.</p>
            <p className="mt-2 text-sm text-accent">New project briefs will appear here automatically.</p>
          </Card>
        )}
      </div>
    </section>
  );
}

function LeadCard({ lead }: { lead: ChatbotLead }) {
  const whatsappPhone = lead.phone.replace(/\D/g, "");
  const whatsappMessage = encodeURIComponent(
    `Hi ${lead.name}, this is ARYONIX. Thank you for sharing your ${lead.businessType} project requirement with us.`
  );

  return (
    <Card className="overflow-hidden">
      <div className="grid gap-0 xl:grid-cols-[0.72fr_1.28fr]">
        <div className="border-b border-line p-5 xl:border-b-0 xl:border-r">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-secondary/25 bg-primary/15 text-secondary">
                <UserRound size={20} />
              </div>
              <div className="min-w-0">
                <h2 className="truncate font-semibold text-text">{lead.name}</h2>
                <p className="mt-1 truncate text-sm text-accent">{lead.business || lead.businessType}</p>
              </div>
            </div>
            <Badge className="border-emerald-300/20 bg-emerald-400/[0.08] text-emerald-200">
              {lead.status}
            </Badge>
          </div>

          <div className="mt-5 grid gap-3 text-sm">
            <a href={`mailto:${lead.email}`} className="flex min-w-0 items-center gap-2 text-accent hover:text-text">
              <Mail size={15} className="shrink-0 text-secondary" />
              <span className="truncate">{lead.email}</span>
            </a>
            <a href={`tel:${lead.phone}`} className="flex items-center gap-2 text-accent hover:text-text">
              <Phone size={15} className="shrink-0 text-secondary" />
              {lead.phone}
            </a>
            <p className="flex items-center gap-2 text-accent">
              <CalendarClock size={15} className="shrink-0 text-secondary" />
              {new Intl.DateTimeFormat("en-IN", {
                dateStyle: "medium",
                timeStyle: "short"
              }).format(new Date(lead.createdAt))}
            </p>
          </div>
        </div>

        <div className="p-5">
          <div className="flex flex-wrap gap-2">
            <Badge className="border-secondary/20 bg-secondary/[0.08] text-accent">
              <BriefcaseBusiness className="mr-1.5" size={13} />
              {lead.businessType}
            </Badge>
            <Badge className="border-secondary/20 bg-secondary/[0.08] text-accent">
              Budget: {lead.budget}
            </Badge>
            {lead.timeline ? (
              <Badge className="border-secondary/20 bg-secondary/[0.08] text-accent">
                Timeline: {lead.timeline}
              </Badge>
            ) : null}
            {lead.estimatedPackage ? (
              <Badge className="border-secondary/20 bg-secondary/[0.08] text-accent">
                Package: {lead.estimatedPackage}
              </Badge>
            ) : null}
            {typeof lead.leadScore === "number" ? (
              <Badge className="border-emerald-300/20 bg-emerald-400/[0.08] text-emerald-200">
                <ChartNoAxesColumnIncreasing className="mr-1.5" size={13} />
                Lead score: {lead.leadScore}
              </Badge>
            ) : null}
          </div>
          {lead.conversationSummary ? (
            <div className="mt-4 rounded-xl border border-line bg-white/[0.035] p-3">
              <p className="text-[10px] font-semibold uppercase text-secondary">Conversation summary</p>
              <p className="mt-2 text-sm leading-6 text-accent">{lead.conversationSummary}</p>
            </div>
          ) : null}
          <p className="mt-4 text-sm leading-7 text-accent">{lead.requirement}</p>
          {lead.requirements?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {lead.requirements.map((requirement) => (
                <span key={requirement} className="rounded-lg border border-line bg-white/[0.03] px-2 py-1 text-[11px] text-accent">
                  {requirement}
                </span>
              ))}
            </div>
          ) : null}
          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={`https://wa.me/${whatsappPhone}?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-emerald-400 px-4 text-sm font-semibold text-[#03110b] transition hover:bg-emerald-300"
            >
              <MessageCircle size={16} />
              WhatsApp
              <ExternalLink size={13} />
            </a>
            <a
              href={`mailto:${lead.email}?subject=${encodeURIComponent("Your ARYONIX project enquiry")}`}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-line bg-white/[0.04] px-4 text-sm font-semibold text-text transition hover:border-secondary/50"
            >
              <Mail size={16} />
              Send email
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
}
