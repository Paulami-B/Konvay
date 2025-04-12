import RecievedMessage from "@/components/RecievedMessage";
import SentMessage from "@/components/SentMessage";
import ChatHeader from "@/components/ChatHeader";
import MessageBox from "@/components/MessageBox";

export default function ChatContainer() {
  return (
    <div className="h-screen w-full flex flex-col">
      <ChatHeader />
      <div className="flex-1 overflow-auto min-h-0 p-2">
        <RecievedMessage />
        <SentMessage />
        <RecievedMessage />
        <RecievedMessage />
        <SentMessage />
        <SentMessage />
        <SentMessage />
      </div>
      <div className="bottom-0 sticky">
        <MessageBox />
      </div>
    </div>
  )
}