import Link from "next/link";
import { cn } from "@/lib/utils";

export function CollectionCard({ title, slug }: { title: string; slug: string }) {
  return (
    <Link
      href={`/collections/${slug}`}
      className={cn(
        "flex items-center justify-center",
        "rounded-2xl border border-yellow-500",
        "bg-secondary/20 hover:bg-yellow-500 hover:text-black",
        "min-h-28 w-full max-w-72 sm:min-h-32 md:min-h-36 lg:min-h-40",
        "px-5 py-2 transition-all hover:scale-105",
      )}
    >
      <h3 className="text-3xl md:text-4xl text-center">{title}</h3>
    </Link>
  );
}
