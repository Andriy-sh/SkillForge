import Link from "next/link";

type Props = {
  href: string;
  label: string;
};

export default function NavItemLink({ href, label }: Props) {
  return (
    <Link
      href={href}
      className="text-lg font-semibold text-gray-700 hover:text-blue-500 transition-colors duration-200"
    >
      {label}
    </Link>
  );
}
