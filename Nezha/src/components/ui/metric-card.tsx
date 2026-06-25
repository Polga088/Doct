import * as React from 'react';
import { TrendingDown, TrendingUp, type LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

type Accent = 'blue' | 'emerald' | 'amber' | 'violet' | 'rose' | 'slate';

const ACCENT_STYLES: Record<Accent, { icon: string; value: string; glow: string }> = {
  blue: {
    icon: 'bg-blue-500/10 text-blue-600 ring-blue-500/20',
    value: 'text-blue-600',
    glow: 'from-blue-500/5 to-transparent',
  },
  emerald: {
    icon: 'bg-emerald-500/10 text-emerald-600 ring-emerald-500/20',
    value: 'text-emerald-600',
    glow: 'from-emerald-500/5 to-transparent',
  },
  amber: {
    icon: 'bg-amber-500/10 text-amber-600 ring-amber-500/20',
    value: 'text-amber-600',
    glow: 'from-amber-500/5 to-transparent',
  },
  violet: {
    icon: 'bg-violet-500/10 text-violet-600 ring-violet-500/20',
    value: 'text-violet-600',
    glow: 'from-violet-500/5 to-transparent',
  },
  rose: {
    icon: 'bg-rose-500/10 text-rose-600 ring-rose-500/20',
    value: 'text-rose-600',
    glow: 'from-rose-500/5 to-transparent',
  },
  slate: {
    icon: 'bg-slate-500/10 text-slate-500 ring-slate-500/15',
    value: 'text-slate-700',
    glow: 'from-slate-500/5 to-transparent',
  },
};

export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: React.ReactNode;
  icon?: LucideIcon;
  accent?: Accent;
  hint?: string;
  trend?: number | null;
}

export function MetricCard({
  label,
  value,
  icon: Icon,
  accent = 'blue',
  hint,
  trend,
  className,
  ...props
}: MetricCardProps) {
  const styles = ACCENT_STYLES[accent];
  const hasTrend = typeof trend === 'number' && Number.isFinite(trend);
  const up = hasTrend && (trend as number) >= 0;

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl bg-white p-5 shadow-medical ring-1 ring-slate-900/[0.04] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-medical-lg',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br opacity-60',
          styles.glow
        )}
      />
      <div className="relative flex items-start justify-between gap-3">
        {Icon ? (
          <span
            className={cn(
              'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1',
              styles.icon
            )}
          >
            <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
          </span>
        ) : (
          <span />
        )}
        <p className="text-right text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">
          {label}
        </p>
      </div>

      <div className="relative mt-4 flex items-end gap-2">
        <span className={cn('text-4xl font-bold tabular-nums tracking-tight', styles.value)}>
          {value}
        </span>
        {hasTrend ? (
          <span
            className={cn(
              'mb-1.5 inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-bold',
              up ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
            )}
          >
            {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {Math.abs(trend as number)}%
          </span>
        ) : null}
      </div>

      {hint ? <p className="relative mt-1.5 text-xs text-slate-400">{hint}</p> : null}
    </div>
  );
}
