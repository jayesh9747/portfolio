"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useIsMobile } from "@/lib/hooks";

/**
 * Dynamic ambient lighting: a hairline grid, two drifting aurora
 * blobs, and a soft spotlight that follows the pointer.
 */
export function AmbientBackground() {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.2);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  const spotlight = useTransform(
    [sx, sy],
    ([x, y]: number[]) =>
      `radial-gradient(640px circle at ${x * 100}% ${y * 100}%, rgba(109,139,255,0.10), transparent 60%)`,
  );

  useEffect(() => {
    if (isMobile) return;
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isMobile, mx, my]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void"
    >
      {/* base vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,#0a0d1a_0%,#04050a_55%)]" />

      {/* aurora blobs */}
      <div className="absolute -left-[10%] top-[8%] size-[42vw] rounded-full bg-[radial-gradient(circle,rgba(109,139,255,0.16),transparent_60%)] blur-2xl animate-float-slow" />
      <div
        className="absolute -right-[8%] top-[38%] size-[38vw] rounded-full bg-[radial-gradient(circle,rgba(176,123,255,0.14),transparent_60%)] blur-2xl animate-float-slow"
        style={{ animationDelay: "-3s" }}
      />
      <div
        className="absolute bottom-[2%] left-[30%] size-[34vw] rounded-full bg-[radial-gradient(circle,rgba(86,225,199,0.10),transparent_60%)] blur-2xl animate-float-slow"
        style={{ animationDelay: "-6s" }}
      />

      {/* hairline grid */}
      <div className="grid-bg absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(120%_90%_at_50%_0%,#000_30%,transparent_75%)]" />

      {/* pointer spotlight */}
      {!isMobile && (
        <motion.div className="absolute inset-0" style={{ background: spotlight }} />
      )}

      {/* top + bottom fades */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-void to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-void to-transparent" />
    </div>
  );
}
