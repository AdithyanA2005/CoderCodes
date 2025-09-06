"use client";

import { useState, useTransition } from "react";
import { PaginatedDocs } from "payload";
import { Button } from "@/components/ui/button";
import { Record } from "@/components/record";
import { getCategories } from "@/lib/actions/payload";
import { Category } from "@/payload-types";

type ICategory = Pick<Category, "id" | "title" | "slug" | "description">;

export default function CategoriesList({ initialData }: { initialData: PaginatedDocs<ICategory> }) {
  const [data, setData] = useState(initialData);
  const [isPending, startTransition] = useTransition();

  const loadMore = () => {
    if (!data.hasNextPage) return;

    startTransition(async () => {
      const newPage = await getCategories({ page: data.nextPage! });
      setData({
        ...newPage,
        docs: [...data.docs, ...newPage.docs],
      });
    });
  };

  return (
    <div className="flex flex-col gap-3">
      {data.docs.map((collection) => (
        <Record
          key={`category_card_${collection.id}`}
          title={collection.title}
          href={`/categories/${collection.slug}`}
          description={collection.description || ""}
        />
      ))}

      {data.hasNextPage && (
        <Button onClick={loadMore} disabled={isPending} className="mx-auto" variant="outline">
          {isPending ? "Loading..." : "Load More"}
        </Button>
      )}
    </div>
  );
}
