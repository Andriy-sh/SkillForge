import { auth } from "../../../auth";
import { getUserByEmail, getUserById } from "@/lib/actions/user/getUser";
import { getNotification } from "@/lib/actions/notification/getNotification";
import { User } from "@/schemas/User/User";
import NavBarClient from "./NavBarClient";
import { getResourcesNames } from "@/lib/actions/resources/getResources";

export default async function NavBarServer() {
  const session = await auth();
  const email = session?.user?.email;

  const user = email ? await getUserByEmail(email) : null;
  const notifications = await getNotification(user?.id || "");
  const sendersIds = notifications.map((n) => n.senderId).filter(Boolean);
  const senders = sendersIds.length
    ? ((
        await Promise.all(sendersIds.map((id) => getUserById(id as string)))
      ).filter(Boolean) as User[])
    : [];
  type p = {
    name: string;
    type: string;
  };
  const courses: p[] = await getResourcesNames();
  console.log(courses);
  return (
    <NavBarClient
      courses={courses}
      session={session}
      user={user}
      notifications={notifications}
      senders={senders}
    />
  );
}
