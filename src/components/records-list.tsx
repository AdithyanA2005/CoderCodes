"use client";

import { useState, useTransition } from "react";
import { PaginatedDocs } from "payload";
import { Button } from "@/components/ui/button";
import { Record } from "@/components/record";

type IGetRecordsActionProps = {
  page: number;
  limit?: number;
};

type IPaginatedRecords = PaginatedDocs<{
  id: string;
  title: string;
  slug: string;
  description?: string | null;
}>;

export default function PaginatedRecordsList({
  initialData,
  showIndex,
  hrefPrefix,
  getRecordsAction: getRecords,
}: {
  hrefPrefix: string;
  showIndex?: boolean;
  initialData: IPaginatedRecords;
  getRecordsAction: ({ page, limit }: IGetRecordsActionProps) => Promise<IPaginatedRecords>;
}) {
  const [data, setData] = useState(initialData);
  const [isPending, startTransition] = useTransition();

  const loadMore = () => {
    if (!data.hasNextPage) return;

    startTransition(async () => {
      const newPage = await getRecords({ page: data.nextPage! });
      setData({
        ...newPage,
        docs: [...data.docs, ...newPage.docs],
      });
    });
  };

  return (
    <div className="flex flex-col gap-3">
      {data.docs.map(({ id, title, description, slug }, index) => (
        <Record
          key={`record_card_${id}`}
          index={showIndex ? index : undefined}
          href={`${hrefPrefix}/${slug}`}
          title={title}
          description={description}
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
