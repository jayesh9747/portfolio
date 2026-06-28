"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Live project preview. Renders the screenshot (a live screenshot-service URL
 * or a local /projects/*.png) and gracefully falls back to a branded gradient
 * while loading or if the image fails (e.g. login-walled apps).
 */
export function ProjectShot({
  shot,
  accent,
  name,
  className,
}: {
  shot?: string;
  accent: string;
  name: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const showImg = shot && !failed;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* gradient base — always present, shows through until the shot loads */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 140% at 20% 0%, ${accent}33, transparent 60%), radial-gradient(120% 140% at 100% 100%, ${accent}22, transparent 55%)`,
        }}
      />
      <div className="grid-bg absolute inset-0 opacity-30" />

      {showImg && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={shot}
          alt={`${name} preview`}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            "absolute inset-0 size-full object-cover object-top transition-opacity duration-700",
            loaded ? "opacity-100" : "opacity-0",
          )}
        />
      )}

      {/* readability + seam fades */}
      <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/20 to-transparent" />
    </div>
  );
}
