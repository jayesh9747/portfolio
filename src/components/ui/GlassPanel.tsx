"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = Omit<HTMLMotionProps<"div">, "children" | "title"> & {
  children?: ReactNode;
  /** Adds a subtle window title bar with traffic-light dots. */
  title?: string;
  /** Renders the macOS-style traffic lights. */
  chrome?: boolean;
  strong?: boolean;
};

export function GlassPanel({
  title,
  chrome = false,
  strong = false,
  className,
  children,
  ...rest
}: Props) {
  return (
    <motion.div
      className={cn(
        strong ? "glass-strong" : "glass",
        "rounded-[var(--radius-lg)] relative overflow-hidden",
        className,
      )}
      {...rest}
    >
      {(chrome || title) && (
        <div className="flex items-center gap-3 border-b border-line/70 px-4 py-3">
          {chrome && (
            <div className="flex items-center gap-1.5">
              <span className="size-3 rounded-full bg-danger/80" />
              <span className="size-3 rounded-full bg-warn/80" />
              <span className="size-3 rounded-full bg-ok/80" />
            </div>
          )}
          {title && (
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
              {title}
            </span>
          )}
        </div>
      )}
      {children}
    </motion.div>
  );
}
