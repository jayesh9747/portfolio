"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Radio } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, revealItem } from "@/components/ui/Reveal";
import { projects, type Project } from "@/lib/data";
import { ProjectModal } from "./ProjectModal";
import { ProjectShot } from "./ProjectShot";
import { cn } from "@/lib/utils";

const statusStyle: Record<Project["status"], string> = {
  COMPLETED: "text-ok border-ok/30 bg-ok/10",
  ACTIVE: "text-accent-2 border-accent-2/30 bg-accent-2/10",
  SCALING: "text-warn border-warn/30 bg-warn/10",
};

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <Section id="projects">
      <SectionHeading
        index="03"
        kicker="Project Command Center"
        title="Missions, not screenshots."
        description="Each card is a real build. Open one for the full mission log — architecture, the decisions behind it, the hard problems, and the outcomes."
      />

      <RevealGroup className="grid gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <motion.button
            key={p.id}
            variants={revealItem}
            onClick={() => setOpen(p)}
            data-cursor="hover"
            data-cursor-label="open"
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="group relative overflow-hidden rounded-[var(--radius-lg)] border border-line bg-panel/60 text-left backdrop-blur-xl"
          >
            {/* live preview */}
            <div className="relative">
              <ProjectShot
                shot={p.shot}
                accent={p.accent}
                name={p.name}
                className="h-44 w-full transition-transform duration-700 group-hover:scale-[1.03] md:h-48"
              />
              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                <span className="rounded-md bg-void/50 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.25em] text-ink-dim backdrop-blur-md">
                  {p.code}
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider backdrop-blur-md",
                    statusStyle[p.status],
                  )}
                >
                  <Radio className="size-3" />
                  {p.status}
                </span>
              </div>
            </div>

            {/* hover glow following accent */}
            <div
              className="pointer-events-none absolute -right-20 top-24 size-56 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
              style={{ background: p.accent }}
            />

            <div className="relative p-6">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-accent-2">
              <span className="size-1 rounded-full bg-accent-2" />
              {p.role}
            </div>
            <h3 className="relative mt-2 text-2xl font-semibold tracking-tight text-ink">
              {p.name}
            </h3>
            <p className="relative mt-2 max-w-md text-pretty text-sm text-ink-dim">
              {p.tagline}
            </p>

            <div className="relative mt-6 grid grid-cols-3 gap-3 border-t border-line/70 pt-5">
              {p.metrics.map((m) => (
                <div key={m.label}>
                  <div className="font-mono text-sm font-medium text-ink">
                    {m.value}
                  </div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-wider text-ink-faint">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="relative mt-6 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {p.stack.slice(0, 4).map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-line bg-white/[0.02] px-2 py-0.5 font-mono text-[10px] text-ink-dim"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-ink-dim transition-colors group-hover:text-accent-2">
                Launch
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
            </div>
          </motion.button>
        ))}
      </RevealGroup>

      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </Section>
  );
}
