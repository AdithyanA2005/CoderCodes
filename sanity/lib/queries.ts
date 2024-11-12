export const CATEGORY_QUERY = `
*[_type == "category" && defined(slug.current)] | order(title asc) {
  _id, title, slug
}
`;

export const CATEGORY_BY_SLUG_QUERY = `
*[_type == "category" && slug.current == $slug][0] {
  _id, title, slug, 
  posts[] -> {_id, title, slug, views}
}
`;
