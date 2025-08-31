import { notFound } from "next/navigation";
import { Record } from "@/components/record";
import { Category, Post } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { CATEGORY_BY_SLUG_QUERY } from "@/sanity/lib/queries";

type CategoryWithPosts = Omit<Category, "posts"> & { posts?: Post[] };

export default async function CollectionPage({ params }: { params: Promise<{ collectionSlug: string }> }) {
  const { collectionSlug } = await params;
  const collection: CategoryWithPosts = await client.fetch(CATEGORY_BY_SLUG_QUERY, { slug: collectionSlug });
  if (!collection) notFound();
  const posts = collection?.posts;

  return (
    <main>
      <section className="max-w-main mx-auto px-4">
        <header className="mb-4">
          <h1 className="text-xl font-semibold text-balance">{collection.title}</h1>
          <p className="text-muted-foreground mt-1 text-sm text-pretty">{collection.description}</p>
        </header>

        <div className="flex flex-col gap-3">
          {posts?.map((post, index) => (
            <Record
              key={post._id}
              index={index + 1}
              title={post.title || ""}
              description={post.description || ""}
              href={post.slug?.current ? `${collectionSlug}/${post.slug.current}` : ""}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
