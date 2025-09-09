import { CollectionConfig } from "payload";

export const Visits: CollectionConfig = {
  slug: "visits",
  labels: {
    singular: "Visit",
    plural: "Visits",
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: false,
    },
    {
      name: "blog",
      type: "relationship",
      relationTo: "posts",
      required: true,
    },
    {
      name: "sessionId",
      type: "text",
      required: false,
    },
    {
      name: "ip",
      type: "text",
    },
    {
      name: "userAgent",
      type: "text",
    },
    {
      name: "referrer",
      type: "text",
    },
    {
      name: "visitedAt",
      type: "date",
      required: true,
      defaultValue: () => new Date(),
    },
  ],
  timestamps: true,
};
