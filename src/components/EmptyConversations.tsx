import React from 'react'

export default function EmptyConversations() {
    return (
        <div className="w-full h-full flex justify-center items-center font-caveat bg-[#FFFCF8] dark:bg-gray-800">
            <div>
                <img src="/EmptyChat1.png" className="h-48 items-center my-12 block dark:hidden" />
                <img src="/EmptyChat2.png" className="h-48 items-center my-12 hidden dark:block" />
                <p className="py-6 text-3xl dark:text-orange-50">Go on, make the first move—<br/>good things await 💬</p>
            </div>
        </div>
    )
}
