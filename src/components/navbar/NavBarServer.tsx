import { auth } from "../../../auth";
import { getUserByEmail, getUserById } from "@/lib/actions/user/getUser";
import { getNotification } from "@/lib/actions/notification/getNotification";
import { User } from "@/schemas/User/User";
import NavBarClient from "./NavBarClient";

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

  return (
    <NavBarClient
      session={session}
      user={user}
      notifications={notifications}
      senders={senders}
    />
  );
}
