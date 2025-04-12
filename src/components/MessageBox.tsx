"use client"

import { useRef, useState } from 'react'
import { GrEmoji } from 'react-icons/gr'
import { LiaLinkSolid } from 'react-icons/lia'
import { MdSend } from 'react-icons/md'
import useAutosizeTextArea from '@/utils/hooks/autoResize';
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { AiFillFileAdd } from 'react-icons/ai';

export default function MessageBox() {
    const [content, setContent] = useState('');
    const [showEmojis, setShowEmojis] = useState<boolean>(false);
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    useAutosizeTextArea(textAreaRef.current, content);
    
    const handleEmojiClick = (emojiObject: EmojiClickData) => {
        setContent((prevContent) => prevContent+emojiObject.emoji);
    
    };
    return (
        <div className="w-full h-fit flex justify-between items-center gap-3 p-3 border-t border-orange-100 dark:border-orange-900 bg-white dark:bg-gray-800">
            <div className="relative w-full flex items-center bg-orange-50 dark:bg-gray-700/60 p-2 gap-3 rounded-lg">
                <LiaLinkSolid strokeWidth={0.6} className="text-3xl text-orange-400 dark:text-marigold cursor-pointer" onClick={() => setShowOptions(!showOptions)} />
                {showOptions && (
                    <div className='absolute bottom-16 left-3'>
                        <div className='my-6 p-3 rounded-full bg-sky-100'>
                            <AiFillFileAdd className='cursor-pointer' size={35} />
                        </div>
                        <div className='my-6 p-3 rounded-full bg-sky-100'>
                            <AiFillFileAdd className='cursor-pointer' size={35} />
                        </div>
                        <div className='my-6 p-3 rounded-full bg-sky-100'>
                            <AiFillFileAdd className='cursor-pointer' size={35} />
                        </div>
                    </div>
                )}
                <textarea className="outline-none focus:outline-none focus:ring-0 w-full h-fit rounded-lg placeholder-orange-400 dark:placeholder-marigold dark:text-white" 
                placeholder="Message..."
                rows={1} ref={textAreaRef} value={content}
                onChange={(e) => setContent(e.target.value)} />
                <GrEmoji strokeWidth={0.8} className="text-3xl text-orange-400 dark:text-marigold cursor-pointer" onClick={() => setShowEmojis(!showEmojis)} />
                {showEmojis && (
                    <div className='absolute bottom-16 right-3'>
                        //add theme later
                        <EmojiPicker onEmojiClick={handleEmojiClick} className="h-fit top-0 sticky" />
                    </div>
                )}
            </div>
            <button className="h-fit w-fit p-2 bg-orange-300 dark:bg-marigold hover:bg-orange-400 dark:hover:bg-marigold/90 text-white dark:text-black hover:text-black  rounded-lg cursor-pointer">
                <MdSend className="text-3xl" />
            </button>
        </div>
    )
}
