"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CountUp } from "@/components/ui/CountUp";
import { timeline } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Timeline() {
  const [active, setActive] = useState(timeline.length - 1);
  const node = timeline[active];

  return (
    <Section id="timeline">
      <SectionHeading
        index="01"
        kicker="Career Timeline"
        title="A journey from pixels to AI products."
        description="Hover a node to scrub the journey. Select one to expand the mission log — the stack, the metrics, the wins."
      />

      {/* Rail */}
      <div className="relative mt-10">
        <div className="absolute left-0 right-0 top-5 h-px bg-line md:top-6" />
        <motion.div
          className="absolute left-0 top-5 h-px bg-gradient-to-r from-accent via-accent-2 to-accent-3 md:top-6"
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />

        <div className="grid grid-cols-2 gap-y-8 md:grid-cols-6 md:gap-0">
          {timeline.map((t, i) => {
            const selected = i === active;
            return (
              <button
                key={t.id}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                data-cursor="hover"
                className="group relative flex flex-col items-start gap-3 px-1 text-left md:items-center md:text-center"
              >
                <span className="relative z-10 grid place-items-center">
                  <span
                    className={cn(
                      "size-3 rounded-full border-2 transition-all duration-300",
                      selected
                        ? "scale-125 border-accent-2 bg-accent-2"
                        : "border-line bg-base group-hover:border-accent",
                    )}
                  />
                  {selected && (
                    <motion.span
                      layoutId="tl-ring"
                      className="absolute size-7 rounded-full ring-1 ring-accent-2/50"
                    />
                  )}
                </span>
                <div className="md:px-2">
                  <div
                    className={cn(
                      "font-mono text-xs transition-colors",
                      selected ? "text-accent-2" : "text-ink-faint",
                    )}
                  >
                    {t.year}
                  </div>
                  <div
                    className={cn(
                      "mt-1 text-sm font-medium transition-colors",
                      selected ? "text-ink" : "text-ink-dim group-hover:text-ink",
                    )}
                  >
                    {t.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Expanded detail */}
      <div className="mt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="glass grid gap-8 rounded-[var(--radius-lg)] p-6 md:grid-cols-[1.4fr_1fr] md:p-9"
          >
            <div>
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                {node.range}
                <span className="h-px w-6 bg-accent/50" />
                {node.org}
              </div>
              <h3 className="mt-3 text-2xl font-semibold text-ink">{node.title}</h3>
              <p className="mt-3 max-w-xl text-pretty leading-relaxed text-ink-dim">
                {node.summary}
              </p>

              <ul className="mt-5 space-y-2.5">
                {node.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm text-ink-dim">
                    <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-accent-2" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {node.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-line bg-white/[0.02] px-3 py-1 font-mono text-[11px] text-ink-dim"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 self-start">
              {node.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-[var(--radius-md)] border border-line bg-white/[0.02] p-5"
                >
                  <div className="text-3xl font-semibold tabular-nums text-gradient-accent">
                    <CountUp
                      to={m.value}
                      prefix={m.prefix}
                      suffix={m.suffix}
                    />
                  </div>
                  <div className="mt-1 text-xs text-ink-faint">{m.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}
