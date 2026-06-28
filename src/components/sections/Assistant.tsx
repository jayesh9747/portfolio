"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, CornerDownLeft, Sparkles, User } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { answer, suggestedQuestions, type Source } from "@/lib/knowledge";
import { profile } from "@/lib/data";
import { scrollToSection } from "@/components/os/SmoothScroll";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
  sources?: Source[];
  typing?: boolean;
};

let msgId = 0;
const nextId = () => `m${msgId++}`;

export function Assistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: nextId(),
      role: "assistant",
      text: `Hi — I'm ${profile.os}'s assistant. Ask me anything about ${profile.name}'s projects, skills, experience or how to get in touch.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    setBusy(true);
    setInput("");

    const userMsg: Message = { id: nextId(), role: "user", text: q };
    const typingId = nextId();
    setMessages((m) => [
      ...m,
      userMsg,
      { id: typingId, role: "assistant", text: "", typing: true },
    ]);

    // Simulate retrieval + streaming for a premium feel.
    const res = answer(q);
    await new Promise((r) => setTimeout(r, 450));

    // stream tokens
    const words = res.text.split(" ");
    for (let i = 0; i < words.length; i++) {
      await new Promise((r) => setTimeout(r, 18));
      const partial = words.slice(0, i + 1).join(" ");
      setMessages((m) =>
        m.map((msg) =>
          msg.id === typingId
            ? { ...msg, text: partial, typing: i < words.length - 1 }
            : msg,
        ),
      );
    }
    setMessages((m) =>
      m.map((msg) =>
        msg.id === typingId
          ? { ...msg, text: res.text, sources: res.sources, typing: false }
          : msg,
      ),
    );
    setBusy(false);
  }

  return (
    <Section id="assistant">
      <SectionHeading
        index="06"
        kicker="AI Assistant"
        title="Don't read the portfolio. Interrogate it."
        description="A retrieval assistant grounded in this portfolio's data. Ask a question the way a recruiter would — it answers and points you to the right panel."
      />

      <div className="glass-strong overflow-hidden rounded-[var(--radius-lg)]">
        {/* window chrome */}
        <div className="flex items-center gap-3 border-b border-line/70 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="size-3 rounded-full bg-danger/80" />
            <span className="size-3 rounded-full bg-warn/80" />
            <span className="size-3 rounded-full bg-ok/80" />
          </div>
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
            <Bot className="size-3.5 text-accent-2" />
            assistant://{profile.handle}
          </span>
          <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-ink-faint">
            <span className="size-1.5 animate-pulse rounded-full bg-ok" />
            online
          </span>
        </div>

        {/* messages */}
        <div
          ref={scrollRef}
          data-lenis-prevent
          className="h-[360px] space-y-4 overflow-y-auto p-5 md:p-6"
        >
          {messages.map((m) => (
            <Bubble key={m.id} message={m} />
          ))}
        </div>

        {/* suggestions */}
        <div className="flex flex-wrap gap-2 border-t border-line/70 px-5 py-3">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              disabled={busy}
              data-cursor="hover"
              className="rounded-full border border-line bg-white/[0.02] px-3 py-1.5 text-xs text-ink-dim transition-colors hover:border-accent/40 hover:text-ink disabled:opacity-40"
            >
              {q}
            </button>
          ))}
        </div>

        {/* input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-3 border-t border-line/70 p-3"
        >
          <Sparkles className="ml-2 size-4 shrink-0 text-accent-2" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask about ${profile.name}…`}
            className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            data-cursor="hover"
            className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white/[0.03] px-3 py-1.5 text-xs text-ink-dim transition-colors hover:text-ink disabled:opacity-40"
          >
            send
            <CornerDownLeft className="size-3.5" />
          </button>
        </form>
      </div>
    </Section>
  );
}

function Bubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}
    >
      <div
        className={`grid size-7 shrink-0 place-items-center rounded-lg border ${
          isUser
            ? "border-accent/30 bg-accent/10 text-accent"
            : "border-accent-2/30 bg-accent-2/10 text-accent-2"
        }`}
      >
        {isUser ? <User className="size-3.5" /> : <Bot className="size-3.5" />}
      </div>
      <div className={`max-w-[80%] ${isUser ? "items-end" : ""}`}>
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
            isUser
              ? "bg-accent/15 text-ink"
              : "border border-line bg-white/[0.02] text-ink-dim"
          }`}
        >
          {message.typing && !message.text ? (
            <TypingDots />
          ) : (
            <span className="whitespace-pre-wrap">{message.text}</span>
          )}
          {message.typing && message.text && (
            <span className="animate-blink">▋</span>
          )}
        </div>
        <AnimatePresence>
          {message.sources && message.sources.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 flex flex-wrap gap-1.5"
            >
              {message.sources.map((s) => (
                <button
                  key={s.anchor + s.label}
                  onClick={() => scrollToSection(s.anchor)}
                  data-cursor="hover"
                  className="inline-flex items-center gap-1 rounded-md border border-line bg-white/[0.02] px-2 py-0.5 font-mono text-[10px] text-ink-faint transition-colors hover:text-accent-2"
                >
                  ↳ {s.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function TypingDots() {
  return (
    <span className="flex gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-1.5 rounded-full bg-ink-faint"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </span>
  );
}
