import { Suspense } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { notFound } from "next/navigation";
import markdown from "markdown-it";
import { Post } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { POST_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { CopyCodeButton } from "./_components/copy-code-button";
import { Views, ViewsSkeleton } from "./_components/views";

export const experimental_ppr = true;

type PostWithCategories = Omit<Post, "categories"> & { categories?: { _id: string; title: string; slug: string }[] };

const md = markdown();

export default async function Page({ params }: { params: Promise<{ postSlug: string; collectionSlug: string }> }) {
  const { postSlug } = await params;

  // Fetch the post from Sanity
  const post: PostWithCategories = await client.fetch(POST_BY_SLUG_QUERY, { slug: postSlug });
  if (!post) notFound();

  // Fetch the post content from GitHub
  const response = await fetch(`${process.env.REPO_URL}/contents/${post.path}`, {
    headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` },
  });
  if (!response.ok) return notFound();

  // Parse the post details
  const parsedDetails = md.render(post.details || "");

  // Parse the post content
  const contents = await response.json();

  // Decode the base64-encoded content(code)
  const code = Buffer.from(contents.content, "base64").toString("utf-8");

  return (
    <main className="max-w-main mx-auto">
      <header className="px-4">
        <h1 className="text-xl font-semibold text-balance">{post.title}</h1>
        <p className="text-muted-foreground mt-1 text-sm text-pretty">{post.description}</p>
      </header>

      <hr className="mt-3 mb-4" />

      <section className="px-4">
        {parsedDetails ? (
          <article
            dangerouslySetInnerHTML={{ __html: parsedDetails }}
            className="font-work-sans prose max-w-main dark:prose-invert break-all"
          />
        ) : null}
      </section>

      <section className="px-4">
        <h2 className="mt-6 text-2xl font-bold">Program</h2>
        <div className="relative mt-6">
          <CopyCodeButton codeToCopy={code} />
          <SyntaxHighlighter
            language={post?.language || "plaintext"}
            style={dracula}
            codeTagProps={{ className: "text-sm" }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </section>

      <Suspense fallback={<ViewsSkeleton />}>
        <Views slug={postSlug} />
      </Suspense>
    </main>
  );
}
