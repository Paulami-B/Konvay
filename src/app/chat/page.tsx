"use client"
import ChatContainer from "@/components/ChatContainer";
import Conversations from "@/components/Conversations";

export default function Chat() {
  return (
    <div className="md:grid md:grid-cols-13 divide-x divide-orange-100 dark:divide-orange-900">
        <div className="md:block col-span-4 lg:col-span-5">
          <Conversations />
        </div>
        <div className="md:block col-span-7 lg:col-span-8">
          <ChatContainer />
        </div>
    </div>
  )
}
