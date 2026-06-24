import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — TexTa Business Suite",
  description: "Neural command center: monitor your nodes, flows, and sync signals in real-time.",
};

const KPI_CARDS = [
  {
    label: "Active Nodes",
    value: "1,284",
    delta: "+12.4%",
    deltaPositive: true,
    icon: "account_tree",
    accentColor: "primary",
    glowClass: "neural-glow-cyan",
  },
  {
    label: "Flow Executions",
    value: "48,321",
    delta: "+8.1%",
    deltaPositive: true,
    icon: "hub",
    accentColor: "secondary",
    glowClass: "neural-glow-purple",
  },
  {
    label: "Sync Latency",
    value: "142ms",
    delta: "-5.3%",
    deltaPositive: true,
    icon: "sync_alt",
    accentColor: "primary",
    glowClass: "neural-glow-cyan",
  },
  {
    label: "Data Processed",
    value: "2.4 TB",
    delta: "+19.7%",
    deltaPositive: true,
    icon: "database",
    accentColor: "secondary",
    glowClass: "neural-glow-purple",
  },
];

const RECENT_FLOWS = [
  { name: "Customer Onboarding v3", status: "Active", nodes: 12, runs: 1430 },
  { name: "Invoice Reconciliation", status: "Paused", nodes: 8, runs: 872 },
  { name: "Inventory Sync Delta", status: "Active", nodes: 5, runs: 3210 },
  { name: "Support Escalation", status: "Active", nodes: 7, runs: 541 },
  { name: "Neural Audit Log", status: "Draft", nodes: 3, runs: 0 },
];

