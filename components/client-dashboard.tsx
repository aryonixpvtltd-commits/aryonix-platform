"use client";

import {
  Activity,
  ArrowDownToLine,
  CalendarClock,
  CheckCircle2,
  CreditCard,
  Download,
  FileText,
  FolderKanban,
  Mail,
  MessageSquareText,
  Settings,
  ShieldCheck,
  UserRound
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const overviewStats = [
  { label: "Project Progress", value: "64%", detail: "Design system in review", icon: Activity },
  { label: "Next Milestone", value: "3 days", detail: "Homepage QA handoff", icon: CalendarClock },
  { label: "Files Ready", value: "6", detail: "Brand assets and previews", icon: Download },
  { label: "Invoice Status", value: "1 due", detail: "Milestone payment pending", icon: CreditCard }
];

const timeline = [
  { label: "Discovery", status: "Complete", progress: 100 },
  { label: "Design", status: "In review", progress: 82 },
  { label: "Development", status: "Active", progress: 54 },
  { label: "Deploy", status: "Queued", progress: 12 }
];

const files = [
  { name: "ARYONIX Brand Kit", type: "ZIP", size: "18.4 MB" },
  { name: "Homepage Preview", type: "PDF", size: "4.2 MB" },
  { name: "Project Roadmap", type: "DOC", size: "820 KB" }
];

const invoices = [
  { id: "INV-2026-001", title: "Discovery + UX Sprint", amount: "₹18,000", status: "Paid" },
  { id: "INV-2026-002", title: "Development Milestone", amount: "₹32,000", status: "Due" },
  { id: "INV-2026-003", title: "Launch Support", amount: "₹12,000", status: "Upcoming" }
];

const messages = [
  { sender: "Aryonix Studio", time: "Today", message: "Homepage portfolio polish is ready for review." },
  { sender: "Project Lead", time: "Yesterday", message: "Shared updated content blocks for services and CTA." },
  { sender: "Design Team", time: "Mon", message: "Instagram showcase assets have been added to the build." }
];

const profile = [
  ["Client", "Aryonix Client"],
  ["Email", "client@aryonix.in"],
  ["Project Type", "Premium website + dashboard"],
  ["Support Plan", "Launch care"]
];

export function ClientDashboard() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-32">
      <div className="grid-mask absolute inset-0 opacity-40" />
      <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      <div className="absolute -left-24 bottom-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="container-shell relative pb-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.45fr] lg:items-end">
          <div>
            <Badge>Client Dashboard</Badge>
            <h1 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.02em] text-text md:text-6xl">
              Project command center.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-accent">
              Track your Aryonix project, download files, review invoices, manage messages and keep profile details aligned.
            </p>
          </div>

          <Card className="relative overflow-hidden p-5">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/70 to-transparent" />
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-secondary">Workspace Health</p>
                <p className="mt-2 text-3xl font-semibold text-text">On Track</p>
                <p className="mt-1 text-sm text-accent">All milestones moving cleanly.</p>
              </div>
              <span className="grid size-14 place-items-center rounded-2xl border border-secondary/25 bg-primary/10 text-secondary shadow-glow">
                <ShieldCheck size={25} />
              </span>
            </div>
          </Card>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {overviewStats.map((stat) => (
            <Card key={stat.label} className="group relative overflow-hidden p-6 transition hover:-translate-y-1 hover:border-secondary/45 hover:shadow-[0_0_36px_rgba(26,111,255,0.16)]">
              <div className="absolute -right-10 -top-10 size-32 rounded-full bg-secondary/10 blur-3xl transition group-hover:bg-secondary/20" />
              <stat.icon className="relative text-secondary" size={24} />
              <p className="relative mt-8 text-3xl font-semibold text-text">{stat.value}</p>
              <p className="relative mt-2 text-sm font-semibold text-text/90">{stat.label}</p>
              <p className="relative mt-2 text-sm leading-6 text-accent">{stat.detail}</p>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="mt-10">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Project Status</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.7fr]">
            <ProjectStatusCard />
            <MessagesCard />
          </TabsContent>

          <TabsContent value="projects" className="mt-6">
            <ProjectStatusCard />
          </TabsContent>

          <TabsContent value="files" className="mt-6">
            <FilesCard />
          </TabsContent>

          <TabsContent value="invoices" className="mt-6">
            <InvoicesCard />
          </TabsContent>

          <TabsContent value="messages" className="mt-6">
            <MessagesCard />
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            <ProfileCard />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function ProjectStatusCard() {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/70 to-transparent" />
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FolderKanban className="text-secondary" size={20} />
              Project Status Tracking
            </CardTitle>
            <CardDescription>Live milestone progress for your current Aryonix build.</CardDescription>
          </div>
          <Badge>64% Complete</Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        {timeline.map((item) => (
          <div key={item.label} className="rounded-2xl border border-line bg-white/[0.035] p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-text">{item.label}</p>
                <p className="mt-1 text-sm text-accent">{item.status}</p>
              </div>
              <span className="font-mono text-sm text-secondary">{item.progress}%</span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary shadow-[0_0_18px_rgba(77,163,255,0.5)]" style={{ width: `${item.progress}%` }} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function FilesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowDownToLine className="text-secondary" size={20} />
          File Downloads
        </CardTitle>
        <CardDescription>Download approved assets and project documents.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        {files.map((file) => (
          <div key={file.name} className="flex flex-col gap-4 rounded-2xl border border-line bg-white/[0.035] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl border border-secondary/25 bg-primary/10 text-secondary">
                <FileText size={18} />
              </span>
              <div>
                <p className="font-semibold text-text">{file.name}</p>
                <p className="mt-1 text-sm text-accent">{file.type} • {file.size}</p>
              </div>
            </div>
            <Button variant="secondary" className="shrink-0">
              Download <Download className="ml-2" size={16} />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function InvoicesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="text-secondary" size={20} />
          Invoices
        </CardTitle>
        <CardDescription>Review payment status across project milestones.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        {invoices.map((invoice) => (
          <div key={invoice.id} className="grid gap-3 rounded-2xl border border-line bg-white/[0.035] p-4 md:grid-cols-[1fr_auto_auto] md:items-center">
            <div>
              <p className="font-semibold text-text">{invoice.title}</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-accent">{invoice.id}</p>
            </div>
            <p className="font-semibold text-text">{invoice.amount}</p>
            <Badge className={invoice.status === "Due" ? "border-amber-300/30 bg-amber-400/10 text-amber-200" : ""}>
              {invoice.status}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function MessagesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquareText className="text-secondary" size={20} />
          Messages
        </CardTitle>
        <CardDescription>Recent project updates from the Aryonix team.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        {messages.map((message) => (
          <div key={`${message.sender}-${message.time}`} className="rounded-2xl border border-line bg-white/[0.035] p-4">
            <div className="flex items-center justify-between gap-4">
              <p className="font-semibold text-text">{message.sender}</p>
              <p className="text-xs text-accent">{message.time}</p>
            </div>
            <p className="mt-2 text-sm leading-6 text-accent">{message.message}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ProfileCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="text-secondary" size={20} />
          Profile Settings
        </CardTitle>
        <CardDescription>Manage client identity and communication preferences.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 lg:grid-cols-[0.75fr_1fr]">
        <div className="rounded-2xl border border-line bg-white/[0.035] p-5">
          <span className="grid size-14 place-items-center rounded-2xl border border-secondary/25 bg-primary/10 text-secondary shadow-glow">
            <UserRound size={24} />
          </span>
          <p className="mt-5 text-xl font-semibold text-text">Aryonix Client</p>
          <p className="mt-2 text-sm leading-6 text-accent">Primary contact for project reviews and approvals.</p>
          <Button className="mt-5" variant="secondary">
            <Mail className="mr-2" size={16} />
            Update Contact
          </Button>
        </div>
        <div className="grid gap-3">
          {profile.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-4 rounded-2xl border border-line bg-white/[0.035] p-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-accent">{label}</p>
                <p className="mt-1 font-semibold text-text">{value}</p>
              </div>
              <CheckCircle2 className="shrink-0 text-secondary" size={18} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
