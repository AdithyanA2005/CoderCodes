import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  description: "Categories to organize and group related posts, Every post must be assigned under a category",
  fields: [
    defineField({
      name: "title",
      title: "Category Title",
      type: "string",
      description: "Name of the category",
      validation: (Rule) => Rule.required().min(2).max(50),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      description: "Generated URL-friendly slug based on the title",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 96)
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Category Description",
      type: "text",
      description: "Brief description of what this category represents",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "posts",
      title: "Related Posts",
      type: "array",
      description: "Posts that belong to this category",
      of: [
        {
          type: "reference",
          to: [{ type: "post" }],
        }
      ],
      validation: (Rule) => Rule.unique(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
  orderings: [
    {
      title: 'Title, A-Z',
      name: 'titleAsc',
      by: [
        { field: 'title', direction: 'asc' }
      ]
    }
  ]
});
