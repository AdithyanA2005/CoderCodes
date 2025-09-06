import { notFound } from "next/navigation";
import PaginatedRecordsList from "@/components/records-list";
import { getPayloadClient } from "@/lib/payload-client";

async function getPosts({ page, limit = 10, categoryId }: { page: number; limit?: number; categoryId: string }) {
  const payload = await getPayloadClient();

  return await payload.find({
    collection: "posts",
    select: {
      title: true,
      description: true,
      slug: true,
    },
    where: {
      category: {
        equals: categoryId,
      },
    },
    page,
    limit,
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ categorySlug: string }> }) {
  const { categorySlug } = await params;

  const payload = await getPayloadClient();

  const category = (
    await payload.find({
      collection: "categories",
      select: {
        title: true,
        description: true,
      },
      where: {
        slug: { equals: categorySlug },
      },
      limit: 1,
    })
  ).docs[0];

  // If category document is not found return not found
  if (!category) notFound();

  const posts = await getPosts({ page: 1, categoryId: category.id });

  return (
    <main>
      <section className="max-w-main mx-auto px-4">
        <header className="mb-4">
          <h1 className="text-xl font-semibold text-balance">{category.title}</h1>
          <p className="text-muted-foreground mt-1 text-sm text-pretty">{category.description}</p>
        </header>

        <hr className="mt-3 mb-8" />

        <PaginatedRecordsList
          initialData={posts}
          hrefPrefix={`/categories/${categorySlug}`}
          getRecordsAction={async (props) => {
            "use server";

            return getPosts({ categoryId: category.id, ...props });
          }}
        />
      </section>
    </main>
  );
}
