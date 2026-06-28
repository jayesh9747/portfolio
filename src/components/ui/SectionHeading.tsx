"use client";

import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  index,
  kicker,
  title,
  description,
  className,
}: {
  index: string;
  kicker: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      <Reveal>
        <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
          <span className="text-ink-faint">{index}</span>
          <span className="h-px w-8 bg-gradient-to-r from-accent to-transparent" />
          {kicker}
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="max-w-3xl text-balance text-3xl font-semibold leading-[1.05] tracking-tight text-gradient sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-ink-dim md:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
