"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skills, skillGroupColor, projects, type Skill } from "@/lib/data";
import { useIsMobile, useMounted } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const GalaxyScene = dynamic(() => import("./galaxy/GalaxyScene"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center font-mono text-xs text-ink-faint">
      initializing galaxy…
    </div>
  ),
});

const groups = ["AI", "Frontend", "Backend", "Infra"] as const;

function SkillDetail({ skill }: { skill: Skill | null }) {
  if (!skill) {
    return (
      <div className="flex h-full flex-col justify-center gap-3 text-sm text-ink-faint">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          select a node
        </p>
        <p className="max-w-xs text-pretty leading-relaxed">
          Drag your cursor to orbit the galaxy. Click any skill to see where it
          shows up across the missions.
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {groups.map((g) => (
            <span
              key={g}
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[10px] text-ink-dim"
            >
              <span
                className="size-2 rounded-full"
                style={{ background: skillGroupColor[g] }}
              />
              {g}
            </span>
          ))}
        </div>
      </div>
    );
  }

  const used = projects.filter((p) => skill.projects.includes(p.id));
  const color = skillGroupColor[skill.group];

  return (
    <motion.div
      key={skill.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex h-full flex-col gap-4"
    >
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em]">
        <span className="size-2 rounded-full" style={{ background: color }} />
        <span style={{ color }}>{skill.group}</span>
      </div>
      <h3 className="text-2xl font-semibold text-ink">{skill.label}</h3>

      <div>
        <div className="mb-1.5 flex justify-between text-[11px] text-ink-faint">
          <span>proficiency</span>
          <span className="tabular-nums">{Math.round(skill.level * 100)}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
          <motion.div
            className="h-full rounded-full"
            style={{ background: color }}
            initial={{ width: 0 }}
            animate={{ width: `${skill.level * 100}%` }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      <div className="mt-1">
        <p className="mb-2 text-[11px] uppercase tracking-wider text-ink-faint">
          used in
        </p>
        <div className="flex flex-col gap-2">
          {used.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between rounded-lg border border-line bg-white/[0.02] px-3 py-2"
            >
              <span className="text-sm text-ink">{p.name}</span>
              <span className="font-mono text-[10px] text-ink-faint">
                {p.code}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function SkillsGalaxy() {
  const mounted = useMounted();
  const isMobile = useIsMobile();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = skills.find((s) => s.id === selectedId) ?? null;

  return (
    <Section id="skills">
      <SectionHeading
        index="02"
        kicker="Skills Galaxy"
        title="A living constellation of capabilities."
        description="Every node is a tool I reach for in production. Orbit it, click it, and watch the missions that depend on it light up."
      />

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="glass relative h-[420px] overflow-hidden rounded-[var(--radius-lg)] md:h-[520px]">
          {mounted && !isMobile ? (
            <>
              <GalaxyScene
                selected={selectedId}
                onSelect={(id) => setSelectedId(id || null)}
              />
              <div className="pointer-events-none absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                galaxy.exe · drag to orbit
              </div>
            </>
          ) : (
            <MobileGalaxy
              selectedId={selectedId}
              onSelect={(id) => setSelectedId(id || null)}
            />
          )}
        </div>

        <div className="glass rounded-[var(--radius-lg)] p-6">
          <AnimatePresence mode="wait">
            <SkillDetail skill={selected} />
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}

/** Accessible, GPU-free fallback for phones / reduced environments. */
function MobileGalaxy({
  selectedId,
  onSelect,
}: {
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div data-lenis-prevent className="h-full overflow-y-auto p-5">
      <div className="flex flex-wrap content-start gap-2.5">
        {skills.map((s) => {
          const color = skillGroupColor[s.group];
          const active = s.id === selectedId;
          return (
            <button
              key={s.id}
              onClick={() => onSelect(active ? "" : s.id)}
              className={cn(
                "rounded-full border px-3 py-1.5 font-mono text-xs transition-all",
                active ? "text-ink" : "text-ink-dim",
              )}
              style={{
                borderColor: active ? color : "var(--color-line)",
                background: active
                  ? `color-mix(in oklab, ${color} 18%, transparent)`
                  : "rgba(255,255,255,0.02)",
                transform: `scale(${0.9 + s.level * 0.25})`,
              }}
            >
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
