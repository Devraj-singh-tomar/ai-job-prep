import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function BackLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Button
      asChild
      variant="outline"
      size="sm"
      className={cn("-ml-3", className)}
    >
      <Link
        href={href}
        className="flex gap-2 items-center text-sm text-muted-foreground"
      >
        <ArrowLeftIcon />
        {children}
      </Link>
    </Button>
  );
}
