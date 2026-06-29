"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile, projects, skills, timeline } from "@/lib/data";
import { scrollToSection } from "@/components/os/SmoothScroll";

type Line = { type: "in" | "out" | "sys"; text: string };

const PROMPT = `${profile.handle}@os`;

const HELP = `Available commands:
  about            who is ${profile.name}
  services         mvp & tech services I provide
  projects         list missions
  open <id>        open a mission (e.g. open gitflip)
  skills           list the stack
  experience       career timeline
  resume           summary + download
  contact          how to reach me
  social           links
  clear            clear the screen
  help             show this help`;

function runCommand(
  raw: string,
  push: (lines: Line[]) => void,
  clear: () => void,
) {
  const input = raw.trim();
  if (!input) return;
  const [cmd, ...args] = input.toLowerCase().split(/\s+/);
  const out: Line[] = [];

  switch (cmd) {
    case "help":
      out.push({ type: "out", text: HELP });
      break;
    case "about":
      out.push({
        type: "out",
        text: `${profile.name} — ${profile.role}\n${profile.tagline}\n${profile.yearsExperience}+ yrs · multiple products shipped · ${profile.location}`,
      });
      break;
    case "services":
      out.push({
        type: "out",
        text: `[Services & Expertise]
  - Web Apps     Next.js/React, performant Go/Node backends.
  - Mobile Apps  High-performance React Native (iOS/Android) experiences.
  - Backend/API  Robust microservices, secure REST/GraphQL, optimized databases.
  - Cloud/DevOps AWS infrastructure automation, Docker containerization, CI/CD.
  - AI/RAG       Agentic AI workflows, RAG pipelines, LangGraph, MCP integrations.
  - Open Source  CLI utilities, workflow tooling, CNCF maintainer.

Need a technical co-pilot or MVP built fast? Let's connect.`,
      });
      break;
    case "projects":
      out.push({
        type: "out",
        text: projects
          .map(
            (p) =>
              `  ${p.code}  ${p.name.padEnd(8)} ${p.status.padEnd(9)} — ${p.tagline}`,
          )
          .join("\n"),
      });
      out.push({
        type: "sys",
        text: `tip: open <id>  →  ${projects.map((p) => p.id).join(" · ")}`,
      });
      break;
    case "open": {
      const id = args[0]?.replace(/^project\s*/, "");
      const target = projects.find(
        (p) => p.id === id || p.name.toLowerCase() === id,
      );
      if (target) {
        out.push({ type: "out", text: `launching ${target.name}…` });
        scrollToSection("projects");
      } else {
        out.push({
          type: "out",
          text: `no mission "${args.join(" ")}". try: ${projects
            .map((p) => p.id)
            .join(", ")}`,
        });
      }
      break;
    }
    case "skills": {
      const byGroup: Record<string, string[]> = {};
      skills.forEach((s) => (byGroup[s.group] ??= []).push(s.label));
      out.push({
        type: "out",
        text: Object.entries(byGroup)
          .map(([g, list]) => `  ${g.padEnd(9)} ${list.join(", ")}`)
          .join("\n"),
      });
      break;
    }
    case "experience":
    case "timeline":
      out.push({
        type: "out",
        text: timeline
          .map((t) => `  ${t.range.padEnd(13)} ${t.title}  (${t.org})`)
          .join("\n"),
      });
      scrollToSection("timeline");
      break;
    case "resume":
      out.push({
        type: "out",
        text: `${profile.name} · ${profile.role}\n${profile.yearsExperience}+ years · ${profile.availability}\nStack: Python, Go, NestJS, React, React Native, Kubernetes, Docker, AWS`,
      });
      out.push({ type: "sys", text: "downloading resume (Jayesh_Savaliya_9747.pdf)..." });
      if (typeof window !== "undefined") {
        window.open("/Jayesh_Savaliya_9747.pdf", "_blank");
      }
      break;
    case "contact":
      out.push({
        type: "out",
        text: `email   ${profile.email}\nstatus  ${profile.availability}`,
      });
      scrollToSection("contact");
      break;
    case "social":
      out.push({
        type: "out",
        text: profile.socials
          .map((s) => `  ${s.label.padEnd(9)} ${s.handle}`)
          .join("\n"),
      });
      break;
    case "whoami":
      out.push({ type: "out", text: `${profile.handle} (guest session)` });
      break;
    case "ls":
      out.push({
        type: "out",
        text: "about  projects  skills  experience  resume  contact",
      });
      break;
    case "clear":
      clear();
      return;
    case "sudo":
      out.push({ type: "out", text: "nice try 😄 — permission denied." });
      break;
    default:
      out.push({
        type: "out",
        text: `command not found: ${cmd}. type "help".`,
      });
  }
  push(out);
}

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { type: "sys", text: `${profile.os} shell — type "help" to begin.` },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState<number>(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  function submit() {
    const value = input;
    if (!value.trim()) return;
    setLines((l) => [...l, { type: "in", text: value }]);
    setHistory((h) => [value, ...h]);
    setHIndex(-1);
    runCommand(
      value,
      (out) => setLines((l) => [...l, ...out]),
      () => setLines([]),
    );
    setInput("");
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") submit();
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(hIndex + 1, history.length - 1);
      if (history[next] !== undefined) {
        setHIndex(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = hIndex - 1;
      if (next < 0) {
        setHIndex(-1);
        setInput("");
      } else {
        setHIndex(next);
        setInput(history[next]);
      }
    }
  }

  return (
    <Section id="terminal">
      <SectionHeading
        index="07"
        kicker="Developer Terminal"
        title="For the people who'd rather type."
        description="A real command interface. Try help, services, projects, open gitflip, or skills — it actually runs."
      />

      <div
        className="glass-strong overflow-hidden rounded-[var(--radius-lg)]"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex items-center gap-3 border-b border-line/70 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="size-3 rounded-full bg-danger/80" />
            <span className="size-3 rounded-full bg-warn/80" />
            <span className="size-3 rounded-full bg-ok/80" />
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
            {PROMPT}: ~/jayesh9747.github.io
          </span>
        </div>

        <div
          ref={bodyRef}
          data-lenis-prevent
          className="h-[380px] overflow-y-auto p-4 font-mono text-[13px] leading-relaxed md:p-5"
        >
          {lines.map((line, i) => {
            if (line.type === "in")
              return (
                <div key={i} className="flex gap-2">
                  <span className="text-accent-2">{PROMPT}</span>
                  <span className="text-ink-faint">$</span>
                  <span className="text-ink">{line.text}</span>
                </div>
              );
            if (line.type === "sys")
              return (
                <div key={i} className="whitespace-pre-wrap text-ink-faint">
                  {line.text}
                </div>
              );
            return (
              <div key={i} className="mb-2 whitespace-pre-wrap text-ink-dim">
                {line.text}
              </div>
            );
          })}

          {/* live prompt */}
          <div className="flex items-center gap-2">
            <span className="text-accent-2">{PROMPT}</span>
            <span className="text-ink-faint">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal input"
              className="flex-1 bg-transparent text-ink caret-accent-2 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
