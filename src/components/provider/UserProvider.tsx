"use client";

import { useEffect } from "react";
import { useUserStore } from "@/lib/store/userStore";
import { User } from "@/schemas/User/User";
type UserProviderProps = {
  user: User | null;
  children: React.ReactNode;
};
export function UserProvider({ user, children }: UserProviderProps) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  return <>{children}</>;
}
