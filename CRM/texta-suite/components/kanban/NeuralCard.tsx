"use client";

import { Task } from "@/types/kanban";
import { useAppLayout } from "@/components/layout/AppLayoutContext";
import { fetcher } from "@/lib/fetcher";

interface NeuralCardProps {
  task: Task;
}

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
};

export default function NeuralCard({ task }: NeuralCardProps) {
  const { setInspectorOpen, setInspectorData } = useAppLayout();

  const handleCardClick = async () => {
    // Open Inspector and push task context
    // In a real SWR scenario, we might use useSWR directly in the inspector component
    // but here we simulation the "loading" into the inspector state.
    setInspectorOpen(true);
    
    try {
      // Simulation of SWR-like data fetch for details
      const details = await fetcher(`/api/inspector/${task.id}`);
      setInspectorData({ type: "task_node", payload: details });
    } catch (error) {
      console.error("Failed to fetch node details:", error);
      setInspectorData({ type: "task_node", payload: task, error: "Sync failed" });
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`
        w-full p-4 rounded-xl 
        bg-white/60 backdrop-blur-xl 
        border-0 shadow-sm
        hover:neural-glow-cyan hover:scale-[1.02] 
        transition-all duration-300 ease-out cursor-pointer
        group flex flex-col gap-3
      `}
    >
      {/* Title */}
      <h4 className="font-headline font-bold text-sm text-on-surface leading-snug">
        {task.title}
      </h4>

      {/* Financials (from project) & Assignee */}
      <div className="flex items-center justify-between text-on-surface-variant font-body">
        {task.project ? (
          <div className="flex items-center gap-1.5 text-secondary group-hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[16px]">payments</span>
            <span className="text-[12px] font-semibold">
              {formatCurrency(task.project.totalBudget, task.project.currency)}
            </span>
          </div>
        ) : (
          <span /> // Spacer
        )}
        
        <span className="flex items-center gap-1 px-2 py-0.5 bg-surface rounded-full text-[10px] uppercase font-bold tracking-wider">
          {task.assignee}
        </span>
      </div>

      {/* Sync Progress */}
      {task.syncProgress !== undefined && (
        <div className="w-full space-y-1.5 mt-1">
          <div className="flex justify-between font-label text-[9px] uppercase tracking-wider text-on-surface-variant/70 font-semibold">
            <span>Sync Progress</span>
            <span>{task.syncProgress}%</span>
          </div>
          <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
              style={{ width: `${task.syncProgress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
