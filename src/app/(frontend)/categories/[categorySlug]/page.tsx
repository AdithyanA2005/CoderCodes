import { notFound } from "next/navigation";
import { Record } from "@/components/record";
import { getPayloadClient } from "@/lib/payload-client";

export default async function CategoryPage({ params }: { params: Promise<{ categorySlug: string }> }) {
  const { categorySlug } = await params;

  const payload = await getPayloadClient();

  const category = (
    await payload.find({
      collection: "categories",
      select: {
        title: true,
        description: true,
        posts: true,
      },
      populate: {
        posts: {
          title: true,
          description: true,
          slug: true,
        },
      },
      where: {
        slug: {
          equals: categorySlug,
        },
      },
      limit: 1,
    })
  ).docs[0];

  // If category document is not found return not found
  if (!category) notFound();

  return (
    <main>
      <section className="max-w-main mx-auto px-4">
        <header className="mb-4">
          <h1 className="text-xl font-semibold text-balance">{category.title}</h1>
          <p className="text-muted-foreground mt-1 text-sm text-pretty">{category.description}</p>
        </header>

        <hr className="mt-3 mb-8" />

        <div className="flex flex-col gap-3">
          {/* If the category contains any post */}
          {/* And if the post is populated (ie: not a id string) */}
          {/* Then show the record card */}
          {category.posts
            ? category.posts.map((post, index) => {
                if (typeof post != "string")
                  return (
                    <Record
                      key={post.title}
                      index={index + 1}
                      title={post.title || ""}
                      description={post.description || ""}
                      href={`${categorySlug}/${post.slug}`}
                    />
                  );
              })
            : null}
        </div>
      </section>
    </main>
  );
}
