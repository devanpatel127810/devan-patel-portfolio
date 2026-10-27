export const profile = {
  name: "Devan Patel",
  title: "Software Engineer",
  role: "Forward Deployed Engineer — ZoraAI, Deloitte",
  location: "Austin, TX",
  email: "devanpatel.888@gmail.com",
  linkedin: "https://www.linkedin.com/in/devan-patel-89307a188",
  github: "https://github.com/devanpatel127810",
  tagline: "I build AI-powered systems that survive production.",
  bio: "Forward Deployed Engineer at Deloitte working on ZoraAI. I design document intelligence pipelines, LLM agents, and GenAI systems that run in production for enterprise clients, and build the React frontends people actually use. Texas A&M Honors Computer Science, class of 2024. Based in Austin.",
};

export type Skill = { symbol: string; name: string; category: string; level: number };

export const skillCategories = ["Language", "Frontend", "Backend", "Data", "Cloud & DevOps", "AI / GenAI"] as const;

export const skills: Skill[] = [
  { symbol: "Py", name: "Python", category: "Language", level: 95 },
  { symbol: "Ja", name: "Java", category: "Language", level: 85 },
  { symbol: "Ts", name: "TypeScript", category: "Language", level: 88 },
  { symbol: "Js", name: "JavaScript", category: "Language", level: 90 },
  { symbol: "C+", name: "C++", category: "Language", level: 75 },
  { symbol: "Sq", name: "SQL", category: "Language", level: 85 },
  { symbol: "Re", name: "React", category: "Frontend", level: 90 },
  { symbol: "Ht", name: "HTML", category: "Frontend", level: 92 },
  { symbol: "Cs", name: "CSS", category: "Frontend", level: 88 },
  { symbol: "Tw", name: "Tailwind CSS", category: "Frontend", level: 84 },
  { symbol: "No", name: "Node.js", category: "Backend", level: 86 },
  { symbol: "Fa", name: "FastAPI", category: "Backend", level: 87 },
  { symbol: "Rt", name: "REST APIs", category: "Backend", level: 90 },
  { symbol: "Pg", name: "PostgreSQL", category: "Data", level: 85 },
  { symbol: "Mo", name: "MongoDB", category: "Data", level: 80 },
  { symbol: "Db", name: "DocumentDB", category: "Data", level: 78 },
  { symbol: "Aw", name: "AWS", category: "Cloud & DevOps", level: 88 },
  { symbol: "Lm", name: "AWS Lambda", category: "Cloud & DevOps", level: 86 },
  { symbol: "Ck", name: "AWS CDK", category: "Cloud & DevOps", level: 82 },
  { symbol: "Do", name: "Docker", category: "Cloud & DevOps", level: 80 },
  { symbol: "Ku", name: "Kubernetes", category: "Cloud & DevOps", level: 76 },
  { symbol: "Ci", name: "CI/CD", category: "Cloud & DevOps", level: 83 },
  { symbol: "Gt", name: "Git", category: "Cloud & DevOps", level: 91 },
  { symbol: "Lc", name: "LangChain", category: "AI / GenAI", level: 90 },
  { symbol: "Lg", name: "LangGraph", category: "AI / GenAI", level: 85 },
  { symbol: "Gp", name: "OpenAI GPT", category: "AI / GenAI", level: 90 },
  { symbol: "Cl", name: "Claude", category: "AI / GenAI", level: 92 },
  { symbol: "Gm", name: "Gemini", category: "AI / GenAI", level: 84 },
  { symbol: "Bd", name: "Amazon Bedrock", category: "AI / GenAI", level: 80 },
  { symbol: "Cc", name: "Claude Code", category: "AI / GenAI", level: 93 },
];

export type Project = {
  index: string;
  title: string;
  period: string;
  description: string;
  stack: string[];
  metric?: string;
};

export const projects: Project[] = [
  {
    index: "01",
    title: "Agentic Document Extractor",
    period: "Deloitte — ZoraAI",
    description:
      "Agentic commission document extractor built with LangChain and LangGraph for intelligent parsing, with LangFuse tracing and prompt versioning to keep improving extraction quality over time.",
    stack: ["LangChain", "LangGraph", "LangFuse", "Python"],
    metric: "99% accuracy across 100+ documents",
  },
  {
    index: "02",
    title: "AI Invoice Management Platform",
    period: "Deloitte — ZoraAI",
    description:
      "Serverless, event-driven invoice management platform integrating SAP and Oracle ERP systems. Led backend design and development, including refactored parsing and validation for standard invoices and credit memos as a reusable, productized asset.",
    stack: ["AWS CDK", "Lambda", "DocumentDB", "GCP Document AI", "SAP", "Oracle"],
    metric: "Enterprise scale, multi-ERP integration",
  },
  {
    index: "03",
    title: "AudioAura — Music Visualizer",
    period: "Jan 2024 — May 2024",
    description:
      "Music visualizer that generates a unique soundwave and color palette for every song. Led frontend design and built dynamic visualizations that respond to amplitude and frequency in real time, with Gemini shifting the color scheme based on a song's mood, tone, and energy.",
    stack: ["React", "p5.js", "Python", "Flask", "Spotify API", "Gemini API", "Firebase"],
  },
  {
    index: "04",
    title: "LLM Q&A Chatbot",
    period: "Deloitte — Summer 2023",
    description:
      "LLM-powered Q&A chatbot for document review, built with Python and Gradio on OpenAI models, paired with a Figma-designed generative AI chat interface.",
    stack: ["Python", "Gradio", "OpenAI", "Figma"],
    metric: "Cut document review time by 50%+",
  },
];

