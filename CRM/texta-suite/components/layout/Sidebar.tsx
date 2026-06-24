"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

interface NavItem {
  icon: string;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { icon: "account_tree", label: "Nodes", href: "/dashboard" },
  { icon: "hub", label: "Flows", href: "/flows" },
  { icon: "database", label: "Data", href: "/data" },
  { icon: "sync_alt", label: "Sync", href: "/sync" },
  { icon: "group", label: "Team", href: "/team" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <aside className="fixed left-0 top-16 z-40 h-[calc(100vh-64px)] flex text-on-surface border-0">
      {/* ── Tier 1: Workspace Bar (80px) ── */}
      <div
        className="
          w-20 h-full flex flex-col items-center
          py-8 gap-0
          bg-gradient-to-b from-transparent via-cyan-50/20 to-transparent
          backdrop-blur-xl bg-surface-container-low/50
        "
      >
        <nav className="flex flex-col items-center gap-5 flex-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const isHovered = hovered === item.label;

            return (
              <Link
                key={item.label}
                href={item.href}
                className="group flex flex-col items-center gap-1.5"
                onMouseEnter={() => setHovered(item.label)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className={`
                    w-12 h-12 flex items-center justify-center rounded-[20px]
                    transition-all duration-500 ease-out synapse-click
                    ${
                      isActive
                        ? "sidebar-active text-secondary scale-105"
                        : isHovered
                          ? "bg-surface-container text-primary scale-110"
                          : "text-on-surface-variant"
                    }
                  `}
                >
                  <span
                    className="material-symbols-outlined text-[22px]"
                    style={{
                      fontVariationSettings: isActive
                        ? "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24"
                        : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                    }}
                  >
                    {item.icon}
                  </span>
                </div>
                <span
                  className={`
                    font-label uppercase text-[9px] tracking-[0.1em] font-bold
                    transition-colors duration-300
                    ${isActive ? "text-secondary" : isHovered ? "text-primary" : "text-on-surface-variant/60"}
                  `}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom FAB */}
        <div className="mt-auto px-4">
          <button
            className="
              w-12 h-12 rounded-full
              gradient-neural text-white
              flex items-center justify-center
              neural-glow-cyan
              hover:scale-110 transition-transform duration-300
              synapse-click
            "
            aria-label="Create new"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
        </div>
      </div>

      {/* ── Tier 2: Contextual Navigation (240px) ── */}
      <div className="w-[240px] h-full bg-surface-container-low backdrop-blur-md flex flex-col py-6 px-4 gap-6">
        <div>
          <h2 className="font-headline text-lg font-bold text-primary mb-4 px-2">Workspace</h2>
          <div className="flex flex-col gap-1">
            <button className="flex items-center gap-3 px-3 py-2 rounded-xl bg-surface-container text-primary font-body text-sm font-medium transition-colors cursor-pointer border-0">
              <span className="material-symbols-outlined text-[18px]">folder_open</span>
              Core Synapses
            </button>
            <button className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-surface-container text-on-surface-variant transition-colors cursor-pointer font-body text-sm border-0">
              <span className="material-symbols-outlined text-[18px]">folder</span>
              External Integrations
            </button>
            <button className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-surface-container text-on-surface-variant transition-colors cursor-pointer font-body text-sm border-0">
              <span className="material-symbols-outlined text-[18px]">folder_shared</span>
              Team Assets
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-label uppercase text-[10px] tracking-[0.15em] font-bold text-on-surface-variant/70 mb-3 px-2">Active Channels</h3>
          <div className="flex flex-col gap-1">
            <Link href="/channels/engineering-sync" className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors cursor-pointer font-body text-sm border-0">
              <span className="text-secondary opacity-70">#</span>
              engineering-sync
            </Link>
            <button className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors cursor-pointer font-body text-sm border-0">
              <span className="text-primary opacity-70">#</span>
              design-flow
            </button>
            <button className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors cursor-pointer font-body text-sm border-0">
              <span className="text-on-surface-variant opacity-70">#</span>
              alerts-critical
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
