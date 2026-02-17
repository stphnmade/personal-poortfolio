import { useEffect, useMemo, useState, type CSSProperties } from "react";
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
import { ParachuteCompanion } from "@/app/components/ParachuteCompanion";

interface FreefallSectionProps {
  scrollYProgress: MotionValue<number>;
  theme: "dark" | "light";
  userNotes: {
    id: string;
    message: string;
    author: string;
  }[];
  onOpenNote: () => void;
}

interface NoteCloudData {
  id: string;
  top: number;
  width: number;
  largePuffSize: number;
  smallPuffSize: number;
  horizontalOffset: number;
  duration: number;
  delay: number;
  bobDuration: number;
  note: {
    message: string;
    author: string;
  } | null;
  toneIndex: number;
}

interface NoteCloudTone {
  cloud: string;
  outline: string;
  text: string;
  toast: string;
  toastText: string;
}

interface StoryNotePreview {
  id: string;
  message: string;
  author: string;
}

const EXPERIENCE = CHAPTERS.find((c) => c.id === "experience")!;
const TOOLS = CHAPTERS.find((c) => c.id === "tools")!;
const FREEFALL_START_PROGRESS = EXPERIENCE.start;
const FREEFALL_END_PROGRESS = TOOLS.end;
const NOTE_CLOUD_LIMIT = 4;

const NOTE_CLOUD_TONES_DARK: NoteCloudTone[] = [
  {
    cloud: "bg-[#EEF4F1]",
    outline: "border-[#59A96A]/55",
    text: "text-[#E8F4EA]",
    toast: "bg-[#0D1C2B]/94 border-[#59A96A]/45",
    toastText: "text-[#DDECF2]",
  },
  {
    cloud: "bg-[#EEF3FA]",
    outline: "border-[#4A90E2]/55",
    text: "text-[#E7EEFF]",
    toast: "bg-[#121B34]/94 border-[#4A90E2]/42",
    toastText: "text-[#DCE6FA]",
  },
  {
    cloud: "bg-[#F7EEE6]",
    outline: "border-[#F19A3E]/52",
    text: "text-[#FFECD9]",
    toast: "bg-[#241915]/94 border-[#F19A3E]/42",
    toastText: "text-[#FFE7D1]",
  },
];

const NOTE_CLOUD_TONES_LIGHT: NoteCloudTone[] = [
  {
    cloud: "bg-[#F5FBF7]",
    outline: "border-[#59A96A]/60",
    text: "text-[#1E4D2B]",
    toast: "bg-[#F2FBF5]/97 border-[#59A96A]/48",
    toastText: "text-[#244C30]",
  },
  {
    cloud: "bg-[#F4F8FF]",
    outline: "border-[#4A90E2]/62",
    text: "text-[#1C3E69]",
    toast: "bg-[#F2F7FF]/97 border-[#4A90E2]/48",
    toastText: "text-[#1F436D]",
  },
  {
    cloud: "bg-[#FFF7EE]",
    outline: "border-[#F19A3E]/62",
    text: "text-[#68401B]",
    toast: "bg-[#FFF5EA]/97 border-[#F19A3E]/46",
    toastText: "text-[#6B431E]",
  },
];

function seedFromString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getSeededNumber(seed: number, min: number, max: number) {
  const normalized = (Math.sin(seed * 12.9898) * 43758.5453) % 1;
  const fraction = normalized - Math.floor(normalized);
  return min + fraction * (max - min);
}

