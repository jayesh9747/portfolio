"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/lib/hooks";

type Props = Omit<HTMLMotionProps<"button">, "children"> & {
  children?: ReactNode;
  strength?: number;
  variant?: "primary" | "ghost" | "outline";
};

export function MagneticButton({
  children,
  className,
  strength = 0.4,
  variant = "outline",
  ...rest
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const isMobile = useIsMobile();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function onMove(e: React.MouseEvent<HTMLButtonElement>) {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mx = e.clientX - (rect.left + rect.width / 2);
    const my = e.clientY - (rect.top + rect.height / 2);
    x.set(mx * strength);
    y.set(my * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const variants = {
    primary:
      "bg-accent text-[#06070d] font-medium hover:bg-accent/90 shadow-[0_10px_40px_-10px] shadow-accent/60",
    outline:
      "border border-line bg-white/[0.02] text-ink hover:bg-white/[0.05] hover:border-accent/40",
    ghost: "text-ink-dim hover:text-ink hover:bg-white/[0.04]",
  } as const;

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      data-cursor="hover"
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