export type OwnProject = {
  index: string;
  title: string;
  kind: string;
  description: string;
  stack?: string[];
  link?: { href: string; label: string };
};

/** Devan's own builds — the kitchen scene (Scene 3). Set by Devan, Oct 23, 2026. */
export const ownProjects: OwnProject[] = [
  {
    index: "01",
    title: "Wellness & Living",
    kind: "Web app — live in production",
    description:
      "My wellness and living web app: habit tracking, daily routines, and everyday wellness in one place. Built and maintained end to end, and live for real users.",
    link: { href: "https://shopwellnessandliving.com", label: "shopwellnessandliving.com" },
  },
  {
    index: "02",
    title: "AudioAura — Music Visualizer",
    kind: "Creative build — Jan 2024 — May 2024",
    description:
      "Music visualizer that generates a unique soundwave and color palette for every song. Led frontend design and built dynamic visualizations that respond to amplitude and frequency in real time, with Gemini shifting the color scheme based on a song's mood, tone, and energy.",
    stack: ["React", "p5.js", "Python", "Flask", "Spotify API", "Gemini API", "Firebase"],
  },
  {
    index: "03",
    title: "Lone Star Wash and Dry",
    kind: "Website — family business",
    description:
      "The website for my dad's laundromat business. A family business deserves a professional front door, so I designed and built it: clear, fast, and easy for customers to use.",
  },
  {
    index: "04",
    title: "StackStep",
    kind: "Developer tool",
    description:
      "A LeetCode visualization tool. Instead of staring at finished code, StackStep walks through a solution step by step so you can watch the data structures change and actually see how the algorithm moves.",
  },
];

export type Achievement = {
  value: string;
  label: string;
  count?: { to: number; suffix: string; group?: boolean };
};

export const achievements: Achievement[] = [
  { value: "99%", label: "Extraction accuracy on production document pipelines", count: { to: 99, suffix: "%" } },
  { value: "2.8% → 80%+", label: "Automated test coverage increase on backend systems" },
  { value: "1,000+", label: "Risks categorized with GenAI for a biotech client", count: { to: 1000, suffix: "+", group: true } },
  { value: "50%+", label: "Cut in analysis and document review times", count: { to: 50, suffix: "%+" } },
  { value: "100+", label: "Production rules maintained in the ZoraAI Rules Engine", count: { to: 100, suffix: "+" } },
  { value: "Cum Laude", label: "Texas A&M Honors Computer Science, 2024" },
];

export type OffClockItem = { kicker: string; title: string; detail: string };

export const offTheClock: OffClockItem[] = [
  {
    kicker: "The Book",
    title: "Winter Arc — author",
    detail:
      "Wrote and published a paperback, Winter Arc, in October 2026. The same arc mindset runs through everything: set the goal, show up daily, let the reps compound.",
  },
  {
    kicker: "The Training",
    title: "Discipline, programmed",
    detail:
      "Trains on a structured program with the same rigor he ships with — progressive overload, tracked numbers, no skipped sessions. Consistency is the whole strategy, in the gym and in production.",
  },
  {
    kicker: "The Side Build",
    title: "AudioAura",
    detail:
      "A music visualizer that paints every song its own soundwave and palette, built with React, p5.js, and the Spotify and Gemini APIs. Proof the building does not stop at work.",
  },
  {
    kicker: "The Base",
    title: "Austin, Texas",
    detail:
      "Texas A&M Honors CS, class of 2024 — and a semester in Madrid before that. Now based in Austin, shipping AI systems for enterprise clients from the middle of Texas.",
  },
];

export const certifications = [
  { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services" },
  { name: "Frontend Development — Foundation", issuer: "Deloitte" },
  { name: "Software Engineering Bootcamp", issuer: "Deloitte" },
];

export type TimelineItem = {
  period: string;
  title: string;
  org: string;
  detail: string;
};

export const timeline: TimelineItem[] = [
  {
    period: "Jan 2025 — Present",
    title: "Forward Deployed Engineer",
    org: "Deloitte — ZoraAI",
    detail:
      "Designing GenAI document parsing pipelines and agentic systems in production; technical point of contact with AWS executives on Amazon Bedrock migration.",
  },
  {
    period: "Aug 2023 — Dec 2023",
    title: "Study Abroad",
    org: "Universidad Carlos III de Madrid",
    detail: "Computer Science and Business coursework in Madrid, Spain.",
  },
  {
    period: "Jun 2023 — Aug 2023",
    title: "Software Engineering Summer Scholar",
    org: "Deloitte",
    detail: "GenAI risk categorization for a biotech client and an LLM Q&A chatbot that cut document review time by 50%+.",
  },
  {
    period: "Jun 2021 — Jun 2023",
    title: "Technical Intern",
    org: "Northrop Grumman",
    detail: "Procurement visibility dashboards in Tableau, SharePoint redesign for 15+ program managers, and Excel automation over 1,000+ entries.",
  },
  {
    period: "Aug 2020 — May 2024",
    title: "B.S. Computer Science, Honors — Cum Laude",
    org: "Texas A&M University",
    detail: "Honors Computer Science graduate, class of 2024.",
  },
];
