export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="grid p-5 grid-cols-[1fr_3fr]">{children}</div>;
}
