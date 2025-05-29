import { getUserById } from "@/lib/actions/user/getUser";
import Profile from "@/components/profile/section/Profile";
import React from "react";
import { redirect } from "next/navigation";
import Services from "@/components/profile/section/services/Services";
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
    <div className="flex flex-col max-w-[1350px] mx-auto">
      {user && (
        <div className="grid grid-cols-[1fr_4fr] gap-10 p-8">
          <Profile user={user} session={session} />
          <Services userId={userId} />
        </div>
      )}
    </div>
  );
}
