import { after } from "next/server";
import { Skeleton } from "@/components/ui/skeleton";
import { getPayloadClient } from "@/lib/payload-client";
import { auth } from "@/auth";

function Component({ views }: { views: number }) {
  const isSingular = views === 1;

  return (
    <div className="view_container">
      <span className="font-black">{`${views} ${isSingular ? "view" : "views"}`}</span>
    </div>
  );
}

export async function Views({ slug }: { slug: string }) {
  // Fetch user
  const session = await auth();
  if (!session?.user) return <Component views={0} />;

  // Fetch Post
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
  if (!post) return <Component views={0} />;

  const totalViews = post.views || 0;

  after(async () => {
    // 2️⃣ Increment views count
    await payload.update({
      collection: "posts",
      depth: 0, // Without depth 0, there occurs a reference error during update
      id: post.id,
      data: { views: totalViews + 1 },
    });

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    // Find existing visit record if withing last hour
    const existing = (
      await payload.find({
        collection: "visits",
        where: {
          blog: { equals: post.id },
          user: { equals: session?.user?.id },
          visitedAt: { greater_than: oneHourAgo.toISOString() },
        },
        limit: 1,
      })
    ).docs[0];

    // Only one record per user per hour
    if (!existing) {
      // 1️⃣ Insert visit
      await payload.create({
        collection: "visits",
        data: {
          user: session?.user?.id,
          blog: post.id,
          visitedAt: new Date().toISOString(),
        },
      });
    }
  });

  return <Component views={totalViews} />;
}

export function ViewsSkeleton() {
  return <Skeleton className="view_container bg-primary-foreground/30 min-w-24" />;
}
