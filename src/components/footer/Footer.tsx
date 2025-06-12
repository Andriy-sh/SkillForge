"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { footerLinks } from "./footer.config";

const FooterSection = ({
  title,
  links,
}: {
  title: string;
  links: Array<{ href: string; text: string }>;
}) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-lg">{title}</h3>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index}>
          <Link href={link.href} className="hover:text-blue-600">
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default function Footer() {
  const pathname = usePathname();

  if (
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname.startsWith("/chat")
  ) {
    return null;
  }

  return (
    <footer className="w-full  text-gray-800 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
        {Object.entries(footerLinks).map(([key, section]) => (
          <FooterSection
            key={key}
            title={section.title}
            links={section.links}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex space-x-4">
            <Link
              href="/privacy"
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              Terms of Use
            </Link>
          </div>
          <div className="text-sm text-gray-600">
            © 2025 SkillForge. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
