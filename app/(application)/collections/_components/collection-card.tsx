import Link from "next/link";

export function CollectionCard({ title, slug }: { title: string; slug: string }) {
  return (
    <Link
      href={`/collections/${slug}`}
      className="bg-secondary/20 hover:bg-secondary/10 border-primary/20 hover:border-primary/50 flex min-h-28 w-full max-w-72 items-center justify-center rounded-2xl border px-5 transition-all hover:scale-105 sm:min-h-32 md:min-h-36"
    >
      <h3 className="text-3xl md:text-4xl">{title}</h3>
    </Link>
  );
}