function buildCloudData(userNotes: StoryNotePreview[]) {
  const notesForClouds = [...userNotes]
    .sort((a, b) => seedFromString(a.id) - seedFromString(b.id))
    .slice(0, NOTE_CLOUD_LIMIT);

  const noteClouds: NoteCloudData[] = notesForClouds.map((note, index) => {
    const seed = seedFromString(note.id);
    const duration = getSeededNumber(seed + 3, 38, 62);
    const phase = getSeededNumber(seed + 4, 0, duration);
    const largePuffSize = getSeededNumber(seed + 5, 48, 60);
    return {
      id: `note-cloud-${note.id}`,
      top: getSeededNumber(seed + 1, 14, 68),
      width: getSeededNumber(seed + 2, 100, 180),
      largePuffSize,
      smallPuffSize: largePuffSize * 0.72,
      horizontalOffset: getSeededNumber(seed + 6, -10, 10),
      duration,
      delay: -phase,
      bobDuration: getSeededNumber(seed + 7, 6.8, 12),
      note: note,
      toneIndex: (seed + index) % NOTE_CLOUD_TONES_DARK.length,
    };
  });

  const ambientCloudCount = 5;
  const ambientClouds: NoteCloudData[] = Array.from({
    length: ambientCloudCount,
  }).map((_, index) => {
    const seed = seedFromString(`ambient-cloud-${index}`);
    const duration = getSeededNumber(seed + 3, 44, 70);
    const phase = getSeededNumber(seed + 4, 0, duration);
    const largePuffSize = getSeededNumber(seed + 5, 48, 60);
    return {
      id: `ambient-cloud-${index}`,
      top: getSeededNumber(seed + 1, 12, 72),
      width: getSeededNumber(seed + 2, 100, 180),
      largePuffSize,
      smallPuffSize: largePuffSize * 0.72,
      horizontalOffset: getSeededNumber(seed + 6, -10, 10),
      duration,
      delay: -phase,
      bobDuration: getSeededNumber(seed + 7, 8, 14),
      note: null,
      toneIndex: index % NOTE_CLOUD_TONES_DARK.length,
    };
  });

  return [...ambientClouds, ...noteClouds].sort((a, b) => a.top - b.top);
}

function getCloudTone(
  isDark: boolean,
  toneIndex: number,
  isNoteCloud: boolean,
): NoteCloudTone {
  if (!isNoteCloud) {
    return isDark
      ? {
          cloud: "bg-[#F1F5FA]",
          outline: "border-[#D8E2EE]/90",
          text: "text-[#E4EDF5]",
          toast: "bg-[#0F1D29]/92 border-white/20",
          toastText: "text-[#DDE8F0]",
        }
      : {
          cloud: "bg-[#FFFFFF]",
          outline: "border-[#D5DEE7]",
          text: "text-[#3B4A59]",
          toast: "bg-white/97 border-[#C8D4DE]/90",
          toastText: "text-[#2E3D4D]",
        };
  }

  const tones = isDark ? NOTE_CLOUD_TONES_DARK : NOTE_CLOUD_TONES_LIGHT;
  return tones[toneIndex % tones.length];
}

