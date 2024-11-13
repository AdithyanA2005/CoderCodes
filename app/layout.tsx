import type { Metadata } from "next";
import localFont from "next/font/local";
import "easymde/dist/easymde.min.css";
import { Navbar } from "@/app/_components/navbar";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CoderCodes",
  description: "Collection of curated programs for your lab exams",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
