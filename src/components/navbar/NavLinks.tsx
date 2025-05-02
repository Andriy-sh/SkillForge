import Link from "next/link";
import { navbarConfig } from "./navbar.config";

import NavItemWithDropdown from "./NavItemWithDropdown";
import Image from "next/image";
import Notification from "./Notification";
import NavBarProfile from "./NavBarProfile";

export default function NavLinks() {
  return (
    <div className="flex  flex-row gap-4 items-center justify-center">
      <Link href={"/"} className="flex items-center gap-2">
        <Image
          className="hover:scale-105 transition-transform duration-200"
          src={"/skillforge_black_logo.png"}
          alt="skillforge_logo"
          width={150}
          height={150}
        />
      </Link>
      {navbarConfig.map((link, index) =>
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
      <div className="flex items-center gap-4 flex-row ml-10">
        <Notification />
        <NavBarProfile />
      </div>
    </div>
  );
}
