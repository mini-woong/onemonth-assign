import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  nickname: string;
  avatar: string;
};

interface UserStore {
  user: User | null;
  setUser: (data: User | null) => void;
  clearData: () => void;
}
export const useUserStore = create(persist<UserStore>(
  (set) => ({
    user: null,
    setUser: (data: User | null) => set({ user: data }),
    clearData: () => set({ user: null }) // Implement clearData method
  }),
  {
    name: "UserStore",
    //@ts-ignore
    partialize: (state) => ({
      user: state.user
    }),
  }
));