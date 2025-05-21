import Link from "next/link";
import { navbarConfig } from "./navbar.config";

import NavItemWithDropdown from "./NavItemWithDropdown";
import Image from "next/image";
import Notification from "./Notification";
import NavBarProfile from "./NavBarProfile";
import { auth } from "../../../auth";
import { navbarAuthConfig } from "./navbarAuth.config";
import { getUserByEmail, getUserById } from "@/lib/actions/user/getUser";
import { getNotification } from "@/lib/actions/notification/getNotification";
import { User } from "@/schemas/User/User";

export default async function NavBar() {
  const session = await auth();

  const email = session?.user?.email;

  const user = email ? await getUserByEmail(email) : null;
  const filteredNavbarConfig = session
    ? navbarConfig.filter(
        (link) => link.href !== "/signup" && link.href !== "/login"
      )
    : navbarConfig;
  const notifications = await getNotification(user?.id || "");

  const sendersIds = notifications.map((n) => n.senderId).filter(Boolean);

  const senders = sendersIds.length
    ? ((
        await Promise.all(sendersIds.map((id) => getUserById(id as string)))
      ).filter(Boolean) as User[])
    : [];
  return (
    <header className="flex h-[9vh] sticky top-0 justify-around items-center bg-background z-50 ">
      <div className="flex flex-row items-center px-4 w-full  justify-around ">
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
          {filteredNavbarConfig.map((link, index) =>
            link.dropdown === true ? (
              <NavItemWithDropdown key={index} link={link} />
            ) : (
              <Link
                key={index}
                href={link.href}
                className="text-lg font-semibold text-gray-700 hover:text-blue-500 transition-colors duration-200"
              >
                {link.label}
              </Link>
            )
          )}
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
      <div className="absolute w-full border-b-1 border-slate-600 bottom-0 "></div>
    </header>
  );
}
