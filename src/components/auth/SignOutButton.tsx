"use client";
import { signOut } from "next-auth/react";
import React, { FC } from "react";

interface SignOutProps {
  text: string;
  сlassName?: string;
}

export const SignOut: FC<SignOutProps> = ({
  text,
  сlassName,
}: SignOutProps) => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className={`${сlassName} px-4 py-2 hover:text-[#3a10e5] text-black rounded transition-colors cursor-pointer`}
    >
      {text}
    </button>
  );
};
