import Link from "next/link";
import { navbarConfig } from "./navbar.config";

import NavItemWithDropdown from "./NavItemWithDropdown";
import Image from "next/image";
import Notification from "./Notification";
import NavBarProfile from "./NavBarProfile";
import { auth } from "../../../auth";
import { getUser } from "@/lib/actions/user/user";

export default async function NavBar() {
  const session = await auth();

  const email = session?.user?.email;

  const user = email ? await getUser(email) : null;

  const filteredNavbarConfig = session
    ? navbarConfig.filter(
        (link) => link.href !== "/signup" && link.href !== "/login"
      )
    : navbarConfig;

  return (
    <header className="flex h-[7vh] sticky top-0 justify-around items-center bg-background z-50">
      <div className="flex flex-row items-center space-x-4 px-4">
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
      {session && user && (
        <div className="flex items-center gap-4 flex-row">
          <Notification />
          <NavBarProfile userId={user.id} />
        </div>
      )}
    </header>
  );
}
