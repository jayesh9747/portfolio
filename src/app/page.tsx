import { Hero } from "@/components/sections/Hero";
import { Timeline } from "@/components/sections/Timeline";
import { SkillsGalaxy } from "@/components/sections/SkillsGalaxy";
import { Projects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";
import { Architecture } from "@/components/sections/Architecture";
import { Assistant } from "@/components/sections/Assistant";
import { Terminal } from "@/components/sections/Terminal";
import { Contact } from "@/components/sections/Contact";
import { profile } from "@/lib/data";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    description: profile.tagline,
    email: profile.email,
    url: "https://jayesh9747.github.io",
    knowsAbout: [
      "AI Engineering",
      "SaaS Architecture",
      "Next.js",
      "React",
      "LLM Agents",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Timeline />
      <SkillsGalaxy />
      <Projects />
      <Testimonials />
      <Architecture />
      <Assistant />
      <Terminal />
      <Contact />
    </>
  );
}
