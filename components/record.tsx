import Link from "next/link";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

interface RecordProps {
  index?: number;
  title: string;
  href: string;
  description?: string;
}

export function Record({ index, title, href, description }: RecordProps) {
  return (
    <Link href={href}>
      <HoverBorderGradient
        as="div"
        containerClassName="w-full rounded-xl bg-transparent p-0"
        className="w-full rounded-xl bg-transparent p-0"
      >
        <Card className="1transition-shadow 1hover:shadow-sm flex-row gap-0 border-none">
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
      </HoverBorderGradient>
    </Link>
  );
}
