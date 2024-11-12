export const CATEGORY_QUERY = `
*[_type == "category" && defined(slug.current)] | order(title asc) {
  _id, title, slug
}
`;
