/* ============================================================
   Portfolio data — the single source of truth for JAYESH.OS
   Edit this file to make the OS your own.
   ============================================================ */

export const profile = {
  name: "Jayesh",
  handle: "jayesh",
  os: "JAYESH.OS",
  role: "Full-Stack AI & Cloud-Native Developer",
  title: "Full-Stack AI & Cloud-Native Developer",
  // Cycled through by the hero typewriter.
  roles: [
    "Full-Stack Developer",
    "Cloud-Native Engineer",
    "AI & RAG Developer",
    "Open Source Maintainer",
  ],
  tagline:
    "I build end-to-end full-stack products, cloud-native infrastructure, and AI/RAG pipelines that scale.",
  location: "Pune, India · GMT+5:30",
  email: "jsavaliya.tech@gmail.com",
  phone: "+91 7490811091",
  phoneHref: "tel:+917490811091",
  availability: "Open to freelance & contract roles",
  yearsExperience: 2,
  shipped: 10,
  bootLines: [
    "Full-Stack Development",
    "Cloud-Native Systems",
    "Kubernetes & Service Mesh",
    "Agentic AI & RAG",
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/jayesh9747", handle: "@jayesh9747" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jayesh-savaliya/", handle: "/in/jayesh-savaliya" },
    { label: "Email", href: "mailto:jsavaliya.tech@gmail.com", handle: "jsavaliya.tech@gmail.com" },
    { label: "Phone", href: "tel:+917490811091", handle: "+91 7490811091" },
  ],
} as const;

/* ---------------------------------------------------------- */
/* Career timeline                                            */
/* ---------------------------------------------------------- */

export type TimelineNode = {
  id: string;
  year: string;
  range: string;
  title: string;
  org: string;
  summary: string;
  stack: string[];
  metrics: { label: string; value: number; suffix?: string; prefix?: string }[];
  highlights: string[];
};

