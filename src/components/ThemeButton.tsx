"use client"

import { FiSun } from 'react-icons/fi';
import { BsMoonStars } from 'react-icons/bs';
import { useTheme } from 'next-themes';

export default function ThemeButton() {
    const { theme, setTheme } = useTheme();
    
    return (
        <button 
        className="rounded-lg w-fit h-fit flex justify-center p-2 ml-3 md:my-8 cursor-pointer hover:bg-orange-300 hover:text-white dark:hover:bg-marigold dark:hover:text-black text-black dark:text-orange-50 text-2xl" 
        onClick={() => setTheme(theme=='light'? 'dark' : 'light')}>
            {theme=="light" ? (
                <BsMoonStars strokeWidth={0.4} />
            ) : (
                <FiSun strokeWidth={2.5} />
            )}
        </button>
    )
}