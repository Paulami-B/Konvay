"use client"

import ThemeButton from "@/components/ThemeButton";
import { logout } from "@/firebase/functions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import { api } from "../../convex/_generated/api";
import { useMutation } from "convex/react";
import { useAuthStore } from "@/utils/store/authStore";

export default function VerticalSideBar() {
    const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
    const router = useRouter();
    const setOffline = useMutation(api.users.setUserOffline);
    const { currentUser } = useAuthStore();

    const handleLogout = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try {
            await logout();
            await setOffline({uid: currentUser?.uid, isOnline: false});
            router.refresh();
        } catch (error) {
            toast.error("Error while signing out");
        }
    }

    return (
        <div className="top-0 sticky h-screen w-full bg-orange-50 dark:bg-gray-800 border-r border-orange-100 dark:border-orange-900 shadow-lg">
            <div className="flex justify-center items-center relative h-full">
                <div className="absolute top-0 ml-3">
                    <div className="flex justify-center items-center my-5">
                        <img src="./Logo.png" className="w-16" />
                    </div>
                    <AiOutlineMessage strokeWidth={5} className="cursor-pointer rounded-lg w-fit h-fit flex justify-center p-2 ml-1 my-3 text-black dark:text-orange-50 text-2xl
                    hover:bg-orange-300 hover:text-white dark:hover:bg-marigold dark:hover:text-black" />
                </div>
                {showProfileMenu && (
                    <div className="absolute bottom-20 left-4 z-10 p-3 rounded-lg shadow-lg bg-orange-100 outline outline-orange-300">
                        <button className="w-full px-7 cursor-pointer hover:font-bold" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                )}
                <div className="absolute bottom-0">
                    <ThemeButton />
                    <button className="rounded-lg w-fit h-fit flex justify-center p-2 my-8 cursor-pointer" 
                    onClick={() => setShowProfileMenu(!showProfileMenu)}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s" alt="user"
                        className="w-12 h-12 rounded-full" />
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}