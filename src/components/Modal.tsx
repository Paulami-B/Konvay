import React from 'react'
import { ImCross } from 'react-icons/im'
import Contacts from './Contacts';

export default function Modal({setShowModal}: {setShowModal: React.Dispatch<React.SetStateAction<boolean>>}) {
    return (
        <div className='fixed inset-0 bg-gray-400/80 flex items-center justify-center'>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl min-w-96 w-fit p-6 relative">
                <div className='flex justify-between mb-4 items-center'>
                    <Contacts />
                    <ImCross size={12} className="absolute top-5 right-5 text-gray-500 dark:text-gray-100 hover:text-red-600 cursor-pointer"
                    onClick={() => setShowModal(false)} />
                </div>
            </div>
        </div>
    )
}
