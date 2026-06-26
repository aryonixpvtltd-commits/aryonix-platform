"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  BarChart3,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Download,
  Edit3,
  ExternalLink,
  FileText,
  Filter,
  FolderKanban,
  Gauge,
  Globe2,
  LineChart,
  MessageSquareText,
  PencilLine,
  Save,
  Search,
  Settings,
  Sparkles,
  Trash2,
  TrendingUp
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { crmStatuses, formatCrmStatus, type LeadSource } from "@/lib/crm";

type Row = Record<string, unknown> & { id: string; createdAt?: string };
type FormState = Record<string, string | boolean | number>;

type UnifiedLead = {
  id: string;
  source: LeadSource;
  label: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  requirement: string;
  status: string;
  notes?: string;
  followUpDate?: string | null;
  history: string[];
  budget?: string;
  timeline?: string;
  createdAt: string;
  score?: number;
  url?: string;
};

type EstimatorLead = Row & {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  businessType: string;
  websiteType: string;
  features: string[];
  estimatedPrice: string;
  estimatedTimeline: string;
  recommendedPackage: string;
  techStack: string[];
  status: string;
  notes?: string;
  followUpDate?: string | null;
  history?: string[];
  proposals?: Proposal[];
};

type AnalyzerLead = Row & {
  name: string;
  email: string;
  phone?: string;
  websiteUrl: string;
  designScore: number;
  mobileScore: number;
  seoScore: number;
  speedScore: number;
  suggestions: string[];
  status: string;
  notes?: string;
  followUpDate?: string | null;
  history?: string[];
};

type Proposal = Row & {
  clientName: string;
  businessName: string;
  recommendedPackage: string;
  features: string[];
  estimatedPrice: string;
  timeline: string;
  techStack: string[];
  nextSteps: string[];
};

const emptyForms = {
  testimonials: { quote: "", name: "", role: "", company: "", rating: 5, published: true },
  content: { key: "", section: "homepage", title: "", content: "", published: true },
  social: { platform: "", label: "", handle: "", href: "", published: true }
};

const sourceMeta: Record<LeadSource, { label: string; icon: LucideIcon; tone: string }> = {
  enquiries: { label: "Contact Form", icon: MessageSquareText, tone: "text-sky-200" },
  chatbot: { label: "Chatbot", icon: Bot, tone: "text-cyan-200" },
  estimator: { label: "Estimator", icon: Gauge, tone: "text-blue-200" },
  analyzer: { label: "Analyzer", icon: LineChart, tone: "text-violet-200" }
};

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function normalizeLead(source: LeadSource, row: Row): UnifiedLead {
  if (source === "enquiries") {
    return {
      id: row.id,
      source,
      label: "Contact Form",
      name: asString(row.name, "Lead"),
      email: asString(row.email),
      phone: "",
      company: asString(row.company),
      requirement: asString(row.message),
      status: asString(row.status, "NEW"),
      notes: asString(row.notes),
      followUpDate: asString(row.followUpDate) || null,
      history: Array.isArray(row.history) ? row.history.map(String) : [],
      budget: asString(row.budget),
      timeline: asString(row.timeline),
      createdAt: asString(row.createdAt)
    };
  }

  if (source === "chatbot") {
    return {
      id: row.id,
      source,
      label: "Chatbot Lead",
      name: asString(row.name, "Lead"),
      email: asString(row.email),
      phone: asString(row.phone),
      company: asString(row.business),
      requirement: asString(row.requirement, asString(row.conversationSummary)),
      status: asString(row.status, "NEW"),
      notes: asString(row.notes),
      followUpDate: asString(row.followUpDate) || null,
      history: Array.isArray(row.history) ? row.history.map(String) : [],
      budget: asString(row.budget),
      timeline: asString(row.timeline),
      createdAt: asString(row.createdAt),
      score: typeof row.leadScore === "number" ? row.leadScore : undefined
    };
  }

  if (source === "estimator") {
    return {
      id: row.id,
      source,
      label: "Website Estimate",
      name: asString(row.name, "Lead"),
      email: asString(row.email),
      phone: asString(row.phone),
      company: asString(row.businessName),
      requirement: `${asString(row.websiteType)} - ${asString(row.recommendedPackage)}`,
      status: asString(row.status, "NEW"),
      notes: asString(row.notes),
      followUpDate: asString(row.followUpDate) || null,
      history: Array.isArray(row.history) ? row.history.map(String) : [],
      budget: asString(row.estimatedPrice),
      timeline: asString(row.estimatedTimeline),
      createdAt: asString(row.createdAt)
    };
  }

  return {
    id: row.id,
    source,
    label: "Website Analyzer",
    name: asString(row.name, "Lead"),
    email: asString(row.email),
    phone: asString(row.phone),
    company: asString(row.websiteUrl),
    requirement: Array.isArray(row.suggestions) ? row.suggestions.slice(0, 2).join(" | ") : "Website improvement request",
    status: asString(row.status, "NEW"),
    notes: asString(row.notes),
    followUpDate: asString(row.followUpDate) || null,
    history: Array.isArray(row.history) ? row.history.map(String) : [],
    budget: "Audit opportunity",
    timeline: "Consultation",
    createdAt: asString(row.createdAt),
    url: asString(row.websiteUrl)
  };
}

