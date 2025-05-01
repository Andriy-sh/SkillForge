import { SignOut } from "@/components/auth/SignOutButton";
import { auth } from "../../auth";

export default async function Page() {
  const session = await auth();
  return (
    <div>
      {session?.user?.email}
      <SignOut />{" "}
    </div>
  );
}
