import ProfileSettings from "@/components/settings/profile/ProfileSettings";
import { auth } from "../../../../auth";
import { getUserByEmail } from "@/lib/actions/user/getUser";
import { User } from "@/schemas/User/User";

export default async function Page() {
  const session = await auth();
  if (!session?.user) {
    return <div>Unauthorized</div>;
  }
  const email = session?.user?.email as string;
  const user: User | null = await getUserByEmail(email);
  if (!user) {
    return <div>User not found</div>;
  }
  return (
    <div>
      <ProfileSettings user={user} />
    </div>
  );
}
