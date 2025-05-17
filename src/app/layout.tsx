import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar/NavBar";
import dynamic from "next/dynamic";
import { auth } from "../../auth";
import { getUserByEmail } from "@/lib/actions/user/getUser";
import { UserProvider } from "@/components/provider/UserProvider";

const inter = Inter({ subsets: ["latin"] });
const LazyFooter = dynamic(() => import("@/components/footer/Footer"), {});
export const metadata: Metadata = {
  title: "React Query App Movies",
  description: "Aplication using React Query to get Movies from TMDB",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const email = session?.user?.email;
  const user = email ? await getUserByEmail(email) : null;
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider user={user}>
          <NavBar />
          <main className="bg-background min-h-[93vh]"> {children}</main>
          <LazyFooter />
        </UserProvider>
      </body>
    </html>
  );
}