function compactNoteText(note: { message: string; author: string }, limit = 120) {
  const message = note.message.trim();
  const author = note.author.trim();
  const withAuthor = author ? `${message} — ${author}` : message;
  if (withAuthor.length <= limit) return withAuthor;
  return `${withAuthor.slice(0, limit - 1)}…`;
}

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
  theme,
  userNotes,
  onOpenNote: _onOpenNote,
}: FreefallSectionProps) {
  const isDark = theme === "dark";
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
  const [activeCloudId, setActiveCloudId] = useState<string | null>(null);
  const cloudData = useMemo(() => buildCloudData(userNotes), [userNotes]);
  const noteCloudsPaused = activeCloudId !== null;

  useEffect(() => {
    if (!activeCloudId) return;
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-note-cloud-shell]")) return;
      setActiveCloudId(null);
    };
    window.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [activeCloudId]);

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
      <motion.div
        className={`absolute inset-0 overflow-hidden ${
          isDark
            ? "bg-[linear-gradient(180deg,#020A14_0%,#061327_40%,#0D2238_72%,#153147_100%)]"
            : "bg-[linear-gradient(180deg,#CFE6FF_0%,#B9D9FA_40%,#A6CCF5_68%,#DDEEFF_100%)]"
        }`}
        style={{ opacity: freefallOpacity }}
      >
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-[radial-gradient(circle_at_20%_22%,rgba(89,169,106,0.18)_0,transparent_40%),radial-gradient(circle_at_76%_30%,rgba(241,154,62,0.10)_0,transparent_34%)]"
              : "bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.45)_0,transparent_42%),radial-gradient(circle_at_82%_28%,rgba(255,255,255,0.35)_0,transparent_34%)]"
          }`}
        />
        {isDark && (
          <>
            <div className="absolute left-[10%] top-[14%] h-1 w-1 rounded-full bg-[#E3EDF8]/80" />
            <div className="absolute left-[28%] top-[22%] h-1.5 w-1.5 rounded-full bg-[#E3EDF8]/75" />
            <div className="absolute left-[46%] top-[10%] h-1 w-1 rounded-full bg-[#E3EDF8]/70" />
            <div className="absolute left-[72%] top-[24%] h-1.5 w-1.5 rounded-full bg-[#E3EDF8]/70" />
            <div className="absolute left-[84%] top-[12%] h-1 w-1 rounded-full bg-[#E3EDF8]/75" />
          </>
        )}
        <div className="absolute inset-0 z-10">
          {cloudData.map((cloud) => {
            const isNoteCloud = cloud.note !== null;
            const isActiveCloud = activeCloudId === cloud.id;
            const tone = getCloudTone(isDark, cloud.toneIndex, isNoteCloud);
            return (
              <div
                key={cloud.id}
                className={`freefall-cloud-track absolute left-0 ${
                  noteCloudsPaused && isNoteCloud ? "is-paused" : ""
                } ${isNoteCloud ? "note-cloud-track pointer-events-auto" : "pointer-events-none"}`}
                style={
                  {
                    top: `${cloud.top}%`,
                    "--cloud-duration": `${cloud.duration}s`,
                    "--cloud-delay": `${cloud.delay}s`,
                  } as CSSProperties
                }
              >
                <div
                  className={`relative ${noteCloudsPaused && isNoteCloud ? "is-paused" : ""}`}
                  style={
                    {
                      "--cloud-bob-duration": `${cloud.bobDuration}s`,
                    } as CSSProperties
                  }
                >
                  <div
                    data-note-cloud-shell={isNoteCloud ? "true" : undefined}
                    className={
                      isNoteCloud
                        ? "pointer-events-auto -mx-3 -mt-7 px-3 pt-7"
                        : "pointer-events-none"
                    }
                    onPointerDown={(event) => {
                      if (!isNoteCloud) return;
                      event.stopPropagation();
                      setActiveCloudId(cloud.id);
                    }}
                    onClick={() => {
                      if (!isNoteCloud) return;
                      setActiveCloudId(cloud.id);
                    }}
                  >
                    <button
                      type="button"
                      data-note-cloud={isNoteCloud ? "true" : undefined}
                      className={`freefall-cloud cloud-anchor relative shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_8px_16px_rgba(11,23,35,0.16)] ${
                        tone.cloud
                      } ${isNoteCloud ? "cursor-pointer pointer-events-auto" : "pointer-events-none"}`}
                      style={
                        {
                          "--cloud-width": `${cloud.width}px`,
                          "--cloud-size-lg": `${cloud.largePuffSize}px`,
                          "--cloud-size-sm": `${cloud.smallPuffSize}px`,
                          "--cloud-offset": `${cloud.horizontalOffset}%`,
                        } as CSSProperties
                      }
                      aria-label={
                        isNoteCloud
                          ? "Open community note preview"
                          : "Ambient cloud"
                      }
                    >
                      {isNoteCloud && (
                        <span className="absolute right-2.5 top-2 h-2.5 w-2.5 rounded-full bg-[#59A96A] shadow-[0_0_8px_rgba(89,169,106,0.75)]" />
                      )}
                    </button>

                    <AnimatePresence>
                      {isActiveCloud && cloud.note && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.22, ease: "easeOut" }}
                          className={`pointer-events-none absolute left-1/2 top-[calc(100%+0.35rem)] z-40 w-56 -translate-x-1/2 rounded-md border px-2.5 py-2 text-left shadow-md backdrop-blur ${tone.toast} ${tone.toastText}`}
                        >
                          <p className="text-annotation-script text-xs leading-snug">
                            {compactNoteText(cloud.note)}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Sticky scene so content stays in view while scrolling the freefall range */}
      <motion.div
        style={{ opacity: freefallOpacity }}
        className="pointer-events-none sticky top-0 z-20 flex h-screen w-full flex-col items-center justify-center gap-8 px-4"
      >
        <ParachuteCompanion
          stage="freefall"
          theme={theme}
          className="pointer-events-none absolute right-[8%] top-[18%] z-20 hidden md:block"
        />

        {/* Freefall heading */}
        <div
          className={`rounded-full px-4 py-2 shadow-sm backdrop-blur ${
            isDark
              ? "border border-white/18 bg-[#0B1620]/78"
              : "border border-[#3B413C]/12 bg-white/85"
          } pointer-events-auto`}
        >
          <span
            className={`text-sm font-medium ${
              isDark ? "text-[#E5EFF6]" : "text-[#3B413C]"
            }`}
          >
            {SUBSTANCE.story.freefall.subheadline}
          </span>
        </div>

        {/* EXPERIENCE / SKILLS / PROJECTS content window */}
        <motion.div
          key={activeBand}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="pointer-events-auto mt-4 w-full max-w-5xl"
        >
          {activeBand === "experience" && (
            <ExperiencePanel experience={experienceItems} theme={theme} />
          )}
          {activeBand === "skills" && (
            <SkillsPanel skills={skillGroups} theme={theme} />
          )}
          {activeBand === "projects" && (
            <ProjectsPanel projects={projectItems} theme={theme} />
          )}
        </motion.div>
      </motion.div>

    </div>
  );
}

function SkillsPanel({
  skills,
  theme,
}: {
  skills: typeof SUBSTANCE.skillsAndCerts;
  theme: "dark" | "light";
}) {
  const isDark = theme === "dark";
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
    <div
      className={`flex w-full items-stretch rounded-2xl border-2 p-6 shadow-xl backdrop-blur-md ${
        isDark
          ? "border-white/15 bg-[#0F1D29]/88"
          : "border-[#3B413C]/10 bg-white/95"
      }`}
    >
      <div
        className={`mr-4 flex flex-col items-center justify-center gap-2 border-r pr-4 ${
          isDark ? "border-white/15" : "border-[#E5E7EB]"
        }`}
      >
        {currentIcon}
        <span
          className={`text-xs font-semibold uppercase tracking-[0.2em] ${
            isDark ? "text-[#AFC0CD]" : "text-[#6B7280]"
          }`}
        >
          Skills
        </span>
      </div>
      <div className="flex-1">
        <h2 className={`text-h2-sans ${isDark ? "text-[#EAF2F8]" : "text-[#111827]"}`}>
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
            <p className={`mt-2 text-sm font-semibold ${isDark ? "text-[#DDE8F0]" : "text-[#111827]"}`}>
              {current.title}
            </p>
            <ul className={`mt-3 flex flex-wrap gap-2 text-sm ${isDark ? "text-[#C4D2DD]" : "text-[#4B5563]"}`}>
              {current.items.map((item) => (
                <li
                  key={item}
                  className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 ${
                    isDark
                      ? "border-white/15 bg-[#162736]"
                      : "border-[#E5E7EB] bg-[#F9FAFB]"
                  }`}
                >
                  {renderSkillIcon(item)}
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className={`ml-4 flex w-20 flex-col items-center justify-center gap-2 text-xs ${isDark ? "text-[#AFC0CD]" : "text-[#4B5563]"}`}>
        <button
          onClick={goPrev}
          type="button"
          aria-label="Previous skills group"
          className={`rounded-full px-3 py-1 transition-colors duration-200 ${
            isDark
              ? "bg-[#1A2C3A] text-[#DDE8F0] hover:bg-[#203648]"
              : "bg-[#F5F5F5] hover:bg-[#E5E7EB]"
          }`}
        >
          ◀
        </button>
        <span className={`font-medium ${isDark ? "text-[#EAF2F8]" : "text-[#111827]"}`}>
          {index + 1}/{total}
        </span>
        <button
          onClick={goNext}
          type="button"
          aria-label="Next skills group"
          className={`rounded-full px-3 py-1 transition-colors duration-200 ${
            isDark
              ? "bg-[#1A2C3A] text-[#DDE8F0] hover:bg-[#203648]"
              : "bg-[#F5F5F5] hover:bg-[#E5E7EB]"
          }`}
        >
          ▶
        </button>
      </div>
    </div>
  );
}

