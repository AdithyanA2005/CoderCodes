import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function Layout({ children }: { children: Readonly<React.ReactNode> }) {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");
  else return children;
}