const QUICK_ACTIONS = [
  { icon: "add_circle", label: "New Flow", variant: "primary" },
  { icon: "account_tree", label: "Add Node", variant: "secondary" },
  { icon: "upload", label: "Import Data", variant: "ghost" },
  { icon: "people", label: "Invite Team", variant: "ghost" },
];

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8">

      {/* ── Synapse Path (Breadcrumb) ── */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-label text-[10px] uppercase tracking-[0.12em] text-on-surface-variant/60">
            Dashboard
          </span>
        </div>
        <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-primary/20 to-transparent" />
        <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
      </div>

      {/* ── Page Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-headline font-bold text-3xl tracking-tight text-on-surface">
            Neural Command Center
          </h1>
          <p className="font-body text-sm text-on-surface-variant mt-1.5">
            Thursday, April 10, 2026 · All systems operational
            <span className="ml-2 inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
              <span className="text-green-600 font-semibold">Live</span>
            </span>
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.label}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-full
                font-label text-xs font-bold tracking-wide
                transition-all duration-300 synapse-click
                ${
                  action.variant === "primary"
                    ? "gradient-neural text-white neural-glow-cyan hover:scale-105"
                    : action.variant === "secondary"
                      ? "bg-secondary/10 text-secondary hover:bg-secondary/20"
                      : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                }
              `}
            >
              <span className="material-symbols-outlined text-[16px]">{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {KPI_CARDS.map((card) => (
            <div
              key={card.label}
              className={`
                bg-surface-container-lowest rounded-2xl p-5
                ${card.glowClass}
                hover:scale-[1.02] transition-all duration-350
                cursor-default
              `}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${card.accentColor === "primary"
                      ? "bg-primary/10 text-primary"
                      : "bg-secondary/10 text-secondary"
                    }
                  `}
                >
                  <span className="material-symbols-outlined text-[20px]">{card.icon}</span>
                </div>
                <span
                  className={`
                    font-label text-[10px] font-bold px-2 py-1 rounded-full
                    ${card.deltaPositive
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-600"
                    }
                  `}
                >
                  {card.delta}
                </span>
              </div>
              <p className="font-headline font-bold text-2xl text-on-surface tracking-tight">
                {card.value}
              </p>
              <p className="font-label text-[11px] text-on-surface-variant/70 mt-1 uppercase tracking-wider">
                {card.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Main Content Grid ── */}
      <div className="grid grid-cols-12 gap-6">

        {/* ── Recent Flows Table ── */}
        <section className="col-span-12 lg:col-span-8">
          <div className="bg-surface-container-lowest rounded-2xl neural-lift overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5">
              <div>
                <h2 className="font-headline font-bold text-base text-on-surface">
                  Active Flows
                </h2>
                <p className="font-body text-[11px] text-on-surface-variant mt-0.5">
                  {RECENT_FLOWS.length} flows configured
                </p>
              </div>
              <button className="font-label text-xs text-primary hover:text-primary-dim transition-colors flex items-center gap-1">
                View all
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>

            {/* Table */}
            <div className="px-2 pb-2">
              <div className="grid grid-cols-4 px-4 py-2">
                {["Flow Name", "Status", "Nodes", "Executions"].map((h) => (
                  <span key={h} className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant/50">
                    {h}
                  </span>
                ))}
              </div>
              <div className="space-y-1">
                {RECENT_FLOWS.map((flow, i) => (
                  <div
                    key={flow.name}
                    className={`
                      grid grid-cols-4 items-center px-4 py-3.5 rounded-xl
                      transition-colors duration-200 cursor-pointer group
                      ${i % 2 === 1 ? "bg-surface-container-low/40" : ""}
                      hover:bg-primary/5
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`
                          w-1.5 h-1.5 rounded-full flex-shrink-0
                          ${flow.status === "Active" ? "bg-green-500 animate-pulse"
                            : flow.status === "Paused" ? "bg-amber-400"
                            : "bg-on-surface-variant/30"
                          }
                        `}
                      />
                      <span className="font-body text-sm text-on-surface group-hover:text-primary transition-colors">
                        {flow.name}
                      </span>
                    </div>
                    <span
                      className={`
                        font-label text-[10px] font-bold w-fit px-2.5 py-1 rounded-full uppercase tracking-wide
                        ${flow.status === "Active" ? "bg-green-50 text-green-700"
                          : flow.status === "Paused" ? "bg-amber-50 text-amber-700"
                          : "bg-surface-container text-on-surface-variant"
                        }
                      `}
                    >
                      {flow.status}
                    </span>
                    <span className="font-label text-sm text-on-surface-variant">{flow.nodes}</span>
                    <span className="font-label text-sm text-on-surface font-semibold">
                      {flow.runs.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Team Panel ── */}
        <section className="col-span-12 lg:col-span-4">
          <div className="bg-surface-container-lowest rounded-2xl neural-lift p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline font-bold text-base text-on-surface">
                Active Nodes
              </h2>
              <span className="font-label text-[10px] text-on-surface-variant/50 uppercase tracking-wider">
                5 online
              </span>
            </div>

            <div className="space-y-4">
              {[
                { name: "Alex Rivera", role: "Flow Engineer", status: "online", initials: "AR", color: "primary" },
                { name: "Sarah Chen", role: "Data Architect", status: "online", initials: "SC", color: "secondary" },
                { name: "Marc Dupont", role: "Node Analyst", status: "away", initials: "MD", color: "primary" },
                { name: "Yuki Tanaka", role: "Sync Specialist", status: "online", initials: "YT", color: "secondary" },
              ].map((member) => (
                <div key={member.name} className="flex items-center gap-3 group cursor-pointer">
                  <div className="relative flex-shrink-0">
                    <div
                      className={`
                        w-9 h-9 rounded-full flex items-center justify-center
                        font-headline font-bold text-xs text-white
                        ${member.color === "primary" ? "gradient-neural" : "gradient-neural-secondary"}
                      `}
                    >
                      {member.initials}
                    </div>
                    <div
                      className={`
                        absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white
                        ${member.status === "online" ? "bg-green-500" : "bg-amber-400"}
                      `}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-semibold text-on-surface truncate group-hover:text-primary transition-colors">
                      {member.name}
                    </p>
                    <p className="font-label text-[10px] text-on-surface-variant/60 uppercase tracking-wide">
                      {member.role}
                    </p>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low">
                    <span className="material-symbols-outlined text-[14px]">more_horiz</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Invite CTA */}
            <button
              className="
                mt-6 w-full py-3 rounded-xl
                border border-dashed border-outline-variant/40
                flex items-center justify-center gap-2
                font-label text-[11px] text-on-surface-variant/60
                hover:border-primary/30 hover:text-primary hover:bg-primary/5
                transition-all duration-300
              "
            >
              <span className="material-symbols-outlined text-[16px]">person_add</span>
              Invite a team member
            </button>
          </div>
        </section>
      </div>

      {/* ── Neural Signature Footer Spacer ── */}
      <div className="h-4" />
    </div>
  );
}
