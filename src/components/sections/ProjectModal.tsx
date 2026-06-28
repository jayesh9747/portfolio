"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Cpu, GitFork, AlertTriangle, Trophy, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/data";
import { ProjectShot } from "./ProjectShot";

function Block({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
        <Icon className="size-4" />
        {title}
      </div>
      {children}
    </div>
  );
}

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          data-lenis-prevent
          className="fixed inset-0 z-[150] flex items-start justify-center overflow-y-auto p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="fixed inset-0 bg-void/80 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong relative z-10 my-auto w-full max-w-3xl overflow-hidden rounded-[var(--radius-xl)]"
          >
            {/* header / live preview surface */}
            <div className="relative h-48 overflow-hidden border-b border-line/60 md:h-64">
              <ProjectShot
                shot={project.shot}
                accent={project.accent}
                name={project.name}
                className="absolute inset-0 size-full"
              />
              {/* readability scrim so header text always reads over the shot */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-void/85 to-void/45" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-2">
                  <span className="size-1 rounded-full bg-accent-2" />
                  {project.role}
                </div>
                <span className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-ink-dim">
                  {project.code} · {project.year}
                </span>
                <h3 className="mt-1 text-4xl font-semibold tracking-tight text-ink">
                  {project.name}
                </h3>
                <p className="mt-1 text-ink-dim">{project.tagline}</p>
              </div>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-line bg-void/50 px-3 py-1.5 font-mono text-[11px] text-ink-dim backdrop-blur-md transition-colors hover:text-ink"
                >
                  visit <ExternalLink className="size-3.5" />
                </a>
              )}
              <button
                onClick={onClose}
                data-cursor="hover"
                aria-label="Close"
                className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-line bg-void/40 text-ink-dim backdrop-blur-md transition-colors hover:text-ink"
              >
                <X className="size-4" />
              </button>
            </div>

            <div data-lenis-prevent className="max-h-[60vh] overflow-y-auto p-6 md:p-8">
              {/* metrics */}
              <div className="grid grid-cols-3 gap-3">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-[var(--radius-md)] border border-line bg-white/[0.02] p-3 text-center"
                  >
                    <div className="font-mono text-base font-semibold text-ink">
                      {m.value}
                    </div>
                    <div className="mt-0.5 text-[10px] uppercase tracking-wider text-ink-faint">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-7 text-pretty leading-relaxed text-ink-dim">
                {project.overview}
              </p>

              <div className="mt-6 rounded-[var(--radius-md)] border border-line/70 bg-white/[0.015] p-4">
                <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
                  the problem
                </div>
                <p className="text-pretty leading-relaxed text-ink-dim">
                  {project.problem}
                </p>
              </div>

              <div className="mt-8 space-y-8">
                <Block icon={Cpu} title="Architecture">
                  <ul className="space-y-2">
                    {project.architecture.map((a) => (
                      <li
                        key={a}
                        className="flex gap-3 text-sm leading-relaxed text-ink-dim"
                      >
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </Block>

                <Block icon={GitFork} title="Technical decisions">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {project.decisions.map((d) => (
                      <div
                        key={d.title}
                        className="rounded-[var(--radius-md)] border border-line bg-white/[0.02] p-4"
                      >
                        <div className="text-sm font-medium text-ink">
                          {d.title}
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink-faint">
                          {d.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </Block>

                <Block icon={AlertTriangle} title="Challenges & solutions">
                  <div className="space-y-3">
                    {project.challenges.map((c) => (
                      <div
                        key={c.title}
                        className="rounded-[var(--radius-md)] border-l-2 border-warn/50 bg-white/[0.02] py-2 pl-4 pr-3"
                      >
                        <div className="text-sm font-medium text-ink">
                          {c.title}
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-ink-faint">
                          {c.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </Block>

                <Block icon={Trophy} title="Results">
                  <ul className="space-y-2">
                    {project.results.map((r) => (
                      <li
                        key={r}
                        className="flex gap-3 text-sm leading-relaxed text-ink"
                      >
                        <Trophy className="mt-0.5 size-4 shrink-0 text-ok" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </Block>
              </div>

              <div className="mt-8 flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-line bg-white/[0.02] px-2.5 py-1 font-mono text-[11px] text-ink-dim"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
