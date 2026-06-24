import { useState } from "react";
import { useAppLayout } from "@/components/layout/AppLayoutContext";

interface TopNavBarProps {
  onToggleInspector?: () => void;
  inspectorOpen?: boolean;
}

export default function TopNavBar({
  onToggleInspector,
  inspectorOpen,
}: TopNavBarProps) {
  const { setCommandOpen } = useAppLayout();
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <nav
      className="
        fixed top-0 left-0 right-0 z-50 h-16
        bg-white/70 glass-nav
        flex items-center justify-between
        px-6 gap-6 border-0
      "
    >
      {/* ── Left: Logo + Brand ── */}
      <div className="flex items-center gap-8 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          {/* Neural Logo Mark */}
          <div className="w-8 h-8 rounded-full gradient-neural flex items-center justify-center neural-glow-cyan">
            <span
              className="material-symbols-outlined text-white text-[16px]"
              style={{
                fontVariationSettings: "'FILL' 1, 'wght' 600, 'GRAD' 0, 'opsz' 24",
              }}
            >
              hub
            </span>
          </div>
          <span className="font-headline font-bold text-xl tracking-tight text-on-surface">
            Tex<span className="text-primary">Ta</span>
          </span>
          <span className="hidden sm:inline-block font-label text-[10px] tracking-[0.15em] uppercase text-on-surface-variant/70 ml-1">
            Business Suite
          </span>
        </div>

        {/* Synapse Path divider */}
        <div className="hidden lg:flex items-center gap-2 text-on-surface-variant/40">
          <span className="w-px h-4 bg-current" />
        </div>
      </div>

      {/* ── Center: Global Search ── */}
      <div className="flex-1 max-w-md mx-4">
        <button
          onClick={() => setCommandOpen(true)}
          className={`
            w-full relative flex items-center gap-2.5
            bg-surface-container-low rounded-full
            px-4 py-2 transition-all duration-350 cursor-text
            ${searchFocused ? "neural-glow-cyan bg-white" : "hover:bg-surface-container-medium"}
          `}
          onMouseEnter={() => setSearchFocused(true)}
          onMouseLeave={() => setSearchFocused(false)}
        >
          <span
            className={`material-symbols-outlined text-[18px] transition-colors duration-300 ${searchFocused ? "text-primary" : "text-on-surface-variant"}`}
          >
            search
          </span>
          <span className="flex-1 text-left font-label text-sm text-on-surface-variant/50">
            Search nodes, flows, data...
          </span>
          <kbd className="hidden sm:flex items-center gap-1 font-label text-[10px] text-on-surface-variant/40 bg-surface-container px-2 py-0.5 rounded-full">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* ── Right: Actions + Profile ── */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Neural Inspector Toggle */}
        <button
          onClick={onToggleInspector}
          title="Toggle Neural Inspector"
          className={`
            w-9 h-9 rounded-full flex items-center justify-center
            transition-all duration-300 synapse-click
            ${
              inspectorOpen
                ? "bg-primary/10 text-primary"
                : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
            }
          `}
        >
          <span className="material-symbols-outlined text-[20px]">insights</span>
        </button>

        {/* Notifications */}
        <button
          className="
            relative w-9 h-9 rounded-full flex items-center justify-center
            text-on-surface-variant hover:bg-surface-container-low
            transition-all duration-300
          "
          aria-label="Notifications"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          {/* Badge */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full border-2 border-white" />
        </button>

        {/* Settings */}
        <button
          className="
            w-9 h-9 rounded-full flex items-center justify-center
            text-on-surface-variant hover:bg-surface-container-low
            transition-all duration-300
          "
          aria-label="Settings"
        >
          <span className="material-symbols-outlined text-[20px]">settings</span>
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-surface-container-high mx-1" />

        {/* Profile Avatar */}
        <button className="flex items-center gap-2.5 group">
          <div className="relative">
            <div
              className="
                w-9 h-9 rounded-full gradient-neural
                flex items-center justify-center
                text-white font-headline font-bold text-sm
                neural-glow-cyan group-hover:scale-105 transition-transform duration-300
              "
            >
              SB
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          </div>
          <div className="hidden md:block text-left">
            <p className="font-label font-semibold text-xs text-on-surface leading-none">
              Soufiane B.
            </p>
            <p className="font-label text-[10px] text-on-surface-variant/60 tracking-wide mt-0.5">
              Admin
            </p>
          </div>
          <span className="hidden md:inline material-symbols-outlined text-[16px] text-on-surface-variant/40">
            expand_more
          </span>
        </button>
      </div>
    </nav>
  );
}
