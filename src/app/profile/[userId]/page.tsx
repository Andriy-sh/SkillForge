import { getUserById } from "@/lib/actions/user/user";
import Profile from "@/components/profile/Profile";
import React from "react";
import { redirect } from "next/navigation";
import Services from "@/components/profile/Services";
import { auth } from "../../../../auth";

type Params = Promise<{ userId: string }>;

export default async function page({ params }: { params: Params }) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const { userId } = await params;
  const user = await getUserById(userId);
  return (
    <div className="flex flex-col ">
      {user && (
        <div className="grid grid-cols-[1fr_3fr] p-8">
          <Profile user={user} />
          <Services />
        </div>
      )}
    </div>
  );
}
