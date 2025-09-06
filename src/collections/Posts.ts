import { revalidatePath } from "next/cache";
import {
  BlocksFeature,
  FixedToolbarFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { CollectionConfig } from "payload";
import { getPayloadClient } from "@/lib/payload-client";
import { Code } from "../blocks/Code/config";

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: {
    singular: "Post",
    plural: "Posts",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "language", "views", "category"],
  },
  timestamps: true,
  access: {
    read: () => true,
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "description", type: "textarea" },
    { name: "category", type: "relationship", relationTo: "categories", required: true },
    {
      name: "views",
      type: "number",
      defaultValue: 0,
      admin: {
        readOnly: true,
      },
    },
    {
      name: "content",
      type: "richText",
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            FixedToolbarFeature(),
            BlocksFeature({ blocks: [Code] }),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
          ];
        },
      }),
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, previousDoc: prevDoc }) => {
        // New document, always revalidate
        if (!prevDoc) return;

        // Fields that should trigger revalidation
        const triggerFields = ["title", "slug", "content", "description", "category"]; // adjust as needed

        // Check if any trigger field changed
        const shouldRevalidate = triggerFields.some((key) => {
          if (typeof doc[key] === "object" && doc[key] !== null) {
            const oldContent = JSON.stringify(doc[key]);
            const newContent = JSON.stringify(prevDoc[key]);
            return oldContent !== newContent;
          }
          return doc[key] !== prevDoc[key];
        });

        // nothing important changed, skip revalidation
        if (!shouldRevalidate) return;

        const payload = await getPayloadClient();

        if (doc.category) {
          const category = await payload.findByID({
            collection: "categories",
            id: doc.category,
          });

          if (category?.slug) {
            revalidatePath(`/categories/${category.slug}/${doc.slug}`);
          }
        }
      },
    ],
  },
};
