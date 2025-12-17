import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: true,
});

import Sidebar from "@/app/components/Sidebar/Sidebar";

export const metadata = {
  title: "Devsign | Professional Web Development & Creative Ad Design",
  description: "Boost your business with Devsign. We build high-performing websites, custom software, and high-converting product designs for social media ads.",
  keywords: ["Web Development", "Software Solutions", "Product Redesign", "Ads Design", "Social Media Content", "UI/UX Design"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased flex min-h-screen bg-blue-950`}>
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-devsign">
          {children}
        </main>
        
      </body>
    </html>
  );
}