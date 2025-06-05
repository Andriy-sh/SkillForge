import RecentCourses from "@/components/profile/section/services/RecentCourses";
import { Enrollment } from "@/types/enrollmets";

export default function DashboardHome({
  enrollment,
}: {
  enrollment: Enrollment[];
}) {
  const recentEnrollment = [enrollment[0]];
  return (
    <div>
      <h1 className="text-2xl font-semibold px-4 ">Keep learning</h1>
      <RecentCourses enrollment={recentEnrollment} topicButton={false} />
    </div>
  );
}
