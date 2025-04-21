import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {
  Home,
  Film,
  Info,
  Mail,
  LogIn,
  ChevronRight,
  Settings,
  HelpCircle,
  MessageSquare,
} from "lucide-react";

const getIcon = (label: string) => {
  switch (label.toLowerCase()) {
    case "home":
      return <Home className="w-5 h-5" />;
    case "movies":
      return <Film className="w-5 h-5" />;
    case "about":
      return <Info className="w-5 h-5" />;
    case "contact":
      return <Mail className="w-5 h-5" />;
    case "login":
      return <LogIn className="w-5 h-5" />;
    case "contact us":
      return <MessageSquare className="w-5 h-5" />;
    case "help":
      return <HelpCircle className="w-5 h-5" />;
    case "settings":
      return <Settings className="w-5 h-5" />;
    default:
      return <ChevronRight className="w-5 h-5" />;
  }
};

type Props = {
  link: {
    label: string;
    href: string;
    dropdown?: boolean;
    dropdownItems?: {
      label: string;
      href: string;
    }[];
  };
  index: number;
};

export default function NavItemWithDropdown({ link, index }: Props) {
  return (
    <div>
      <NavigationMenu key={index}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex items-center gap-1">
              <span>{link.label}</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid grid-cols-3 gap-4 p-4 w-[600px]">
                {link.dropdownItems?.map((dropdown, index) => (
                  <Link
                    key={index}
                    href={dropdown.href}
                    className="flex items-center gap-2 p-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {getIcon(dropdown.label)}
                    <div>
                      <div className="font-medium">{dropdown.label}</div>
                      <div className="text-xs text-muted-foreground">
                        Click to learn more
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
