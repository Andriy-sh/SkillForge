import SettingsSideBar from "@/components/settings/SettingsSideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-[1fr_4fr] justify-center p-20 mr-10">
      <SettingsSideBar />
      {children}
    </section>
  );
}
