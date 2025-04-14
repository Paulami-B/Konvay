"use client"

import RecievedMessage from "@/components/RecievedMessage";
import SentMessage from "@/components/SentMessage";
import ChatHeader from "@/components/ChatHeader";
import MessageBox from "@/components/MessageBox";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuthStore } from "@/utils/store/authStore";
import { useConversationStore } from "@/utils/store/chatStore";
import Modal from "./Modal";
import { useState } from "react";
import GroupMembers from "./GroupMembers";

export default function ChatContainer() {
  const { currentUser } = useAuthStore();
  const { selectedConversation } = useConversationStore();
  const [showModal, setShowModal] = useState(false);
  const messages = useQuery(api.messages.getMessages, currentUser && selectedConversation ? {uid: currentUser!.uid, conversation: selectedConversation!._id}: "skip")
  return (
    <div className="h-screen w-full flex flex-col">
      <ChatHeader setShowModal={setShowModal} />
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <GroupMembers />
        </Modal>
      )}
      <div className="flex-1 overflow-auto min-h-0 p-2 dark:bg-gray-800">
        {messages && messages.length>0 ? (
          messages.map((message) => (
            message.sender?.uid===currentUser?.uid ?
            (
              <SentMessage key={message._id} content={message.content} />
            ) : (
              <RecievedMessage key={message._id} content={message.content} />
            )
          ))
        ) : (
          // Error: This text is rendered and after a second disappers
          <div className="flex justify-center my-15">
            <p className="bg-gray-100 dark:bg-gray-500 p-2 rounded text-sm text-gray-700 dark:text-gray-200 font-semibold">Don't be shy, drop a hello!</p>
          </div>
        )}
      </div>
      <div className="bottom-0 sticky">
        <MessageBox />
      </div>
    </div>
  )
}