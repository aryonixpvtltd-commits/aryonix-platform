import Link from "next/link";
import { Activity, CreditCard, Download, FolderKanban, UserRound, Users } from "lucide-react";

const clientItems = [
  { label: "Project Status", value: "Design system in progress", icon: FolderKanban },
  { label: "Files", value: "3 deliverables ready", icon: Download },
  { label: "Progress", value: "64% complete", icon: Activity },
  { label: "Invoices", value: "1 pending", icon: CreditCard },
  { label: "Profile", value: "Contact details verified", icon: UserRound }
];

const adminItems = [
  { label: "Portfolio Projects", value: "Add, edit and publish case studies", icon: FolderKanban, href: "/admin/portfolio" },
  { label: "Users", value: "Manage admin and client roles", icon: Users },
  { label: "Enquiries", value: "Review project requests", icon: Activity },
  { label: "Content", value: "Update services and copy", icon: UserRound },
  { label: "Project Status", value: "Move client work through stages", icon: CreditCard }
];

export function DashboardShell({ role }: { role: "client" | "admin" }) {
  const items = role === "client" ? clientItems : adminItems;

  return (
    <section className="min-h-screen pt-36">
      <div className="container-shell pb-24">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-secondary">
          {role} dashboard
        </p>
        <h1 className="mt-5 text-4xl font-semibold text-text md:text-6xl">
          {role === "client" ? "Project command center." : "Studio operations center."}
        </h1>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.label} className="panel rounded-2xl p-6">
              <item.icon className="text-secondary" size={28} />
              <h2 className="mt-8 text-xl font-semibold text-text">{item.label}</h2>
              <p className="mt-3 text-sm leading-6 text-accent">{item.value}</p>
              {"href" in item && item.href ? (
                <Link href={item.href} className="mt-5 inline-block text-sm font-semibold text-secondary hover:text-text">
                  Open manager
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