function ProjectsPanel({
  projects,
  theme,
}: {
  projects: typeof SUBSTANCE.projects;
  theme: "dark" | "light";
}) {
  const isDark = theme === "dark";
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
    <div
      className={`flex w-full items-stretch rounded-2xl border-2 p-6 shadow-xl backdrop-blur-md ${
        isDark
          ? "border-white/15 bg-[#0F1D29]/88"
          : "border-[#3B413C]/10 bg-white/95"
      }`}
    >
      <div
        className={`mr-4 flex flex-col items-center justify-center gap-2 border-r pr-4 ${
          isDark ? "border-white/15" : "border-[#E5E7EB]"
        }`}
      >
        <FaProjectDiagram className="h-6 w-6 text-[#DD403A]" />
        <span
          className={`text-xs font-semibold uppercase tracking-[0.2em] ${
            isDark ? "text-[#AFC0CD]" : "text-[#6B7280]"
          }`}
        >
          Projects
        </span>
      </div>
      <div className="flex-1 space-y-3">
        <h2 className={`text-h2-sans ${isDark ? "text-[#EAF2F8]" : "text-[#111827]"}`}>
          {SUBSTANCE.story.freefall.toolsIntro}
        </h2>
        <AnimatePresence mode="wait">
          <motion.article
            key={current.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`rounded-2xl border p-4 shadow-md ${
              isDark
                ? "border-white/12 bg-[#172838]"
                : "border-[#3B413C]/12 bg-[#F9FAFB]"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className={`flex items-center gap-2 text-sm ${isDark ? "text-[#AFC0CD]" : "text-[#6B7280]"}`}>
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
              <p className={`text-body-sans font-semibold ${isDark ? "text-[#EAF2F8]" : "text-[#111827]"}`}>
                {current.name}
              </p>
              <p className={`mt-1 text-sm ${isDark ? "text-[#C4D2DD]" : "text-[#4B5563]"}`}>{current.tagline}</p>
              <p className={`mt-2 text-xs ${isDark ? "text-[#AFC0CD]" : "text-[#6B7280]"}`}>{current.status.access}</p>
            </div>

            <div className="mt-3">
              <div className="flex items-center justify-between gap-2">
                <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${isDark ? "text-[#AFC0CD]" : "text-[#6B7280]"}`}>
                  Quick Look
                </p>
                {quickLookCount > 1 && (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={goPrevMedia}
                      aria-label="Previous media"
                      className={`rounded-full border px-2 py-0.5 text-xs transition-colors ${
                        isDark
                          ? "border-white/20 bg-[#102130] text-[#DCE8F1] hover:bg-[#1A3347]"
                          : "border-[#3B413C]/15 bg-white text-[#3B413C] hover:bg-[#E5E7EB]"
                      }`}
                    >
                      ◀
                    </button>
                    <span className={`text-[11px] ${isDark ? "text-[#AFC0CD]" : "text-[#6B7280]"}`}>
                      {mediaIndex + 1}/{quickLookCount}
                    </span>
                    <button
                      type="button"
                      onClick={goNextMedia}
                      aria-label="Next media"
                      className={`rounded-full border px-2 py-0.5 text-xs transition-colors ${
                        isDark
                          ? "border-white/20 bg-[#102130] text-[#DCE8F1] hover:bg-[#1A3347]"
                          : "border-[#3B413C]/15 bg-white text-[#3B413C] hover:bg-[#E5E7EB]"
                      }`}
                    >
                      ▶
                    </button>
                  </div>
                )}
              </div>

              <div
                className={`mt-2 overflow-hidden rounded-xl border ${
                  isDark ? "border-white/14 bg-[#0D1B28]" : "border-[#E5E7EB] bg-white"
                }`}
              >
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
              <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${isDark ? "text-[#AFC0CD]" : "text-[#6B7280]"}`}>
                Built With
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {current.stack.map((tool) => (
                  <span
                    key={tool}
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${
                      isDark
                        ? "border-white/16 bg-[#112333] text-[#DDE8F0]"
                        : "border-[#E5E7EB] bg-white text-[#3B413C]"
                    }`}
                  >
                    {renderTechIcon(tool)}
                    <span>{tool}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-3">
              <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${isDark ? "text-[#AFC0CD]" : "text-[#6B7280]"}`}>
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

            <p className={`mt-3 text-xs leading-relaxed ${isDark ? "text-[#C4D2DD]" : "text-[#4B5563]"}`}>
              {current.impactBullets[0]}
            </p>
          </motion.article>
        </AnimatePresence>
      </div>
      <div className={`ml-4 flex w-20 flex-col items-center justify-center gap-2 text-xs ${isDark ? "text-[#AFC0CD]" : "text-[#4B5563]"}`}>
        <button
          onClick={goPrev}
          type="button"
          aria-label="Previous project"
          className={`rounded-full px-3 py-1 transition-colors duration-200 ${
            isDark
              ? "bg-[#1A2C3A] text-[#DDE8F0] hover:bg-[#203648]"
              : "bg-[#F5F5F5] hover:bg-[#E5E7EB]"
          }`}
        >
          ◀
        </button>
        <span className={`font-medium ${isDark ? "text-[#EAF2F8]" : "text-[#111827]"}`}>
          {index + 1}/{total}
        </span>
        <button
          onClick={goNext}
          type="button"
          aria-label="Next project"
          className={`rounded-full px-3 py-1 transition-colors duration-200 ${
            isDark
              ? "bg-[#1A2C3A] text-[#DDE8F0] hover:bg-[#203648]"
              : "bg-[#F5F5F5] hover:bg-[#E5E7EB]"
          }`}
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

function ExperiencePanel({
  experience,
  theme,
}: {
  experience: typeof SUBSTANCE.experience;
  theme: "dark" | "light";
}) {
  const isDark = theme === "dark";
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
    <div
      className={`rounded-2xl border-2 p-6 shadow-xl backdrop-blur-md ${
        isDark
          ? "border-white/15 bg-[#0F1D29]/88"
          : "border-[#3B413C]/10 bg-white/95"
      }`}
    >
      <div className="mb-4 flex items-center gap-2">
        <FaBriefcase className="h-6 w-6 text-[#59A96A]" />
        <span
          className={`text-xs font-semibold uppercase tracking-[0.2em] ${
            isDark ? "text-[#AFC0CD]" : "text-[#6B7280]"
          }`}
        >
          Experience
        </span>
      </div>

      <h2 className={`text-h2-sans ${isDark ? "text-[#EAF2F8]" : "text-[#111827]"}`}>
        {SUBSTANCE.story.freefall.experienceIntro}
      </h2>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div
          className={`relative rounded-xl border p-4 ${
            isDark ? "border-white/14 bg-[#172838]" : "border-[#3B413C]/12 bg-[#F9FAFB]"
          }`}
        >
          <div
            className={`mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] ${
              isDark ? "text-[#AFC0CD]" : "text-[#6B7280]"
            }`}
          >
            Timeline (oldest to newest)
          </div>
          <div
            className={`absolute bottom-6 left-[1.08rem] top-14 w-px ${
              isDark ? "bg-white/16" : "bg-[#3B413C]/15"
            }`}
          />
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
                      : isDark
                      ? "border-white/14 bg-[#112333] hover:bg-[#183247]"
                      : "border-[#E5E7EB] bg-white hover:bg-[#F5F5F5]"
                  }`}
                >
                  <span
                    className={`absolute -left-[0.88rem] top-4 h-2.5 w-2.5 rounded-full ${
                      isActive ? "bg-[#59A96A]" : "bg-[#C5C9CC]"
                    }`}
                  />
                  <p
                    className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${
                      isDark ? "text-[#AFC0CD]" : "text-[#6B7280]"
                    }`}
                  >
                    {exp.start} to {exp.end}
                  </p>
                  <p className={`mt-1 text-sm font-semibold ${isDark ? "text-[#EAF2F8]" : "text-[#111827]"}`}>{exp.org}</p>
                  <p className={`text-xs ${isDark ? "text-[#C4D2DD]" : "text-[#4B5563]"}`}>{exp.role}</p>
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
            className={`rounded-xl border p-4 shadow-sm ${
              isDark ? "border-white/14 bg-[#172838]" : "border-[#3B413C]/12 bg-[#F9FAFB]"
            }`}
          >
            <p
              className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${
                isDark ? "text-[#AFC0CD]" : "text-[#6B7280]"
              }`}
            >
              {activeExperience.start} to {activeExperience.end}
            </p>
            <h3 className={`mt-1 text-base font-semibold ${isDark ? "text-[#EAF2F8]" : "text-[#111827]"}`}>
              {activeExperience.org}
            </h3>
            <p className={`text-sm ${isDark ? "text-[#C4D2DD]" : "text-[#4B5563]"}`}>{activeExperience.role}</p>
            <p className={`mt-2 text-xs ${isDark ? "text-[#AFC0CD]" : "text-[#6B7280]"}`}>{activeExperience.location}</p>

            <p className={`mt-3 text-sm leading-relaxed ${isDark ? "text-[#DDE8F0]" : "text-[#3B413C]"}`}>
              {activeExperience.oneLineImpact}
            </p>

            <ul className={`mt-3 list-disc space-y-1 pl-5 text-sm ${isDark ? "text-[#C4D2DD]" : "text-[#4B5563]"}`}>
              {activeExperience.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>

            <div className="mt-3 flex flex-wrap gap-2">
              {activeExperience.stack.map((tool) => (
                <span
                  key={tool}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] ${
                    isDark
                      ? "border-white/16 bg-[#112333] text-[#DDE8F0]"
                      : "border-[#E5E7EB] bg-white text-[#3B413C]"
                  }`}
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