export const timeline: TimelineNode[] = [
  {
    id: "tarana",
    year: "2025",
    range: "Nov 2025 — Present",
    title: "SDE Intern",
    org: "Tarana Wireless",
    summary:
      "Developed end-to-end test suites for telemetry microservices. Engineered automated utilities and Dockerized MCP services.",
    stack: ["Python", "Playwright", "Pytest", "Docker", "AWS", "Kafka", "InfluxDB"],
    metrics: [
      { label: "Test Coverage", value: 92, suffix: "%" },
      { label: "Services Tested", value: 6, suffix: "+" },
    ],
    highlights: [
      "Developed end-to-end test suites for telemetry microservices using Python, Playwright, and Pytest.",
      "Engineered an MCP service to automate Jira/Zephyr ticket creation and tracking, deployed using Docker on AWS EC2.",
      "Designed and executed API and unit tests, debugging service issues via InfluxDB, Kibana, and Kafka.",
    ],
  },
  {
    id: "rizzl-lead",
    year: "2025",
    range: "Nov 2025 — Jan 2026",
    title: "Tech Lead",
    org: "Rizzl",
    summary:
      "Built and deployed a full-stack product from scratch (mobile app, brand portal, admin panel). Owned security, database migrations, and deployments.",
    stack: ["React Native", "Express.js", "Prisma", "PostgreSQL", "AWS EC2/RDS", "Redis", "OAuth"],
    metrics: [
      { label: "Apps Shipped", value: 3, suffix: "" },
      { label: "Active Users", value: 1, suffix: "k+" },
    ],
    highlights: [
      "Built and deployed mobile app, admin panel, and brand portal using React Native, Express, Prisma, and PostgreSQL.",
      "Implemented secure authentication flows including phone OTP and Instagram OAuth with custom encryption.",
      "Designed a cached payout calculation service based on engagement metrics using Redis and automated cron jobs.",
    ],
  },
  {
    id: "hcw",
    year: "2025",
    range: "Jun 2025 — Aug 2025",
    title: "Backend Developer",
    org: "HCW-labsis (C4GT)",
    summary:
      "Migrated secure telemedicine backend to NestJS modular architecture. Integrated WebRTC video/audio communications.",
    stack: ["NestJS", "Prisma", "PostgreSQL", "WebRTC", "Express.js", "Swagger", "TypeScript"],
    metrics: [
      { label: "Services Migrated", value: 100, suffix: "%" },
      { label: "API Endpoints", value: 50, suffix: "+" },
    ],
    highlights: [
      "Migrated telemedicine backend from Express.js to NestJS modular architecture for better scalability.",
      "Integrated Prisma ORM with optimized PostgreSQL database schema design for complex healthcare data operations.",
      "Engineered WebRTC-based communication features (chat, audio, video calls) and provided full Swagger docs.",
    ],
  },
  {
    id: "kmesh",
    year: "2025",
    range: "Mar 2025 — May 2025",
    title: "LFX Mentee & Maintainer",
    org: "Kmesh (CNCF)",
    summary:
      "Designed and developed the deployment and topology management dashboard for the eBPF-based service mesh.",
    stack: ["Go", "React", "Kubernetes", "Helm", "Gin", "client-go", "Docusaurus"],
    metrics: [
      { label: "Maintainers", value: 1, suffix: " (CNCF)" },
      { label: "Dashboard Latency", value: 120, suffix: "ms" },
    ],
    highlights: [
      "Designed and developed a web dashboard to simplify Kmesh service mesh deployment and management on Kubernetes.",
      "Built backend services in Go with Gin and client-go to interact with cluster resources and custom CRDs.",
      "Developed React frontend modules to visualize service mesh topology, traffic flows, and cluster logs.",
      "Recognized as an official CNCF Kmesh maintainer for consistent repository contributions.",
    ],
  },
  {
    id: "mazinda",
    year: "2024",
    range: "Dec 2024 — Jan 2025",
    title: "Fullstack Developer",
    org: "Mazinda",
    summary:
      "Built the seller onboarding mobile application and a high-performance pricing service with geospatial queries.",
    stack: ["React Native", "NestJS", "MongoDB", "TypeScript", "AWS", "Geospatial"],
    metrics: [
      { label: "Sellers Onboarded", value: 500, suffix: "+" },
      { label: "API Speedup", value: 2, suffix: "x" },
    ],
    highlights: [
      "Developed seller app using React Native and TypeScript, covering onboarding and verification workflows.",
      "Designed a pricing microservice in NestJS and MongoDB using geospatial queries and indexing for dynamic calculations.",
      "Deployed backend services on AWS EC2 to ensure high availability.",
    ],
  },
  {
    id: "shikshalokam",
    year: "2024",
    range: "Jun 2024 — Aug 2024",
    title: "Backend Developer",
    org: "ShikshaLokam (C4GT)",
    summary:
      "Wrote high-throughput data migration scripts to transform and move MongoDB documents asynchronously.",
    stack: ["JavaScript", "MongoDB", "Redis", "Node.js", "Data Migration"],
    metrics: [
      { label: "Docs Migrated", value: 100, suffix: "k+" },
      { label: "Batch Speed", value: 500, suffix: "/sec" },
    ],
    highlights: [
      "Developed high-throughput data migration scripts to transfer MongoDB documents with schema transformations.",
      "Implemented asynchronous processing in JavaScript for large-scale document migration using batching.",
      "Built secure request utilities and integrated Redis caching to optimize migration performance.",
    ],
  },
];

/* ---------------------------------------------------------- */
/* Skills galaxy                                              */
/* ---------------------------------------------------------- */

export type Skill = {
  id: string;
  label: string;
  group: "AI" | "Frontend" | "Backend" | "Infra";
  level: number; // 0..1 — affects node size
  projects: string[]; // project ids using this skill
};

