import React from 'react';

export default function ChatPlaceholder() {
  return (
		<div className='w-3/4 bg-gray-secondary flex flex-col items-center justify-center py-10'>
			<div className='flex flex-col items-center w-full justify-center py-10 gap-4'>
      <p className='w-1/2 text-center text-black text-xl'>Get Started with Konvay</p>
				<img src={"/welcome.png"} alt='Welcome' className='h-120 mt-5' />
				<p className='w-1/2 text-center text-black text-xl'>
        Seamless chats, anytime, anywhere
				</p>
			</div>
		</div>
	);
};
