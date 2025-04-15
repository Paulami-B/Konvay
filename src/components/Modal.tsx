import React from 'react'
import { ImCross } from 'react-icons/im'

type ModalProps = {
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({onClose, children}: ModalProps) {
    return (
        <div className='w-screen h-screen top-0 fixed inset-0 bg-gray-400/80 flex items-center justify-center z-50'>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl min-w-64 w-fit p-6 relative">
                <div className='flex justify-between mb-4 items-center'>
                    <div>
                        <ImCross size={12} className="absolute top-5 right-5 text-gray-500 dark:text-gray-100 hover:text-red-600 cursor-pointer"
                        onClick={onClose} />
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
