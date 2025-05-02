import Link from "next/link";
import React from "react";

export default function SettingsSideBar() {
  const settings = [
    { name: "Profile", href: "/settings/profile" },
    { name: "Account", href: "/settings/account" },
    { name: "Notifications", href: "/settings/notifications" },
    { name: "Preferences", href: "/settings/preferences" },
    { name: "Security", href: "/settings/security" },
    { name: "Billing", href: "/settings/billing" },
  ];
  return (
    <div className="w-1/4 border-r p-4">
      {settings.map((link) => (
        <div key={link.name} className="mb-2">
          <Link href={link.href} className="text-black hover:font-bold">
            {link.name}
          </Link>
        </div>
      ))}
    </div>
  );
}
