import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export function GoBackButton({ href, className }: { href: string; className?: string }) {
  return (
    <Button asChild variant="ghost" className={cn("mt-1", className)}>
      <Link href={href}>
        <ArrowLeftIcon />
        Go Back
      </Link>
    </Button>
  );
}
