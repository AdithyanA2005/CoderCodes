"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function BackButton() {
  const pathname = usePathname();
  const router = useRouter();
  const [showBackButton, setShowBackButton] = useState(false);
  const [parentPath, setParentPath] = useState("");

  useEffect(() => {
    if (pathname != "/") {
      const lastIndexOfSlash = pathname.lastIndexOf("/");
      const parentPath = pathname.slice(0, lastIndexOfSlash);
      setParentPath(parentPath || "/");
      setShowBackButton(true);
    } else {
      setShowBackButton(false);
      setParentPath("");
    }
  }, [pathname]);

  if (!showBackButton) return null;

  return (
    <Button onClick={() => router.replace(parentPath)} variant="outline" size="icon">
      <ArrowLeftIcon className="size-6" />{" "}
    </Button>
  );
}
