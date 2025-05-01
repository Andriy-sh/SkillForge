import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import React, { FC } from "react";

interface GithubLoginProps {
  text?: string;
}

export const GithubLogin: FC<GithubLoginProps> = ({ text }) => {
  return (
    <button
      onClick={() => signIn("github", { callbackUrl: "/" })}
      className="flex border-2 text-center h-20 w-20 justify-center items-center gap-2 px-2 py-2 cursor-pointer rounded-md bg-white text-black shadow-md hover:shadow-lg"
    >
      <Github size={40} />
      {text}
    </button>
  );
};
