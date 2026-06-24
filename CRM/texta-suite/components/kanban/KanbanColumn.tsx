"use client";

import { Task } from "@/types/kanban";
import NeuralCard from "./NeuralCard";

interface KanbanColumnProps {
  title: string;
  items: Task[];
  markerColorClass: string;
}

export default function KanbanColumn({ title, items, markerColorClass }: KanbanColumnProps) {
  return (
    <div className="flex flex-col w-[340px] shrink-0 gap-4">
      {/* Column Header */}
      <div className="flex items-center gap-3 px-2">
        <div className={`w-3 h-3 rounded-full ${markerColorClass} shadow-sm`} />
        <h3 className="font-headline text-lg font-bold text-on-surface">
          {title} <span className="text-on-surface-variant/50 text-sm ml-2 font-normal">({items.length})</span>
        </h3>
      </div>

      {/* Column Body / Dropzone */}
      <div className="flex flex-col gap-4 bg-surface-container-low/30 rounded-2xl p-3 min-h-[500px]">
        {items.map((task) => (
          <NeuralCard key={task.id} task={task} />
        ))}
        {items.length === 0 && (
          <div className="w-full text-center p-6 border-2 border-dashed border-surface-container-high rounded-xl text-on-surface-variant/50 font-body text-sm font-medium">
            Drag items here
          </div>
        )}
      </div>
    </div>
  );
}
