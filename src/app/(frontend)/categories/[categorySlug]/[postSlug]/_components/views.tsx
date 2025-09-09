import { after } from "next/server";
import { Skeleton } from "@/components/ui/skeleton";
import { getPayloadClient } from "@/lib/payload-client";

export async function Views({ slug }: { slug: string }) {
  const payload = await getPayloadClient();

  const post = (
    await payload.find({
      collection: "posts",
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
      depth: 0,
    })
  ).docs[0];

  let totalViews = 0;

  if (post) {
    totalViews = post.views || 0;

    // Increment views after rendering
    after(async () => {
      await payload.update({
        collection: "posts", // Replace with your collection name
        id: post.id,
        data: {
          views: totalViews + 1,
        },
      });
    });
  }

  return (
    <div className="view_container">
      <span className="font-black">{`${totalViews + 1} view${totalViews + 1 > 1 ? "s" : ""}`}</span>
    </div>
  );
}

export function ViewsSkeleton() {
  return <Skeleton className="view_container bg-primary-foreground/30 min-w-24" />;
}
