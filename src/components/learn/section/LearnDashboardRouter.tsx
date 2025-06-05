"use client";
import { useSearchParams } from "next/navigation";
import DashboardHome from "./Dashboard/Dashboard";
import MyLearning from "./MyLearning/MyLeadning";
import Workspaces from "./Workspaces";
import Projects from "./Projects";
import Events from "./Events";
import { Enrollment } from "@/types/enrollmets";
import { Suspense } from "react";

export default function LearnDashboardRouter({
  enrollment,
}: {
  enrollment: Enrollment[];
}) {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "dashboard";

  const pages = {
    dashboard: (
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardHome enrollment={enrollment} />
      </Suspense>
    ),
    "my-learning": (
      <Suspense fallback={<div>Loading...</div>}>
        <MyLearning />
      </Suspense>
    ),
    events: <Events />,
    projects: <Projects />,
    workspaces: <Workspaces />,
  };

  return pages[page as keyof typeof pages] ?? null;
}
