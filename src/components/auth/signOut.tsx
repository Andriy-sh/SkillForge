"use client";
import { signOut } from "next-auth/react";
import React, { FC } from "react";

interface SignOutProps {
  text?: string;
}

export const SignOut: FC<SignOutProps> = ({ text = "Sign Out" }) => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
    >
      {text}
    </button>
  );
};
