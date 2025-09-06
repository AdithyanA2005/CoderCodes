import PaginatedRecordsList from "@/components/records-list";
import { getPayloadClient } from "@/lib/payload-client";

async function getCategories({ page, limit = 10 }: { page: number; limit?: number }) {
  "use server";

  const payload = await getPayloadClient();

  return await payload.find({
    collection: "categories",
    select: {
      title: true,
      slug: true,
      description: true,
    },
    where: {
      slug: {
        exists: true,
      },
    },
    page,
    limit,
    sort: "-updatedAt", // Desending order
  });
}

export default async function Collections() {
  const categories = await getCategories({ page: 1 });

  return (
    <main>
      <section className="max-w-main mx-auto px-4">
        <header className="mb-4">
          <h1 className="text-xl font-semibold text-balance">Lab Collections</h1>
          <p className="text-muted-foreground mt-1 text-sm text-pretty">
            Clean and minimal listings of all subjects. Tap a subject to see its programs.
          </p>
        </header>

        <PaginatedRecordsList initialData={categories} hrefPrefix="/categories" getRecordsAction={getCategories} />
      </section>
    </main>
  );
}
