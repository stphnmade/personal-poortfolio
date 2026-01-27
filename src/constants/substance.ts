// Single source of truth for portfolio copy and structured content.
// Do not hardcode text in components. Always read from SUBSTANCE.
//
// Tone rules:
// - Story Mode: vivid, personal, short lines, playful.
// - Recruiter Mode: direct, scannable, metrics forward.
// - Avoid em dashes. Use commas or parentheses only when needed.

import resumePdf from "@/app/assets/Stephen_Syl_Akinwale_Resume.pdf";

export type Link = {
  label: string;
  href: string;
  external?: boolean;
};

export type ExperienceItem = {
  id: string;
  org: string;
  role: string;
  location: string;
  start: string;
  end: string;
  oneLineImpact: string;
  bullets: string[];
  stack: string[];
  links?: Link[];
};

export type ProjectMedia =
  | {
      kind: "image";
      src: string;
      alt: string;
    }
  | {
      kind: "video";
      embedUrl: string;
      title?: string;
    };

export type ProjectItem = {
  id: string;
  name: string;
  timeframe: string;
  tagline: string;
  impactBullets: string[];
  stack: string[];
  links?: Link[];
   // Optional rich media to showcase this project (images, videos).
  media?: ProjectMedia[];
};

export type SkillGroup = {
  id: string;
  title: string;
  items: string[];
};

export type ToolGroup = {
  id: string;
  title: string;
  items: string[];
};

export type ChapterId =
  | "about"
  | "doors"
  | "experience"
  | "skills_certs"
  | "tools"
  | "landing";

export type Chapter = {
  id: ChapterId;
  navLabel: string;
  storyLabel: string;
  recruiterLabel: string;
  // Intended scroll range for Story Mode, agent may tune but must preserve order.
  // Values are normalized 0..1.
  range: { start: number; end: number };
};

