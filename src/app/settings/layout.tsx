import SettingsSideBar from "@/components/settings/SettingsSideBar";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <section className="grid grid-cols-[1fr_4fr] justify-center p-20 mr-10">
      <SettingsSideBar />
      {children}
    </section>
  );
}
