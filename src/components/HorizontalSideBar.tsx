"use client"

import { useState } from "react";
import ThemeButton from "./ThemeButton";
import { AiOutlineMessage } from "react-icons/ai";
import { useAuthStore } from "@/utils/store/authStore";
import { api } from "../../convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { logout } from "@/firebase/functions";
import { toast, ToastContainer } from "react-toastify";

export default function HorizontalSideBar() {
    const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
    const router = useRouter();
    const setOffline = useMutation(api.users.setUserOffline);
    const { currentUser } = useAuthStore();
    
    const handleLogout = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try {
            await logout();
            await setOffline({uid: currentUser!.uid, isOnline: false});
            router.refresh();
        } catch (error) {
            toast.error("Error while signing out");
        }
    }

    return (
        <div className="block md:hidden w-screen bottom-0 sticky bg-orange-50 dark:bg-[#601B00] dark:shadow-orange-200 p-2">
            <div className="w-full flex justify-between px-4 items-center">
                <div className="flex gap-10 items-center">
                    <img src="./Logo.png" className="w-12" />
                    <AiOutlineMessage className="rounded-lg w-fit h-fit flex justify-center p-2 text-black dark:text-orange-50 text-2xl 
                    hover:bg-orange-300 hover:text-white dark:hover:bg-orange-700 dark:hover:text-black" />
                </div>
                <div className="flex gap-8 items-center">
                    <ThemeButton />
                    <button className="rounded-lg w-fit h-fit flex justify-center" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                        <img src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
                        className="w-12 h-12 rounded-full" />
                    </button>
                </div>
            </div>
            {showProfileMenu && (
                <div className="absolute bottom-15 right-4 z-10 p-3 rounded-lg shadow-lg bg-orange-100 outline outline-orange-300">
                    <button className="w-full px-7 cursor-pointer hover:font-bold" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}
            <ToastContainer />
        </div>
    )
}
