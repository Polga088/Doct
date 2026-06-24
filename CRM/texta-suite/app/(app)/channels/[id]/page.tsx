import ChatArea from "@/components/chat/ChatArea";

export default async function ChannelPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const channelName = resolvedParams.id;

  return <ChatArea channelName={channelName} />;
}
