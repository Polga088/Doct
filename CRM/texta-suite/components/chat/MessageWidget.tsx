import { EmbeddedWidget } from "@/types/chat";

interface MessageWidgetProps {
  widget: EmbeddedWidget;
}

export default function MessageWidget({ widget }: MessageWidgetProps) {
  return (
    <div className="w-full max-w-[320px] mb-4 bg-surface-container-lowest rounded-2xl flex items-stretch overflow-hidden shadow-sm border-0 group cursor-pointer hover:shadow-md transition-shadow">
      {/* Lateral Accent - strictly no border, using a solid div block */}
      <div className="w-1.5 bg-secondary/50 group-hover:bg-secondary transition-colors" />
      
      <div className="flex-1 p-3 flex flex-col gap-2">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className={`material-symbols-outlined text-[14px] ${widget.type === 'jira' ? 'text-blue-500' : 'text-primary'}`}>
              {widget.icon || (widget.type === "jira" ? "bug_report" : "business_center")}
            </span>
            <span className="font-label text-[9px] tracking-wider uppercase text-on-surface-variant font-bold">
              {widget.issueId || widget.type}
            </span>
          </div>
          <span className="font-headline text-[10px] bg-surface-container px-2 py-0.5 rounded-md text-on-surface font-semibold">
            {widget.status}
          </span>
        </div>

        {/* Title */}
        <h4 className="font-headline font-bold text-[13px] text-on-surface leading-snug">
          {widget.title}
        </h4>

        {/* Metadata Footer */}
        {(widget.budget || widget.assignee) && (
          <div className="flex items-center justify-between mt-1 pt-2 border-t border-surface-container/50">
            {widget.assignee && (
              <span className="font-body text-[10px] text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">person</span>
                {widget.assignee}
              </span>
            )}
            {widget.budget && (
              <span className="font-body text-[10px] text-secondary font-semibold">
                {widget.budget}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
