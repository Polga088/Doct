"use client";

import { useRef, useEffect } from "react";
import useSWR from "swr";
import MessageBubble from "./MessageBubble";
import MessageWidget from "./MessageWidget";
import MessageInput from "./MessageInput";
import { Message } from "@/types/chat";
import { fetcher } from "@/lib/fetcher";

interface ChatAreaProps {
  channelName: string;
  projectId?: string;
  taskId?: string;
}

const CURRENT_USER_ID = "u1";

export default function ChatArea({ channelName, projectId, taskId }: ChatAreaProps) {
  const url = `/api/messages?${projectId ? `projectId=${projectId}` : ""}${taskId ? `taskId=${taskId}` : ""}`;
  const { data: messages, mutate, isLoading } = useSWR<Message[]>(url, fetcher);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!messages) return;

    // Optimistic message object
    const optimisticMessage: Message = {
      id: `temp-${Date.now()}`,
      content: text,
      authorId: CURRENT_USER_ID,
      author: {
        id: CURRENT_USER_ID,
        name: "Soufiane B.",
        avatarInitials: "SB",
        avatarColor: "bg-primary",
      },
      createdAt: new Date().toISOString(),
    };

    // Trigger optimistic update
    mutate([...messages, optimisticMessage], false);

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: text,
          authorId: CURRENT_USER_ID,
          projectId,
          taskId,
        }),
      });

      if (!response.ok) throw new Error("Failed to send message");
      
      // Re-fetch to get the real message with final ID
      mutate();
    } catch (error) {
      console.error("Transmission error:", error);
      // Rollback on error
      mutate(messages, false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-surface relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-surface/80 backdrop-blur-md z-10 flex items-center px-8 border-0">
        <h2 className="font-headline text-xl font-bold flex items-center gap-2">
          <span className="text-primary text-2xl font-body">#</span> {channelName}
        </h2>
      </div>

      {/* Messages Canvas */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-8 pt-24 pb-28 flex flex-col gap-2 scroll-smooth"
      >
        {isLoading && !messages && (
          <div className="flex justify-center p-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {messages?.map((msg) => (
          <div key={msg.id} className="w-full">
            <MessageBubble 
              message={msg} 
              isMe={msg.authorId === CURRENT_USER_ID}
            />
            {/* Render Widgets inline if present (Mock for now) */}
            {msg.widgets && msg.widgets.length > 0 && (
              <div className={`flex w-full mb-4 ${msg.authorId === CURRENT_USER_ID ? "justify-end" : "justify-start pl-[52px]"}`}>
                <div className="flex flex-col gap-2 w-full">
                  {msg.widgets.map((widget) => (
                    <MessageWidget key={widget.id} widget={widget} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Base */}
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}
