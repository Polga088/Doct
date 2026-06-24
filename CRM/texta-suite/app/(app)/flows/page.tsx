"use client";

import useSWR from "swr";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import { fetcher } from "@/lib/fetcher";

export default function FlowsPage() {
  const { data: tasks, error, isLoading, mutate } = useSWR("/api/flows", fetcher);

  if (error) return (
    <div className="flex items-center justify-center h-full text-error font-headline font-bold">
      Failed to sync synaptic flows.
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-surface">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 sticky top-0 bg-surface/90 backdrop-blur-md z-10">
        <div>
          <h2 className="font-headline text-2xl font-bold text-on-surface">Workflow Synapses</h2>
          <p className="font-body text-sm text-on-surface-variant mt-1 tracking-wide">
            Drag across phases to mutate node processing state.
          </p>
        </div>
        <button className="px-4 py-2 bg-primary text-white font-label font-bold uppercase text-[11px] tracking-widest rounded-full hover:scale-105 neural-glow-cyan transition-all duration-300">
          Create Flow
        </button>
      </div>

      {/* Board */}
      <div className="flex-1 overflow-hidden relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-surface/50 backdrop-blur-sm z-20">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <KanbanBoard tasks={tasks || []} onMutate={mutate} />
        )}
      </div>
    </div>
  );
}
