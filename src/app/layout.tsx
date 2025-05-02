import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/utils/providers/ReactQueryProvider";
import NavBar from "@/components/navbar/NavBar";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });
const LazyFooter = dynamic(() => import("@/components/footer/Footer"), {});
export const metadata: Metadata = {
  title: "React Query App Movies",
  description: "Aplication using React Query to get Movies from TMDB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <NavBar />
          <main className="bg-background min-h-[93vh]"> {children}</main>
          <LazyFooter />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
