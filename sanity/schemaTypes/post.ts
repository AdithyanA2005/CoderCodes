import { defineField, defineType } from "sanity";
import { languages } from "@/data/prism";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "views",
      type: "number",
    }),
    defineField({
      name: "language",
      type: "string",
      options: {
        list: languages,
      },
    }),
    defineField({
      name: "path",
      type: "string",
      placeholder: "ds/stack.c",
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "details",
      type: "markdown",
    }),
  ],
});
