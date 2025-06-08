import React from "react";

type Props = {
  friendId: string;
};

export default function page({ params }: { params: Props }) {
  const { friendId } = params;
  console.log(friendId);
  return <div>asd</div>;
}
