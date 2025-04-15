"use client"

import Image from "next/image";
import DateIndicator from "./DateIndicator";
import { MessageProps } from "./RecievedMessage";
import ReactPlayer from "react-player";
import { useState } from "react";
import Modal from "./Modal";

export default function SentMessage({previousMessage, message}: MessageProps) {
  const date = new Date(message._creationTime);
	const hour = date.getHours().toString().padStart(2, "0");
	const minute = date.getMinutes().toString().padStart(2, "0");
	const time = `${hour}:${minute}`;
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
    <DateIndicator message={message} previousMessage={previousMessage} />
    <div className="w-full flex justify-end items-end">
      <div className={`relative dark:text-gray-700 rounded w-fit min-w-48 max-w-3/4 lg:max-w-2/3 px-3 py-3 m-3
      ${message.messageType=='text' ? "bg-orange-200 dark:bg-marigold": "border-4 border-orange-200 dark:border-marigold bg-transparent"}`}>
        {message.messageType=='image' && 
          <Image src={message.content} alt="image" height={200} width={200} className='cursor-pointer object-cover' onClick={() => setOpen(true)} />
        }
        {message.messageType=='video' && 
          <ReactPlayer url={message.content} width={200} height={200} controls={true} light={true} />
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
    </div>
  </>
  )
}
