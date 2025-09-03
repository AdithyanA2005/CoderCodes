import { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Post',
    plural: 'Posts',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'language', 'views', 'category'],
  },
  timestamps: true,
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'views',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
      },
    },
    // store raw Markdown in a textarea field
    {
      name: 'content',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Markdown content. Render with your Markdown renderer on the frontend.',
        // you can use a larger admin textarea size
        components: {
          Field: undefined,
        },
      },
    },
    // link to category (single relation)
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
  ],
}
