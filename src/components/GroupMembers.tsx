"use client"

import { useQuery } from 'convex/react'
import React from 'react'
import { api } from '../../convex/_generated/api'
import { useAuthStore } from '@/utils/store/authStore'
import { useConversationStore } from '@/utils/store/chatStore'

export default function GroupMembers() {
    const { currentUser } = useAuthStore();
    const { selectedConversation } = useConversationStore();
    const groupMembers = useQuery(api.users.getGroupMembers, {uid: currentUser!.uid, conversationId: selectedConversation!._id})
  return (
    <ul className='w-full max-h-56 overflow-y-auto pr-2'>
        {groupMembers?.map((user) => (
            <li key={user._id} className='my-3 w-full'>
                <div className="py-1 px-2 rounded my-1 w-full items-center hover:bg-orange-200 hover:dark:bg-marigold">
                    <div className='flex gap-5 items-center'>
                        <img src={user.image} alt='user'
                        className='w-12 h-12 rounded-full dark:border-2 dark:border-orange-700' />
                        <div className='dark:text-gray-100'>
                            <p className='text-sm font-bold'>{user.name}</p>
                        </div>
                        {user._id==selectedConversation?.admin && (
                            <p className='text-gray-400 text-sm italic'>(Admin)</p>
                        )}
                    </div>
                </div>
            </li>
        ))}
    </ul>
  )
}
