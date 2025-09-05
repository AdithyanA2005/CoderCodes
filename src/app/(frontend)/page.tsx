import { Record } from '@/components/record'
import { getPayloadClient } from '@/lib/payload-client'

export default async function Collections() {
  const payload = await getPayloadClient()

  // TODO: SETUP PAGINATION
  const categories = await payload.find({
    collection: 'categories',
    select: {
      title: true,
      slug: true,
      description: true,
    },
    where: {
      slug: {
        exists: true,
      },
    },
    sort: '-updatedAt', // Desending order
  })
  // console.log(collections)

  return (
    <main>
      <section className="max-w-main mx-auto px-4">
        <header className="mb-4">
          <h1 className="text-xl font-semibold text-balance">Lab Collections</h1>
          <p className="text-muted-foreground mt-1 text-sm text-pretty">
            Clean and minimal listings of all subjects. Tap a subject to see its programs.
          </p>
        </header>

        <div className="flex flex-col gap-3">
          {categories.docs.map((collection) => (
            <Record
              key={`category_card_${collection.id}`}
              title={collection.title}
              href={`/categories/${collection.slug}`}
              description={collection.description || ''}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
