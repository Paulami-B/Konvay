"use client"

import React from 'react'
import { signinWithGoogle } from './authService'
import { FcGoogle } from 'react-icons/fc'

export default function layout({ children }: { children: React.ReactNode }) {

  return (
    <div className='md:grid md:grid-cols-2'>
      <div className='md:col-span-1 py-8 px-8 flex justify-center items-center'>
        <div>
          {children}
        </div>
      </div>
      <div className='hidden md:col-span-1 bg-orange-50 dark:bg-orange-800 h-screen w-full md:flex justify-center p-8'>
        <div>
          <img src='/AuthImage.png' width={450}/>
          <p className='font-caveat text-center text-4xl my-8'>Talk. Share. Stay in touch.</p>
        </div>
      </div>
    </div>
  )
}

