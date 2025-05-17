import { create } from "zustand";
import { User } from "@/schemas/User/User";

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  updateUserId: (id: string) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateUserId: (id) =>
    set((state) => ({
      user: state.user ? { ...state.user, id } : null,
    })),
}));
