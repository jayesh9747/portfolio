"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <Section id="testimonials">
      <SectionHeading
        index="04"
        kicker="Client Feedback"
        title="What partners and clients say."
        description="Testimonials and reviews delivered through collaborative freelance engagements and open source contributions."
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mt-12 grid gap-6 md:grid-cols-3"
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="glass flex flex-col justify-between rounded-[var(--radius-lg)] p-6 md:p-8 relative overflow-hidden group"
          >
            <div className="absolute top-4 right-4 text-accent/10 group-hover:text-accent/20 transition-colors pointer-events-none">
              <Quote className="size-10 rotate-180" />
            </div>

            <p className="relative z-10 leading-relaxed text-sm md:text-base italic" style={{ color: "#ffffff" }}>
              &ldquo;{t.quote}&rdquo;
            </p>

            <div className="mt-8 flex items-center gap-4 border-t border-line/60 pt-6">
              <div
                className="grid size-10 shrink-0 place-items-center rounded-full font-mono text-sm font-semibold text-white"
                style={{ backgroundColor: t.color }}
                aria-hidden="true"
              >
                {t.avatar}
              </div>
              <div>
                <h4 className="font-semibold text-ink text-sm">{t.author}</h4>
                <p className="text-ink-faint text-xs mt-0.5">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
