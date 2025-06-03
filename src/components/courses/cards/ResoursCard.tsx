import Link from "next/link";
import React from "react";
type Props = {
  name: string;
};

export default function ResoursCard({ name }: Props) {
  return (
    <Link href={"/"} className="flex   justify-between">
      <div className="flex h-[180px] w-[300px] p-6 flex-col rounded-sm border border-black bg-white shadow-[8px_8px_0px_rgba(0,0,0,0.3)] hover:shadow-[8px_8px_0px_rgba(0,0,0,0.9)] hover:-translate-y-2 hover:-translate-x-2 transition-all max-w-sm justify-between duration-300">
        <p>{name}</p>
      </div>
    </Link>
  );
}
