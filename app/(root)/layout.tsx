import React from "react";
import { Footer } from "@/app/(root)/_components/footer";
import { Navbar } from "./_components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-screen pb-16">
        <Navbar />
        {children}
      </div>
      <Footer />
    </>
  );
}
