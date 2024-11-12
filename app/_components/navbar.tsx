import { Suspense } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { BackButton } from "./back-button";

export function Navbar() {
  return (
    <header className="border-b shadow-sm">
      <div className="container relative mx-auto flex items-center justify-between px-4 py-4 sm:justify-center">
        <div className="sm:absolute sm:left-0">
          <Suspense fallback={<Skeleton className="size-6" />}>
            <BackButton />
          </Suspense>
        </div>
        <Link href="/">
          <h1 className="text-2xl font-semibold">CoderCodes</h1>
        </Link>
      </div>
    </header>
  );
}
