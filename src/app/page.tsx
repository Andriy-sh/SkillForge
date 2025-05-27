import Link from "next/link";

export default async function Page() {
  return (
    <div className="flex flex-col justify-center items-center h-[93vh] bg-background  ">
      <h1 className="text-5xl font-bold mb-4 text-center">
        Welcome to SkillForge
      </h1>
      <p className="text-lg text-center max-w-2xl mb-8">
        Empower your skills and unlock your potential with our cutting-edge
        platform. Learn, grow, and achieve your goals with SkillForge.
      </p>

      <Link
        href={"/signup"}
        className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-gray-100"
      >
        Get Started
      </Link>
    </div>
  );
}
