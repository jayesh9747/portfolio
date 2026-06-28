"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";

function useClock() {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function TopBar() {
  const time = useClock();
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex h-9 items-center justify-between border-b border-line/60 bg-void/50 px-4 backdrop-blur-xl"
    >
      <div className="flex items-center gap-4 font-mono text-[11px]">
        <span className="font-semibold tracking-tight text-ink">{profile.os}</span>
        <span className="hidden items-center gap-1.5 text-ink-faint sm:flex">
          <span className="size-1.5 animate-pulse rounded-full bg-ok" />
          all systems nominal
        </span>
      </div>
      <div className="flex items-center gap-4 font-mono text-[11px] text-ink-faint">
        <span className="hidden md:inline">{profile.location}</span>
        <span className="hidden h-3 w-px bg-line md:inline-block" />
        <span className="tabular-nums text-ink-dim">{time}</span>
      </div>
    </motion.header>
  );
}
