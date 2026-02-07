import { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import {
  FaBriefcase,
  FaTools,
  FaProjectDiagram,
  FaCalendarAlt,
  FaCode,
  FaDatabase,
  FaGithub,
  FaExternalLinkAlt,
  FaAward,
  FaGlobe,
  FaWindows,
} from "react-icons/fa";
import {
  SiAmazonwebservices,
  SiCss3,
  SiDocker,
  SiExpress,
  SiFfmpeg,
  SiFigma,
  SiGit,
  SiGithub,
  SiGo,
  SiGoogle,
  SiGooglesheets,
  SiHtml5,
  SiJavascript,
  SiKotlin,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiQuarto,
  SiR,
  SiReact,
  SiRedis,
  SiSalesforce,
  SiSqlite,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { CHAPTERS } from "@/constants/chapters";
import { SUBSTANCE } from "@/constants/substance";

interface FreefallSectionProps {
  scrollYProgress: MotionValue<number>;
  userNotes: {
    id: string;
    message: string;
    author: string;
  }[];
  onOpenNote: () => void;
}

interface FallingObjectProps {
  id: string;
  content: string;
  progress: MotionValue<number>;
}

const EXPERIENCE = CHAPTERS.find((c) => c.id === "experience")!;
const TOOLS = CHAPTERS.find((c) => c.id === "tools")!;
const FREEFALL_START_PROGRESS = EXPERIENCE.start;
const FREEFALL_END_PROGRESS = TOOLS.end;

function getStatusToneClasses(
  tone: (typeof SUBSTANCE.projects)[number]["status"]["tone"],
) {
  switch (tone) {
    case "live":
      return "border-[#59A96A]/30 bg-[#59A96A]/15 text-[#2f7340]";
    case "building":
      return "border-[#F19A3E]/30 bg-[#F19A3E]/15 text-[#93581a]";
    case "private":
      return "border-[#3B413C]/30 bg-[#3B413C]/10 text-[#3B413C]";
    case "archived":
      return "border-[#6B7280]/30 bg-[#6B7280]/15 text-[#4B5563]";
    case "completed":
    default:
      return "border-[#0F5EAF]/30 bg-[#0F5EAF]/10 text-[#0F5EAF]";
  }
}

function renderTechIcon(label: string, sizeClass = "h-3.5 w-3.5") {
  const lower = label.toLowerCase();

  if (lower.includes("microsoft")) {
    return <FaWindows className={`${sizeClass} text-[#00A4EF]`} />;
  }
  if (lower.includes("react native")) {
    return <SiReact className={`${sizeClass} text-[#61DAFB]`} />;
  }
  if (lower === "react") {
    return <SiReact className={`${sizeClass} text-[#61DAFB]`} />;
  }
  if (lower.includes("typescript")) {
    return <SiTypescript className={`${sizeClass} text-[#3178C6]`} />;
  }
  if (lower.includes("javascript")) {
    return <SiJavascript className={`${sizeClass} text-[#F7DF1E]`} />;
  }
  if (lower.includes("python")) {
    return <SiPython className={`${sizeClass} text-[#3776AB]`} />;
  }
  if (lower === "r" || lower.startsWith("r ")) {
    return <SiR className={`${sizeClass} text-[#276DC3]`} />;
  }
  if (lower.includes("kotlin")) {
    return <SiKotlin className={`${sizeClass} text-[#A97BFF]`} />;
  }
  if (lower.includes("go")) {
    return <SiGo className={`${sizeClass} text-[#00ADD8]`} />;
  }
  if (lower.includes("node")) {
    return <SiNodedotjs className={`${sizeClass} text-[#339933]`} />;
  }
  if (lower.includes("express")) {
    return <SiExpress className={`${sizeClass} text-[#3B413C]`} />;
  }
  if (lower.includes("html")) {
    return <SiHtml5 className={`${sizeClass} text-[#E34F26]`} />;
  }
  if (lower.includes("css")) {
    return <SiCss3 className={`${sizeClass} text-[#1572B6]`} />;
  }
  if (lower.includes("tailwind")) {
    return <SiTailwindcss className={`${sizeClass} text-[#06B6D4]`} />;
  }
  if (lower.includes("next.js") || lower === "nextjs") {
    return <SiNextdotjs className={`${sizeClass} text-[#111827]`} />;
  }
  if (lower.includes("prisma")) {
    return <SiPrisma className={`${sizeClass} text-[#111827]`} />;
  }
  if (lower.includes("redis")) {
    return <SiRedis className={`${sizeClass} text-[#DC382D]`} />;
  }
  if (lower.includes("postgres")) {
    return <SiPostgresql className={`${sizeClass} text-[#336791]`} />;
  }
  if (lower.includes("sqlite")) {
    return <SiSqlite className={`${sizeClass} text-[#003B57]`} />;
  }
  if (lower.includes("docker")) {
    return <SiDocker className={`${sizeClass} text-[#2496ED]`} />;
  }
  if (lower.includes("aws")) {
    return <SiAmazonwebservices className={`${sizeClass} text-[#FF9900]`} />;
  }
  if (lower.includes("figma")) {
    return <SiFigma className={`${sizeClass} text-[#F24E1E]`} />;
  }
  if (lower.includes("balsamiq")) {
    return <FaTools className={`${sizeClass} text-[#CC0000]`} />;
  }
  if (lower.includes("google sheets")) {
    return <SiGooglesheets className={`${sizeClass} text-[#34A853]`} />;
  }
  if (lower.includes("google")) {
    return <SiGoogle className={`${sizeClass} text-[#4285F4]`} />;
  }
  if (lower.includes("salesforce")) {
    return <SiSalesforce className={`${sizeClass} text-[#00A1E0]`} />;
  }
  if (lower.includes("github")) {
    return <SiGithub className={`${sizeClass} text-[#111827]`} />;
  }
  if (lower.includes("git")) {
    return <SiGit className={`${sizeClass} text-[#F05032]`} />;
  }
  if (lower.includes("ffmpeg")) {
    return <SiFfmpeg className={`${sizeClass} text-[#007808]`} />;
  }
  if (lower.includes("quarto")) {
    return <SiQuarto className={`${sizeClass} text-[#39729E]`} />;
  }

  return <FaTools className={`${sizeClass} text-[#59A96A]`} />;
}

export function FreefallSection({
  scrollYProgress,
  userNotes,
  onOpenNote: _onOpenNote,
}: FreefallSectionProps) {
  const freefallProgress = useTransform(
    scrollYProgress,
    [FREEFALL_START_PROGRESS, FREEFALL_END_PROGRESS],
    [0, 1],
  );

  const experienceItems = SUBSTANCE.experience;
  const skillGroups = SUBSTANCE.skillsAndCerts;
  const projectItems = SUBSTANCE.projects;

  // Fade the entire freefall layer in between Experience start and Tools end,
  // so it does not compete with the cargo doors or the beach.
  const freefallOpacity = useTransform(
    scrollYProgress,
    [
      FREEFALL_START_PROGRESS - 0.02,
      FREEFALL_START_PROGRESS,
      FREEFALL_END_PROGRESS,
      FREEFALL_END_PROGRESS + 0.02,
    ],
    [0, 1, 1, 0],
  );

  // Decide which content band is active (Experience → Skills → Projects)
  const [activeBand, setActiveBand] = useState<
    "experience" | "skills" | "projects"
  >("experience");

  useMotionValueEvent(freefallProgress, "change", (value) => {
    const v = Math.max(0, Math.min(1, value));
    if (v < 0.35) {
      setActiveBand("experience");
    } else if (v < 0.7) {
      setActiveBand("skills");
    } else {
      setActiveBand("projects");
    }
  });


  return (
    // Absolute full-screen layer that sits between the cargo doors and the beach.
    <div className="pointer-events-none absolute inset-0 overflow-visible">
      {/* Animated sky background, fades in/out over the cargo hold as you enter freefall */}
      <motion.div className="sky-scene" style={{ opacity: freefallOpacity }}>
        <div className="cloud c1" />
        <div className="cloud c2" />
        <div className="cloud c3" />
        <div className="bird" />
        <div className="skydiver-container">
          <div className="drogue-chute" />
          <div className="person-group">
            <div className="head" />
            <div className="body-suit" />
          </div>
        </div>
      </motion.div>

      {/* Sticky scene so content stays in view while scrolling the freefall range */}
      <motion.div
        style={{ opacity: freefallOpacity }}
        className="pointer-events-auto sticky top-0 z-10 flex h-screen w-full flex-col items-center justify-center gap-8 px-4"
      >
        {/* Freefall heading */}
        <div className="rounded-full bg-white/85 px-4 py-2 shadow-sm backdrop-blur">
          <span className="text-sm font-medium text-[#3B413C]">
            {SUBSTANCE.story.freefall.subheadline}
          </span>
        </div>

        {/* EXPERIENCE / SKILLS / PROJECTS content window */}
        <motion.div
          key={activeBand}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-4 w-full max-w-5xl"
        >
          {activeBand === "experience" && (
            <ExperiencePanel experience={experienceItems} />
          )}
          {activeBand === "skills" && <SkillsPanel skills={skillGroups} />}
          {activeBand === "projects" && (
            <ProjectsPanel projects={projectItems} />
          )}
        </motion.div>
      </motion.div>

      {/* USER NOTES (Atmospheric Litter) */}
      {userNotes.map((note) => (
        <FallingObject
          key={note.id}
          id={note.id}
          content={
            note.author ? `${note.message} — ${note.author}` : note.message
          }
          progress={freefallProgress}
        />
      ))}
    </div>
  );
}

function SkillsPanel({ skills }: { skills: typeof SUBSTANCE.skillsAndCerts }) {
  const [index, setIndex] = useState(0);
  const total = skills.length;
  const current = skills[index];

  if (!current) return null;

  const goPrev = () => setIndex((prev) => (prev - 1 + total) % total);
  const goNext = () => setIndex((prev) => (prev + 1) % total);

  const currentIcon = (() => {
    switch (current.id) {
      case "programming":
        return <FaCode className="h-6 w-6 text-[#59A96A]" />;
      case "databases":
        return <FaDatabase className="h-6 w-6 text-[#F19A3E]" />;
      default:
        return <FaTools className="h-6 w-6 text-[#DD403A]" />;
    }
  })();

  const renderSkillIcon = (label: string) => {
    const lower = label.toLowerCase();
    if (lower.includes("sql")) {
      return <FaDatabase className="h-3.5 w-3.5 text-[#F19A3E]" />;
    }
    if (lower.includes("cert") || lower.includes("workflow")) {
      return <FaAward className="h-3.5 w-3.5 text-[#59A96A]" />;
    }
    return renderTechIcon(label);
  };

  return (
    <div className="flex w-full items-stretch rounded-2xl border-2 border-[#3B413C]/10 bg-white/95 p-6 shadow-xl backdrop-blur-md">
      <div className="mr-4 flex flex-col items-center justify-center gap-2 border-r border-[#E5E7EB] pr-4">
        {currentIcon}
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280]">
          Skills
        </span>
      </div>
      <div className="flex-1">
        <h2 className="text-h2-sans text-[#111827]">
          {SUBSTANCE.story.freefall.skillsIntro}
        </h2>
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <p className="mt-2 text-sm font-semibold text-[#111827]">
              {current.title}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2 text-sm text-[#4B5563]">
              {current.items.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-1 rounded-full border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-1"
                >
                  {renderSkillIcon(item)}
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="ml-4 flex w-20 flex-col items-center justify-center gap-2 text-xs text-[#4B5563]">
        <button
          onClick={goPrev}
          type="button"
          aria-label="Previous skills group"
          className="rounded-full bg-[#F5F5F5] px-3 py-1 transition-colors duration-200 hover:bg-[#E5E7EB]"
        >
          ◀
        </button>
        <span className="font-medium text-[#111827]">
          {index + 1}/{total}
        </span>
        <button
          onClick={goNext}
          type="button"
          aria-label="Next skills group"
          className="rounded-full bg-[#F5F5F5] px-3 py-1 transition-colors duration-200 hover:bg-[#E5E7EB]"
        >
          ▶
        </button>
      </div>
    </div>
  );
}

function ProjectsPanel({ projects }: { projects: typeof SUBSTANCE.projects }) {
  const [index, setIndex] = useState(0);
  const [mediaIndex, setMediaIndex] = useState(0);
  const total = projects.length;
  const current = projects[index];

  useEffect(() => {
    if (current) setMediaIndex(0);
  }, [current?.id]);

  if (!current) return null;

  const goPrev = () => setIndex((prev) => (prev - 1 + total) % total);
  const goNext = () => setIndex((prev) => (prev + 1) % total);
  const media = current.media ?? [];
  const quickLookCount = media.length;
  const activeMedia = media[mediaIndex] ?? null;
  const mediaIconTools = current.stack.slice(0, 6);

  const goPrevMedia = () => {
    if (quickLookCount <= 1) return;
    setMediaIndex((prev) => (prev - 1 + quickLookCount) % quickLookCount);
  };

  const goNextMedia = () => {
    if (quickLookCount <= 1) return;
    setMediaIndex((prev) => (prev + 1) % quickLookCount);
  };

  const projectLinks =
    current.links && current.links.length > 0
      ? current.links
      : [
          {
            label: "Request Access",
            href: `mailto:${SUBSTANCE.meta.email}?subject=${encodeURIComponent(
              `Project Access: ${current.name}`,
            )}`,
            external: false,
          },
        ];

  return (
    <div className="flex w-full items-stretch rounded-2xl border-2 border-[#3B413C]/10 bg-white/95 p-6 shadow-xl backdrop-blur-md">
      <div className="mr-4 flex flex-col items-center justify-center gap-2 border-r border-[#E5E7EB] pr-4">
        <FaProjectDiagram className="h-6 w-6 text-[#DD403A]" />
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280]">
          Projects
        </span>
      </div>
      <div className="flex-1 space-y-3">
        <h2 className="text-h2-sans text-[#111827]">
          {SUBSTANCE.story.freefall.toolsIntro}
        </h2>
        <AnimatePresence mode="wait">
          <motion.article
            key={current.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="rounded-2xl border border-[#3B413C]/12 bg-[#F9FAFB] p-4 shadow-md"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-[#6B7280] flex items-center gap-2">
                <FaCalendarAlt className="h-4 w-4 text-[#F19A3E]" />
                {current.timeframe}
              </p>
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusToneClasses(
                  current.status.tone,
                )}`}
              >
                {current.status.label}
              </span>
            </div>

            <div className="mt-2">
              <p className="text-body-sans font-semibold text-[#111827]">
                {current.name}
              </p>
              <p className="mt-1 text-sm text-[#4B5563]">{current.tagline}</p>
              <p className="mt-2 text-xs text-[#6B7280]">{current.status.access}</p>
            </div>

            <div className="mt-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
                  Quick Look
                </p>
                {quickLookCount > 1 && (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={goPrevMedia}
                      aria-label="Previous media"
                      className="rounded-full border border-[#3B413C]/15 bg-white px-2 py-0.5 text-xs text-[#3B413C] transition-colors hover:bg-[#E5E7EB]"
                    >
                      ◀
                    </button>
                    <span className="text-[11px] text-[#6B7280]">
                      {mediaIndex + 1}/{quickLookCount}
                    </span>
                    <button
                      type="button"
                      onClick={goNextMedia}
                      aria-label="Next media"
                      className="rounded-full border border-[#3B413C]/15 bg-white px-2 py-0.5 text-xs text-[#3B413C] transition-colors hover:bg-[#E5E7EB]"
                    >
                      ▶
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-2 overflow-hidden rounded-xl border border-[#E5E7EB] bg-white">
                {activeMedia ? (
                  activeMedia.kind === "image" ? (
                    <img
                      src={activeMedia.src}
                      alt={activeMedia.alt}
                      className="h-44 w-full object-cover"
                    />
                  ) : (
                    <div
                      className="aspect-video w-full overflow-hidden"
                    >
                      <iframe
                        src={activeMedia.embedUrl}
                        title={activeMedia.title || current.name}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )
                ) : (
                  <div className="relative flex h-44 w-full items-center justify-center overflow-hidden bg-[#0F1519]">
                    <div className="absolute -left-8 -top-10 h-28 w-28 rounded-full bg-[#59A96A]/18 blur-xl" />
                    <div className="absolute -bottom-12 -right-8 h-32 w-32 rounded-full bg-[#F19A3E]/20 blur-xl" />
                    <FaProjectDiagram className="h-12 w-12 text-white/80" />
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                      {mediaIconTools.map((tool) => (
                        <span
                          key={`${current.id}-media-icon-${tool}`}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-black/35"
                        >
                          {renderTechIcon(tool, "h-3.5 w-3.5")}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
                Built With
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {current.stack.map((tool) => (
                  <span
                    key={tool}
                    className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs text-[#3B413C]"
                  >
                    {renderTechIcon(tool)}
                    <span>{tool}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
                Visit
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {projectLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    className="inline-flex items-center gap-2 rounded-full bg-[#59A96A] px-3 py-1 text-xs font-semibold text-white shadow transition-colors duration-200 hover:bg-[#4a8d58]"
                  >
                    {link.label.toLowerCase().includes("github") ? (
                      <FaGithub className="h-3 w-3" />
                    ) : (
                      <FaGlobe className="h-3 w-3" />
                    )}
                    <span>{link.label}</span>
                    {link.external && <FaExternalLinkAlt className="h-3 w-3" />}
                  </a>
                ))}
              </div>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-[#4B5563]">
              {current.impactBullets[0]}
            </p>
          </motion.article>
        </AnimatePresence>
      </div>
      <div className="ml-4 flex w-20 flex-col items-center justify-center gap-2 text-xs text-[#4B5563]">
        <button
          onClick={goPrev}
          type="button"
          aria-label="Previous project"
          className="rounded-full bg-[#F5F5F5] px-3 py-1 transition-colors duration-200 hover:bg-[#E5E7EB]"
        >
          ◀
        </button>
        <span className="font-medium text-[#111827]">
          {index + 1}/{total}
        </span>
        <button
          onClick={goNext}
          type="button"
          aria-label="Next project"
          className="rounded-full bg-[#F5F5F5] px-3 py-1 transition-colors duration-200 hover:bg-[#E5E7EB]"
        >
          ▶
        </button>
        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          {projects.map((project, idx) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setIndex(idx)}
              aria-label={`Jump to project ${idx + 1}`}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                idx === index ? "bg-[#3B413C]" : "bg-[#C5C9CC]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FallingObject({ id, content, progress }: FallingObjectProps) {
  const [startX] = useState(() => Math.random() * 80 + 10); // 10% to 90%
  const [rotation] = useState(() => Math.random() * 360);
  const [endY] = useState(() => Math.random() * 200 - 100);

  const y = useTransform(progress, [0, 0.9, 1], [2000, -5000, endY]);

  return (
    <motion.div
      layoutId={`note-${id}`}
      style={{ y, left: `${startX}%`, rotate: rotation }}
      className="absolute z-10 w-32 transform-gpu rounded-md border border-[#F19A3E] bg-[#F5F5F5] p-3 shadow-md"
    >
      <p className="text-annotation-script text-xs leading-tight text-[#3B413C]">
        "{content}"
      </p>
    </motion.div>
  );
}
function ExperiencePanel({
  experience,
}: {
  experience: typeof SUBSTANCE.experience;
}) {
  const parseMonthYear = (value: string) => {
    const [monthRaw, yearRaw] = value.trim().split(/\s+/);
    const year = Number(yearRaw);
    const monthLookup: Record<string, number> = {
      jan: 0,
      feb: 1,
      mar: 2,
      apr: 3,
      may: 4,
      jun: 5,
      jul: 6,
      aug: 7,
      sep: 8,
      oct: 9,
      nov: 10,
      dec: 11,
    };
    const month = monthLookup[monthRaw.toLowerCase().slice(0, 3)] ?? 0;
    return new Date(Number.isNaN(year) ? 1970 : year, month, 1).getTime();
  };

  const orderedExperience = useMemo(
    () =>
      [...experience].sort(
        (a, b) => parseMonthYear(a.start) - parseMonthYear(b.start),
      ),
    [experience],
  );

  const [activeExperienceId, setActiveExperienceId] = useState<string>(
    orderedExperience[orderedExperience.length - 1]?.id ?? "",
  );

  useEffect(() => {
    if (
      orderedExperience.length > 0 &&
      !orderedExperience.some((exp) => exp.id === activeExperienceId)
    ) {
      setActiveExperienceId(orderedExperience[orderedExperience.length - 1].id);
    }
  }, [orderedExperience, activeExperienceId]);

  const activeExperience =
    orderedExperience.find((exp) => exp.id === activeExperienceId) ??
    orderedExperience[orderedExperience.length - 1];

  if (!activeExperience) return null;

  return (
    <div className="rounded-2xl border-2 border-[#3B413C]/10 bg-white/95 p-6 shadow-xl backdrop-blur-md">
      <div className="mb-4 flex items-center gap-2">
        <FaBriefcase className="h-6 w-6 text-[#59A96A]" />
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280]">
          Experience
        </span>
      </div>

      <h2 className="text-h2-sans text-[#111827]">
        {SUBSTANCE.story.freefall.experienceIntro}
      </h2>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="relative rounded-xl border border-[#3B413C]/12 bg-[#F9FAFB] p-4">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
            Timeline (oldest to newest)
          </div>
          <div className="absolute bottom-6 left-[1.08rem] top-14 w-px bg-[#3B413C]/15" />
          <div className="space-y-3">
            {orderedExperience.map((exp) => {
              const isActive = exp.id === activeExperience.id;
              return (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => setActiveExperienceId(exp.id)}
                  className={`relative block w-full rounded-lg border px-3 py-2 text-left transition-colors duration-200 ${
                    isActive
                      ? "border-[#59A96A]/40 bg-[#59A96A]/10"
                      : "border-[#E5E7EB] bg-white hover:bg-[#F5F5F5]"
                  }`}
                >
                  <span
                    className={`absolute -left-[0.88rem] top-4 h-2.5 w-2.5 rounded-full ${
                      isActive ? "bg-[#59A96A]" : "bg-[#C5C9CC]"
                    }`}
                  />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
                    {exp.start} to {exp.end}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#111827]">{exp.org}</p>
                  <p className="text-xs text-[#4B5563]">{exp.role}</p>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            key={activeExperience.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="rounded-xl border border-[#3B413C]/12 bg-[#F9FAFB] p-4 shadow-sm"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
              {activeExperience.start} to {activeExperience.end}
            </p>
            <h3 className="mt-1 text-base font-semibold text-[#111827]">
              {activeExperience.org}
            </h3>
            <p className="text-sm text-[#4B5563]">{activeExperience.role}</p>
            <p className="mt-2 text-xs text-[#6B7280]">{activeExperience.location}</p>

            <p className="mt-3 text-sm leading-relaxed text-[#3B413C]">
              {activeExperience.oneLineImpact}
            </p>

            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[#4B5563]">
              {activeExperience.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>

            <div className="mt-3 flex flex-wrap gap-2">
              {activeExperience.stack.map((tool) => (
                <span
                  key={tool}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-2.5 py-1 text-[11px] text-[#3B413C]"
                >
                  {renderTechIcon(tool, "h-3 w-3")}
                  <span>{tool}</span>
                </span>
              ))}
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}