export const skills: Skill[] = [
  // Frontend
  { id: "react", label: "React & React Native", group: "Frontend", level: 0.95, projects: ["rizzl", "qwikaid", "kmesh", "transpectra", "eduteck"] },
  { id: "typescript", label: "TypeScript", group: "Frontend", level: 0.92, projects: ["rizzl", "qwikaid", "hcw", "mazinda", "transpectra"] },
  { id: "nextjs", label: "Next.js", group: "Frontend", level: 0.88, projects: ["transpectra"] },
  { id: "tailwind", label: "Tailwind CSS", group: "Frontend", level: 0.9, projects: ["eduteck", "transpectra"] },
  { id: "docusaurus", label: "Docusaurus", group: "Frontend", level: 0.85, projects: ["kmesh"] },
  
  // Backend
  { id: "node", label: "Node.js & Express", group: "Backend", level: 0.9, projects: ["rizzl", "hcw", "transpectra", "shikshalokam"] },
  { id: "nestjs", label: "NestJS", group: "Backend", level: 0.9, projects: ["hcw", "qwikaid", "mazinda"] },
  { id: "go", label: "Go (Golang)", group: "Backend", level: 0.88, projects: ["kmesh", "gitflip"] },
  { id: "python", label: "Python", group: "Backend", level: 0.85, projects: ["tarana"] },
  { id: "cpp", label: "C++", group: "Backend", level: 0.8, projects: [] },
  
  // AI
  { id: "agentic", label: "Agentic AI", group: "AI", level: 0.92, projects: ["qwikaid", "transpectra"] },
  { id: "langchain", label: "LangChain & LangGraph", group: "AI", level: 0.88, projects: ["qwikaid"] },
  { id: "mcp", label: "MCP (Model Context)", group: "AI", level: 0.86, projects: ["tarana", "qwikaid"] },
  { id: "gemini", label: "Gemini AI", group: "AI", level: 0.9, projects: ["transpectra"] },
  
  // Infra
  { id: "k8s", label: "Kubernetes", group: "Infra", level: 0.9, projects: ["kmesh"] },
  { id: "docker", label: "Docker", group: "Infra", level: 0.92, projects: ["tarana", "rizzl", "kmesh"] },
  { id: "aws", label: "AWS (EC2/RDS/S3)", group: "Infra", level: 0.86, projects: ["tarana", "rizzl", "mazinda"] },
  { id: "postgres", label: "PostgreSQL & Prisma", group: "Infra", level: 0.9, projects: ["rizzl", "hcw"] },
  { id: "mongodb", label: "MongoDB", group: "Infra", level: 0.88, projects: ["qwikaid", "transpectra", "mazinda", "shikshalokam"] },
  { id: "redis", label: "Redis Caching", group: "Infra", level: 0.85, projects: ["rizzl", "shikshalokam"] },
  { id: "kafka", label: "Kafka", group: "Infra", level: 0.8, projects: ["tarana"] },
];

export const skillGroupColor: Record<Skill["group"], string> = {
  AI: "#56e1c7",
  Frontend: "#6d8bff",
  Backend: "#b07bff",
  Infra: "#ffb86b",
};

/* ---------------------------------------------------------- */
/* Projects — mission cards + case studies                    */
/* ---------------------------------------------------------- */

