import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload-client'
import RichText from '@/components/rich-text'

import { Views, ViewsSkeleton } from './_components/views'

export const experimental_ppr = true

export default async function Page({
  params,
}: {
  params: Promise<{ postSlug: string; categorySlug: string }>
}) {
  const { postSlug } = await params

  const payload = await getPayloadClient()

  const post = (
    await payload.find({
      collection: 'posts',
      select: {
        title: true,
        description: true,
        content: true,
      },
      where: {
        slug: {
          equals: postSlug,
        },
      },
      limit: 1,
    })
  ).docs[0]

  // If Post document is not found return not found
  if (!post) notFound()

  return (
    <main className="max-w-main mx-auto">
      <header className="px-4">
        <h1 className="text-xl font-semibold text-balance">{post.title}</h1>
        <p className="text-muted-foreground mt-1 text-sm text-pretty">{post.description}</p>
      </header>

      <hr className="mt-3 mb-8" />

      <RichText className="px-4" data={post.content} enableGutter={false} />

      <Suspense fallback={<ViewsSkeleton />}>
        <Views slug={postSlug} />
      </Suspense>
    </main>
  )
}
