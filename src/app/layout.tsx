import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/utils/providers/ReactQueryProvider";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

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
          <main className="bg-background "> {children}</main>
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
