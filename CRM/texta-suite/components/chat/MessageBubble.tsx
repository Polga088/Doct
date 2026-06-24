import { Message } from "@/types/chat";

interface MessageBubbleProps {
  message: Message;
  isMe: boolean;
}

export default function MessageBubble({ message, isMe }: MessageBubbleProps) {
  const timestamp = new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`flex w-full ${isMe ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`flex max-w-[70%] ${isMe ? "flex-row-reverse" : "flex-row"} items-end gap-2`}>
        
        {/* Avatar */}
        {!isMe && (
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-headline font-bold text-xs shadow-sm ${message.author.avatarColor}`}>
            {message.author.avatarInitials}
          </div>
        )}

        <div className={`flex flex-col gap-1 ${isMe ? "items-end" : "items-start"}`}>
          {/* Sender Name */}
          {!isMe && (
            <span className="font-label text-[10px] text-on-surface-variant/70 ml-2 uppercase tracking-widest">
              {message.author.name}
            </span>
          )}

          {/* Bubble */}
          <div
            className={`
              px-5 py-3 rounded-2xl font-body text-[13px] leading-relaxed border-0
              ${isMe 
                ? "bg-primary text-white rounded-br-sm shadow-glow-cyan" 
                : "bg-white text-on-surface neural-glow-cyan rounded-bl-sm"}
            `}
          >
            {message.content}
          </div>

          {/* Timestamp */}
          <span className="font-label text-[9px] text-on-surface-variant/50 px-1 mt-0.5">
            {timestamp}
          </span>
        </div>

      </div>
    </div>
  );
}