export const SUBSTANCE = {
  meta: {
    name: "Stephen Syl-Akinwale",
    preferredName: "stphn",
    title: "Product-minded engineer, interactive systems, data, and UX",
    location: "United States",
    email: "stephensylak@gmail.com",
    phone: "+1 (716)-292-5784",
    links: {
      github: {
        label: "GitHub",
        href: "https://github.com/stphnmade",
        external: true,
      },
      linkedin: {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/stephen-syl-akinwale/",
        external: true,
      },
      blockopoly: {
        label: "Play Blockopoly",
        href: "https://playblockopoly.com",
        external: true,
      },
      // Resume is bundled as a static asset via Vite.
      resume: {
        label: "Download Resume",
        href: resumePdf,
        external: false,
      },
    } satisfies Record<string, Link>,
    badges: [
      {
        id: "project_management",
        label: "Project Management Badge",
        provider: "Credly",
        embedHtml: `<div data-iframe-width="150" data-iframe-height="270" data-share-badge-id="5d0a90ec-9f5f-47c7-8721-fe32fedd7488" data-share-badge-host="https://www.credly.com"></div><script type="text/javascript" async src="//cdn.credly.com/assets/utilities/embed.js"></script>`,
      },
    ],
  },

  chapters: [
    {
      id: "about",
      navLabel: "About",
      storyLabel: "Cargo Hold",
      recruiterLabel: "About",
      range: { start: 0.0, end: 0.12 },
    },
    {
      id: "doors",
      navLabel: "Transition",
      storyLabel: "Doors Open",
      recruiterLabel: "Intro Transition",
      range: { start: 0.12, end: 0.2 },
    },
    {
      id: "experience",
      navLabel: "Experience",
      storyLabel: "High Altitude",
      recruiterLabel: "Experience",
      range: { start: 0.2, end: 0.5 },
    },
    {
      id: "skills_certs",
      navLabel: "Skills",
      storyLabel: "Skills and Certs",
      recruiterLabel: "Skills and Certifications",
      range: { start: 0.5, end: 0.7 },
    },
    {
      id: "tools",
      navLabel: "Tools",
      storyLabel: "Tool Belt",
      recruiterLabel: "Tools and Platforms",
      range: { start: 0.7, end: 0.85 },
    },
    {
      id: "landing",
      navLabel: "Landing",
      storyLabel: "Beach",
      recruiterLabel: "Summary",
      range: { start: 0.85, end: 1.0 },
    },
  ] satisfies Chapter[],

  story: {
    globalUI: {
      modeToggle: {
        story: "Story Mode",
        recruiter: "Recruiter Mode",
        tooltip:
          "Switch between an immersive journey and a fast, scannable layout.",
      },
      nav: {
        title: "Chapter slider",
        hint: "Drag to jump",
        skipToLanding: "Skip to Landing",
      },
      noteDrop: {
        cta: "Drop a Note",
        modalTitle: "Leave something in the sky",
        modalSubtitle: "Short and kind notes are the best kind.",
        fields: {
          messageLabel: "Your note",
          authorLabel: "Name (optional)",
          placeholderMessage: "Tell me what stood out, or leave a fun message.",
          placeholderAuthor: "Anonymous",
        },
        submit: "Drop it",
      },
    },

    cargoHold: {
      headline: "Welcome to the cargo hold.",
      subheadline:
        "Everything I have built is packed in here. Scroll when you are ready to jump.",
      doorsClosedLabel: "Doors closed",
      doorsOpenLabel: "Deep dive into my experience",
      shortBio: [
        "I build interactive systems that make information feel alive.",
        "I mix product thinking, UX, and engineering to ship experiences people remember.",
      ],
      journeyLine:
        "Cornell Information Science, systems support at scale, and a habit of turning ideas into real software.",
      primaryActions: [
        { label: "Open Doors", href: "#doors", external: false },
        { label: "Skip to Landing", href: "#landing", external: false },
      ] satisfies Link[],
      whatIBuild: {
        title: "What I build",
        bullets: [
          "Real-time multiplayer experiences and tools",
          "Data visualizations that explain themselves",
          "Workflows that save people time",
        ],
      },
    },

    freefall: {
      headline: "Freefall",
      subheadline:
        "This is the part where the details start floating into view.",
      experienceIntro: "First, my roles and what I changed.",
      skillsIntro: "Then, what I can reliably do on a team.",
      toolsIntro: "Finally, the tools I reach for to ship.",
    },

    landing: {
      headline: "Safe landing.",
      subheadline:
        "Here is everything at a glance, organized into supply boxes.",
      ctas: {
        primary: "Download Resume",
        secondary: "Open GitHub",
      },
      crates: {
        experience: "Experience",
        skills: "Skills",
        tools: "Tools",
        projects: "Projects",
        resume: "Resume",
        github: "GitHub",
        note: "Click to Inspect",
      },
    },
  },

  recruiter: {
    hero: {
      headline: "Stephen Syl-Akinwale",
      subheadline:
        "Cornell Information Science (May 2025). Product-minded engineer focused on interactive systems, UX, and data-driven builds.",
      quickLinksLabel: "Links",
    },
    sectionLabels: {
      experience: "Experience",
      projects: "Projects",
      skills: "Skills and Certifications",
      tools: "Tools and Platforms",
      contact: "Contact",
    },
    scanHighlights: [
      "Supported 5,000+ global users, resolved 95% of tickets within SLA (eCornell).",
      "Improved system uptime by 18% and reduced backlog by 22% with automation and reporting.",
      "Grew Cornell Music Production membership from 27 to 270+ students and improved scheduling efficiency by 40%.",
    ],
  },

  experience: [
    {
      id: "ecornell-support",
      org: "eCornell",
      role: "System Support Intern and Systems Helpdesk",
      location: "Remote, Ithaca NY",
      start: "Sep 2023",
      end: "May 2025",
      oneLineImpact:
        "Supported 5,000+ global users, resolved 95% of tickets within SLA using Jamf, Google Admin, Salesforce, and TDX.",
      bullets: [
        "Provided front-line technical support at scale across Windows, macOS, and mobile platforms, improving end-user satisfaction.",
        "Analyzed crash patterns, improved uptime by 18%, and reduced ticket backlog by 22% via automation of SQL queries and Excel reporting dashboards.",
        "Improved onboarding workflows cross-functionally, reducing average new-user setup time by 30%.",
      ],
      stack: [
        "Jamf",
        "Google Admin",
        "Salesforce",
        "TDX",
        "SQL",
        "Excel",
        "macOS",
        "Windows",
      ],
    },
    {
      id: "cornell-music-production",
      org: "Cornell Music Production",
      role: "Co-President",
      location: "Ithaca NY",
      start: "May 2021",
      end: "Sep 2025",
      oneLineImpact:
        "Automated scheduling workflows in Airtable (+40% coordination efficiency) and grew active membership from 27 to 270+.",
      bullets: [
        "Automated event scheduling workflows with Airtable, boosting event coordination efficiency by 40%.",
        "Directed marketing and recruitment campaigns, expanding active membership from 27 to 270+ students.",
        "Helped materialize member visions into 3 multi-genre albums launched across licensing platforms.",
      ],
      stack: [
        "Airtable",
        "Marketing",
        "Operations",
        "Leadership",
        "Production workflows",
      ],
    },
  ] satisfies ExperienceItem[],

  projects: [
    {
      id: "blockopoly",
      name: "Blockopoly, Online Multiplayer Digital Card Game",
      timeframe: "Jun 2025 to Present",
      tagline:
        "Online multiplayer card game with stable reconnects and synchronized state.",
      impactBullets: [
        "Real-time multiplayer web games often break on refresh and struggle with low-latency synchronization across players.",
        "Architect a production-ready system supporting rooms, reconnects, and synchronized turn-based state.",
        "Designed a Ktor backend with Redis for ephemeral state and pub/sub, and shipped real-time updates via Server-Sent Events (SSE) while building a drag-and-drop React and TypeScript UI.",
        "Eliminated polling latency, improved session stability across reloads, and established a scalable blueprint for turn-based multiplayer experiences.",
      ],
      stack: [
        "React",
        "TypeScript",
        "Kotlin",
        "Ktor",
        "Redis",
        "Docker",
        "AWS",
      ],
      links: [
        {
          label: "GitHub (Blockopoly)",
          href: "https://github.com/stphnmade",
          external: true,
        },
        // Agent: replace with specific repo link when you provide it.
      ],
    },
    {
      id: "curide",
      name: "CURide, Community Ridesharing Platform",
      timeframe: "Oct 2024 to Dec 2024",
      tagline:
        "Community ridesharing platform addressing affordability and safety gaps in student transportation.",
      impactBullets: [
        "Addressed affordability and safety gaps in student transportation at Cornell by designing a ridesharing platform tailored to campus needs.",
        "Led a user-centered redesign after interviewing 12 students to uncover trust, role clarity, and scheduling pain points.",
        "Translated interview insights into low-fidelity Balsamiq wireframes and high-fidelity Figma prototypes, iterating across multiple usability cycles.",
        "Improved task completion by 33% and reduced navigation errors by 40%, with instructors projecting a 25% reduction in solo car trips if deployed.",
      ],
      stack: ["Figma", "Balsamiq", "UX Research", "Agile", "Google Sheets"],
    },
    {
      id: "crossing-cafe",
      name: "Crossing Cafe, Full-Stack Restaurant Website",
      timeframe: "Mar 2024 to May 2024",
      tagline:
        "Responsive restaurant website grounded in stakeholder workflows and persistent ordering data.",
      impactBullets: [
        "A local cafe lacked a modern web presence for menu discovery and order clarity, increasing in-store friction during rush periods.",
        "Partnered with a four-person team to deliver a responsive website grounded in stakeholder requirements and customer workflows.",
        "Conducted structured interviews with owners and customers, converted findings into user stories, and implemented persistent menu and order tracking using SQLite.",
        "Delivered an MVP that centralized menu updates, reduced ordering confusion, and demonstrated a scalable data-backed ordering workflow.",
      ],
      stack: ["HTML", "CSS", "JavaScript", "SQLite", "UX Interviews"],
    },
    {
      id: "wishlist",
      name: "Wishlist, Collaborative Gifting Platform",
      timeframe: "Jan 2025 to Present",
      tagline:
        "Full-stack wishlist platform for transparent, trackable group gifting.",
      impactBullets: [
        "Group gifting coordination lacked transparency, progress tracking, and shared context across friends and families.",
        "Build a full-stack wishlist product enabling users to create, share, and track gifting progress with social signals.",
        "Implemented a service-oriented Go and gRPC backend with PostgreSQL, structured modular React components, and Dockerized services for local-to-cloud parity.",
        "Delivered a maintainable architecture enabling rapid iteration on features like gifting history, friend sorting, and progress-based goals.",
      ],
      stack: ["React", "Go", "gRPC", "PostgreSQL", "Docker"],
    },
    {
      id: "dear-days",
      name: "Dear Days, Family Event and Birthday Calendar",
      timeframe: "Jul 2025 to Present",
      tagline:
        "Shared calendar for birthdays and special events across families.",
      impactBullets: [
        "Families and groups frequently miss birthdays and special events due to fragmented calendars and weak reminder workflows.",
        "Design a centralized, emotionally engaging system to track special days with simple sharing and clean data models.",
        "Built a Next.js application with Prisma ORM, Google OAuth, and Bento-grid dashboards, using interviews with families to refine onboarding and event entry flows.",
        "Created a scalable product foundation with retention hooks and normalized schemas that support expansion to multi-family use.",
      ],
      stack: ["Next.js", "Prisma", "Tailwind", "Google OAuth"],
    },
    {
      id: "storybot",
      name: "Storybot, Reddit-to-Video Automation Platform",
      timeframe: "Jul 2025 to Present",
      tagline:
        "Automation pipeline that converts text stories into captioned short-form videos.",
      impactBullets: [
        "Short-form creators face high friction converting text stories into captioned videos with consistent pacing and narration quality.",
        "Automate scraping, cleaning, narration, captioning, and audio-video composition into a repeatable pipeline.",
        "Built a Node and Python workflow using FFmpeg and gTTS, defining modular steps for story ingestion, caption overlay, background selection, and batch processing.",
        "Reduced production time from over 20 minutes to under 2 minutes per video while maintaining caption alignment and audio clarity.",
      ],
      stack: ["Node.js", "Python", "FFmpeg", "gTTS", "Express"],
    },
    {
      id: "nba-shot-trends",
      name: "NBA Shot Trends Analysis, 3D Court Visualization",
      timeframe: "Feb 2025 to May 2025",
      tagline:
        "3D visualization and analysis of how NBA shot selection shifted across the modern era.",
      impactBullets: [
        "Coaches and fans lacked a clear, visual narrative for how shot selection shifted across the modern NBA era.",
        "Analyzed more than 300,000 NBA shots from 2003 to 2023 to identify spatial and temporal trends, including player-specific comparisons.",
        "Cleaned and engineered high-volume data using tidyverse, mapped loc_x and loc_y to court zones, and generated 3D visual outputs in Quarto.",
        "Produced an instructor-reviewed report and reproducible workflow highlighting measurable increases in three-point dependency over time.",
      ],
      stack: ["R", "tidyverse", "ggplot2", "Quarto", "GitHub"],
    },
  ] satisfies ProjectItem[],

  skillsAndCerts: [
    {
      id: "programming",
      title: "Programming Languages",
      items: ["Python", "Java", "JavaScript", "Go", "C++", "OCaml", "R"],
    },
    {
      id: "databases",
      title: "Databases",
      items: ["PostgreSQL", "SQLite"],
    },
    {
      id: "web_software",
      title: "Web and Software",
      items: ["React Native", "HTML", "CSS", "gRPC", "Git", "MERN stack"],
    },
    {
      id: "tools_platforms",
      title: "Support Tools and Platforms",
      items: ["Jamf", "Salesforce", "Google Admin", "TDX"],
    },
    // Agent: if you want certifications listed separately, add another group here.
    // Example title: "Certifications" with items you provide.
  ] satisfies SkillGroup[],

  toolsAndPlatforms: [
    {
      id: "productivity",
      title: "Productivity",
      items: ["Microsoft Office", "Google Workspace", "Airtable"],
    },
    {
      id: "music",
      title: "Music and Creative",
      items: [
        "FL Studio",
        "Audio production workflow",
        "Licensing platform publishing",
      ],
    },
    {
      id: "dev_workflow",
      title: "Dev Workflow",
      items: ["GitHub", "Pull requests", "Issue tracking", "Sprint planning"],
    },
  ] satisfies ToolGroup[],

  contentControls: {
    // Agent: Use these to enforce readability and prevent clipping.
    maxBulletsPerCard: 3,
    maxImpactBulletsPerProject: 4,
    safeViewportPaddingPct: 6,
    minDesktopBodyFontPx: 14,
  },
} as const;
