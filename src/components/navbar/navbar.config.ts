import { NavbarConfig } from "@/types/navbar";

export const navbarConfig: NavbarConfig[] = [
  {
    label: "My Home",
    href: "/learn",
  },
  {
    label: "Courses",
    href: "/courses",
    dropdown: true,
    dropdownItems: [
      { label: "Web Development", href: "/courses/web-development" },
      { label: "Data Science", href: "/courses/data-science" },
      { label: "Mobile Apps", href: "/courses/mobile-apps" },
      { label: "DevOps", href: "/courses/devops" },
      { label: "UI/UX Design", href: "/courses/ui-ux" },
      { label: "Cybersecurity", href: "/courses/cybersecurity" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    dropdown: true,
    dropdownItems: [
      { label: "JavaScript Guide", href: "/resources/js-guide" },
      { label: "TypeScript Handbook", href: "/resources/ts-handbook" },
      { label: "Git & GitHub Tips", href: "/resources/git-tips" },
      { label: "Frontend Best Practices", href: "/resources/frontend" },
      { label: "Backend Architecture", href: "/resources/backend" },
      { label: "AI & ML Basics", href: "/resources/ai-ml" },
    ],
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "About",
    href: "/about",
    dropdown: true,
    dropdownItems: [
      { label: "Our Mission", href: "/about/mission" },
      { label: "Team", href: "/about/team" },
      { label: "FAQ", href: "/about/faq" },
    ],
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    dropdown: true,
    dropdownItems: [
      { label: "My Learning", href: "/dashboard" },
      { label: "Progress", href: "/dashboard/progress" },
      { label: "Settings", href: "/dashboard/settings" },
    ],
  },
  {
    label: "Login",
    href: "/login",
  },
  {
    label: "Sign Up",
    href: "/signup",
  },
];
