import LearnNav from "@/components/learn/LearnNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className=" max-w-7xl mx-auto grid grid-cols-[1fr_3fr] gap-4 p-4 ">
      <LearnNav />
      {children}
    </section>
  );
}
