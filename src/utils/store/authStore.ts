import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Id } from "../../../convex/_generated/dataModel";

type AuthStateType = {
    _id: Id<"users">
    uid: string;
    name: string;
    email: string;
    image: string;
    isOnline: boolean;
}

export interface AuthState {
    currentUser: AuthStateType | null;
    setCurrentUser: (currentUser: AuthStateType | null) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            currentUser: null,
            setCurrentUser: (currentUser) => set({ currentUser }),
        }),
        {
            name: "current-user", // Key for localStorage
            storage: createJSONStorage(() => localStorage), // Store data in localStorage
        }
    )
);