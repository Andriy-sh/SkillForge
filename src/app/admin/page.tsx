import AddingResourses from "@/components/admin/LinkResourses";
// import { auth } from "../../../auth";
// import { getUserByEmail } from "@/lib/actions/user/getUser";
// import { redirect } from "next/navigation";
import React from "react";

export default async function AdminPage() {
  // const session = await auth();
  // const email = session?.user?.email;

  // if (!email) {
  //   redirect("/");
  // }

  // const user = await getUserByEmail(email);

  // if (!user || user.role !== "ADMIN") {
  //   redirect("/");
  // }

  return (
    <div>
      <AddingResourses />
    </div>
  );
}
