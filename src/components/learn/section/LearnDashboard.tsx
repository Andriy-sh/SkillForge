import { getEnrollments } from "@/lib/actions/enrollment/getEnrollments";
import React from "react";
import { auth } from "../../../../auth";
import LearnDashboardRouter from "./LearnDashboardRouter";
import { Enrollment } from "@/types/enrollmets";

export default async function LearnDashboard() {
  const session = await auth();
  const enrollment: Enrollment[] = await getEnrollments(session?.user.id);

  return (
    <div>
      <LearnDashboardRouter enrollment={enrollment} />
    </div>
  );
}
