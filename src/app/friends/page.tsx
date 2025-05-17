import React from "react";
import { auth } from "../../../auth";
import { prisma } from "../../../prisma";
import Link from "next/link";

interface User {
  id: string;
  name: string | null;
  email: string;
}

export default async function page() {
  const session = await auth();
  if (!session?.user) {
    return <div>You are not logged in</div>;
  }
  const users: User[] = await prisma.user.findMany({});
  return (
    <div>
      {users.map(({ id, name, email }) => (
        <Link
          href={`/profile/${id}`}
          key={id}
          className="flex flex-col p-4 border-b border-gray-900 "
        >
          <h3>{name ?? "No name"}</h3>
          <p>{email}</p>
        </Link>
      ))}
    </div>
  );
}
