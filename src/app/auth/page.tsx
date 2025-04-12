"use client"

import AuthButton from '@/components/AuthButton';
import InputBox from '@/components/InputBox';
import PasswordInputBox from '@/components/PasswordInputBox';
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { getErrorMessage, signinSchema, signupSchema } from './authSchema';
import { signin, signinWithGoogle, signup } from '@/firebase/functions';
import { FcGoogle } from 'react-icons/fc';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useRouter } from 'next/navigation';

type AuthProps = {
    name?: string,
    email?: string,
    password?: string,
    confirmPassword?: string
}

export default function Auth() {
    const createNewUser = useMutation(api.users.createUser);
    const googleLogin = useMutation(api.users.googleUser);
    const setOnline = useMutation(api.users.setUserOnline);
    const router = useRouter();

    const [values, setValues] = useState<AuthProps>({})

    const [activeTab, setActiveTab] = useState<'signup' | 'signin'>('signup');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const checkValidation = () => {
        const response = activeTab==='signin' ? signinSchema.safeParse(values) : signupSchema.safeParse(values);
        if(!response.success){
            toast.error(getErrorMessage(response.error.issues[0]));
            return false;
        }
        else if(activeTab==='signup' && values.password!==values.confirmPassword){
            toast.error('Password & Confirm Password must be the same');
            return false;
        }
        return true;
    }

    const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if(checkValidation()){
            const { email, password, name } = values;
            if(activeTab=='signin'){
                if(email && password){
                    try {
                        await signin({ email, password });
                        await setOnline({ uid: "some random uid", isOnline: true });
                        router.push('/chat');
                    } catch (error: any) {
                        toast.error(error.message)
                    }
                }
            }
            else{
                if(email && password && name){
                    try {
                        const res = await signup({ email, password, name });
                        //@ts-ignore
                        await createNewUser({ uid: res.uid, email: res.email, name: name, image: res.photoURL });
                        router.push('/chat');
                    } catch (error: any) {
                        toast.error(error.message)
                    }
                }
            }
        }
    } 

    const handleSigninWithGoogle = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const res = await signinWithGoogle();
        //@ts-ignore
        await googleLogin({ uid: res.uid, email: res.email, name: res.name, image: res.photoURL });
        router.push('/chat');
    }

    return (
        <div>
            <div className='w-full'>
            <div className="my-4 flex justify-center">
            <button onClick={handleSigninWithGoogle} 
            className='flex gap-3 border-2 border-orange-500 hover:border-yellow-400 px-5 py-2 rounded-full font-semibold hover:font-bold cursor-pointer dark:text-orange-600'>
                <FcGoogle size={25} />
                Continue with Google
            </button>
          </div>
            {activeTab=='signup' ?
                <p className='font-caveat text-3xl dark:text-orange-300'>Hey, there!! Please sign up to get started</p>
            :
                <p className='font-caveat text-3xl dark:text-orange-300'>Welcome back!! Please sign in to continue</p>
            }
            </div>
            <div className='flex w-full mt-16 md:mt-4 dark:text-orange-400'>
                <button className={`w-1/2 p-2 cursor-pointer hover:font-bold border-b-4
                ${activeTab=='signup' ? "font-bold border-orange-400": "font-semibold border-gray-200 dark:border-gray-500"}`} 
                onClick={() => setActiveTab('signup')}>
                    Sign up
                </button>
                <button className={`w-1/2 p-2 cursor-pointer hover:font-bold border-b-4 
                ${activeTab=='signin' ? "font-bold border-orange-400": "font-semibold border-gray-200 dark:border-gray-500"}`} 
                onClick={() => setActiveTab('signin')}>
                    Sign In
                </button>
            </div>
            <div className='w-full h-full my-9'>
                {activeTab=='signup' && (
                    <InputBox name="name" type="text" label="Name" handleChange={handleChange} />
                )}
                <InputBox name="email" type="email" label="Email" handleChange = {handleChange} />
                <PasswordInputBox name="password" label="Password" handleChange = {handleChange} />
                {activeTab=='signup' && (
                    <PasswordInputBox name="confirmPassword" label="Confirm Password" handleChange={handleChange} />
                )}
                <AuthButton label={activeTab=='signin' ? 'Sign In' : 'Sign Up'} handleSubmit={handleSubmit} />
                <ToastContainer />
            </div>
        </div>
    )
}
