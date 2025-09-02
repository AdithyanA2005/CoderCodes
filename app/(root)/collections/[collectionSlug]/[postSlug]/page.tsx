import { Suspense } from "react";
import { notFound } from "next/navigation";
import MarkdownRenderer from "@/components/markdown-renderer";
import { Post } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { POST_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { Views, ViewsSkeleton } from "./_components/views";

export const experimental_ppr = true;

type PostWithCategories = Omit<Post, "categories"> & { categories?: { _id: string; title: string; slug: string }[] };

export default async function Page({ params }: { params: Promise<{ postSlug: string; collectionSlug: string }> }) {
  const { postSlug } = await params;

  // Fetch the post from Sanity
  const post: PostWithCategories = await client.fetch(POST_BY_SLUG_QUERY, { slug: postSlug });
  if (!post) notFound();

  return (
    <main className="max-w-main mx-auto">
      <header className="px-4">
        <h1 className="text-xl font-semibold text-balance">{post.title}</h1>
        <p className="text-muted-foreground mt-1 text-sm text-pretty">{post.description}</p>
      </header>

      <hr className="mt-3 mb-4" />

      {post.details && (
        <section className="mb-6 px-4">
          <article className="prose max-w-main dark:prose-invert break-all">
            <MarkdownRenderer markdownContent={post.details || ""} />
          </article>
        </section>
      )}

      <Suspense fallback={<ViewsSkeleton />}>
        <Views slug={postSlug} />
      </Suspense>
    </main>
  );
}
