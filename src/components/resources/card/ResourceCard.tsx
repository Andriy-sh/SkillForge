import React from "react";
type Props = {
  title: string;
  type: string;
  description: string;
};

export default function ResourceCard({ info }: { info: Props[] }) {
  return (
    <div className="flex gap-5">
      {info.map((i: Props) => (
        <div
          key={i.title}
          className="w-[300px] rounded-sm p-3 h-[270px] flex gap-4 flex-col   border-1 border-black hover:shadow-[-9px_9px_0px]  hover:-translate-y-2 hover:translate-x-2 transition-all duration-300"
        >
          <div className="">
            <h1 className="text-lg font-bold">{i.title}</h1>
            <span>{i.type}</span>
          </div>
          <p className=" overflow-hidden text-ellipsis whitespace-wrap">
            {i.description}
          </p>
        </div>
      ))}
    </div>
  );
}
