import { users } from '@/dummydata/users';
import React, { useState } from 'react'
import { HiOutlineMinusCircle } from 'react-icons/hi'
import { IoMdAddCircleOutline } from 'react-icons/io'


export default function Contacts() {
    const [list, setList] = useState<number[]>([]);
  return (
    <div className='min-w-96 max-h-120 overflow-auto'>
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Users</h2>
        <div className='my-4 dark:text-gray-100 dark:hover:text-black'>
            {list.length>1 && (
                <div>
                    <div className='flex gap-5 items-center'>
                        <img src='https://avatar.iran.liara.run/public/45' alt='user' className='h-15 w-15 rounded-full' />
                        <button className='outline-4 outline-amber-300 p-2 text-sm font-bold hover:bg-amber-300 rounded cursor-pointer'>Upload image</button>
                    </div>
                    <input className='w-full my-2 outline-2 outline-black dark:outline-gray-200 py-1 px-3 rounded' placeholder='Enter Group Name...' />
                </div>
            )}
            <ul>
                {users.map((user) => (
                    <li key={user.id} className='my-3'>
                        <div className={`py-1 px-2 rounded flex justify-between gap-3 my-1 w-full items-center ${list.includes(user.id)? "bg-orange-200 dark:bg-marigold" : "bg-transparent"}`}>
                            <div className='flex gap-3 items-center'>
                                <img src={user.imageURL} alt='user'
                                className='w-12 h-12 rounded-full dark:border-2 dark:border-orange-700' />
                                <div className='dark:text-gray-100'>
                                    <p className='text-sm font-bold'>{user.name}</p>
                                </div>
                            </div>
                            {list.includes(user.id) ? (
                                <HiOutlineMinusCircle size={20} strokeWidth={3} className='cursor-pointer hover:text-orange-500 dark:text-black'
                                onClick={() => setList(prev => prev.filter(id => id !== user.id))} />
                            ) : (
                                <IoMdAddCircleOutline size={20} strokeWidth={10} className='cursor-pointer hover:text-orange-500 dark:text-orange-300'
                                onClick={() => setList(prev => [...prev, user.id])} />
                            )}
                        </div>
                    </li>
                ))}
            </ul>
            <div className='flex justify-end my-4 dark:text-gray-100 dark:hover:text-black'>
                    {list.length>1 ? (
                    <button className='text-sm outline-4 outline-orange-300 cursor-pointer px-3 py-2 rounded hover:bg-orange-300 font-bold'>Create Group</button>
                ) : (
                    <button className='text-sm outline-4 outline-orange-300 cursor-pointer px-3 py-2 rounded hover:bg-orange-300 font-bold'>Start Chat</button>
                )}
            
            </div>
        </div>
    </div>
  )
}
