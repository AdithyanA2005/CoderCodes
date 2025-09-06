import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: false, // we use NextAuth for end-users; payload admin auth can still exist for admin accounts
  labels: {
    singular: "User",
    plural: "Users",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email"],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true, unique: true },
    { name: "image", type: "text" }, // store image url
    // bookmarks: list of post relationships
    {
      name: "bookmarks",
      type: "relationship",
      relationTo: "posts",
      hasMany: true,
      admin: {
        description: "Posts bookmarked by the user.",
      },
    },
    // visited history: array of objects with relationship + timestamp
    {
      name: "visited",
      type: "array",
      fields: [
        {
          name: "post",
          type: "relationship",
          relationTo: "posts",
        },
        {
          name: "visitedAt",
          type: "date",
        },
      ],
    },
  ],
};
