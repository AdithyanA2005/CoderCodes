import { after } from "next/server";
import { Skeleton } from "@/components/ui/skeleton";
import { client } from "@/sanity/lib/client";
import { POST_VIEWS_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";

export async function Views({ slug }: { slug: string }) {
  const { views: totalViews, _id: id } = await client
    .withConfig({ useCdn: false })
    .fetch(POST_VIEWS_BY_SLUG_QUERY, { slug });

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: totalViews + 1 })
        .commit(),
  );

  return (
    <div className="view_container">
      <span className="font-black">{`${totalViews + 1} view${totalViews + 1 > 1 ? "s" : ""}`}</span>
    </div>
  );
}

export function ViewsSkeleton() {
  return <Skeleton className="view_container bg-primary-foreground/30 min-w-24" />;
}
