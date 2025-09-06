import { getPayloadClient } from "@/lib/payload-client";

export async function generateStaticParams() {
  const payload = await getPayloadClient();

  const categories = await payload.find({
    collection: "categories",
    select: {
      slug: true,
    },
    limit: 30,
  });

  return categories.docs.map((category) => ({
    categorySlug: category.slug,
  }));
}

export default async function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ categorySlug: string }>;
}) {
  return children;
}
