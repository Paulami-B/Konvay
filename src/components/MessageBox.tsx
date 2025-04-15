"use client"

import { useEffect, useRef, useState } from 'react'
import { GrEmoji } from 'react-icons/gr'
import { LiaLinkSolid } from 'react-icons/lia'
import { MdSend } from 'react-icons/md'
import useAutosizeTextArea from '@/utils/hooks/autoResize';
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { useAuthStore } from '@/utils/store/authStore'
import { useConversationStore } from '@/utils/store/chatStore'
import { toast, ToastContainer } from 'react-toastify'
import { useTheme } from 'next-themes'
import useComponentVisible from '@/utils/hooks/useComponentVisible'
import SendFiles from './SendFiles'

export default function MessageBox() {
    const { theme } = useTheme();
    const [content, setContent] = useState('');
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const [sendFile, setSendFile] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const sendTextMessage = useMutation(api.messages.sendMessage);
    const { currentUser } = useAuthStore();
    const { selectedConversation } = useConversationStore();
    const  { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
    useAutosizeTextArea(textAreaRef.current, content);
    
    const handleEmojiClick = (emojiObject: EmojiClickData) => {
        setContent((prevContent) => prevContent+emojiObject.emoji);
    };

    const handleSendTextMessage = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if(content.length==0){
            return;
        }
        try {
            await sendTextMessage({uid: currentUser!.uid, content: content, conversationId: selectedConversation!._id});
            setContent('');
        } catch (error: any) {
            toast.error(error.message);
            console.log(error);
        }
    }

    return (
        <div className="w-full h-fit flex justify-between items-center gap-3 p-3 border-t border-orange-100 dark:border-orange-900 bg-white dark:bg-gray-800">
            <div className="relative w-full flex items-center bg-orange-50 dark:bg-gray-700/60 p-2 gap-3 rounded-lg">
                {showOptions && (
                    <SendFiles sendFile={sendFile} setLoading={setLoading} />
                )}
                <LiaLinkSolid strokeWidth={0.6} className="text-3xl text-orange-400 dark:text-marigold cursor-pointer" 
                onClick={() => setShowOptions(!showOptions)} />
                <textarea disabled={showOptions} className="outline-none focus:outline-none focus:ring-0 w-full h-fit rounded-lg placeholder-orange-400 dark:placeholder-marigold dark:text-white" 
                placeholder="Message..."
                rows={1} ref={textAreaRef} value={content}
                onChange={(e) => setContent(e.target.value)} />
                <GrEmoji strokeWidth={0.8} className="text-3xl text-orange-400 dark:text-marigold cursor-pointer" 
                onClick={() => setIsComponentVisible((prev) => !prev)} />
                {isComponentVisible && (
                    <div className='absolute bottom-16 right-3' ref={ref}>
                        <EmojiPicker theme={theme} onEmojiClick={handleEmojiClick} className="h-fit top-0 sticky" />
                    </div>
                )}
            </div>
            <button disabled={loading} className="h-fit w-fit p-2 bg-orange-300 dark:bg-marigold hover:bg-orange-400 dark:hover:bg-marigold/90 text-white dark:text-black hover:text-black  rounded-lg cursor-pointer"
            onClick={(e) => {
                if(showOptions){
                    setSendFile(true);
                }
                else{
                    handleSendTextMessage(e);
                }
            }}>
                <MdSend className="text-3xl" />
            </button>
            <ToastContainer />
        </div>
    )
}
