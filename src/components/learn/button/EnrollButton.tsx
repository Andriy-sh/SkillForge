"use client";

import { upsertEnrollment } from "@/lib/actions/enrollment/upsertEnrollmets";
import { useUserStore } from "@/lib/store/userStore";
import { useRouter } from "next/navigation";

export default function EnrollButton({ courseId }: { courseId: string }) {
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
    <button
      onClick={handleSumbit}
      className="bg-[#5533ff] text-white p-3 rounded-sm cursor-pointer"
    >
      Start
    </button>
  );
}