export function AdminDashboard() {
  const [enquiries, setEnquiries] = useState<Row[]>([]);
  const [chatbotLeads, setChatbotLeads] = useState<Row[]>([]);
  const [estimatorLeads, setEstimatorLeads] = useState<EstimatorLead[]>([]);
  const [analyzerLeads, setAnalyzerLeads] = useState<AnalyzerLead[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [projects, setProjects] = useState<Row[]>([]);
  const [testimonials, setTestimonials] = useState<Row[]>([]);
  const [content, setContent] = useState<Row[]>([]);
  const [social, setSocial] = useState<Row[]>([]);
  const [forms, setForms] = useState<Record<keyof typeof emptyForms, FormState>>(emptyForms);
  const [editing, setEditing] = useState<Record<string, string | null>>({});
  const [query, setQuery] = useState("");
  const [pipelineFilter, setPipelineFilter] = useState("ALL");
  const [status, setStatus] = useState("Loading admin business data...");

  async function load() {
    const [
      enquiryRes,
      chatbotRes,
      estimatorRes,
      analyzerRes,
      proposalRes,
      projectsRes,
      testimonialRes,
      contentRes,
      socialRes
    ] = await Promise.all([
      fetch("/api/admin/enquiries"),
      fetch("/api/admin/chatbot-leads"),
      fetch("/api/admin/estimator-leads"),
      fetch("/api/admin/analyzer-leads"),
      fetch("/api/admin/proposals"),
      fetch("/api/projects?drafts=true"),
      fetch("/api/admin/testimonials"),
      fetch("/api/admin/homepage-content"),
      fetch("/api/admin/social-links")
    ]);

    if (enquiryRes.ok) setEnquiries(await enquiryRes.json());
    if (chatbotRes.ok) setChatbotLeads(await chatbotRes.json());
    if (estimatorRes.ok) setEstimatorLeads(await estimatorRes.json());
    if (analyzerRes.ok) setAnalyzerLeads(await analyzerRes.json());
    if (proposalRes.ok) setProposals(await proposalRes.json());
    if (projectsRes.ok) setProjects(await projectsRes.json());
    if (testimonialRes.ok) setTestimonials(await testimonialRes.json());
    if (contentRes.ok) setContent(await contentRes.json());
    if (socialRes.ok) setSocial(await socialRes.json());
    setStatus("");
  }

  useEffect(() => {
    load().catch(() => setStatus("Admin data could not be loaded. Check MongoDB and admin session."));
  }, []);

  const allLeads = useMemo(() => [
    ...enquiries.map((row) => normalizeLead("enquiries", row)),
    ...chatbotLeads.map((row) => normalizeLead("chatbot", row)),
    ...estimatorLeads.map((row) => normalizeLead("estimator", row)),
    ...analyzerLeads.map((row) => normalizeLead("analyzer", row))
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()), [analyzerLeads, chatbotLeads, enquiries, estimatorLeads]);

  const filteredLeads = useMemo(() => {
    const needle = query.toLowerCase().trim();
    return allLeads.filter((lead) => {
      const matchesStatus = pipelineFilter === "ALL" || lead.status === pipelineFilter;
      const matchesQuery = !needle || [
        lead.name,
        lead.email,
        lead.phone,
        lead.company,
        lead.requirement,
        lead.label
      ].join(" ").toLowerCase().includes(needle);
      return matchesStatus && matchesQuery;
    });
  }, [allLeads, pipelineFilter, query]);

  const conversionRate = allLeads.length
    ? Math.round((allLeads.filter((lead) => lead.status === "WON").length / allLeads.length) * 100)
    : 0;

  const monthlyChart = useMemo(() => {
    const months = new Map<string, number>();
    allLeads.forEach((lead) => {
      const date = new Date(lead.createdAt);
      const key = date.toLocaleString("en", { month: "short" });
      months.set(key, (months.get(key) ?? 0) + 1);
    });
    const entries = Array.from(months.entries()).slice(-6);
    const max = Math.max(1, ...entries.map(([, value]) => value));
    return { entries, max };
  }, [allLeads]);

  function setField(group: keyof typeof emptyForms, key: string, value: string | boolean | number) {
    setForms((current) => ({ ...current, [group]: { ...current[group], [key]: value } }));
  }

  function edit(group: keyof typeof emptyForms, row: Row) {
    setEditing((current) => ({ ...current, [group]: row.id }));
    setForms((current) => ({ ...current, [group]: { ...current[group], ...row } as FormState }));
  }

  async function save(group: keyof typeof emptyForms, endpoint: string, event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const id = editing[group];
    const response = await fetch(id ? `${endpoint}/${id}` : endpoint, {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(forms[group])
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      setStatus(error.errors?.join(" ") ?? error.error ?? "Save failed.");
      return;
    }

    setForms((current) => ({ ...current, [group]: emptyForms[group] }));
    setEditing((current) => ({ ...current, [group]: null }));
    setStatus("Saved.");
    await load();
  }

  async function remove(endpoint: string, id: string) {
    if (!window.confirm("Delete this item?")) return;
    const response = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
    setStatus(response.ok ? "Deleted." : "Delete failed.");
    await load();
  }

  async function updateLead(lead: UnifiedLead, patch: { status?: string; notes?: string; followUpDate?: string; historyEntry?: string }) {
    const response = await fetch(`/api/admin/crm-leads/${lead.source}/${lead.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch)
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      setStatus(error.errors?.join(" ") ?? "Lead update failed.");
      return;
    }

    setStatus("Lead updated.");
    await load();
  }

  async function generateProposal(lead: EstimatorLead) {
    const response = await fetch("/api/admin/proposals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estimatorLeadId: lead.id })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      setStatus(error.errors?.join(" ") ?? "Proposal generation failed.");
      return;
    }

    setStatus("Proposal generated and stored.");
    await load();
  }

  async function downloadProposal(proposal: Proposal) {
    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF();
    pdf.setFillColor(2, 6, 20);
    pdf.rect(0, 0, 210, 297, "F");
    pdf.setTextColor(77, 163, 255);
    pdf.setFontSize(12);
    pdf.text("ARYONIX PROPOSAL", 18, 24);
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.text(proposal.businessName || proposal.clientName, 18, 42);
    pdf.setFontSize(12);
    pdf.setTextColor(178, 191, 214);
    pdf.text(`Recommended package: ${proposal.recommendedPackage}`, 18, 58);
    pdf.text(`Estimated investment: ${proposal.estimatedPrice}`, 18, 68);
    pdf.text(`Timeline: ${proposal.timeline}`, 18, 78);
    pdf.setTextColor(255, 255, 255);
    pdf.text("Features", 18, 98);
    pdf.setTextColor(178, 191, 214);
    proposal.features.forEach((feature, index) => pdf.text(`- ${feature}`, 22, 110 + index * 8));
    const techY = 118 + proposal.features.length * 8;
    pdf.setTextColor(255, 255, 255);
    pdf.text("Technology Stack", 18, techY);
    pdf.setTextColor(178, 191, 214);
    proposal.techStack.forEach((tech, index) => pdf.text(`- ${tech}`, 22, techY + 12 + index * 8));
    const nextY = techY + 20 + proposal.techStack.length * 8;
    pdf.setTextColor(255, 255, 255);
    pdf.text("Next Steps", 18, nextY);
    pdf.setTextColor(178, 191, 214);
    proposal.nextSteps.forEach((step, index) => pdf.text(`${index + 1}. ${step}`, 22, nextY + 12 + index * 8));
    pdf.save(`aryonix-proposal-${proposal.businessName || proposal.clientName}.pdf`);
  }

  return (
    <section className="relative min-h-screen overflow-hidden pt-32">
      <div className="grid-mask absolute inset-0 opacity-40" />
      <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      <div className="absolute left-0 top-[36rem] h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="container-shell relative pb-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.42fr] lg:items-end">
          <div>
            <Badge>Admin Business System</Badge>
            <h1 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.02em] text-text md:text-6xl">
              ARYONIX command center.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-accent">
              Track leads, pipeline health, proposals, analyzer reports, portfolio assets and website settings from one premium admin workspace.
            </p>
          </div>
          <Card className="p-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-secondary">Admin only</p>
            <p className="mt-2 text-3xl font-semibold text-text">Client portal removed</p>
            <p className="mt-1 text-sm text-accent">Protected by existing admin session middleware.</p>
          </Card>
        </div>

        {status ? <Card className="mt-8 p-4 text-sm text-accent">{status}</Card> : null}

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Metric label="Total Leads" value={allLeads.length} icon={TrendingUp} />
          <Metric label="Chatbot Leads" value={chatbotLeads.length} icon={Bot} />
          <Metric label="Estimator Leads" value={estimatorLeads.length} icon={Gauge} />
          <Metric label="Analyzer Leads" value={analyzerLeads.length} icon={LineChart} />
          <Metric label="Contact Leads" value={enquiries.length} icon={MessageSquareText} />
          <Metric label="Portfolio Projects" value={projects.length} icon={FolderKanban} />
          <Metric label="Conversion Rate" value={`${conversionRate}%`} icon={CheckCircle2} />
          <Metric label="Proposals Stored" value={proposals.length} icon={FileText} />
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.55fr]">
          <Card className="p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-secondary">Monthly Lead Chart</p>
                <h2 className="mt-2 text-2xl font-semibold text-text">Lead velocity</h2>
              </div>
              <BarChart3 className="text-secondary" />
            </div>
            <div className="mt-6 flex h-44 items-end gap-3">
              {monthlyChart.entries.length ? monthlyChart.entries.map(([month, value]) => (
                <div key={month} className="flex flex-1 flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max(12, (value / monthlyChart.max) * 132)}px` }}
                    className="w-full rounded-t-2xl border border-secondary/25 bg-gradient-to-t from-primary to-secondary shadow-glow"
                  />
                  <span className="font-mono text-xs text-accent">{month}</span>
                </div>
              )) : (
                <p className="text-sm text-accent">Lead chart appears after submissions arrive.</p>
              )}
            </div>
          </Card>
          <Card className="p-5">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-secondary">Activity Timeline</p>
            <div className="mt-5 grid gap-3">
              {allLeads.slice(0, 5).map((lead) => {
                const Icon = sourceMeta[lead.source].icon;
                return (
                  <div key={`${lead.source}-${lead.id}`} className="rounded-2xl border border-line bg-white/[0.035] p-4">
                    <div className="flex items-start gap-3">
                      <Icon className={sourceMeta[lead.source].tone} size={18} />
                      <div>
                        <p className="text-sm font-semibold text-text">{lead.name}</p>
                        <p className="mt-1 text-xs leading-5 text-accent">{lead.label} - {formatCrmStatus(lead.status)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <Tabs defaultValue="crm" className="mt-10">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="crm">CRM Pipeline</TabsTrigger>
            <TabsTrigger value="estimator">Estimator & Proposals</TabsTrigger>
            <TabsTrigger value="analyzer">Analyzer Leads</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio Manager</TabsTrigger>
            <TabsTrigger value="settings">Website Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="crm" className="mt-6">
            <Card className="p-4">
              <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
                <label className="flex h-12 items-center gap-3 rounded-xl border border-line bg-white/[0.04] px-4 text-accent">
                  <Search size={18} />
                  <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search all leads..." className="w-full bg-transparent text-sm text-text outline-none" />
                </label>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setPipelineFilter("ALL")} className={filterClass(pipelineFilter === "ALL")}>
                    <Filter size={14} /> All
                  </button>
                  {crmStatuses.map((item) => (
                    <button key={item} onClick={() => setPipelineFilter(item)} className={filterClass(pipelineFilter === item)}>
                      {formatCrmStatus(item)}
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            <div className="mt-5 grid gap-4 xl:grid-cols-3">
              {crmStatuses.map((statusKey) => (
                <PipelineColumn
                  key={statusKey}
                  statusKey={statusKey}
                  leads={filteredLeads.filter((lead) => lead.status === statusKey)}
                  onUpdate={updateLead}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="estimator" className="mt-6">
            <div className="grid gap-5">
              {estimatorLeads.map((lead) => (
                <Card key={lead.id} className="p-5">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <Badge>{lead.status ? formatCrmStatus(lead.status) : "New"}</Badge>
                      <h2 className="mt-4 text-2xl font-semibold text-text">{lead.businessName}</h2>
                      <p className="mt-2 text-sm leading-6 text-accent">{lead.name} - {lead.email} - {lead.phone}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {[lead.businessType, lead.websiteType, lead.estimatedPrice, lead.estimatedTimeline, lead.recommendedPackage].map((item) => (
                          <Badge key={item} className="border-line bg-white/[0.04] text-accent">{item}</Badge>
                        ))}
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {lead.features.map((feature) => <span key={feature} className="rounded-full border border-secondary/25 bg-secondary/[0.08] px-3 py-1 text-xs text-accent">{feature}</span>)}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button type="button" onClick={() => generateProposal(lead)}>
                        <Sparkles className="mr-2" size={16} /> Convert to Proposal
                      </Button>
                      {lead.proposals?.[0] ? (
                        <Button type="button" variant="secondary" onClick={() => downloadProposal(lead.proposals![0])}>
                          <Download className="mr-2" size={16} /> Download PDF
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analyzer" className="mt-6">
            <div className="grid gap-5 lg:grid-cols-2">
              {analyzerLeads.map((lead) => (
                <Card key={lead.id} className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Badge>{formatCrmStatus(lead.status ?? "NEW")}</Badge>
                      <h2 className="mt-4 text-2xl font-semibold text-text">{lead.websiteUrl}</h2>
                      <p className="mt-2 text-sm text-accent">{lead.name} - {lead.email}</p>
                    </div>
                    <a href={lead.websiteUrl} target="_blank" rel="noreferrer" className="grid size-10 place-items-center rounded-xl border border-line text-accent hover:text-text" aria-label="Open analyzed website">
                      <ExternalLink size={17} />
                    </a>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <Score label="Design" value={lead.designScore} />
                    <Score label="Mobile" value={lead.mobileScore} />
                    <Score label="SEO" value={lead.seoScore} />
                    <Score label="Speed" value={lead.speedScore} />
                  </div>
                  <div className="mt-5 grid gap-2">
                    {lead.suggestions.map((item) => (
                      <p key={item} className="rounded-xl border border-line bg-white/[0.035] px-3 py-2 text-sm text-accent">{item}</p>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="mt-6">
            <div className="grid gap-4 md:grid-cols-3">
              <AdminFeatureCard icon={FolderKanban} title="Portfolio CRUD" description="Manage categories, featured projects, technology tags, screenshots, case studies and live preview links." href="/admin/portfolio" />
              <AdminFeatureCard icon={Globe2} title="Public Portfolio" description="Review how case studies appear to visitors before sharing with leads." href="/portfolio" />
              <AdminFeatureCard icon={Activity} title="Current Inventory" description={`${projects.length} projects loaded across live, featured and draft states.`} />
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="grid gap-6">
              <AdminFeatureCard icon={BrainCircuit} title="AI Knowledge" description="Update the private Gemini knowledge base used by the ARYONIX AI consultant without editing code." href="/admin/ai-knowledge" />
              <AdminFeatureCard icon={Settings} title="Website Settings" description="Use homepage content blocks for company details, contact information, SEO copy and homepage sections. Use social links for public channels." />
              <CrudPanel title="Homepage / SEO Content" description="Control editable copy blocks for homepage, SEO sections, CTAs and company details." rows={content} group="content" endpoint="/api/admin/homepage-content" form={forms.content} fields={[["key", "Key"], ["section", "Section"], ["title", "Title"], ["content", "Content"]]} setField={setField} onSave={save} onEdit={edit} onDelete={remove} renderRow={(row) => `${String(row.section ?? "")} - ${String(row.title ?? "")}`} />
              <CrudPanel title="Social & Contact Links" description="Update official ARYONIX social profiles and public contact links." rows={social} group="social" endpoint="/api/admin/social-links" form={forms.social} fields={[["platform", "Platform"], ["label", "Label"], ["handle", "Handle"], ["href", "URL"]]} setField={setField} onSave={save} onEdit={edit} onDelete={remove} renderRow={(row) => `${String(row.label ?? "")} - ${String(row.handle ?? "")}`} />
              <CrudPanel title="Testimonials" description="Publish trust-building quotes across marketing pages." rows={testimonials} group="testimonials" endpoint="/api/admin/testimonials" form={forms.testimonials} fields={[["quote", "Quote"], ["name", "Name"], ["role", "Role"], ["company", "Company"], ["rating", "Rating"]]} setField={setField} onSave={save} onEdit={edit} onDelete={remove} renderRow={(row) => `${String(row.name ?? "")} - ${String(row.role ?? "")}`} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function Metric({ label, value, icon: Icon }: { label: string; value: string | number; icon: LucideIcon }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <Card className="p-5">
        <Icon className="text-secondary" size={22} />
        <p className="mt-6 text-3xl font-semibold text-text">{value}</p>
        <p className="mt-2 text-sm text-accent">{label}</p>
      </Card>
    </motion.div>
  );
}

function PipelineColumn({ statusKey, leads, onUpdate }: { statusKey: string; leads: UnifiedLead[]; onUpdate: (lead: UnifiedLead, patch: { status?: string; notes?: string; followUpDate?: string; historyEntry?: string }) => Promise<void> }) {
  return (
    <Card className="min-h-80 p-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-semibold text-text">{formatCrmStatus(statusKey)}</h3>
        <Badge>{leads.length}</Badge>
      </div>
      <div className="mt-4 grid gap-3">
        {leads.map((lead) => (
          <LeadCard key={`${lead.source}-${lead.id}`} lead={lead} onUpdate={onUpdate} />
        ))}
        {leads.length === 0 ? <p className="rounded-2xl border border-line bg-white/[0.03] p-4 text-sm text-accent">No leads in this stage.</p> : null}
      </div>
    </Card>
  );
}

function LeadCard({ lead, onUpdate }: { lead: UnifiedLead; onUpdate: (lead: UnifiedLead, patch: { status?: string; notes?: string; followUpDate?: string; historyEntry?: string }) => Promise<void> }) {
  const [notes, setNotes] = useState(lead.notes ?? "");
  const [followUpDate, setFollowUpDate] = useState(lead.followUpDate ? lead.followUpDate.slice(0, 10) : "");
  const Icon = sourceMeta[lead.source].icon;

  useEffect(() => {
    setNotes(lead.notes ?? "");
    setFollowUpDate(lead.followUpDate ? lead.followUpDate.slice(0, 10) : "");
  }, [lead.id, lead.notes, lead.followUpDate]);

  return (
    <motion.article layout className="rounded-2xl border border-line bg-white/[0.035] p-4">
      <div className="flex items-start gap-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-xl border border-secondary/25 bg-secondary/[0.08]">
          <Icon className={sourceMeta[lead.source].tone} size={18} />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-text">{lead.name}</p>
          <p className="mt-1 break-words text-xs leading-5 text-accent">{lead.email}{lead.phone ? ` - ${lead.phone}` : ""}</p>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-accent">{lead.requirement}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge className="border-line bg-white/[0.04] text-accent">{sourceMeta[lead.source].label}</Badge>
            {lead.budget ? <Badge className="border-line bg-white/[0.04] text-accent">{lead.budget}</Badge> : null}
            {lead.timeline ? <Badge className="border-line bg-white/[0.04] text-accent">{lead.timeline}</Badge> : null}
          </div>
        </div>
      </div>
      <div className="mt-4 grid gap-3">
        <select value={crmStatuses.includes(lead.status as (typeof crmStatuses)[number]) ? lead.status : "NEW"} onChange={(event) => onUpdate(lead, { status: event.target.value, historyEntry: `Status moved to ${formatCrmStatus(event.target.value)}` })} className="h-10 rounded-xl border border-line bg-[#05091f] px-3 text-sm text-text">
          {crmStatuses.map((item) => <option key={item} value={item}>{formatCrmStatus(item)}</option>)}
        </select>
        <label className="grid gap-2 text-xs font-medium text-accent">
          Follow-up reminder
          <input type="date" value={followUpDate} onChange={(event) => setFollowUpDate(event.target.value)} className="h-10 rounded-xl border border-line bg-white/[0.04] px-3 text-sm text-text outline-none" />
        </label>
        <textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={3} placeholder="Lead notes..." className="rounded-xl border border-line bg-white/[0.04] p-3 text-sm text-text outline-none placeholder:text-accent/50" />
        <button type="button" onClick={() => onUpdate(lead, { notes, followUpDate, historyEntry: "Notes or follow-up updated" })} className="inline-flex h-10 items-center justify-center rounded-xl border border-secondary/40 bg-primary/15 text-sm font-semibold text-text transition hover:bg-primary/25">
          <PencilLine className="mr-2" size={15} /> Save CRM Notes
        </button>
        {lead.history.length ? (
          <div className="rounded-xl border border-line bg-black/10 p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-secondary">History</p>
            {lead.history.slice(-3).map((item) => <p key={item} className="mt-2 text-xs leading-5 text-accent">{item}</p>)}
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}

function Score({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-line bg-white/[0.035] p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-accent">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-text">{value}</p>
    </div>
  );
}

function AdminFeatureCard({ icon: Icon, title, description, href }: { icon: LucideIcon; title: string; description: string; href?: string }) {
  return (
    <Card className="p-5">
      <Icon className="text-secondary" size={24} />
      <h3 className="mt-5 text-xl font-semibold text-text">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-accent">{description}</p>
      {href ? <Button href={href} className="mt-5" variant="secondary">Open <ExternalLink className="ml-2" size={15} /></Button> : null}
    </Card>
  );
}

function CrudPanel({
  title,
  description,
  rows,
  group,
  endpoint,
  form,
  fields,
  setField,
  onSave,
  onEdit,
  onDelete,
  renderRow
}: {
  title: string;
  description: string;
  rows: Row[];
  group: keyof typeof emptyForms;
  endpoint: string;
  form: FormState;
  fields: Array<[string, string]>;
  setField: (group: keyof typeof emptyForms, key: string, value: string | boolean | number) => void;
  onSave: (group: keyof typeof emptyForms, endpoint: string, event: FormEvent<HTMLFormElement>) => Promise<void>;
  onEdit: (group: keyof typeof emptyForms, row: Row) => void;
  onDelete: (endpoint: string, id: string) => Promise<void>;
  renderRow: (row: Row) => string;
}) {
  return (
    <div className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(event) => onSave(group, endpoint, event)} className="grid gap-4">
            {fields.map(([key, label]) => (
              <label key={key} className="grid gap-2 text-sm font-medium text-text">
                {label}
                {key === "content" || key === "quote" ? (
                  <textarea value={String(form[key] ?? "")} onChange={(event) => setField(group, key, event.target.value)} rows={4} className="rounded-xl border border-line bg-white/[0.04] p-4 outline-none focus:border-secondary" />
                ) : (
                  <input value={String(form[key] ?? "")} onChange={(event) => setField(group, key, key === "rating" ? Number(event.target.value) : event.target.value)} className="h-12 rounded-xl border border-line bg-white/[0.04] px-4 outline-none focus:border-secondary" />
                )}
              </label>
            ))}
            <label className="inline-flex items-center gap-2 text-sm text-accent">
              <input type="checkbox" checked={Boolean(form.published ?? true)} onChange={(event) => setField(group, "published", event.target.checked)} />
              Published
            </label>
            <Button type="submit"><Save className="mr-2" size={16} /> Save</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Records</CardTitle></CardHeader>
        <CardContent className="grid gap-3">
          {rows.map((row) => (
            <div key={row.id} className="flex items-center justify-between gap-4 rounded-2xl border border-line bg-white/[0.035] p-4">
              <p className="text-sm font-semibold text-text">{renderRow(row)}</p>
              <div className="flex gap-2">
                <IconButton label="Edit" onClick={() => onEdit(group, row)}><Edit3 size={15} /></IconButton>
                <IconButton label="Delete" onClick={() => onDelete(endpoint, row.id)}><Trash2 size={15} /></IconButton>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" onClick={onClick} className="grid size-10 place-items-center rounded-xl border border-line text-accent transition hover:border-secondary/50 hover:text-text" aria-label={label}>
      {children}
    </button>
  );
}

function filterClass(active: boolean) {
  return `inline-flex h-10 items-center gap-2 rounded-xl border px-3 text-sm transition ${active ? "border-secondary bg-primary/20 text-text" : "border-line bg-white/[0.04] text-accent hover:text-text"}`;
}
