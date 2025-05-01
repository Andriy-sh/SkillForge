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
      className="flex w-52 text-center items-center gap-2 px-2 py-2 cursor-pointer rounded-md bg-white text-black shadow-md hover:shadow-lg"
    >
      <Github size={20} />
      {text}
    </button>
  );
};
