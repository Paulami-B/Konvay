import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "firebase/auth";

export interface AuthState {
    currentUser?: User;
    setCurrentUser: (currentUser?: User) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            currentUser: undefined,
            setCurrentUser: (currentUser) => set({ currentUser }),
        }),
        {
            name: "current-user", // Key for localStorage
            storage: createJSONStorage(() => localStorage), // Store data in localStorage
        }
    )
);