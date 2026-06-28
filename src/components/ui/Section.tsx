import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  children,
  className,
  full = false,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  full?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-16",
        full ? "min-h-screen" : "py-24 md:py-32",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}
