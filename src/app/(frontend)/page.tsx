import { getCategories } from "@/lib/actions/payload";
import CategoriesList from "./_components/categories-list";

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

        <CategoriesList initialData={categories} />
      </section>
    </main>
  );
}
