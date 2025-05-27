import React from "react";

type Props = { languageName: string };

export default function page({ params }: { params: Props }) {
  return <div>{params.languageName}</div>;
}
