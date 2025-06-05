"use client";
import { useSearchParams } from "next/navigation";
import DashboardHome from "./Dashboard";
import MyLearning from "./MyLearning/MyLeadning";
import Workspaces from "./Workspaces";
import Projects from "./Projects";
import Events from "./Events";

export default function LearnDashboard() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "dashboard";

  const pages = {
    dashboard: <DashboardHome />,
    "my-learning": <MyLearning />,
    events: <Events />,
    projects: <Projects />,
    workspaces: <Workspaces />,
  };

  return pages[page as keyof typeof pages] ?? null;
}
