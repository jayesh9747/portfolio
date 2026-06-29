import { profile, projects, skills, timeline } from "./data";

/* ============================================================
   Local "AI" assistant — a lightweight retrieval engine over
   the portfolio data. No API key required; runs fully client
   side.
   ============================================================ */

export type Source = { label: string; anchor: string };

export type Answer = {
  text: string;
  sources: Source[];
};

type Doc = {
  id: string;
  keywords: string[];
  anchor: string;
  label: string;
  build: () => string;
};

const yearsLine = `${profile.name} has ${profile.yearsExperience}+ years of professional experience and has shipped multiple products across AI, SaaS, and cloud-native architectures.`;

const docs: Doc[] = [
  {
    id: "intro",
    label: "About",
    anchor: "hero",
    keywords: ["who", "you", "jayesh", "about", "intro", "yourself", "role", "do"],
    build: () =>
      `${profile.name} is a ${profile.role} — ${profile.tagline} ${yearsLine} Currently: ${profile.availability}.`,
  },
  {
    id: "experience",
    label: "Timeline",
    anchor: "timeline",
    keywords: ["experience", "years", "career", "journey", "history", "background", "long", "started", "worked", "intern"],
    build: () =>
      `${yearsLine} The journey: ${timeline
        .map((t) => `${t.range} as ${t.title} (${t.org})`)
        .join("; ")}.`,
  },
  {
    id: "skills",
    label: "Skills",
    anchor: "skills",
    keywords: ["skill", "skills", "tech", "stack", "tools", "languages", "know", "technologies", "kubernetes", "go", "python"],
    build: () => {
      const byGroup: Record<string, string[]> = {};
      for (const s of skills) (byGroup[s.group] ??= []).push(s.label);
      return `Core stack — ${Object.entries(byGroup)
        .map(([g, list]) => `${g}: ${list.join(", ")}`)
        .join(" · ")}.`;
    },
  },
  {
    id: "services",
    label: "Services",
    anchor: "terminal",
    keywords: ["service", "services", "offer", "offering", "do you do", "help", "build", "mvp", "startup", "startups", "provide", "expert", "expertise"],
    build: () =>
      `${profile.name} provides end-to-end MVP development and scalability solutions for startups. Services include: 1) Full-Stack Web Apps (Next.js/React, Go/Node backends); 2) Mobile Apps (React Native iOS/Android); 3) Backend & APIs (Microservices, secure REST/GraphQL, optimized databases); 4) Cloud & DevOps (AWS, Docker containerization, CI/CD); 5) AI Integration (Agentic workflows, RAG pipelines, LangGraph, MCP); 6) Open Source & Tooling.`,
  },
  {
    id: "ai",
    label: "AI & RAG work",
    anchor: "projects",
    keywords: ["ai", "agent", "agents", "llm", "langchain", "mcp", "rag", "gemini", "model", "models", "openai"],
    build: () =>
      `On the AI side, ${profile.name} builds Agentic AI workflows and tools: on QwikAid he built an Agentic AI chatbot using LangChain for roadside booking and payments with MCP; on Transpectra he integrated Gemini AI for demand forecasting and routing optimization; and at Tarana Wireless he developed an MCP service deployed on AWS to automate Jira tracking.`,
  },
  {
    id: "projects",
    label: "Projects",
    anchor: "projects",
    keywords: ["project", "projects", "built", "build", "work", "shipped", "portfolio", "case"],
    build: () =>
      `${profile.name} has built: ${projects
        .map((p) => `${p.name} — ${p.tagline} (${p.stack.slice(0, 3).join(", ")})`)
        .join("; ")}.`,
  },
  {
    id: "contact",
    label: "Contact",
    anchor: "contact",
    keywords: ["touch", "get in touch", "contact", "email", "mail", "hire", "reach", "available", "availability", "talk", "connect", "linkedin", "phone", "number", "call", "schedule", "meet", "meeting"],
    build: () =>
      `${profile.availability}. Reach out at email: ${profile.email}, phone: ${profile.phone}, LinkedIn: linkedin.com/in/jayesh-savaliya, or use the "Schedule 30-Min Meet" action in the Contact panel.`,
  },
];

// Per-project docs so "tell me about GitFlip" works.
for (const p of projects) {
  docs.push({
    id: `project-${p.id}`,
    label: p.name,
    anchor: "projects",
    keywords: [p.name.toLowerCase(), p.id, ...p.stack.map((s) => s.toLowerCase())],
    build: () =>
      `${p.name} (${p.status.toLowerCase()}) — ${p.overview} Stack: ${p.stack.join(
        ", ",
      )}. Key results: ${p.results.join(" ")}`,
  });
}

function score(query: string, doc: Doc) {
  const q = query.toLowerCase();
  const tokens = q.split(/[^a-z0-9]+/).filter(Boolean);
  let s = 0;
  for (const kw of doc.keywords) {
    if (q.includes(kw)) s += kw.length > 4 ? 3 : 2;
    for (const t of tokens) {
      if (t === kw) s += 3;
      else if (kw.includes(t) && t.length > 3) s += 1;
    }
  }
  return s;
}

export const suggestedQuestions = [
  "What projects has Jayesh built?",
  "What services does he provide?",
  "What AI systems has he worked on?",
  "What's the tech stack?",
  "How can I get in touch?",
];

export function answer(query: string): Answer {
  const q = query.trim();
  if (!q) {
    return {
      text: `Ask me anything about ${profile.name} — projects, experience, the AI work, or how to get in touch.`,
      sources: [],
    };
  }

  const ranked = docs
    .map((d) => ({ d, s: score(q, d) }))
    .sort((a, b) => b.s - a.s);

  const top = ranked[0];
  if (!top || top.s === 0) {
    return {
      text: `I'm tuned to ${profile.name}'s portfolio. Try asking about projects, skills, AI experience, or contact. For example: "${suggestedQuestions[0]}"`,
      sources: [],
    };
  }

  const picks = ranked.filter((r) => r.s >= Math.max(2, top.s * 0.6)).slice(0, 2);
  const text = picks.map((p) => p.d.build()).join("\n\n");
  const sources = picks.map((p) => ({ label: p.d.label, anchor: p.d.anchor }));
  return { text, sources };
}
