"use server";

import { getPayloadClient } from "@/lib/payload-client";
import { CategoriesSelect } from "@/payload-types";

export async function upsertUser({ email, name, image }: { email: string; name: string; image?: string }) {
  const payload = await getPayloadClient();

  // Check if user exists
  const existing = await payload.find({
    collection: "users",
    where: { email: { equals: email } },
  });

  if (existing.totalDocs > 0) {
    // Update existing user
    return await payload.update({
      collection: "users",
      id: existing.docs[0].id,
      data: { name, image },
    });
  }

  // Create new user
  return await payload.create({
    collection: "users",
    data: { email, name, image },
  });
}

export async function getCategories({
  page,
  limit = 10,
  select,
}: {
  page: number;
  limit?: number;
  select?: CategoriesSelect<true>;
}) {
  "use server";

  const payload = await getPayloadClient();

  const categories = await payload.find({
    collection: "categories",
    select: {
      title: true,
      slug: true,
      description: true,
      ...select,
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

  console.log(categories);

  return categories;
}
