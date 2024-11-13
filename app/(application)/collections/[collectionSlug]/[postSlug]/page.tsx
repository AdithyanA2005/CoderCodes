import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { notFound } from "next/navigation";
import markdown from "markdown-it";
import { Post } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { POST_BY_SLUG_QUERY } from "@/sanity/lib/queries";

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
    <main className="mx-auto mt-4 max-w-screen-lg space-y-10 px-4">
      <section>
        <h1 className="to-accent-500 bg-gradient-to-r from-cyan-500 via-indigo-500 bg-clip-text text-center text-4xl font-bold text-transparent sm:text-5xl">
          {post.title}
        </h1>
        <hr className="my-3" />
      </section>

      <section>
        {parsedDetails ? (
          <article
            dangerouslySetInnerHTML={{ __html: parsedDetails }}
            className="font-work-sans prose max-w-4xl break-all dark:prose-invert"
          />
        ) : null}
      </section>

      <section>
        <h2 className="mt-4 text-2xl font-bold">Program</h2>
        <SyntaxHighlighter
          language={post?.language || "plaintext"}
          style={dracula}
          codeTagProps={{ className: "text-sm" }}
        >
          {code}
        </SyntaxHighlighter>
      </section>
    </main>
  );
}
