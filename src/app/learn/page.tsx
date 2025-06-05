import Learn from "@/components/learn/Learn";
import LearnSideBar from "@/components/learn/sidebars/LearnSideBar";
import React from "react";

export default function page() {
  return (
    <div className="grid grid-cols-[1fr_3fr] min-h-screen  max-w-[1300px] mx-auto gap-4">
      <LearnSideBar />
      <Learn />
    </div>
  );
}
