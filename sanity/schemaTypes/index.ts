import { type SchemaTypeDefinition } from "sanity";
import { category } from "@/sanity/schemaTypes/category";
import { post } from "@/sanity/schemaTypes/post";
import { user } from "@/sanity/schemaTypes/user";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user, post, category],
};
