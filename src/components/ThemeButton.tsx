"use client"

import { useState } from 'react'
import { FiSun } from 'react-icons/fi';
import { BsMoonStars } from 'react-icons/bs';

export default function ThemeButton() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    
    return (
        <button 
        className="rounded-lg w-fit h-fit flex justify-center p-2 ml-3 md:my-8 cursor-pointer hover:bg-orange-300 hover:text-white text-black text-2xl" 
        onClick={() => setTheme(theme=='light' ? 'dark' : 'light')}>
            {theme=="light" ? (
                <BsMoonStars strokeWidth={0.4} />
            ) : (
                <FiSun strokeWidth={2.5} />
            )}
        </button>
    )
}