export type Project = {
  id: string;
  code: string; // MISSION 01
  name: string;
  tagline: string;
  status: "COMPLETED" | "ACTIVE" | "SCALING";
  year: string;
  accent: string;
  role: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  overview: string;
  problem: string;
  architecture: string[];
  decisions: { title: string; body: string }[];
  challenges: { title: string; body: string }[];
  results: string[];
  /** Public link, if any (used by the card + modal CTA). */
  url?: string;
  /** Live screenshot URL OR a local path like /projects/wxw.png.
      Leave undefined to fall back to the generated gradient. */
  shot?: string;
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: "gitflip",
    code: "MISSION 01",
    name: "GitFlip",
    tagline: "Engineered a lightweight Go CLI for secure, multi-identity Git profile orchestration, automating SSH configuration switching and namespace segregation.",
    status: "ACTIVE",
    year: "2025",
    accent: "#6d8bff",
    role: "Solo Creator (Go)",
    stack: ["Go", "CLI", "SSH", "Configuration Manager"],
    url: "https://github.com/jayesh9747/gitflip",
    shot: "/gitflip.png",
    metrics: [
      { label: "Language", value: "Go (Golang)" },
      { label: "Scope", value: "Cross-platform" },
      { label: "Switching", value: "Instant" },
    ],
    overview:
      "GitFlip is a performance-optimized Go command-line interface engineered to seamlessly orchestrate multiple Git and GitHub identities. It mitigates security risks and identity leakage by automating SSH key allocation and workspace-level namespace configuration with zero external dependencies.",
    problem:
      "Managing multiple cryptographically secured user contexts across concurrent commercial and private code repositories frequently leads to identity leakage, broken contribution graphs, and authorization failures.",
    architecture: [
      "Go codebase compiled to static cross-platform binaries",
      "Interactive shell prompts for profile selection",
      "Direct integration with git config files (~/.gitconfig, .git/config)",
      "SSH key agent control and verification"
    ],
    decisions: [
      {
        title: "Static binary with zero dependencies",
        body: "Choosing Go meant GitFlip compiles to a single binary that runs on Linux, macOS, and Windows without requiring Go or Node installed on the machine.",
      },
      {
        title: "Local config scoping",
        body: "It automatically detects if it's run within a Git repo to offer folder-level context switching, defaulting to global configuration.",
      },
    ],
    challenges: [
      {
        title: "Managing SSH agents across OSes",
        body: "SSH agent pathing and commands differ significantly between Windows (pageant/openssh) and Unix-like OSes. Solved by creating abstraction layers in Go.",
      },
    ],
    results: [
      "Zero manual SSH config editing needed anymore for switched profiles.",
      "Secured Git identity management with clean configuration separation.",
    ],
    links: [{ label: "GitHub Repo", href: "https://github.com/jayesh9747/gitflip" }],
  },
  {
    id: "qwikaid",
    code: "MISSION 02",
    name: "QwikAid",
    tagline: "Orchestrated an Agentic AI-driven roadside emergency dispatch platform with real-time spatial mechanic tracking, automated dispatch pipelines, and high-frequency WebSockets.",
    status: "SCALING",
    year: "2025",
    accent: "#56e1c7",
    role: "Full-Stack Creator",
    stack: ["React Native", "NestJS", "MongoDB", "Socket.IO", "LangChain", "Agentic AI"],
    url: "https://github.com/jayesh9747/QuickAid",
    shot: "/qwickAid.png",
    metrics: [
      { label: "Orchestrator", value: "LangChain" },
      { label: "Realtime", value: "Socket.IO" },
      { label: "AI Integration", value: "Agentic Tools" },
    ],
    overview:
      "QwikAid is an autonomous emergency-response ecosystem featuring an Agentic AI dialogue interface powered by LangChain/LangGraph. The platform coordinates immediate mechanical dispatch, processes secure asynchronous payments, and maintains high-frequency spatial tracking in critical roadside assistance scenarios.",
    problem:
      "Emergency logistics require sub-minute response latency, yet traditional dispatch operations suffer from high human triage overhead, communication jank in low-connectivity zones, and slow scheduling systems.",
    architecture: [
      "React Native client for cross-platform iOS & Android usage",
      "NestJS server hosting the agent orchestration and APIs",
      "LangChain agent with tool-calling capabilities (GPS, mechanic database)",
      "Socket.IO server for real-time location updates and chat streaming",
      "MongoDB database for geospatial tracking of mechanics"
    ],
    decisions: [
      {
        title: "Socket.IO for real-time sync",
        body: "Keeps the user, the dispatcher, and the mechanic in sync with real-time location streaming and chat status updates.",
      },
      {
        title: "Geospatial indexing in MongoDB",
        body: "Allows rapid querying of nearby mechanics based on the user's GPS coordinates, sorting by distance and active status.",
      },
    ],
    challenges: [
      {
        title: "Agent reliability in low-connectivity areas",
        body: "Since roadside assistance happens on highways, offline cache layers on React Native store the last chat history and queue SOS requests via SMS fallback.",
      },
    ],
    results: [
      "Empowered users with an instant, automated SOS and booking workflow.",
      "Reduced time-to-dispatch by automating proximity queries and mechanic matching.",
    ],
    links: [
      { label: "GitHub Repo", href: "https://github.com/jayesh9747/QuickAid" },
      { label: "Demo Video", href: "https://www.youtube.com/watch?v=UXwAH9RPpto" }
    ],
  },
  {
    id: "transpectra",
    code: "MISSION 03",
    name: "Transpectra",
    tagline: "Architected a unified supply chain ecosystem integrating WMS, TMS, and YMS systems, featuring predictive ML demand forecasting and real-time transit telemetry via national ULIP APIs.",
    status: "COMPLETED",
    year: "2024",
    accent: "#8aa2ff",
    role: "Core Developer",
    stack: ["React", "React Native", "Node.js", "MongoDB", "Gemini AI", "ULIP APIs"],
    url: "https://transpectra.vercel.app/",
    shot: "/Transpectra.png",
    metrics: [
      { label: "National Award", value: "Top 25" },
      { label: "Forecasting", value: "Gemini AI" },
      { label: "APIs", value: "ULIP Integration" },
    ],
    overview:
      "Transpectra is an enterprise supply chain integration suite unifying Warehouse Management (WMS), Transportation Management (TMS), and Yard Management (YMS). It implements LLM-driven predictive demand modeling, spatial routing heuristics, and real-time telemetry ingestion using standardized government ULIP APIs.",
    problem:
      "Supply chain fragmentation between static warehouse operations and dynamic carrier transit limits operational transparency, resulting in routing inefficiencies, loading delays, and data synchronization gaps.",
    architecture: [
      "React Web Portal for admins/dispatchers and React Native app for drivers",
      "Node.js & Express backend for high-throughput data processing",
      "Integration with government ULIP (Unified Logistics Interface Platform) APIs",
      "Gemini API integration for predictive analytics and routing suggestions",
      "MongoDB for transactional log storage and active shipments"
    ],
    decisions: [
      {
        title: "Unified data model",
        body: "Built WMS, TMS, and YMS on a single schema to eliminate synchronization delays between storage and shipping.",
      },
      {
        title: "ULIP API integration",
        body: "Leveraged standardized national logistics APIs to get real-time tracking data without installing custom GPS devices on every vehicle.",
      },
    ],
    challenges: [
      {
        title: "Optimizing multi-stop routing",
        body: "Finding the best route for 20+ stops involves complex heuristics. Gemini AI was used to analyze historical traffic patterns and suggest optimal staging.",
      },
    ],
    results: [
      "Achieved top 25 in the national ULIP Logistics Hackathon 2.0.",
      "Created a complete paperless flow with QR-based verification for yard gate entry.",
    ],
    links: [
      { label: "GitHub Repo", href: "https://github.com/Alivestars24/Transpectra" },
      { label: "Live Demo", href: "https://transpectra.vercel.app/" }
    ],
  },
  {
    id: "rizzl",
    code: "MISSION 04",
    name: "Rizzl",
    tagline: "Designed a high-throughput creator marketing framework featuring automated financial ledger calculations, secure Instagram OAuth verification, and low-latency cache synchronization.",
    status: "SCALING",
    year: "2025",
    accent: "#ffb86b",
    role: "Tech Lead",
    stack: ["React Native", "Express.js", "Prisma", "PostgreSQL", "AWS EC2/RDS", "Redis"],
    url: "https://rizzl.in",
    shot: "/rizzl.png",
    metrics: [
      { label: "Client", value: "Backed by ISB" },
      { label: "Auth Flow", value: "OAuth & OTP" },
      { label: "Payout Cache", value: "Redis-Optimized" },
    ],
    overview:
      "Rizzl is a multi-tier creator marketing platform built under the backing of the Indian School of Business (ISB). It features an automated payout calculation engine, high-speed Redis-based rate caching, secure Instagram Graph API authentication, and scheduled daemon workflows for campaign credit distributions.",
    problem:
      "Affiliate ledger systems lack low-latency verification for campaign metric compliance, leading to trust gaps in creator compensation and database performance degradation during high-concurrency payment cycles.",
    architecture: [
      "React Native mobile app with Instagram OAuth integration",
      "Express.js backend and Prisma ORM for database queries",
      "PostgreSQL on AWS RDS for campaign and creator data",
      "Redis caching layer for high-speed payout calculation and tracking",
      "Automated cron jobs for monthly credits and payout distribution"
    ],
    decisions: [
      {
        title: "Prisma and Postgres for reliable transactions",
        body: "Financial and credential details require high schema integrity. Prisma's migration tools kept db schema sound.",
      },
      {
        title: "Redis for rate calculations",
        body: "Caching engagement metrics and payout calculations reduced database load by 80% during peak hours.",
      },
    ],
    challenges: [
      {
        title: "Instagram OAuth compliance",
        body: "Fetching creator metrics securely required navigating Facebook/Instagram Graph API rate limits and token expiry.",
      },
    ],
    results: [
      "Launched a scalable product backed by the Indian School of Business (ISB).",
      "Implemented a secure, real-time creator payment and campaign monitoring dashboard.",
    ],
    links: [
      { label: "Official Site", href: "https://rizzl.in" },
      { label: "Demo Video", href: "https://drive.google.com/file/d/1S-MJOHn43l_k7j9-wWl4M-EO_Spn6iba/view?usp=sharing" }
    ],
  },
  {
    id: "eduteck",
    code: "MISSION 05",
    name: "Eduteck",
    tagline: "Developed a responsive Ed-Tech SaaS platform featuring highly-optimized dashboards, asynchronous progress persistence, and client-side playback telemetry.",
    status: "COMPLETED",
    year: "2024",
    accent: "#b07bff",
    role: "Frontend Developer",
    stack: ["React", "JavaScript", "Tailwind CSS", "REST APIs"],
    url: "https://www.edu-teck.com/",
    shot: "/eduteck.png",
    metrics: [
      { label: "Platform Type", value: "SaaS" },
      { label: "Interface", value: "Fully Responsive" },
      { label: "Speed", value: "Optimized" },
    ],
    overview:
      "Eduteck is a responsive educational Software-as-a-Service (SaaS) application designed for low-friction curriculum consumption. It features high-frequency client progress tracking, optimized rendering of dashboard viewports, and local state synchronization for uninterrupted offline continuity.",
    problem:
      "Navigational friction and page rendering overhead in learning platforms degrade student retention rates, particularly over variable mobile network connection states.",
    architecture: [
      "React.js Single Page Application frontend",
      "Tailwind CSS for a highly responsive, custom design system",
      "RESTful API integration with secure token-based authentication",
      "Client-side progress tracking and video playback state management"
    ],
    decisions: [
      {
        title: "Tailwind for rapid responsive styling",
        body: "Ensured a pixel-perfect, premium look on all devices (mobile, tablet, desktop) with minimal CSS bundle sizes.",
      },
      {
        title: "Local storage state sync",
        body: "Cached user progress locally to prevent data loss on sudden network disconnects.",
      },
    ],
    challenges: [
      {
        title: "Fluid progress transitions",
        body: "Designing progress trackers that update in real-time as users finish video segments without reloading pages.",
      },
    ],
    results: [
      "Delivered a live, fully functional ed-tech platform deployed at edu-teck.com.",
      "Achieved excellent engagement scores due to simple, responsive mobile flows.",
    ],
    links: [{ label: "Official Site", href: "https://www.edu-teck.com/" }],
  },
];

