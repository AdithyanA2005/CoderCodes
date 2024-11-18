import { defineField, defineType } from "sanity";
import { languages } from "@/data/prism";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  description: "Code snippets and programming solutions with detailed explanations",
  fields: [
    defineField({
      name: "title",
      title: "Post Title",
      type: "string",
      description: "Title of the code snippet or solution",
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      description: "URL-friendly version of the title",
      options: {
        source: "title",
        maxLength: 96,
        slugify: input =>
          input.toLowerCase()
            .trim()
            .replace(/[^\w-]+/g, '')
            .replace(/\s+/g, '-'),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "views",
      title: "View Count",
      type: "number",
      description: "Number of times this post has been viewed",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
      readOnly: true,
    }),
    defineField({
      name: "language",
      title: "Programming Language",
      type: "string",
      description: "Programming language used in the code snippet",
      options: {
        list: languages,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "path",
      title: "File Path",
      type: "string",
      description: "Path to the code file (e.g., 'java/ds/linkedList.java')",
      placeholder: "folder/[subfolders/]filename[.ext]",
      validation: (Rule) =>
        Rule.required()
          .regex(/^[\w.-]+(?:\/[\w.-]+)*(?:\.\w+)?$/)
          .error("Path must be in format: folder/[subfolders/]filename[.ext]"),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      description: "Categories this post belongs to",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: (Rule) => Rule.required().min(1).unique(),
    }),
    defineField({
      name: "details",
      title: "Post Content",
      type: "markdown",
      description: "Detailed explanation of the code solution",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      views: "views",
      subtitle: "language",
    },
    prepare({ title, views, subtitle, }) {
      const language = languages.find((l) => l.value === subtitle);
      return {
        title,
        subtitle: `${views} views${language ? ` - ${language.title}` : ''}`,
      };
    },
  },
  orderings: [
    {
      title: "Title A-Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
    {
      title: "Most Viewed",
      name: "viewsDesc",
      by: [{ field: "views", direction: "desc" }],
    },
  ],
});
