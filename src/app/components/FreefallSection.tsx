import { useEffect, useState } from "react";
import {
  motion,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import {
  FaBriefcase,
  FaTools,
  FaProjectDiagram,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCode,
  FaDatabase,
  FaGithub,
  FaExternalLinkAlt,
  FaAward,
} from "react-icons/fa";
import { SiPython, SiR } from "react-icons/si";
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

interface FreefallProjectBillboardProps {
  project: {
    id: string;
    title: string;
    description: string;
  };
  index: number;
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

export function FreefallSection({
  scrollYProgress,
  userNotes,
  onOpenNote,
}: FreefallSectionProps) {
  const freefallProgress = useTransform(
    scrollYProgress,
    [FREEFALL_START_PROGRESS, FREEFALL_END_PROGRESS],
    [0, 1],
  );

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };
    const handleResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const rotateX = (mousePos.y - viewport.height / 2 || 0) * 0.05;
  const rotateY = (mousePos.x - viewport.width / 2 || 0) * -0.05;

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

function FreefallProjectBillboard({
  project,
  index,
}: FreefallProjectBillboardProps) {
  return (
    <motion.div
      layoutId={`project-${project.id}`}
      className={`rounded-xl border border-[#3B413C]/20 bg-white/90 p-4 shadow-md ${
        index === 0 ? "" : "mt-3"
      }`}
    >
      <h2 className="text-h2-sans font-bold text-[#3B413C]">{project.title}</h2>
      <p className="text-body-sans mt-2 text-[#3B413C]/80">
        {project.description}
      </p>
    </motion.div>
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
    if (lower.includes("python")) {
      return <SiPython className="h-3.5 w-3.5 text-[#59A96A]" />;
    }
    if (lower === "r" || lower.startsWith("r ")) {
      return <SiR className="h-3.5 w-3.5 text-[#3B413C]" />;
    }
    if (lower.includes("sql")) {
      return <FaDatabase className="h-3.5 w-3.5 text-[#F19A3E]" />;
    }
    return <FaAward className="h-3.5 w-3.5 text-[#59A96A]" />;
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
      </div>
      <div className="ml-4 flex w-20 flex-col items-center justify-center gap-2 text-xs text-[#4B5563]">
        <button
          onClick={goPrev}
          type="button"
          className="rounded-full bg-[#F5F5F5] px-3 py-1 hover:bg-[#E5E7EB]"
        >
          ◀
        </button>
        <span className="font-medium text-[#111827]">
          {index + 1}/{total}
        </span>
        <button
          onClick={goNext}
          type="button"
          className="rounded-full bg-[#F5F5F5] px-3 py-1 hover:bg-[#E5E7EB]"
        >
          ▶
        </button>
      </div>
    </div>
  );
}

function ProjectsPanel({ projects }: { projects: typeof SUBSTANCE.projects }) {
  const [index, setIndex] = useState(0);
  const total = projects.length;
  const current = projects[index];

  if (!current) return null;

  const goPrev = () => setIndex((prev) => (prev - 1 + total) % total);
  const goNext = () => setIndex((prev) => (prev + 1) % total);

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
        <div>
          <p className="text-sm text-[#6B7280] flex items-center gap-2">
            <FaCalendarAlt className="h-4 w-4 text-[#F19A3E]" />
            {current.timeframe}
          </p>
          <p className="text-body-sans font-semibold text-[#111827] mt-1">
            {current.name}
          </p>
          <p className="text-sm text-[#4B5563] mt-1">{current.tagline}</p>
        </div>
        {current.media && current.media.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-3">
            {current.media.map((media) =>
              media.kind === "image" ? (
                <img
                  key={media.src}
                  src={media.src}
                  alt={media.alt}
                  className="h-32 w-auto rounded-lg border border-[#E5E7EB] object-cover shadow-sm"
                />
              ) : (
                <div
                  key={media.embedUrl}
                  className="aspect-video w-full max-w-md overflow-hidden rounded-lg border border-[#E5E7EB] shadow-sm"
                >
                  <iframe
                    src={media.embedUrl}
                    title={media.title || current.name}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ),
            )}
          </div>
        )}
        {current.links && current.links.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-3 text-sm">
            {current.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                className="inline-flex items-center gap-2 rounded-full bg-[#59A96A] px-3 py-1 text-xs font-semibold text-white shadow hover:bg-[#4a8d58]"
              >
                <FaGithub className="h-3 w-3" />
                <span>{link.label}</span>
                {link.external && <FaExternalLinkAlt className="h-3 w-3" />}
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="ml-4 flex w-20 flex-col items-center justify-center gap-2 text-xs text-[#4B5563]">
        <button
          onClick={goPrev}
          type="button"
          className="rounded-full bg-[#F5F5F5] px-3 py-1 hover:bg-[#E5E7EB]"
        >
          ◀
        </button>
        <span className="font-medium text-[#111827]">
          {index + 1}/{total}
        </span>
        <button
          onClick={goNext}
          type="button"
          className="rounded-full bg-[#F5F5F5] px-3 py-1 hover:bg-[#E5E7EB]"
        >
          ▶
        </button>
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
  const [index, setIndex] = useState(0);
  const total = experience.length;
  const current = experience[index];

  const goPrev = () => setIndex((prev) => (prev - 1 + total) % total);
  const goNext = () => setIndex((prev) => (prev + 1) % total);

  return (
    <div className="flex w-full items-stretch rounded-2xl border-2 border-[#3B413C]/10 bg-white/95 p-6 shadow-xl backdrop-blur-md">
      <div className="mr-4 flex flex-col items-center justify-center gap-2 border-r border-[#E5E7EB] pr-4">
        <FaBriefcase className="h-6 w-6 text-[#59A96A]" />
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280]">
          Experience
        </span>
      </div>
      <div className="flex-1">
        <h2 className="text-h2-sans text-[#111827]">
          {SUBSTANCE.story.freefall.experienceIntro}
        </h2>
        <div className="mt-4">
          {current && (
            <FreefallProjectBillboard
              project={{
                id: current.id,
                title: `${current.org}, ${current.role}`,
                description: current.oneLineImpact,
              }}
              index={0}
            />
          )}
        </div>
      </div>
      <div className="ml-4 flex w-20 flex-col items-center justify-center gap-2 text-xs text-[#4B5563]">
        <button
          onClick={goPrev}
          type="button"
          className="rounded-full bg-[#F5F5F5] px-3 py-1 hover:bg-[#E5E7EB]"
        >
          ◀
        </button>
        <span className="font-medium text-[#111827]">
          {index + 1}/{total}
        </span>
        <button
          onClick={goNext}
          type="button"
          className="rounded-full bg-[#F5F5F5] px-3 py-1 hover:bg-[#E5E7EB]"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
