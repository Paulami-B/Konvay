import React from 'react'
import ChatPlaceholder from '@/components/home/ChatPlaceholder';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; 
import { Video, X } from 'lucide-react';
import MessageContainer from '@/components/home/MessageContainer';
import MessageInput from '@/components/home/MessageInput';
import GroupMembersDialog from './GroupMembersDialog';

export default function RightPanel() {
  const selectedConversation = null;
	// if (!selectedConversation) return <ChatPlaceholder />;

	const conversationName = "John Doe";
	const isGroup = true;
	return (
		<div className='w-full flex flex-col'>
			<div className='w-full sticky top-0 z-50'>
				{/* Header */}
				<div className='flex justify-between bg-gray-primary dark:bg-dark-gray-primary p-3'>
					<div className='flex gap-3 items-center'>
						<Avatar>
							<AvatarImage src={"/placeholder.png"} className='object-cover' />
							<AvatarFallback>
								<div className='animate-pulse bg-gray-tertiary w-full h-full rounded-full' />
							</AvatarFallback>
						</Avatar>
						<div className='flex flex-col'>
							<p>{conversationName}</p>
							{isGroup && <GroupMembersDialog />}
						</div>
					</div>

					<div className='flex items-center gap-7 mr-5'>
						<a href='/video-call' target='_blank'>
							<Video size={23} />
						</a>
						<X size={16} className='cursor-pointer' />
					</div>
				</div>
			</div>
			{/* CHAT MESSAGES */}
			<MessageContainer />

			{/* INPUT */}
			<MessageInput />
		</div>
	);
};
