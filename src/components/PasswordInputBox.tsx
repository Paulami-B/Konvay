import { useState } from "react"
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi"

type PasswordInputBoxProps = {
    name: string,
    label: string,
    required?: boolean,
    handleChange: React.ChangeEventHandler<HTMLInputElement>
}

export default function PasswordInputBox({name, label, required, handleChange}: PasswordInputBoxProps) {
    const [type, setType] = useState<'text' | 'password'>('password');
    return (
        <div className="py-2">
            <div className="relative">
                <input name={name} type={type} required={required ? required : true}
                className="block pb-1 px-2 pt-2 pr-15 text-sm w-full bg-transparent rounded-lg border-1 border-gray-400 appearance-none 
                focus:outline-none focus:ring-0 focus:border-orange-500 peer dark:text-gray-200" placeholder=" "
                onChange={handleChange} />
                <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 dark:text-gray-200 bg-white dark:bg-gray-800 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-orange-500 
                peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 
                peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                {label}
                </label>
                {type=='password' ? (
                    <button className="absolute top-0 right-5 cursor-pointer h-full flex justify-center items-center"
                    onClick={() => setType('text')}>
                        <HiOutlineEye size={25} className="text-gray-400 hover:text-orange-500" />
                    </button>
                ) : (
                    <button className="absolute top-0 right-5 cursor-pointer h-full flex justify-center items-center"
                onClick={() => setType('password')}>
                    <HiOutlineEyeOff size={25} className="text-orange-500" />
                </button>
                )}
            </div>
        </div>
    )
}