import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Category, Post } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { CATEGORY_BY_SLUG_QUERY } from "@/sanity/lib/queries";

type CategoryWithPosts = Omit<Category, "posts"> & { posts?: Post[] };

export default async function CollectionPage({ params }: { params: Promise<{ collectionSlug: string }> }) {
  const { collectionSlug } = await params;
  const collection: CategoryWithPosts = await client.fetch(CATEGORY_BY_SLUG_QUERY, { slug: collectionSlug });
  if (!collection) notFound();
  const posts = collection?.posts;

  return (
    <main className="mt-[20vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl">Select Program</h1>

      <Table className="mx-auto mt-10 max-w-screen-lg text-lg">
        <TableCaption>Programs in {collection.title} - Ended</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Sl.No</TableHead>
            <TableHead>Question</TableHead>
            <TableHead className="w-[50px] text-right">Code</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts?.map((post, index) => (
            <TableRow key={post._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <Link className="hover:underline" href={`/collections/${collectionSlug}/${post.slug?.current}`}>
                  {post.title}
                </Link>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="outline" className="h-8 font-semibold" asChild>
                  <Link href={`/collections/${collectionSlug}/${post.slug?.current}`}>See</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
