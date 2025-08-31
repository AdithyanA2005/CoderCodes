import { Record } from "@/components/record";
import { Category } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { CATEGORY_QUERY } from "@/sanity/lib/queries";

export default async function Collections() {
  const collections: Omit<Category, "posts">[] = await client.fetch(CATEGORY_QUERY);

  return (
    <main>
      <section className="max-w-main mx-auto px-4">
        <header className="mb-4">
          <h1 className="text-xl font-semibold text-balance">Lab Collections</h1>
          <p className="text-muted-foreground mt-1 text-sm text-pretty">
            Clean and minimal listings of all subjects. Tap a subject to see its programs.
          </p>
        </header>

        <div className="flex flex-col gap-3">
          {collections?.length > 0 &&
            collections.map((collection) => (
              <Record
                key={`category_card_${collection._id}`}
                title={collection.title || ""}
                href={collection.slug?.current ? `/collections/${collection.slug.current}` : ""}
                description={collection.description || ""}
              />
            ))}
        </div>
      </section>
    </main>
  );
}
