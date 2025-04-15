"use client"

import { IMessage, useConversationStore } from "@/utils/store/chatStore";
import DateIndicator from "./DateIndicator";
import Image from "next/image";
import ReactPlayer from "react-player";
import Modal from "./Modal";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuthStore } from "@/utils/store/authStore";
import { Id } from "../../convex/_generated/dataModel";

export type MessageProps = {
    previousMessage?: IMessage,
    message: IMessage
    isGroup?: boolean
}

export default function RecievedMessage({previousMessage, message, isGroup}: MessageProps) {
    const date = new Date(message._creationTime);
	const hour = date.getHours().toString().padStart(2, "0");
	const minute = date.getMinutes().toString().padStart(2, "0");
	const time = `${hour}:${minute}`;
    const [open, setOpen] = useState<boolean>(false);
    const { currentUser } = useAuthStore();
    const { setSelectedConversation } = useConversationStore();
    const createConversation = useMutation(api.conversations.createConversation);

    const handleCreateConversation = async(e: React.MouseEvent<HTMLLabelElement, MouseEvent>, userId?: Id<"users">) => {
        e.preventDefault();
        if(!userId){
            return;
        }
        try {
            const conversation = await createConversation({
                                    uid: currentUser!.uid,
                                    participants: [userId, currentUser!._id],
                                    isGroup: false
                                });
            setSelectedConversation(conversation);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <DateIndicator message={message} previousMessage={previousMessage} />
            <div className={`relative items-start dark:text-gray-200 rounded w-fit min-w-48 max-w-3/4 lg:max-w-2/3 px-3 py-2 m-3
            ${message.messageType=='text' ? "bg-gray-100 dark:bg-gray-700" : "border-4 border-gray-100 dark:border-gray-700 bg-transparent"}`}>
                {isGroup && (
                    <div>
                        <label className="text-sm font-bold my-1 text-orange-700 hover:text-orange-600 cursor-pointer"
                        onClick={(e) => handleCreateConversation(e, message.sender?._id)}>
                            {message.sender?.name}
                        </label>
                    </div>
                )}   
                {message.messageType=='image' && 
                    <Image src={message.content} alt="image" height={200} width={200} className='cursor-pointer object-cover' 
                    onClick={() => setOpen(true)} />
                }
                {message.messageType=='video' && 
                    <ReactPlayer url={message.content} height={200} width={200} controls={true} light={true} />
                }
                {message.messageType=='text' && 
                    <>
                        {message.content}
                    </>
                }
                <div className="absolute text-xs text-black dark:text-white bottom-0 right-1 p-1">{time}</div>
            </div>
            {open && (
                <Modal onClose={() => setOpen(false)}>
                    <Image src={message.content} alt="image" height={400} width={400} />
                </Modal>
            )}
        </>
    )
}