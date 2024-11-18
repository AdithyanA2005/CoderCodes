import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const user = defineType({
  name: "user",
  title: "User",
  type: "document",
  description: "User profiles and account information",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      description: "User's full name",
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      description: "User's email address",
      validation: (Rule) =>
        Rule.required().email().error("Please enter a valid email address"),
    }),
    defineField({
      name: "image",
      title: "Profile Picture URL",
      type: "url",
      description: "URL of the user's profile picture (fetched from external API)",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["https"]
        }).error("Please enter a valid HTTPS image URL"),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
      imageUrl: "image",
    },
    prepare({ title, subtitle, imageUrl }) {
      return {
        title,
        subtitle,
        media: imageUrl ? <img src={imageUrl} alt={title || "User Image"} /> : <UserIcon />,
      };
    },
  },
  orderings: [
    {
      title: "Name A-Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      title: "Name Z-A",
      name: "nameDesc",
      by: [{ field: "name", direction: "desc" }],
    },
  ],
});
