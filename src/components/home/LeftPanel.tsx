import { ListFilter, LogOut, MessageSquareDiff, Search, User } from 'lucide-react';
import React from 'react'
import ThemeSwitch from '@/components/home/ThemeSwitch';
import { Input } from '@/components/ui/input';
import Conversations from '@/components/home/Conversations';
import { conversations } from '@/DummyData/db';

export default function LeftPanel() {
    
    return (
        <div className='w-1/4 border-gray-600 border-r'>
            <div className='sticky top-0 bg-left-panel z-10'>
                {/*Header*/}
                <div className='flex justify-between bg-orange-primary dark:bg-dark-gray-primary p-3 items-center'>
                    <User size={24} />
                    <div className='flex items-center gap-3'>
                        <MessageSquareDiff size={20} /> {/*TODO: This line will be replaced with UserListDialog*/}
                        <ThemeSwitch />
                        <LogOut size={20} className='cursor-pointer' />
                    </div>
                </div>
                <div className='p-3 flex items-center'>
                    {/*Search*/}
                    <div className='relative h-10 mx-3 flex-1'>
                        <Search size={18} className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10' />
                        <Input type='text' placeholder='Search or start a new chat...' 
                        className='pl-10 py-2 text-sm w-full rounded shadow-sm bg-gray-primary focus-visible:ring-transparent' />
                    </div>
                    <ListFilter className='cursor-pointer' />
                </div>
            </div>
            <div className='my-3 flex flex-col gap-0 max-h-[80%] overflow-auto'>
                {conversations?.map((conversation) => (
					<Conversations key={conversation._id} conversation={conversation} />
				))}
                {conversations.length===0 && (
                    <>
                        <p className='text-center text-gray-500 text-sm mt-3'>
                            No conversations yet
                        </p>
                        <p className='text-center text-gray-500 text-sm mt-3'>
                            We understand you're an introvert, but you've got to start somewhere
                        </p>
                    </>
                )}
            </div>
        </div>
    )
}
