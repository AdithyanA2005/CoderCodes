export const CATEGORY_QUERY = `
*[_type == "category" && defined(slug.current)] | order(title asc) {
  _id, title, slug, description
}
`;

export const CATEGORY_BY_SLUG_QUERY = `
*[_type == "category" && slug.current == $slug][0] {
  _id, title, slug, description,
  posts[] -> {_id, title, slug, description}
}
`;

export const POST_BY_SLUG_QUERY = `
*[_type == "post" && slug.current == $slug][0] {
  _id, title, slug, views, details, language, description,
  categories[] -> {_id, title, slug}
}
`;

export const USER_BY_GOOGLE_ID_QUERY = `
*[_type == "user" && email == $email][0]{
  _id, id, name, username, email, image, bio
 }
`;

export const USER_BY_GOOGLE_EMAIL_QUERY = `
*[_type == "user" && email == $email][0]{
  _id, id, name, username, email, image, bio
 }
`;

export const POST_VIEWS_BY_SLUG_QUERY = `
*[_type == "post" && slug.current == $slug][0] {
  _id, views
}
`;
