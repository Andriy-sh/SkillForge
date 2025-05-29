import { getEnrollments } from "@/lib/actions/enrollment/getEnrollments";
import { auth } from "../../../auth";
import { Enrollment } from "@/types/enrollmets";

export default async function Services() {
  const session = await auth();
  const enrollment: Enrollment[] = await getEnrollments(session?.user.id);
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

      <section>
        <h2 className="text-xl font-bold mb-4">Latest Courses</h2>
        {enrollment.map((item) => (
          <div
            key={item.course.id}
            className="p-4 bg-white shadow-md rounded-md flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-gray-500">Course</p>
              <h3 className="text-lg font-semibold">{item.course.name}</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{item.progress}%</span>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600"
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
              <button className="text-blue-600 hover:underline">{">"}</button>
            </div>
          </div>
        ))}
      </section>

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
