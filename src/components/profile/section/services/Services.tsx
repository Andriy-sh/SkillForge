import { getEnrollments } from "@/lib/actions/enrollment/getEnrollments";
import { Enrollment } from "@/types/enrollmets";
import RecentCourses from "./RecentCourses";

export default async function Services({ userId }: { userId: string }) {
  const enrollment: Enrollment[] = await getEnrollments(userId);
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-bold mb-4">Services</h2>
        <div className="p-4 bg-white shadow-md rounded-md">
          <h3 className="text-lg font-semibold">Peer support</h3>
          <p className="text-gray-600 mb-4">
            Join the SkillForge Community to start connecting with peers!
          </p>
          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50">
            Join community
          </button>
        </div>
      </section>

      <RecentCourses enrollment={enrollment} />

      <section>
        <h2 className="text-xl font-bold mb-4">Latest Certificates</h2>
        <div className="p-4 bg-white shadow-md rounded-md">
          <p className="text-gray-600">
            <span className="font-semibold text-black">Upgrade to Pro</span> to
            begin earning certificates
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Streaks</h2>
        <div className="p-4 bg-white shadow-md rounded-md">
          <p className="text-gray-600">
            <a href="#" className="text-blue-600 hover:underline">
              Set up your weekly targets
            </a>{" "}
            to start earning streaks
          </p>
        </div>
      </section>

      {/* Latest Badges Section */}
      <section>
        <h2 className="text-xl font-bold mb-4">Latest Badges (0)</h2>
        <div className="p-4 bg-white shadow-md rounded-md">
          <p className="text-gray-600">
            Meet your weekly target goal to earn your first badge
          </p>
        </div>
      </section>
    </div>
  );
}
