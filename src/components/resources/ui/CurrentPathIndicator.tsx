"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="text-sm text-gray-500 space-x-1">
      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;

        return (
          <span key={href}>
            <span className="mx-1 ">/</span>
            {isLast ? (
              <span className="text-gray-900 font-medium text-lg">
                {decodeURIComponent(segment)}
              </span>
            ) : (
              <Link
                href={href}
                className="hover:underline text-blue-600 text-lg"
              >
                {decodeURIComponent(segment)}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
