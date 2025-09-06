"use server";

import { getPayloadClient } from "@/lib/payload-client";

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
