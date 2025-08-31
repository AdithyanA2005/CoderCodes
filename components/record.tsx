import Link from "next/link";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

interface RecordProps {
  index?: number;
  title: string;
  href: string;
  description?: string;
}

export function Record({ index, title, href, description }: RecordProps) {
  return (
    <Link href={href}>
      <Card className="flex-row gap-0 transition-shadow hover:shadow-sm">
        {/* Left circular index badge */}
        {typeof index == "number" && (
          <CardContent className="pr-0">
            <div className="bg-primary/10 text-primary flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
              <span className="text-sm font-semibold">{index}</span>
            </div>
          </CardContent>
        )}

        {/* Right content */}
        <CardContent className="flex flex-col justify-center gap-1.5">
          <CardTitle className="text-base text-balance">
            <h3>{title}</h3>
          </CardTitle>
          <CardDescription>
            <p>{description}</p>
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
