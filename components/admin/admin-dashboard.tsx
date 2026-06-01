"use client";

import { FormEvent, useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  Activity,
  Edit3,
  FolderKanban,
  Link as LinkIcon,
  MessageSquareText,
  Save,
  Star,
  Trash2,
  UserPlus,
  Users
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Row = Record<string, unknown> & { id: string };
type FormState = Record<string, string | boolean | number>;

const emptyForms = {
  clients: { name: "", email: "", password: "" },
  testimonials: { quote: "", name: "", role: "", company: "", rating: 5, published: true },
  content: { key: "", section: "homepage", title: "", content: "", published: true },
  social: { platform: "", label: "", handle: "", href: "", published: true }
};

const adminStats: Array<[string, number, LucideIcon]> = [
  ["Clients", 0, Users],
  ["Enquiries", 0, MessageSquareText],
  ["Testimonials", 0, Star],
  ["Content Blocks", 0, Activity],
  ["Social Links", 0, LinkIcon]
];

export function AdminDashboard() {
  const [clients, setClients] = useState<Row[]>([]);
  const [enquiries, setEnquiries] = useState<Row[]>([]);
  const [testimonials, setTestimonials] = useState<Row[]>([]);
  const [content, setContent] = useState<Row[]>([]);
  const [social, setSocial] = useState<Row[]>([]);
  const [forms, setForms] = useState<Record<keyof typeof emptyForms, FormState>>(emptyForms);
  const [editing, setEditing] = useState<Record<string, string | null>>({});
  const [status, setStatus] = useState("Loading admin data...");

  async function load() {
    const [clientRes, enquiryRes, testimonialRes, contentRes, socialRes] = await Promise.all([
      fetch("/api/admin/clients"),
      fetch("/api/admin/enquiries"),
      fetch("/api/admin/testimonials"),
      fetch("/api/admin/homepage-content"),
      fetch("/api/admin/social-links")
    ]);

    if (clientRes.ok) setClients(await clientRes.json());
    if (enquiryRes.ok) setEnquiries(await enquiryRes.json());
    if (testimonialRes.ok) setTestimonials(await testimonialRes.json());
    if (contentRes.ok) setContent(await contentRes.json());
    if (socialRes.ok) setSocial(await socialRes.json());
    setStatus("");
  }

  useEffect(() => {
    load().catch(() => setStatus("Admin data could not be loaded."));
  }, []);

  function setField(group: keyof typeof emptyForms, key: string, value: string | boolean | number) {
    setForms((current) => ({
      ...current,
      [group]: { ...current[group], [key]: value }
    }));
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

  async function updateEnquiry(id: string, statusValue: string) {
    await fetch(`/api/admin/enquiries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: statusValue })
    });
    await load();
  }

  return (
    <section className="relative min-h-screen overflow-hidden pt-32">
      <div className="grid-mask absolute inset-0 opacity-40" />
      <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      <div className="container-shell relative pb-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.5fr] lg:items-end">
          <div>
            <Badge>Admin Dashboard</Badge>
            <h1 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.02em] text-text md:text-6xl">
              Aryonix operations center.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-accent">
              Manage portfolio work, clients, enquiries, testimonials, homepage content and official social links.
            </p>
          </div>
          <Card className="p-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-secondary">Admin status</p>
            <p className="mt-2 text-3xl font-semibold text-text">Secure</p>
            <p className="mt-1 text-sm text-accent">Protected by ADMIN role middleware.</p>
          </Card>
        </div>

        {status ? <Card className="mt-8 p-4 text-sm text-accent">{status}</Card> : null}

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {adminStats.map(([label, , Icon]) => {
            const value =
              label === "Clients" ? clients.length :
              label === "Enquiries" ? enquiries.length :
              label === "Testimonials" ? testimonials.length :
              label === "Content Blocks" ? content.length :
              social.length;

            return (
            <Card key={String(label)} className="p-5">
              <Icon className="text-secondary" size={22} />
              <p className="mt-6 text-3xl font-semibold text-text">{value}</p>
              <p className="mt-2 text-sm text-accent">{label}</p>
            </Card>
            );
          })}
        </div>

        <Tabs defaultValue="portfolio" className="mt-10">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="enquiries">Enquiries</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="content">Homepage</TabsTrigger>
            <TabsTrigger value="social">Social Links</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><FolderKanban className="text-secondary" size={20} /> Portfolio Projects</CardTitle>
                <CardDescription>Add, edit, delete, categorize and upload screenshots for Aryonix projects.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button href="/admin/portfolio">Open Full Portfolio Manager</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients" className="mt-6">
            <CrudPanel
              title="Manage Clients"
              description="Create, edit and remove client accounts."
              icon={<UserPlus className="text-secondary" size={20} />}
              rows={clients}
              group="clients"
              endpoint="/api/admin/clients"
              form={forms.clients}
              fields={[
                ["name", "Name"],
                ["email", "Email"],
                ["password", editing.clients ? "Password unchanged" : "Temporary Password"]
              ]}
              setField={setField}
              onSave={save}
              onEdit={edit}
              onDelete={remove}
              renderRow={(row) => `${String(row.name ?? "Client")} • ${String(row.email ?? "")}`}
            />
          </TabsContent>

          <TabsContent value="enquiries" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>View Enquiries</CardTitle>
                <CardDescription>Review, update status and remove inbound project requests.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                {enquiries.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-line bg-white/[0.035] p-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="font-semibold text-text">{String(item.name ?? "Lead")} • {String(item.email ?? "")}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Badge className="border-line bg-white/[0.04] text-accent">
                            Company: {String(item.company ?? "Not provided")}
                          </Badge>
                          <Badge className="border-line bg-white/[0.04] text-accent">
                            Budget: {String(item.budget ?? "Not provided")}
                          </Badge>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-accent">{String(item.message ?? "")}</p>
                      </div>
                      <div className="flex gap-2">
                        <select value={String(item.status ?? "NEW")} onChange={(event) => updateEnquiry(item.id, event.target.value)} className="h-10 rounded-xl border border-line bg-[#05091f] px-3 text-sm">
                          {["NEW", "CONTACTED", "QUALIFIED", "CLOSED"].map((status) => <option key={status}>{status}</option>)}
                        </select>
                        <IconButton label="Delete" onClick={() => remove("/api/admin/enquiries", item.id)}><Trash2 size={15} /></IconButton>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testimonials" className="mt-6">
            <CrudPanel title="Manage Testimonials" description="Publish client quotes across marketing pages." rows={testimonials} group="testimonials" endpoint="/api/admin/testimonials" form={forms.testimonials} fields={[["quote", "Quote"], ["name", "Name"], ["role", "Role"], ["company", "Company"], ["rating", "Rating"]]} setField={setField} onSave={save} onEdit={edit} onDelete={remove} renderRow={(row) => `${String(row.name ?? "")} • ${String(row.role ?? "")}`} />
          </TabsContent>

          <TabsContent value="content" className="mt-6">
            <CrudPanel title="Manage Homepage Content" description="Control editable homepage copy blocks." rows={content} group="content" endpoint="/api/admin/homepage-content" form={forms.content} fields={[["key", "Key"], ["section", "Section"], ["title", "Title"], ["content", "Content"]]} setField={setField} onSave={save} onEdit={edit} onDelete={remove} renderRow={(row) => `${String(row.section ?? "")} • ${String(row.title ?? "")}`} />
          </TabsContent>

          <TabsContent value="social" className="mt-6">
            <CrudPanel title="Manage Social Links" description="Update official Aryonix social profiles." rows={social} group="social" endpoint="/api/admin/social-links" form={forms.social} fields={[["platform", "Platform"], ["label", "Label"], ["handle", "Handle"], ["href", "URL"]]} setField={setField} onSave={save} onEdit={edit} onDelete={remove} renderRow={(row) => `${String(row.label ?? "")} • ${String(row.handle ?? "")}`} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function CrudPanel({
  title,
  description,
  icon,
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
  icon?: ReactNode;
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
          <CardTitle className="flex items-center gap-2">{icon}{title}</CardTitle>
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
