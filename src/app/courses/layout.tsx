import ChatWidget from "@/components/layout/ChatWidget";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      {children} <ChatWidget />
    </section>
  );
}
