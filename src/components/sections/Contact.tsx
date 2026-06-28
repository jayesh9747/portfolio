"use client";

import { motion } from "framer-motion";
import { Mail, Phone, ArrowUpRight, Check, Copy } from "lucide-react";
import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { profile } from "@/lib/data";

export function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  function handleEmailClick() {
    navigator.clipboard?.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
    window.location.href = `mailto:${profile.email}`;
  }

  return (
    <Section id="contact" className="pb-40">
      <div className="glass-strong relative overflow-hidden rounded-[var(--radius-xl)] px-6 py-16 text-center md:px-16 md:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_50%_-20%,rgba(109,139,255,0.16),transparent_55%)]" />
        <div className="grid-bg absolute inset-0 -z-10 opacity-20" />

        <Reveal>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
            // open a connection
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mx-auto mt-5 max-w-2xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-gradient md:text-6xl">
            Let&apos;s build something
            <br />
            worth remembering.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-md text-pretty text-ink-dim">
            {profile.availability}. The fastest way to reach me is email — I
            reply to everything thoughtful.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton
              variant="primary"
              onClick={handleEmailClick}
            >
              {copiedEmail ? (
                <>
                  <Check className="size-4 text-[#06070d]" /> Email Copied!
                </>
              ) : (
                <>
                  <Mail className="size-4" />
                  Email me
                </>
              )}
            </MagneticButton>

            <MagneticButton
              variant="outline"
              onClick={() => (window.location.href = `${profile.phoneHref}`)}
            >
              <Phone className="size-4" />
              {profile.phone}
            </MagneticButton>
            <MagneticButton
              variant="outline"
              onClick={() => window.open("https://www.linkedin.com/in/jayesh-savaliya/", "_blank")}
            >
              <ArrowUpRight className="size-4" />
              LinkedIn
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {profile.socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                whileHover={{ y: -2 }}
                className="group inline-flex items-center gap-1.5 font-mono text-sm text-ink-faint transition-colors hover:text-ink"
              >
                {s.label}
                <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.a>
            ))}
          </div>
        </Reveal>
      </div>

      <footer className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-line/60 pt-8 font-mono text-[11px] text-ink-faint md:flex-row">
        <span>
          © {new Date().getFullYear()} {profile.name}. {profile.os}
        </span>
        <span className="flex items-center gap-2">
          <span className="size-1.5 animate-pulse rounded-full bg-ok" />
          built with Next.js · React Three Fiber · Framer Motion
        </span>
      </footer>
    </Section>
  );
}
