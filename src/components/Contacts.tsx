"use client"

import { useMutation, useQuery } from 'convex/react';
import React, { useCallback, useState } from 'react'
import { HiOutlineMinusCircle } from 'react-icons/hi'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';
import { useAuthStore } from '@/utils/store/authStore';
import { Conversation, useConversationStore } from '@/utils/store/chatStore';

export default function Contacts({onSuccess}: {onSuccess: () => void}) {
    const [selectedUsers, setSelectedUsers] = useState<Id<"users">[]>([]);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imageURL, setImageURL] = useState<string>('https://avatar.iran.liara.run/public/45');
    const [groupName, setGroupName] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);
    const createConversation = useMutation(api.conversations.createConversation);

    const { currentUser } = useAuthStore();
    const { setSelectedConversation } = useConversationStore();
    const me = useQuery(api.users.getMe, currentUser ? {uid: currentUser.uid} : "skip");
    const users = useQuery(api.users.getUsers, currentUser ? {uid: currentUser.uid} : "skip");

    const generateUploadURL = useMutation(api.conversations.generateUploadURL);

    const handleInputChangeFile = (input: HTMLInputElement) => {
        return async(e: Event) => {
          e.preventDefault();
          const file = input.files?.item(0);
          if(file){
            setSelectedImage(file);
            setImageURL(URL.createObjectURL(file));
          }
        }
    }
    
    const handleImageChange = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
    
        const handlerfn = handleInputChangeFile(input);
    
        input.addEventListener("change", handlerfn);
        input.click();
    }, [handleInputChangeFile]);

    const handleCreateConversations = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if(selectedUsers.length===0){
            return;
        }
        setIsLoading(true);
        let conversation: Conversation | null;
        try {
            if(selectedUsers.length==1){
                conversation = await createConversation({
                                    uid: currentUser!.uid,
                                    participants: [...selectedUsers, me?._id!],
                                    isGroup: false
                                });
            }
            else{
                const postURL = await generateUploadURL();
                const result = await fetch(postURL, {
                    method: "POST",
					headers: { "Content-Type": selectedImage?.type! },
					body: selectedImage,
                });

                const { storageId } = await result.json();

				conversation = await createConversation({
                    uid: currentUser!.uid,
					participants: [...selectedUsers, me?._id!],
					isGroup: true,
					admin: me?._id!,
					groupName,
					groupImage: storageId,
				});
            }
            setSelectedConversation(conversation);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
			setSelectedUsers([]);
			setGroupName("");
			setSelectedImage(null);
            setImageURL("");
            onSuccess();
        }
    }

    return (
        <div className='min-w-96 max-h-120'>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Users</h2>
            <p className='text-sm'>Start a new chat</p>
            <div className='mt-4 dark:text-gray-100 dark:hover:text-black'>
                {selectedUsers.length>1 && (
                    <div className='top-3 sticky'>
                        <div className='flex gap-5 items-center'>
                            <img src={imageURL} alt='user' className='h-25 w-25 rounded-full' />
                            <button className='outline-4 outline-amber-300 p-2 text-sm font-bold hover:bg-amber-300 rounded cursor-pointer'
                            onClick={handleImageChange}>
                                Upload image
                            </button>
                        </div>
                        <input className='w-full my-2 outline-2 outline-black dark:outline-gray-200 py-1 px-3 rounded' 
                        placeholder='Enter Group Name...' onChange={(e) => setGroupName(e.target.value)} />
                    </div>
                )}
                <ul className='max-h-56 overflow-y-auto pr-2'>
                    {users?.map((user) => (
                        <li key={user._id} className='my-3'>
                            <div className={`py-1 px-2 rounded flex justify-between gap-3 my-1 w-full items-center ${selectedUsers.includes(user._id)? "bg-orange-200 dark:bg-marigold" : "bg-transparent"}`}>
                                <div className='flex gap-3 items-center'>
                                    <img src={user.image} alt='user'
                                    className='w-12 h-12 rounded-full dark:border-2 dark:border-orange-700' />
                                    <div className='dark:text-gray-100'>
                                        <p className='text-sm font-bold'>{user.name}</p>
                                    </div>
                                </div>
                                {selectedUsers.includes(user._id) ? (
                                    <HiOutlineMinusCircle size={20} strokeWidth={3} className='cursor-pointer hover:text-orange-500 dark:text-black'
                                    onClick={() => setSelectedUsers(prev => prev.filter(id => id !== user._id))} />
                                ) : (
                                    <IoMdAddCircleOutline size={20} strokeWidth={10} className='cursor-pointer hover:text-orange-500 dark:text-orange-300'
                                    onClick={() => setSelectedUsers(prev => [...prev, user._id])} />
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
                <div className='bottom-0 w-full sticky flex justify-end mt-4 bg-white dark:bg-gray-800 dark:text-gray-100 dark:hover:text-black'>
                    <button disabled={(!groupName && selectedUsers.length>1) || selectedUsers.length==0 || isLoading}
                    className="outline-4 outline-orange-300 cursor-pointer px-3 py-2 rounded hover:bg-orange-300"
                    onClick={handleCreateConversations}>
                        {isLoading ? (
                            <div className='w-5 h-5 border-t-4 border-b-4 rounded-full animate-spin text-orange-300' />
                        ) : (
                            "Start Chatting"
                        )
                    }
                    </button>
                </div>
            </div>
        </div>
    )
}
