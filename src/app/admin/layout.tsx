import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import { getUserByEmail } from "@/lib/actions/user/getUser";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    redirect("/");
  }

  const user = await getUserByEmail(email);

  if (!user || user.role !== "ADMIN") {
    redirect("/");
  }
  return <section>{children}</section>;
}
