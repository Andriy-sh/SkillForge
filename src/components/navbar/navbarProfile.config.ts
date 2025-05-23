import { Settings, Shield, UserIcon, Users } from "lucide-react";

export const navbarProfileConfig = [
  {
    label: "Profile",
    href: "/profile",
    icon: UserIcon,
  },
  {
    label: "Friends",
    href: "/friends",
    icon: Users,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    label: "Admin",
    href: "/admin",
    icon: Shield,
  },
];
