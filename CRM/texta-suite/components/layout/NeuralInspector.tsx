"use client";

interface NeuralInspectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const METRICS = [
  { label: "Sync Strength", value: "94.2%", percent: 94.2, color: "primary" },
  { label: "Signal Latency", value: "240ms", percent: 70, color: "error" },
  { label: "Node Coverage", value: "87.5%", percent: 87.5, color: "secondary" },
];

const SYSTEM_ACTIONS = [
  { icon: "bolt", label: "Optimize Cluster", variant: "primary" },
  { icon: "history", label: "Signal History", variant: "ghost" },
  { icon: "bug_report", label: "Debug Flow", variant: "ghost" },
];

export default function NeuralInspector({ isOpen, onClose }: NeuralInspectorProps) {
  return (
    <aside
      className={`
        h-[calc(100vh-64px)] w-full
        bg-surface-container-lowest/90 glass-panel
        overflow-y-auto
        flex flex-col border-0
        transition-all duration-500 ease-out
        ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none w-0 hidden"}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 sticky top-0 bg-surface-container-lowest/80 glass-panel z-10">
        <div className="flex items-center gap-2.5">
          <span
            className="material-symbols-outlined text-primary text-[22px]"
            style={{ fontVariationSettings: "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24" }}
          >
            insights
          </span>
          <h3 className="font-headline font-extrabold text-sm tracking-[0.08em] uppercase text-on-surface">
            Neural Inspector
          </h3>
        </div>
        <button
          onClick={onClose}
          className="
            w-8 h-8 rounded-full flex items-center justify-center
            text-on-surface-variant hover:bg-surface-container
            transition-all duration-300
          "
          aria-label="Close inspector"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>

      <div className="flex flex-col gap-6 p-6 flex-1">
        {/* ── Target Context ── */}
        <section>
          <p className="font-label text-[10px] uppercase tracking-[0.12em] text-on-surface-variant/60 mb-3">
            Target Context
          </p>
          <div className="bg-surface rounded-2xl p-4 neural-glow-cyan">
            <h4 className="font-headline font-bold text-sm text-on-surface mb-1">
              Cluster B-12 Analysis
            </h4>
            <p className="font-body text-[11px] text-on-surface-variant leading-relaxed">
              Real-time monitoring of core synaptic mapping nodes and signal flows.
            </p>
          </div>
        </section>

        {/* ── Metrics ── */}
        <section>
          <p className="font-label text-[10px] uppercase tracking-[0.12em] text-on-surface-variant/60 mb-3">
            Live Metrics
          </p>
          <div className="bg-surface rounded-2xl p-4 space-y-5">
            {METRICS.map((metric) => (
              <div key={metric.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-body text-[11px] text-on-surface-variant">
                    {metric.label}
                  </span>
                  <span
                    className={`font-label text-xs font-bold text-${metric.color}`}
                  >
                    {metric.value}
                  </span>
                </div>
                <div className="w-full bg-surface-container h-1 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      metric.color === "primary"
                        ? "bg-gradient-to-r from-primary to-primary-container"
                        : metric.color === "error"
                          ? "bg-error"
                          : "bg-gradient-to-r from-secondary to-secondary-fixed"
                    }`}
                    style={{ width: `${metric.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Synapse Graph ── */}
        <section>
          <p className="font-label text-[10px] uppercase tracking-[0.12em] text-on-surface-variant/60 mb-3">
            Synapse Graph
          </p>
          <div className="aspect-square rounded-2xl bg-surface-container-low relative overflow-hidden flex items-center justify-center">
            {/* Neural Network Animation */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="absolute w-48 h-48 border border-primary rounded-full animate-ping" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <div className="absolute w-36 h-36 border border-primary/60 rounded-full animate-spin-slow" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="absolute w-24 h-24 border border-secondary rounded-full" />
            </div>

            {/* Node dots */}
            {[
              { top: "20%", left: "70%", color: "bg-primary" },
              { top: "70%", left: "20%", color: "bg-secondary" },
              { top: "30%", left: "25%", color: "bg-primary-container" },
              { top: "65%", left: "72%", color: "bg-secondary" },
            ].map((dot, i) => (
              <div
                key={i}
                className={`absolute w-2.5 h-2.5 ${dot.color} rounded-full`}
                style={{ top: dot.top, left: dot.left }}
              />
            ))}

            {/* Center icon */}
            <div className="z-10 text-center">
              <span
                className="material-symbols-outlined text-primary text-4xl mb-2 block"
                style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 40" }}
              >
                share
              </span>
              <p className="font-label text-[9px] font-bold text-on-surface-variant/60 px-4 uppercase tracking-wider">
                Interactive Map
              </p>
            </div>
          </div>
        </section>

        {/* ── System Actions ── */}
        <section className="space-y-2.5">
          <p className="font-label text-[10px] uppercase tracking-[0.12em] text-on-surface-variant/60">
            System Actions
          </p>
          {SYSTEM_ACTIONS.map((action) => (
            <button
              key={action.label}
              className={`
                w-full py-3 px-4 rounded-2xl text-xs font-label font-bold
                flex items-center justify-center gap-2
                transition-all duration-300 synapse-click
                ${
                  action.variant === "primary"
                    ? "bg-surface-container-lowest neural-glow-cyan text-primary hover:gradient-neural hover:text-white"
                    : "bg-surface text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                }
              `}
            >
              <span className="material-symbols-outlined text-[16px]">{action.icon}</span>
              {action.label.toUpperCase()}
            </button>
          ))}
        </section>
      </div>
    </aside>
  );
}
