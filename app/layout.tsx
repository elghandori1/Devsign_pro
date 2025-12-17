import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: true,
});

import Sidebar from "./components/Sidebar";

export const metadata = {
  title: "Devsign - Digital Agency & Software Development",
  description:
    "Web development, landing pages, software solutions, product design, and digital branding services.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased flex min-h-screen`}>
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
        
      </body>
    </html>
  );
}