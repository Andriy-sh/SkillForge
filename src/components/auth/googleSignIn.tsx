"use client";

import { signIn } from "next-auth/react";
import { FC } from "react";
import { FcGoogle } from "react-icons/fc";

interface GoogleSignInProps {
  children?: React.ReactNode;
  text?: string;
}

export const GoogleSignIn: FC<GoogleSignInProps> = ({
  text = "Sign in with Google",
}) => {
  return (
    <button
      onClick={() => signIn("google")}
      className="flex items-center gap-2 px-4 py-2 rounded-md bg-white text-black shadow-md hover:shadow-lg"
    >
      <FcGoogle size={20} />
      {text}
    </button>
  );
};
