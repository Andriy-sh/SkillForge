"use client";

import Link from "next/link";
import Image from "next/image";
import NavItemWithDropdown from "./NavItemWithDropdown";
import Notification from "./Notification";
import NavBarProfile from "./NavBarProfile";
import { navbarAuthConfig } from "./navbarAuth.config";
import { User } from "@/schemas/User/User";
import { Session } from "next-auth";
import { NotificationSchema } from "@/schemas/notification/notification";
import { usePathname } from "next/navigation";
import NavItemLink from "./NavItemLink";
import { ResourceType } from "@prisma/client";
type p = {
  name: string;
  type: ResourceType;
};
export default function NavBarClient({
  session,
  user,
  notifications,
  senders,
  courses,
}: {
  session: Session | null;
  user: User | null;
  notifications: NotificationSchema[];
  senders: User[];
  courses: p[];
}) {
  const pathname = usePathname();
  const isCoursePage = pathname.startsWith("/enrolled/courses/");
  const languageResources = courses.filter(
    (course) => course.type === "LANGUAGE"
  );
  return (
    <header
      className={`flex h-[9vh] sticky top-0 justify-around items-center bg-background ${
        isCoursePage ? "bg-white" : "bg-background"
      } z-50`}
    >
      <div className="flex flex-row items-center px-4 w-full justify-around">
        <div className="flex space-x-4">
          <Link href={"/"} className="flex items-center">
            <Image
              className="hover:scale-105 transition-transform duration-200"
              src={"/skillforge_black_logo.png"}
              alt="skillforge_logo"
              width={150}
              height={150}
            />
          </Link>
          <NavItemLink href="/learn" label="My Home" />
          <NavItemWithDropdown
            courses={courses}
            name="Courses"
            type="Courses"
          />
          <NavItemWithDropdown
            courses={languageResources}
            name="Resourses"
            type="Resources"
          />
        </div>
        <div className="flex space-x-4">
          {session && user ? (
            <div className="flex items-center gap-4 flex-row">
              <Notification notifications={notifications} senders={senders} />
              <NavBarProfile />
            </div>
          ) : (
            navbarAuthConfig.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-lg font-semibold text-gray-700 hover:text-blue-500 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))
          )}
        </div>
      </div>
      <div className="absolute w-full border-b-1 border-slate-600 bottom-0"></div>
    </header>
  );
}
