"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Separator } from '@radix-ui/react-dropdown-menu'
import React from 'react'
import { Button } from '../ui/button'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function ThemeSwitch() {
    const { setTheme } = useTheme();
    return (
        <DropdownMenu>
			<DropdownMenuTrigger asChild className='bg-transparent relative'>
				<Button variant='outline' size='icon' className='cursor-pointer'>
					<SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
					<MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
					<span className='sr-only'>Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='bg-gray-primary dark:bg-dark-gray-primary z-10 p-3 rounded border'>
				<DropdownMenuItem onClick={() => setTheme("light")} className='cursor-pointer hover:font-bold focus:outline-none focus:ring-0 focus-visible:ring-0'>Light</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")} className='border-t my-1 cursor-pointer hover:font-bold focus:outline-none focus:ring-0 focus-visible:ring-0'>Dark</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")} className='border-t mt-1 cursor-pointer hover:font-bold focus:outline-none focus:ring-0 focus-visible:ring-0'>System</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
    )
}