/* ---------------------------------------------------------- */
/* Architecture playground — interactive system diagram       */
/* ---------------------------------------------------------- */

export type ArchNode = {
  id: string;
  label: string;
  kind: "client" | "edge" | "service" | "ai" | "data" | "queue";
  col: number; // 0..4 layer
  row: number;
  detail: string;
  scaling: string;
};

export type ArchEdge = { from: string; to: string; label?: string };

export const archNodes: ArchNode[] = [
  { id: "web", label: "Web Portal", kind: "client", col: 0, row: 1, detail: "Next.js & React dashboards with topology visualizations, charts, and progress tracking.", scaling: "Optimized static exports deployed via GitHub Pages / Vercel." },
  { id: "mobile", label: "Mobile Apps", kind: "client", col: 0, row: 2, detail: "React Native cross-platform apps for drivers (logistics), creators (Rizzl), or roadside users.", scaling: "Thin client architecture communicating with stateful backends." },
  { id: "gateway", label: "AWS EC2 Gateway", kind: "edge", col: 1, row: 1.5, detail: "Nginx reverse proxy, OAuth validation, rate limiting, and SSL termination.", scaling: "Deployed with Docker containers; horizontally scalable behind AWS ALB." },
  { id: "backend", label: "APIs & Services", kind: "service", col: 2, row: 1, detail: "NestJS, Express, and Go (Gin) microservices implementing business logic.", scaling: "Stateless REST & WebSocket (Socket.IO) instances containerized on AWS." },
  { id: "mesh", label: "Kmesh Service Mesh", kind: "service", col: 2, row: 2.2, detail: "eBPF-based high-performance service mesh running inside Kubernetes.", scaling: "Kernel-native sidecarless communication reducing latency." },
  { id: "ai", label: "Agentic AI / MCP", kind: "ai", col: 3, row: 1.5, detail: "LangChain orchestrator with custom Model Context Protocol (MCP) servers.", scaling: "Interacts with LLMs asynchronously; caches repetitive reasoning steps." },
  { id: "db", label: "PostgreSQL / Prisma", kind: "data", col: 4, row: 1, detail: "Transactional primary database with secure RLS schemas.", scaling: "RDS scale-up with replica read-nodes and Prisma connection pooling." },
  { id: "nosql", label: "MongoDB / InfluxDB", kind: "data", col: 4, row: 2, detail: "Geospatial queries, time-series telemetry logs, and chat records.", scaling: "Indexed collections enabling sub-100ms spatial searches." },
  { id: "cache", label: "Redis / Kafka", kind: "queue", col: 4, row: 3, detail: "Payout cache, task queues, and telemetry message broker.", scaling: "Durable event logs for reliable service communications." },
];

