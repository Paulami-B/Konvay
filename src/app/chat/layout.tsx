"use client"

import HorizontalSideBar from '@/components/HorizontalSideBar'
import VerticalSideBar from '@/components/VerticalSideBar'
import { useConversationStore } from '@/utils/store/chatStore'

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const { selectedConversation } = useConversationStore();
  return (
    <div className='h-screen w-screen md:grid md:grid-cols-12'>
      <div className='hidden md:block md:col-span-1'>
        <VerticalSideBar />
      </div>
      <div className='md:col-span-11'>
        {children}
      </div>
      {!selectedConversation && (
        <HorizontalSideBar />
      )}
    </div>
  )
}
