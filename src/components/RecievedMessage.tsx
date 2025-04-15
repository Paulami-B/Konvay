"use client"

import { IMessage } from "@/utils/store/chatStore";
import DateIndicator from "./DateIndicator";
import Image from "next/image";
import ReactPlayer from "react-player";
import Modal from "./Modal";
import { useState } from "react";

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
    return (
        <>
            <DateIndicator message={message} previousMessage={previousMessage} />
            <div className={`relative items-start dark:text-gray-200 rounded w-fit min-w-48 max-w-3/4 lg:max-w-2/3 px-3 py-2 m-3
            ${message.messageType=='text' ? "bg-gray-100 dark:bg-gray-700" : "border-4 border-gray-100 dark:border-gray-700 bg-transparent"}`}>
                {isGroup && (
                    <p className="text-sm font-bold my-1 text-orange-700">{message.sender?.name}</p>
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
                <Modal setShowModal={setOpen}>
                    <Image src={message.content} alt="image" height={400} width={400} />
                </Modal>
            )}
        </>
    )
}