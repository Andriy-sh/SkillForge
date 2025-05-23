import { create } from "zustand";
import { GlobalUser } from "@/schemas/User/User";

type UserStore = {
  user: GlobalUser | null;
  setUser: (user: GlobalUser) => void;
  updateUserId: (id: string) => void;
  updateUserEmail: (email: string) => void;
  updateUserName: (name: string) => void;
  updateUserBio: (bio: string) => void;
  updateUserCity: (city: string) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateUserId: (id) =>
    set((state) => ({
      user: state.user ? { ...state.user, id } : null,
    })),
  updateUserEmail: (email) =>
    set((state) => ({
      user: state.user ? { ...state.user, email } : null,
    })),
  updateUserName: (name) =>
    set((state) => ({
      user: state.user ? { ...state.user, name } : null,
    })),
  updateUserBio: (bio) =>
    set((state) => ({
      user: state.user ? { ...state.user, bio } : null,
    })),
  updateUserCity: (city) =>
    set((state) => ({
      user: state.user ? { ...state.user, city } : null,
    })),
}));
