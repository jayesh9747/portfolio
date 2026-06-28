<div align="center">

# JAYESH.OS

**An operating-system–style portfolio for an AI Product Engineer.**

Not a website — an experience. A cinematic boot sequence, glass panels with
dynamic lighting, a 3D skills galaxy, mission-style case studies, an interactive
architecture playground, a grounded AI assistant, and a real developer terminal.

[**Live → jayesh9747.github.io**](https://jayesh9747.github.io)

`Next.js` · `React 19` · `TypeScript` · `Tailwind v4` · `Framer Motion` · `React Three Fiber` · `Lenis`

</div>

---

## Highlights

- **Cinematic boot** — an OS-style startup sequence that resolves into the interface.
- **Interactive career timeline** — scrub the journey; metrics count up on reveal.
- **Skills galaxy** — a 3D constellation (React Three Fiber); click a skill and the
  projects that use it light up. Accessible tag-cloud fallback on touch devices.
- **Project command center** — real case studies (GitFlip, QwikAid, Transpectra, Rizzl, Eduteck) with architecture, decisions, challenges and outcomes.
- **Architecture playground** — an interactive system diagram that traces request
  flow and explains scaling decisions on hover.
- **AI assistant** — a retrieval assistant grounded in the portfolio's own data.
- **Developer terminal** — a real command interface (`help`, `projects`,
  `open <id>`, `skills`, `resume`, `contact`).
- **Built for performance & SEO** — static export, lazy-loaded 3D, motion that
  respects `prefers-reduced-motion`, full metadata + JSON-LD.

## Tech stack

| Layer | Choice |
|------|--------|
| Framework | Next.js (App Router) + React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (design tokens via `@theme`) |
| Motion | Framer Motion |
| 3D | React Three Fiber + drei + Three.js |
| Smooth scroll | Lenis |
| Hosting | GitHub Pages (static export) via GitHub Actions |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → ./out
```

> The boot animation plays once per browser session. To replay it, run
> `sessionStorage.clear()` in the console and refresh.

## Project structure

```
src/
├─ app/            layout, page composition, global styles, SEO routes
├─ components/
│  ├─ os/          the OS shell — boot, cursor, ambient bg, dock, smooth scroll
│  ├─ sections/    hero, timeline, skills galaxy, projects, architecture,
│  │               assistant, terminal, contact
│  └─ ui/          design-system primitives (Reveal, GlassPanel, MagneticButton…)
└─ lib/
   ├─ data.ts      ← single source of truth: profile, timeline, skills, projects
   ├─ knowledge.ts retrieval engine powering the AI assistant
   ├─ hooks.ts     media-query / reduced-motion / mounted helpers
   └─ utils.ts     cn(), lerp, clamp, mapRange
```

**Everything content-related lives in [`src/lib/data.ts`](src/lib/data.ts).**
Edit that one file and the entire site updates.

## Deployment

Pushing to `main` triggers a GitHub Actions workflow that builds the static
export and publishes it to GitHub Pages. Configured for a root user-site
(no `basePath`); see [`next.config.ts`](next.config.ts) for project-page setup.

---

<div align="center">
<sub>Designed & built by Jayesh.</sub>
</div>
