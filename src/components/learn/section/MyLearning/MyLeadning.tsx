"use client";
import { Enrollment } from "@/types/enrollmets";
import ProgressChoice from "./ProgressChoice";

export default function MyLearning({
  enrollment,
}: {
  enrollment: Enrollment[];
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold px-4 ">My learning</h1>

      <ProgressChoice enrollment={enrollment} />
    </div>
  );
}
