"use client"

import { useMutation, useQuery } from 'convex/react'
import React, { useState } from 'react'
import { api } from '../../convex/_generated/api'
import { useAuthStore } from '@/utils/store/authStore'
import { useConversationStore } from '@/utils/store/chatStore'
import { HiOutlineMinusCircle } from 'react-icons/hi'
import { FaUndo } from "react-icons/fa";
import { Id } from '../../convex/_generated/dataModel'

export default function GroupMembers() {
    const [selectedUsers, setSelectedUsers] = useState<Id<"users">[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { currentUser } = useAuthStore();
    const { selectedConversation } = useConversationStore();
    const groupMembers = useQuery(api.users.getGroupMembers, {uid: currentUser!.uid, conversationId: selectedConversation!._id});
    const kickMembers = useMutation(api.conversations.kickUser);

    const handleKickMembers = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if(selectedUsers.length==0){
            return;
        }
        setIsLoading(true);
        try {
            await kickMembers({
                uid: currentUser!.uid,
                userIds: selectedUsers,
                conversationId: selectedConversation!._id
            })
        } catch (error) {
            console.log(error);
        } finally{
            setIsLoading(false);
			setSelectedUsers([]);
        }
    }

    return (
        <div className='min-w-72 w-full'>
            <h2 className='top-2 sticky font-bold text-lg'>Members</h2>
            <ul className='w-full max-h-56 overflow-y-auto pr-2'>
                {groupMembers?.map((user) => (
                    <li key={user._id} className='my-3 w-full'>
                        <div className={`py-1 px-2 rounded my-1 w-full items-center ${selectedUsers.includes(user._id)? "bg-orange-200 dark:bg-marigold" : "bg-transparent"}`}>
                            <div className='flex justify-between items-center'>
                                <div className="flex gap-5 items-center">
                                    <div className='h-fit w-fit relative'>
                                        <img src={user.image} className="w-12 h-12 md:w-8 md:h-8 lg:w-12 lg:h-12 rounded-full" />
                                        {user.isOnline && (
                                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                                        )}
                                    </div>
                                    <div className='dark:text-gray-100'>
                                        <p className='text-sm font-bold'>{user.name}</p>
                                        {user._id==selectedConversation?.admin && (
                                            <p className='text-gray-400 text-sm italic'>(Admin)</p>
                                        )}
                                    </div>
                                </div>
                                {currentUser?._id==selectedConversation?.admin && currentUser?._id!=user._id && (
                                    selectedUsers.includes(user._id) ? (
                                        <FaUndo size={15} strokeWidth={10} className='cursor-pointer hover:text-orange-500 dark:text-orange-300'
                                        onClick={() => setSelectedUsers(prev => prev.filter(id => id !== user._id))} />
                                    ) : (
                                        <HiOutlineMinusCircle size={20} strokeWidth={3} className='cursor-pointer hover:text-orange-500 dark:text-black'
                                        onClick={() => setSelectedUsers(prev => [...prev, user._id])} />
                                    )
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {currentUser?._id==selectedConversation?.admin && (
                <div className="bottom-0 sticky w-full flex justify-end">
                    <button disabled={selectedUsers.length>0 && isLoading}
                    className="outline-4 outline-orange-300 cursor-pointer px-3 py-2 rounded hover:bg-orange-300 text-sm font-bold"
                    onClick={(handleKickMembers)}>
                        Kick Members
                    </button>
                </div>
            )}
        </div>
    )
}
