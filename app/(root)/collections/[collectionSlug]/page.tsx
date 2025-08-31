import { notFound } from "next/navigation";
import { Category, Post } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { CATEGORY_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { ProgramCard } from "./_components/program-card";

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
            <ProgramCard
              key={post._id}
              index={index}
              title={post.title || ""}
              description={post.description || ""}
              route={`${collectionSlug}/${post.slug?.current || ""}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
