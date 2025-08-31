import Link from "next/link";

interface ProgramCardProps {
  index: number;
  title: string;
  route: string;
  description?: string;
}

export function ProgramCard({ index, title, route, description }: ProgramCardProps) {
  return (
    <Link
      href={route}
      className="hover:bg-accent/5 flex w-full items-center justify-start gap-4 rounded-lg border p-4 transition-colors"
    >
      {/* Left circular index badge */}
      <div className="bg-primary/10 text-primary flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
        <span className="text-sm font-semibold">{index}</span>
      </div>

      {/* Right content */}
      <div className="flex min-w-0 flex-col">
        <h3 className="text-foreground text-sm font-medium text-pretty">{title}</h3>
        {description ? <p className="text-muted-foreground mt-1 text-xs text-pretty">{description}</p> : null}
        <p className="text-muted-foreground mt-1 text-xs text-pretty">
          this is a test input or description which I have randomly thought for testing something that I completely
          forget{" "}
        </p>
      </div>
    </Link>
  );
}
