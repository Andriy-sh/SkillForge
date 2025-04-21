import { NavbarConfig } from "@/types/navbar";

export const navbarConfig: NavbarConfig[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Movies",
    href: "/movies",
  },
  {
    label: "About",
    href: "/about",
    dropdown: true,
    dropdownItems: [
      {
        label: "About Us",
        href: "/about",
      },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
    dropdown: true,
    dropdownItems: [
      {
        label: "Contact Us",
        href: "/contact",
      },
      {
        label: "Contact Us",
        href: "/contact",
      },
      {
        label: "Contact Us",
        href: "/contact",
      },
      {
        label: "Contact Us",
        href: "/contact",
      },
      {
        label: "Contact Us",
        href: "/contact",
      },
      {
        label: "Contact Us",
        href: "/contact",
      },
      {
        label: "Contact Us",
        href: "/contact",
      },
      {
        label: "Contact Us",
        href: "/contact",
      },
      {
        label: "Contact Us",
        href: "/contact",
      },
      {
        label: "Contact Us",
        href: "/contact",
      },
    ],
  },
  {
    label: "Log in",
    href: "/login",
  },
  {
    label: "Sign up",
    href: "/signup",
  },
];
