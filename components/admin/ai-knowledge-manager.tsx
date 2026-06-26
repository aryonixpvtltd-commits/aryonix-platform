"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Bot, Edit3, Eye, EyeOff, Plus, Save, Search, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { aiKnowledgeTypes, type AIKnowledgeType } from "@/lib/knowledge/knowledge";

type KnowledgeRow = {
  id: string;
  type: AIKnowledgeType;
  title: string;
  content: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type KnowledgeForm = {
  type: AIKnowledgeType;
  title: string;
  content: string;
  isActive: boolean;
};

const emptyForm: KnowledgeForm = {
  type: "custom",
  title: "",
  content: "",
  isActive: true
};

export function AIKnowledgeManager() {
  const [rows, setRows] = useState<KnowledgeRow[]>([]);
  const [form, setForm] = useState<KnowledgeForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | AIKnowledgeType>("all");
  const [status, setStatus] = useState("Loading AI knowledge...");
  const [saving, setSaving] = useState(false);

  async function load() {
    const response = await fetch("/api/admin/ai-knowledge");
    if (!response.ok) throw new Error("Unable to load AI knowledge.");
    setRows(await response.json());
    setStatus("");
  }

  useEffect(() => {
    load().catch(() => setStatus("AI knowledge could not be loaded. Check admin session and MongoDB."));
  }, []);

  const filteredRows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesType = typeFilter === "all" || row.type === typeFilter;
      const matchesQuery = !needle || `${row.title} ${row.content}`.toLowerCase().includes(needle);
      return matchesType && matchesQuery;
    });
  }, [query, rows, typeFilter]);

  function edit(row: KnowledgeRow) {
    setEditingId(row.id);
    setForm({
      type: row.type,
      title: row.title,
      content: row.content,
      isActive: row.isActive
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setStatus("");

    const response = await fetch(editingId ? `/api/admin/ai-knowledge/${editingId}` : "/api/admin/ai-knowledge", {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await response.json().catch(() => ({}));
    setSaving(false);

    if (!response.ok) {
      setStatus(data.errors?.join(" ") ?? "Knowledge save failed.");
      return;
    }

    setStatus(editingId ? "Knowledge updated." : "Knowledge added.");
    reset();
    await load();
  }

  async function toggle(row: KnowledgeRow) {
    const response = await fetch(`/api/admin/ai-knowledge/${row.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !row.isActive })
    });

    setStatus(response.ok ? "Knowledge status updated." : "Status update failed.");
    await load();
  }

  async function remove(row: KnowledgeRow) {
    if (!window.confirm(`Delete "${row.title}" from AI knowledge?`)) return;
    const response = await fetch(`/api/admin/ai-knowledge/${row.id}`, { method: "DELETE" });
    setStatus(response.ok ? "Knowledge deleted." : "Delete failed.");
    await load();
  }

  return (
    <section className="relative min-h-screen overflow-hidden pt-32">
      <div className="grid-mask absolute inset-0 opacity-40" />
      <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      <div className="container-shell relative pb-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.42fr] lg:items-end">
          <div>
            <Badge>Admin AI Knowledge</Badge>
            <h1 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.02em] text-text md:text-6xl">
              Train ARYONIX AI without editing code.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-accent">
              Add company facts, services, pricing notes, FAQs, portfolio context and custom guidance for the Gemini-powered website consultant.
            </p>
          </div>
          <Card className="p-5">
            <Bot className="text-secondary" size={26} />
            <p className="mt-5 text-3xl font-semibold text-text">{rows.filter((row) => row.isActive).length}</p>
            <p className="mt-1 text-sm text-accent">Active knowledge entries</p>
          </Card>
        </div>

        {status ? <Card className="mt-8 p-4 text-sm text-accent">{status}</Card> : null}

        <div className="mt-10 grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
          <Card>
            <CardHeader>
              <CardTitle>{editingId ? "Edit Knowledge" : "Add Knowledge"}</CardTitle>
              <CardDescription>Keep entries specific and factual. The chatbot receives active entries as private server-side context.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={save} className="grid gap-4">
                <label className="grid gap-2 text-sm font-medium text-text">
                  Type
                  <select
                    value={form.type}
                    onChange={(event) => setForm((current) => ({ ...current, type: event.target.value as AIKnowledgeType }))}
                    className="h-12 rounded-xl border border-line bg-[#05091f] px-4 text-text outline-none focus:border-secondary"
                  >
                    {aiKnowledgeTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-medium text-text">
                  Title
                  <input
                    value={form.title}
                    onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                    placeholder="Example: Business website pricing note"
                    className="h-12 rounded-xl border border-line bg-white/[0.04] px-4 text-text outline-none focus:border-secondary"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-text">
                  Content
                  <textarea
                    value={form.content}
                    onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))}
                    rows={8}
                    placeholder="Write the exact knowledge ARYONIX AI should use."
                    className="resize-none rounded-xl border border-line bg-white/[0.04] p-4 text-text outline-none focus:border-secondary"
                  />
                </label>
                <label className="inline-flex items-center gap-2 text-sm text-accent">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(event) => setForm((current) => ({ ...current, isActive: event.target.checked }))}
                  />
                  Active in chatbot context
                </label>
                <div className="flex flex-wrap gap-3">
                  <Button type="submit" disabled={saving}>
                    {editingId ? <Save className="mr-2" size={16} /> : <Plus className="mr-2" size={16} />}
                    {saving ? "Saving..." : editingId ? "Update Knowledge" : "Add Knowledge"}
                  </Button>
                  {editingId ? <Button type="button" variant="secondary" onClick={reset}>Cancel Edit</Button> : null}
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Knowledge Entries</CardTitle>
              <CardDescription>Search, filter, activate, edit or remove chatbot knowledge.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
                <label className="flex h-12 items-center gap-3 rounded-xl border border-line bg-white/[0.04] px-4 text-accent">
                  <Search size={18} />
                  <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title or content..." className="w-full bg-transparent text-sm text-text outline-none" />
                </label>
                <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value as "all" | AIKnowledgeType)} className="h-12 rounded-xl border border-line bg-[#05091f] px-4 text-text">
                  <option value="all">all types</option>
                  {aiKnowledgeTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>

              <div className="mt-5 grid gap-3">
                {filteredRows.map((row) => (
                  <motion.article key={row.id} layout className="rounded-2xl border border-line bg-white/[0.035] p-4">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge>{row.type}</Badge>
                          <span className={`rounded-full border px-2.5 py-1 text-xs ${row.isActive ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200" : "border-line bg-white/[0.035] text-accent"}`}>
                            {row.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                        <h2 className="mt-3 text-lg font-semibold text-text">{row.title}</h2>
                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-accent">{row.content}</p>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <IconButton label={row.isActive ? "Deactivate" : "Activate"} onClick={() => toggle(row)}>
                          {row.isActive ? <EyeOff size={15} /> : <Eye size={15} />}
                        </IconButton>
                        <IconButton label="Edit" onClick={() => edit(row)}><Edit3 size={15} /></IconButton>
                        <IconButton label="Delete" onClick={() => remove(row)}><Trash2 size={15} /></IconButton>
                      </div>
                    </div>
                  </motion.article>
                ))}
                {filteredRows.length === 0 ? (
                  <div className="rounded-2xl border border-line bg-white/[0.035] p-8 text-center text-sm text-accent">
                    No matching AI knowledge entries.
                  </div>
                ) : null}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} className="grid size-10 place-items-center rounded-xl border border-line text-accent transition hover:border-secondary/50 hover:text-text" aria-label={label} title={label}>
      {children}
    </button>
  );
}
