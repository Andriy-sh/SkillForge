import Link from "next/link";
import { navbarConfig } from "./navbar.config";

import NavItemWithDropdown from "./NavItemWithDropdown";

export default function NavLinks() {
  return (
    <div className="flex flex-row gap-4 items-center justify-center">
      {navbarConfig.map((link, index) =>
        link.dropdown === true ? (
          <NavItemWithDropdown key={index} link={link} />
        ) : (
          <Link key={index} href={link.href}>
            {link.label}
          </Link>
        )
      )}
    </div>
  );
}
