import { Category } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { CATEGORY_QUERY } from "@/sanity/lib/queries";
import { CollectionCard } from "./_components/collection-card";

export default async function Collections() {
  const collections: Omit<Category, "posts">[] = await client.fetch(CATEGORY_QUERY);

  return (
    <main className="mt-[20vh] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl">Select Collection</h1>

      <div className="mt-10 flex w-full max-w-screen-lg flex-wrap items-center justify-center gap-5 px-4 md:gap-6">
        {collections?.length > 0 &&
          collections.map((collection) => (
            <CollectionCard
              title={collection.title as string}
              slug={collection.slug?.current as string}
              key={`category_card_${collection._id}`}
            />
          ))}
      </div>
    </main>
  );
}
