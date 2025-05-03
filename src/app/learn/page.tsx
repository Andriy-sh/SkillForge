import Learn from "@/components/learn/Learn";
import React from "react";

export default function page() {
  const course = ["typescript", "javascript", "python"];
  return <Learn course={course} />;
}
