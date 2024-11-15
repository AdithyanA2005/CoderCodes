import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const user = defineType({
  name: "user",
  title: "User",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "email",
      type: "string",
    }),
    defineField({
      name: "image",
      type: "url",
    }),
  ],
  preview: {
    select: {
      title: "name",
      imageUrl: "image",
    },
    prepare({ title, imageUrl }) {
      return {
        title: title,
        media: imageUrl ? <img src={imageUrl} alt={title || "User Image"} /> : <UserIcon className="size-20" />,
      };
    },
  },
});
