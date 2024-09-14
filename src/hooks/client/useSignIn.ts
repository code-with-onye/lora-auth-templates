import Cookies from "js-cookie";
import { z } from "zod";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { SignUserSchema } from "@/schema/user";

interface UserState {
  user: z.infer<typeof SignUserSchema> | null;
  isAuthenticated: boolean;
  login: (userData: z.infer<typeof SignUserSchema>) => void;
  logout: () => void;
  getUser: () => z.infer<typeof SignUserSchema> | null;
}

const cookieStorage = {
  getItem: (name: string): string | null => {
    if (typeof window !== "undefined") {
      return Cookies.get(name) || null;
    }
    return null;
  },
  setItem: (name: string, value: string) => {
    if (typeof window !== "undefined") {
      Cookies.set(name, value, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
    }
  },
  removeItem: (name: string) => {
    if (typeof window !== "undefined") {
      Cookies.remove(name);
    }
  },
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (userData) => set({ user: userData, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      getUser: () => get().user,
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => cookieStorage),
    }
  )
);
