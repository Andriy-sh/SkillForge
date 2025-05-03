import React from "react";
import LearnDashboard from "./LearnDashboard";

export default function Learn({ course }: { course: string[] }) {
  return <LearnDashboard course={course} />;
}
