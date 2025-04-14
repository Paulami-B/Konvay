"use client"
import ChatContainer from "@/components/ChatContainer";
import Conversations from "@/components/Conversations";
import WelcomeScreen from "@/components/WelcomeScreen";
import { useConversationStore } from "@/utils/store/chatStore";

export default function Chat() {
  const { selectedConversation } = useConversationStore();
  return (
    <div className="md:grid md:grid-cols-13 divide-x divide-orange-100 dark:divide-orange-900">
        <div className="md:block col-span-4 lg:col-span-5">
          <Conversations />
        </div>
        <div className="md:block col-span-7 lg:col-span-8">
          {selectedConversation ? (
            <ChatContainer />
          ) : (
            <WelcomeScreen />
          )}
        </div>
    </div>
  )
}
