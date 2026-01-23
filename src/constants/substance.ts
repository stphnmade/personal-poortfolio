// Single source of truth for portfolio copy and structured content.
// Do not hardcode text in components. Always read from SUBSTANCE.
//
// Tone rules:
// - Story Mode: vivid, personal, short lines, playful.
// - Recruiter Mode: direct, scannable, metrics forward.
// - Avoid em dashes. Use commas or parentheses only when needed.

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

export type ProjectItem = {
  id: string;
  name: string;
  timeframe: string;
  tagline: string;
  impactBullets: string[];
  stack: string[];
  links?: Link[];
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
        href: "https://linkedin.com/in/stephen-syl-akinwale",
        external: true,
      },
      // Agent: add resume pdf link when file exists in repo or hosted.
      resume: {
        label: "Download Resume",
        href: "/Stephen_Syl-Akinwale_Resume.pdf",
        external: false,
      },
    } satisfies Record<string, Link>,
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
      name: "Blockopoly",
      timeframe: "Jun 2025 to Present",
      tagline:
        "Real-time multiplayer digital card game inspired by Monopoly Deal.",
      impactBullets: [
        "Architected a full-stack multiplayer system with concurrent sessions and real-time updates.",
        "Built a Kotlin and Ktor backend with Redis for ephemeral state and pub or sub messaging.",
        "Implemented Server-Sent Events for low-latency updates without client polling.",
        "Built a responsive React and TypeScript frontend with animated card interactions and drag-and-drop mechanics.",
      ],
      stack: [
        "React",
        "TypeScript",
        "Kotlin",
        "Ktor",
        "Redis",
        "Docker",
        "AWS",
        "SSE",
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
      name: "CURide",
      timeframe: "Oct 2024 to Dec 2024",
      tagline:
        "A Cornell-focused ridesharing product, designed end to end with UX research.",
      impactBullets: [
        "Designed and prototyped a ridesharing app to improve affordability and sustainability, projecting a potential 25% reduction in solo trips.",
        "Created low fidelity wireframes in Balsamiq and high fidelity prototypes in Figma, improved task completion rate by 33% after usability tests.",
        "Implemented UX enhancements aligned with Nielsen heuristics and Gestalt principles, reducing navigation errors by 40%.",
      ],
      stack: ["Figma", "Balsamiq", "UX Research", "Agile", "Google Sheets"],
    },
    {
      id: "nba-shot-trends",
      name: "NBA Shot Trends Analysis, 3D Court Visualization",
      timeframe: "Feb 2025 to May 2025",
      tagline:
        "3D visualization and analysis of 300k+ NBA shots from 2003 to 2023.",
      impactBullets: [
        "Analyzed 300k+ shot records to identify spatial and temporal trends in shot selection.",
        "Engineered new field goal metrics and mapped loc_x and loc_y coordinates to court zones with tidyverse.",
        "Delivered a reproducible GitHub workflow and a reviewed report and presentation communicating key findings.",
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
