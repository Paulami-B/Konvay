"use client"

import { formatDate } from "@/utils/functions/dateTime";
import { Conversation, useConversationStore } from "@/utils/store/chatStore";
import { FaRegImage } from "react-icons/fa6";
import { MdVideoLibrary } from "react-icons/md";

export default function ChatTile({conversation} : {conversation: Conversation}) {
    const imageURL = conversation.groupImage || conversation.image;
    const isOnline = !conversation.isGroup && conversation.isOnline
    const conversationName = conversation.groupName || conversation.name;
    const lastMessage = conversation.lastMessage;
	const lastMessageType = lastMessage?.messageType;
    
    const { setSelectedConversation, selectedConversation } = useConversationStore();
	const activeBgClass = selectedConversation?._id == conversation._id;

    return (
        <button
            className={`w-full grid grid-cols-6 gap-3 items-center p-3 rounded-lg cursor-pointer my-2
            ${activeBgClass ? "bg-orange-200 dark:bg-gray-500" : "bg-white dark:bg-gray-700/50 hover:bg-orange-300/30 dark:hover:bg-gray-600/80"}`}
            onClick={() => setSelectedConversation(conversation)}>
            <div className="col-span-1">
                <div className="h-fit w-fit relative">
                    <img src={imageURL} className="w-12 h-12 md:w-8 md:h-8 lg:w-12 lg:h-12 rounded-full" />
                    {isOnline && (
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                    )}
                </div>
            </div>
            <div className="col-span-4 md:col-span-4 dark:text-orange-50 text-start w-full">
                <div className="font-bold">{conversationName}</div>
                <div className="text-sm">
                    {!lastMessage && "Say Hi!"}
                    {lastMessageType === "text" ? (
                        lastMessage?.content && lastMessage?.content.length > 30 ? (
                            <span>{lastMessage?.content.slice(0, 30)}...</span>
                        ) : (
                            <span>{lastMessage?.content}</span>
                        )
                    ) : null}
                    {lastMessageType === "image" && (
                        <div className="flex gap-2">
                            <FaRegImage size={16} />
                            <span className="text-sm">Konvay</span>
                        </div>
                    )}
                    {lastMessageType === "video" && (
                        <div className="flex gap-2">
                            <MdVideoLibrary size={16} />
                            <span className="text-sm">Konvay</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="col-span-1 text-sm">
                <div className="dark:text-gray-300 text-xs lg:text-xs">
                    {formatDate(lastMessage?._creationTime || conversation._creationTime)}
                </div>
                {/* TODO: Add read functionality */}
                {/* <div className="h-fit w-fit my-3 text-xs px-1.5 py-0.5 bg-marigold rounded-full font-bold text-white">1</div> */}
            </div>
        </button>
    )
}