export const archEdges: ArchEdge[] = [
  { from: "web", to: "gateway" },
  { from: "mobile", to: "gateway" },
  { from: "gateway", to: "backend" },
  { from: "backend", to: "mesh" },
  { from: "backend", to: "ai", label: "orchestrate" },
  { from: "ai", to: "nosql", label: "retrieve" },
  { from: "backend", to: "db", label: "query" },
  { from: "backend", to: "nosql" },
  { from: "backend", to: "cache", label: "stream" },
];

export const archKindColor: Record<ArchNode["kind"], string> = {
  client: "#6d8bff",
  edge: "#8aa2ff",
  service: "#9aa3c0",
  ai: "#56e1c7",
  data: "#b07bff",
  queue: "#ffb86b",
};

/* ---------------------------------------------------------- */
/* Testimonials                                               */
/* ---------------------------------------------------------- */

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  avatar: string;
  color: string;
};

export const testimonials: Testimonial[] = [
  {
    quote: "Jayesh took Rizzl from concept to launch by building our complete full-stack mobile app, brand portal, and admin panel from scratch. His backend architecture, payout calculations, and AWS setup are highly scalable, and his speed of execution is incredible.",
    author: "Himani Bindal",
    role: "Founder, Rizzl (rizzl.in)",
    avatar: "HB",
    color: "#2563EB",
  },
  {
    quote: "Jayesh is an exceptional developer who brings both technical expertise and strategic thinking to the table. His work on Sangam's platform was clean, modular, and delivered on time. Highly recommended for any scaling product.",
    author: "Suhani Dhadphale",
    role: "Founder, Sangam",
    avatar: "SD",
    color: "#7C3AED",
  },
  {
    quote: "Jayesh tackled LFX open source with real enthusiasm. When the community lacked website developers, he stepped up and is still active. Thanks to his initiative, he grew into a core contributor and maintainer of the Kmesh website.",
    author: "Zhencheng Lee",
    role: "CNCF Kmesh Maintainer",
    avatar: "ZL",
    color: "#0F766E",
  },
];
