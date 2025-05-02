import SettingsSideBar from "@/components/settings/SettingsSideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-[1fr_3fr] p-8">
      <SettingsSideBar />
      {children}
    </section>
  );
}
