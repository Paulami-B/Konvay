"use client"

import { FaArrowLeftLong } from "react-icons/fa6";
import { PiVideoCamera } from "react-icons/pi";
import { FiPhone, FiSearch } from "react-icons/fi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useConversationStore } from "@/utils/store/chatStore";

export default function ChatHeader({onClick}: {onClick: () => void}) {
    const { selectedConversation, setSelectedConversation } = useConversationStore();
    return (
        <div className="flex justify-start items-center gap-3 py-3 px-4 w-full bg-orange-50 dark:bg-gray-800 border-b border-orange-100 dark:border-orange-900 h-fit top-0 sticky">
            <FaArrowLeftLong strokeWidth={8} size={25} className="block md:hidden cursor-pointer dark:text-white"
            onClick={() => setSelectedConversation(null)} />
            <div className="h-fit w-fit relative">
                <img src={selectedConversation?.isGroup ? selectedConversation.groupImage : selectedConversation?.image}
                className="w-12 h-12 rounded-full" />
                {!selectedConversation?.isGroup && selectedConversation?.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full" />
                )}
            </div>
            <div className={`dark:text-orange-50 w-full ${selectedConversation?.isGroup ? "cursor-pointer": ""}`}
            onClick={onClick}>
                <div className="font-bold">{selectedConversation?.isGroup? selectedConversation.groupName : selectedConversation?.name}</div>
                <div className="text-gray-500 dark:text-gray-300 text-sm">
                    {selectedConversation?.isGroup ? `${selectedConversation.participants.length} members`
                    : selectedConversation?.isOnline ? "online" : ""}
                </div>
            </div>
            <div className="flex justify-between gap-4 text-gray-600 dark:text-orange-50">
                <div className="flex gap-4 pr-3 border-r">
                    <a href={`/call?type=video&group=${selectedConversation?.isGroup}`} target="_blank">
                        <PiVideoCamera className="text-2xl cursor-pointer" />
                    </a>
                    <a href={`/call?type=audio&group=${selectedConversation?.isGroup}`} target="_blank">
                        <FiPhone className="text-xl cursor-pointer" />
                    </a>
                    <FiSearch className="text-xl cursor-pointer" />
                </div>
                <MdOutlineKeyboardArrowDown className="text-2xl cursor-pointer" />
            </div>
        </div>
    )
}
