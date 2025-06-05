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
      <RecentCourses enrollment={recentEnrollment} />
    </div>
  );
}
