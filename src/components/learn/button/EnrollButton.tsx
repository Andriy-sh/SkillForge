"use client";

import { upsertEnrollment } from "@/lib/actions/enrollment/upsertEnrollmets";
import { useUserStore } from "@/lib/store/userStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EnrollButton({
  courseId,
  enrollment,
  clasName,
  moduleName,
  unitName,
}: {
  courseId: string;
  enrollment: boolean;
  clasName?: string;
  moduleName?: string;
  unitName?: string;
}) {
  const userId = useUserStore((state) => state.user?.id);
  const router = useRouter();
  const handleSumbit = async () => {
    try {
      const data = new FormData();
      data.append("courseId", courseId);
      data.append("userId", userId || "");
      await upsertEnrollment(data);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {enrollment ? (
        <Link
          href={`/learn/module/${moduleName}/unit/${unitName}`}
          className={`${clasName} bg-[#5533ff]  text-center text-white p-3 rounded-sm `}
        >
          Resume course
        </Link>
      ) : (
        <button
          onClick={handleSumbit}
          className={`${clasName} bg-[#5533ff]  text-center text-white p-3 rounded-sm `}
        >
          Start
        </button>
      )}
    </>
  );
}
