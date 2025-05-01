"use client";

import { signIn } from "next-auth/react";
import { FC } from "react";
import { FcGoogle } from "react-icons/fc";

interface GoogleLoginProps {
  text?: string;
}

export const GoogleLogin: FC<GoogleLoginProps> = ({ text }) => {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="flex border-2 text-center h-20 w-20 justify-center cursor-pointer items-center gap-2 px-2 py-2 rounded-md bg-white text-black shadow-md hover:shadow-lg"
    >
      <FcGoogle size={40} />
      {text}
    </button>
  );
};
