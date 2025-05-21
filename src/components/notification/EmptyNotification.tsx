import { LucideIcon } from "lucide-react";

interface EmptyNotificationProps {
  Icon?: LucideIcon;
  title?: string;
  subtitle?: string;
}

export default function EmptyNotification({
  Icon,
  title = "No new notifications",
  subtitle = "You're all caught up!",
}: EmptyNotificationProps) {
  return (
    <div className="flex flex-col items-center justify-center py-6 text-gray-800 space-y-2 text-center">
      {Icon && <Icon className="w-12 h-12 text-gray-600 animate-pulse" />}
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-gray-600">{subtitle}</p>
    </div>
  );
}
