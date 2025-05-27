import React from "react";

export default function Page({ params }: { params: { course: string } }) {
  return <div>{params.course}</div>;
}
