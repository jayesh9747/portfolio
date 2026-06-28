"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  archNodes,
  archEdges,
  archKindColor,
  type ArchNode,
} from "@/lib/data";
import { cn } from "@/lib/utils";

const COLS = 5;

function pos(node: ArchNode) {
  const x = 8 + (node.col / (COLS - 1)) * 84; // 8%..92%
  const y = 14 + (node.row - 1) * 26; // rows ~1..3
  return { x, y };
}

export function Architecture() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const activeId = hovered ?? pinned;

  const positions = useMemo(() => {
    const map: Record<string, { x: number; y: number }> = {};
    archNodes.forEach((n) => (map[n.id] = pos(n)));
    return map;
  }, []);

  const connected = useMemo(() => {
    if (!activeId) return null;
    const set = new Set<string>([activeId]);
    archEdges.forEach((e) => {
      if (e.from === activeId) set.add(e.to);
      if (e.to === activeId) set.add(e.from);
    });
    return set;
  }, [activeId]);

  const detail = archNodes.find((n) => n.id === activeId) ?? null;

  return (
    <Section id="architecture">
      <SectionHeading
        index="05"
        kicker="Architecture Playground"
        title="How I think in systems."
        description="A reference architecture for the AI-native SaaS I build. Hover any node to trace its connections, understand the decision, and see how it scales."
      />

      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        {/* diagram */}
        <div className="glass relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] md:aspect-[16/10]">
          <div className="grid-bg absolute inset-0 opacity-30" />

          {/* layer labels */}
          <div className="pointer-events-none absolute inset-x-0 top-3 flex justify-between px-[6%] font-mono text-[9px] uppercase tracking-[0.15em] text-ink-faint">
            {["Client", "Edge", "Services", "AI", "Data"].map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>

          <svg
            className="absolute inset-0 size-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {archEdges.map((e, i) => {
              const a = positions[e.from];
              const b = positions[e.to];
              const active =
                activeId && (e.from === activeId || e.to === activeId);
              const midX = (a.x + b.x) / 2;
              return (
                <motion.path
                  key={i}
                  d={`M ${a.x} ${a.y} C ${midX} ${a.y}, ${midX} ${b.y}, ${b.x} ${b.y}`}
                  fill="none"
                  stroke={active ? "#56e1c7" : "#2a2e44"}
                  strokeWidth={active ? 0.7 : 0.4}
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.06 }}
                  style={{ filter: active ? "drop-shadow(0 0 4px #56e1c7)" : "none" }}
                />
              );
            })}
          </svg>

          {archNodes.map((n) => {
            const p = positions[n.id];
            const color = archKindColor[n.kind];
            const dim = connected ? !connected.has(n.id) : false;
            const isActive = activeId === n.id;
            return (
              <button
                key={n.id}
                onMouseEnter={() => setHovered(n.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setPinned(pinned === n.id ? null : n.id)}
                data-cursor="hover"
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                <motion.div
                  animate={{
                    opacity: dim ? 0.3 : 1,
                    scale: isActive ? 1.08 : 1,
                  }}
                  className={cn(
                    "whitespace-nowrap rounded-lg border px-2.5 py-1.5 text-center font-mono text-[10px] backdrop-blur-md transition-colors md:text-[11px]",
                  )}
                  style={{
                    borderColor: isActive ? color : "var(--color-line)",
                    background: isActive
                      ? `color-mix(in oklab, ${color} 16%, rgba(8,10,18,0.7))`
                      : "rgba(8,10,18,0.65)",
                    color: isActive ? "#fff" : "var(--color-ink-dim)",
                    boxShadow: isActive ? `0 0 24px -6px ${color}` : "none",
                  }}
                >
                  <span
                    className="mr-1.5 inline-block size-1.5 rounded-full align-middle"
                    style={{ background: color }}
                  />
                  {n.label}
                </motion.div>
              </button>
            );
          })}

          <div className="pointer-events-none absolute bottom-3 left-4 font-mono text-[9px] uppercase tracking-[0.15em] text-ink-faint">
            hover to trace · click to pin
          </div>
        </div>

        {/* detail panel */}
        <div className="glass flex min-h-[260px] flex-col rounded-[var(--radius-lg)] p-6">
          <AnimatePresence mode="wait">
            {detail ? (
              <motion.div
                key={detail.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em]">
                  <span
                    className="size-2 rounded-full"
                    style={{ background: archKindColor[detail.kind] }}
                  />
                  <span style={{ color: archKindColor[detail.kind] }}>
                    {detail.kind}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-ink">
                  {detail.label}
                </h3>
                <p className="text-pretty text-sm leading-relaxed text-ink-dim">
                  {detail.detail}
                </p>
                <div className="rounded-[var(--radius-md)] border-l-2 border-accent-2/50 bg-white/[0.02] py-2.5 pl-4 pr-3">
                  <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-accent-2">
                    scaling strategy
                  </div>
                  <p className="text-sm leading-relaxed text-ink-dim">
                    {detail.scaling}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-1 flex-col justify-center gap-3 text-sm text-ink-faint"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                  request flow
                </p>
                <p className="max-w-xs text-pretty leading-relaxed">
                  Client → Edge → API → (Workers / AI Agents) → Data. Hover any
                  node to understand the decision and its scaling story.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
