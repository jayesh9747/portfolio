"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsMobile } from "@/lib/hooks";

/**
 * Custom OS cursor: a precise dot + a magnetic ring that grows
 * and labels itself when hovering interactive elements.
 */
export function Cursor() {
  const isMobile = useIsMobile();
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 260, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (isMobile) return;
    document.body.setAttribute("data-custom-cursor", "on");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const target = e.target as HTMLElement;
      const interactive = target.closest<HTMLElement>(
        "a, button, [data-cursor='hover'], input, textarea, [role='button']",
      );
      setHovering(!!interactive);
      setLabel(interactive?.getAttribute("data-cursor-label") ?? null);
    };
    const leave = () => setVisible(false);
    const dn = () => setDown(true);
    const up = () => setDown(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseout", leave);
    window.addEventListener("mousedown", dn);
    window.addEventListener("mouseup", up);
    return () => {
      document.body.removeAttribute("data-custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseout", leave);
      window.removeEventListener("mousedown", dn);
      window.removeEventListener("mouseup", up);
    };
  }, [isMobile, x, y]);

  if (isMobile) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden
    >
      {/* core dot */}
      <motion.div
        className="absolute left-0 top-0 size-1.5 rounded-full bg-accent-2"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      {/* magnetic ring */}
      <motion.div
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-accent/60"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 56 : 30,
          height: hovering ? 56 : 30,
          borderColor: hovering
            ? "rgba(86,225,199,0.7)"
            : "rgba(109,139,255,0.5)",
          scale: down ? 0.82 : 1,
          backgroundColor: hovering
            ? "rgba(86,225,199,0.08)"
            : "rgba(109,139,255,0)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
      >
        {label && (
          <span className="font-mono text-[9px] uppercase tracking-widest text-accent-2">
            {label}
          </span>
        )}
      </motion.div>
    </div>
  );
}
