import Link from "next/link";
import React from "react";
type Props = {
  name: string;
  href: string;
};

export default function ResourceCard({ name, href }: Props) {
  return (
    <Link href={href} className="flex justify-between">
      <div className="group flex h-[150px] w-[320px] p-6   flex-col rounded-md border border-black bg-white shadow-[8px_8px_0px_rgba(0,0,0,0.25)] hover:shadow-[12px_12px_0px_rgba(0,0,0,0.8)] hover:-translate-y-2 hover:-translate-x-2 transition-all duration-300 ease-in-out max-w-sm justify-between">
        <div className="mb-2 p-4">    
          <p className="text-xs uppercase tracking-wide text-gray-500 group-hover:text-sm transition-all duration-300">
            Explore all
          </p>
          <p className="text-xl font-extrabold group-hover:text-3xl transition-all duration-300 transform tracking-tight capitalize text-gray-900 font-display">
            {name}
          </p>
        </div>

        <span className="text-sm justify-end text-gray-600 mt-auto transition-all duration-300 transform group-hover:text-gray-900 group-hover:scale-105 group-hover:-translate-y-3 group-hover:-translate-x-2 flex items-center gap-1">
          <span>Open</span>
          <span className="transition-transform duration-500 group-hover:rotate-360">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
