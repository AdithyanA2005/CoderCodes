import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CollectionCardProps {
  title: string;
  slug: string;
  description?: string;
}

export function CollectionCard({ title, slug, description }: CollectionCardProps) {
  return (
    <Link href={`/collections/${slug}`}>
      <Card className="gap-0 transition-shadow hover:shadow-sm">
        <CardHeader>
          <CardTitle className="text-base text-balance">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
