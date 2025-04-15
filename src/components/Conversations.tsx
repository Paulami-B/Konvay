"use client"

import { FiSearch } from "react-icons/fi";
import ChatTile from "@/components/ChatTile";
import { BsPersonFillAdd } from "react-icons/bs";
import { useState } from "react";
import Modal from "./Modal";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuthStore } from "@/utils/store/authStore";
import Contacts from "./Contacts";


export default function Conversations() {
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useAuthStore();
  const myConversations = useQuery(api.conversations.getMyConversations, currentUser ? {uid: currentUser.uid} : "skip");
  return (
    <div className="h-screen w-full p-4 pt-0 md:p-4 bg-orange-50/40 dark:bg-gray-800 flex flex-col">
      <div className="top-0 h-fit sticky bg-[#FFFCF8] dark:bg-gray-800 z-50">
        <div className="flex justify-between items-center text-2xl">
          <div className="text-4xl font-bold dark:text-orange-100 my-2 hidden md:block">Chats</div>
          <BsPersonFillAdd className="cursor-pointer dark:text-gray-100 hover:text-orange-500 dark:hover:text-marigold"
          onClick={() => setShowModal(true)} />
        </div>
        {showModal && (
          <Modal setShowModal={setShowModal}>
            <Contacts />
          </Modal>
        )}
        <div className="flex items-center gap-2 bg-orange-50 dark:bg-marigold rounded-lg p-3">
          <FiSearch size={20} strokeWidth={3} className="text-orange-500 dark:text-red-600" />
          <input className="w-full border-none focus:outline-none focus:ring-0 text-lg dark:placeholder-gray-700" placeholder="Search" />
        </div>

        {/* TODO: Add Option to archive chat */}

        {/* <div className="flex items-center justify-start gap-3 text-xl py-5">
          <MdSendAndArchive size={30} className="dark:text-marigold"/>
          <p className="text-lg text-orange-500 dark:text-marigold font-semibold">Archived</p>
        </div> */}
        <hr className="text-gray-300 dark:text-gray-500" />
      </div>
      <div className="flex-1 overflow-auto pr-2">

        {/* TODO: Add pinned chat functionality */}

        {/* <div className="py-3">
          <h1 className="text-lg font-semibold text-gray-500 mb-3 dark:text-gray-300">Pinned</h1>
          <ChatTile />
        </div> */}
        <div className="py-3">
          <h1 className="text-lg font-semibold text-gray-500 mb-3 dark:text-gray-300">All Chats</h1>
          {myConversations?.map((convo) => (
            <ChatTile key={convo._id} conversation={convo}  />
          ))}
        </div>
      </div>
    </div>
  )
}

