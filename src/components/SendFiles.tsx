"use client"

import React, { useEffect, useState } from 'react'
import { FaRegImage } from 'react-icons/fa6';
import { MdVideoLibrary } from 'react-icons/md';
import { RiCloseLine } from "react-icons/ri";
import { AiFillFileAdd } from 'react-icons/ai';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useConversationStore } from '@/utils/store/chatStore';
import { useAuthStore } from '@/utils/store/authStore';
import { toast } from 'react-toastify';

type SendFileProps = {
    // setFile: React.Dispatch<React.SetStateAction<File | undefined>>,
    // setShowOptions: React.Dispatch<React.SetStateAction<boolean>>
    sendFile: boolean,
    startLoading: () => void,
    stopLoading: () => void
}

export default function SendFiles({sendFile, startLoading, stopLoading}: SendFileProps) {
    const [file, setFile] = useState<File>();
    const [fileName, setFileName] = useState<string>();
    const [type, setType] = useState<'image' | 'video'>();
    const [fileURL, setFileURL] = useState<string>()
    const generateUploadUrl = useMutation(api.conversations.generateUploadURL);
	const sendImage = useMutation(api.messages.sendImage);
	const sendVideo = useMutation(api.messages.sendVideo);
    const { selectedConversation } = useConversationStore();
    const { currentUser } = useAuthStore();

    const handleClose = () => {
        setType(undefined);
        setFileURL(undefined);
        setFile(undefined);
        setFileName(undefined);
    }

    const handleInputChange = (input: HTMLInputElement) => {
        return (e: Event) => {
            const inputFile = input.files?.item(0);
            if (inputFile) {
                setFile(inputFile);
                setFileName(inputFile.name);
                setFileURL(URL.createObjectURL(inputFile))
                console.log(inputFile);
            }
        }
    }

    const handleUpload = ({fileType}: {fileType: 'image' | 'video'}) => {
        setType(fileType);
        setFileURL(undefined);
        setFile(undefined);
        setFileName(undefined);

        const input = document.createElement("input");
        input.type = 'file';

        if (fileType === 'image') input.accept = 'image/*';
        if (fileType === 'video') input.accept = 'video/*';

        const handler = handleInputChange(input);
        input.addEventListener('change', handler);
        input.click();

        return () => {
            input.removeEventListener('change', handler);
        }
    };

    useEffect(() => {
        const handleSendFile = async () => {
            startLoading();
            try {
                const postUrl = await generateUploadUrl();
                const result = await fetch(postUrl, {
                    method: "POST",
                    headers: { "Content-Type": file!.type },
                    body: file,
                });
    
                const { storageId } = await result.json();
                
                if(type=='image'){
                    await sendImage({
                        uid: currentUser!.uid,
                        conversation: selectedConversation!._id,
                        imageId: storageId
                    });
                }
                else if(type=='video'){
                    await sendVideo({
                        uid: currentUser!.uid,
                        conversation: selectedConversation!._id,
                        videoId: storageId
                    });
                }
                setFile(undefined);
                setFileURL(undefined);
                setFileName(undefined);
                setType(undefined);
            } catch (err) {
                toast.error("Failed to send image");
            } finally {
                stopLoading();
            }
        };
        if(sendFile && file){
            handleSendFile();
        }
    }, [sendFile]);

    return (
        <>
            <div className='absolute bottom-16 left-3 flex flex-col items-center gap-4 z-10'>
                <div className='p-4 rounded-full bg-orange-200'>
                    <FaRegImage className='cursor-pointer' size={30} onClick={() => handleUpload({fileType: 'image'})} />
                </div>
                <div className='p-4 rounded-full bg-orange-300'>
                    <MdVideoLibrary className='cursor-pointer' size={30} onClick={() => handleUpload({fileType: 'video'})} />
                </div>
            </div>
            {fileName && (
                <div className="absolute bottom-15 left-20 w-[90%] bg-white dark:bg-black h-fit border-4 border-orange-200 dark:border-orange-800 rounded-lg px-3 py-4 my-2 items-center">
                    <div className='flex gap-2 items-center'>
                        {type=='image' ? (
                            <img src={fileURL} className='h-24' />
                        ) : (
                            <video src={fileURL} className='h-24' />
                        )}
                        <div className="italic text-gray-700 dark:text-gray-200">{fileName}</div>
                    </div>
                    <RiCloseLine className="absolute right-1 top-1 text-lg text-gray-500 dark:text-gray-200 hover:text-black dark:hover:text-orange-500" 
                    onClick={handleClose} />
                </div>
            )}
        </>
    )
}
