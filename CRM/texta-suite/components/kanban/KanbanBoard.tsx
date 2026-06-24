"use client";

import { Task } from "@/types/kanban";
import KanbanColumn from "./KanbanColumn";

interface KanbanBoardProps {
  tasks: Task[];
}

export default function KanbanBoard({ tasks }: KanbanBoardProps) {
  const incoming = tasks.filter((t) => t.status === "incoming");
  const inProgress = tasks.filter((t) => t.status === "in_progress");
  const inReview = tasks.filter((t) => t.status === "review");
  const completed = tasks.filter((t) => t.status === "completed");

  return (
    <div className="w-full h-full p-8 overflow-x-auto">
      <div className="flex items-start gap-8 min-w-max pb-8">
        <KanbanColumn title="Incoming Context" items={incoming} markerColorClass="bg-red-400" />
        <KanbanColumn title="Synaptic Processing" items={inProgress} markerColorClass="bg-primary" />
        <KanbanColumn title="Review Pipeline" items={inReview} markerColorClass="bg-secondary" />
        <KanbanColumn title="Stored Memory" items={completed} markerColorClass="bg-green-500" />
      </div>
    </div>
  );
}
