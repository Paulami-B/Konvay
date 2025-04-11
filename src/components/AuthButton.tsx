import React from "react"

type AuthButtonProps = {
    label: string,
    handleSubmit: React.MouseEventHandler<HTMLButtonElement>
}

export default function AuthButton({label, handleSubmit}: AuthButtonProps) {
    return (
        <button className=" w-full my-1 p-2 bg-gradient-to-r 
        hover:bg-gradient-to-l from-yellow-400 via-amber-600 to-orange-600
        rounded-lg lg:text-xl font-bold cursor-pointer text-white dark:text-gray-800"
        onClick={handleSubmit}>
                {label}
        </button>
    )
}