import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import {
  FaBriefcase,
  FaFlag,
  FaGithub,
  FaLinkedin,
  FaProjectDiagram,
  FaTools,
} from 'react-icons/fa'
import { ParachuteCompanion } from '@/app/components/ParachuteCompanion'
import { SUBSTANCE } from '@/constants/substance'

interface BeachLandingProps {
  projects: {
    id: string
    title: string
    description: string
  }[]
  theme: 'dark' | 'light'
  userNotes: {
    id: string
    message: string
    author: string
    createdAt?: string
  }[]
}

type DesertFeature = 'cactus' | 'sand' | 'rock'

const snapTransition = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
  mass: 1,
}

function getOldestYear(experienceItems: typeof SUBSTANCE.experience) {
  const years = experienceItems
    .map((exp) => Number(exp.start.match(/\b\d{4}\b/)?.[0] ?? Number.NaN))
    .filter((year) => Number.isFinite(year))
  if (years.length === 0) return new Date().getFullYear()
  return Math.min(...years)
}

function DesertCactus({
  className,
  isDark,
  highlighted,
  scale = 1,
}: {
  className: string
  isDark: boolean
  highlighted: boolean
  scale?: number
}) {
  const bodyClass = highlighted
    ? isDark
      ? 'bg-[#3E7B53] shadow-[0_0_28px_rgba(102,184,124,0.42)]'
      : 'bg-[#66B468] shadow-[0_0_18px_rgba(82,150,85,0.35)]'
    : isDark
    ? 'bg-[#2A563B]'
    : 'bg-[#5A9E5A]'
  const baseClass = isDark ? 'bg-[#473321]' : 'bg-[#9C7248]'
  const prickleClass = isDark ? 'bg-[#C5E8C9]/55' : 'bg-[#2E5B2F]/45'

  const prickles = [
    { left: '14%', top: '16%', rotate: '-18deg' },
    { left: '34%', top: '24%', rotate: '12deg' },
    { left: '66%', top: '20%', rotate: '-12deg' },
    { left: '78%', top: '35%', rotate: '15deg' },
    { left: '20%', top: '40%', rotate: '-10deg' },
    { left: '52%', top: '48%', rotate: '16deg' },
    { left: '73%', top: '56%', rotate: '-16deg' },
    { left: '28%', top: '64%', rotate: '14deg' },
    { left: '42%', top: '74%', rotate: '-14deg' },
    { left: '62%', top: '82%', rotate: '10deg' },
  ]

  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{ transform: `scale(${scale})` }}
    >
      <div className={`relative h-24 w-10 rounded-t-[999px] rounded-b-[4px] ${bodyClass}`}>
        <div className={`absolute -left-4 bottom-8 h-11 w-4 rounded-t-[999px] rounded-b-[3px] ${bodyClass}`} />
        <div className={`absolute left-[92%] bottom-10 h-10 w-4 rounded-t-[999px] rounded-b-[3px] ${bodyClass}`} />
        {prickles.map((prickle, index) => (
          <span
            key={`${className}-prickle-${index}`}
            className={`absolute h-[6px] w-[1.5px] rounded-full ${prickleClass}`}
            style={{
              left: prickle.left,
              top: prickle.top,
              transform: `rotate(${prickle.rotate})`,
            }}
          />
        ))}
      </div>
      <div className={`mx-auto mt-1 h-2.5 w-14 rounded-sm ${baseClass}`} />
    </div>
  )
}

function SandpileMarker({ isDark }: { isDark: boolean }) {
  const sand = isDark ? '#8A6841' : '#D5AD79'
  const sandShadow = isDark ? '#6B4D2E' : '#B98A56'
  const flagPole = isDark ? '#D2DEE9' : '#55606A'
  const flag = isDark ? '#59A96A' : '#3F8A52'

  return (
    <svg
      viewBox="0 0 120 74"
      role="img"
      aria-label="Community notes sandpile"
      className="h-12 w-20 shrink-0"
    >
      <ellipse cx="60" cy="58" rx="44" ry="12" fill={sandShadow} opacity="0.78" />
      <path d="M18 58 C30 34, 90 34, 102 58 Z" fill={sand} />
      <rect x="74" y="22" width="3.2" height="28" rx="1.4" fill={flagPole} />
      <path d="M77 24 L98 30 L77 36 Z" fill={flag} />
      <circle cx="77.5" cy="22.5" r="2.4" fill={flagPole} />
    </svg>
  )
}

export function BeachLanding({ projects, userNotes, theme }: BeachLandingProps) {
  const isDark = theme === 'dark'
  const experienceItems = SUBSTANCE.experience
  const allProjects = SUBSTANCE.projects
  const skillGroups = SUBSTANCE.skillsAndCerts
  const toolGroups = SUBSTANCE.toolsAndPlatforms
  const totalSkills = skillGroups.reduce((sum, group) => sum + group.items.length, 0)
  const totalTools = toolGroups.reduce((sum, group) => sum + group.items.length, 0)
  const oldestYear = getOldestYear(experienceItems)
  const careerSpanYears = Math.max(1, new Date().getFullYear() - oldestYear + 1)
  const { links } = SUBSTANCE.meta
  const [activeFeature, setActiveFeature] = useState<DesertFeature>('cactus')
  const [notesExpanded, setNotesExpanded] = useState(true)

  const communityNotes = useMemo(
    () =>
      [...userNotes].sort((a, b) =>
        String(b.createdAt ?? '').localeCompare(String(a.createdAt ?? '')),
      ),
    [userNotes],
  )

  const notesToDisplay = notesExpanded ? communityNotes : communityNotes.slice(0, 1)

  const summaryCards = [
    {
      id: 'experience',
      title: 'Experience',
      text: `${experienceItems.length} core roles across ${careerSpanYears}+ years of execution and leadership.`,
      icon: <FaBriefcase className="h-3.5 w-3.5" />,
      feature: 'cactus' as const,
    },
    {
      id: 'projects',
      title: 'Projects',
      text: `${allProjects.length} total builds, ${projects.length} payload snapshots reached the beach.`,
      icon: <FaProjectDiagram className="h-3.5 w-3.5" />,
      feature: 'sand' as const,
    },
    {
      id: 'tools-skills',
      title: 'Skills and Tools',
      text: `${totalSkills} skills and ${totalTools} tools that hold up in changing terrain.`,
      icon: <FaTools className="h-3.5 w-3.5" />,
      feature: 'rock' as const,
    },
  ]

  return (
    <motion.div
      className={`relative flex h-full w-full items-end justify-center overflow-hidden ${
        isDark
          ? 'bg-[linear-gradient(180deg,#070E16_0%,#111D2D_24%,#28331E_52%,#4A3823_77%,#5A442B_100%)]'
          : 'bg-[linear-gradient(180deg,#E9F2FF_0%,#CAE1FA_25%,#D6C6B0_55%,#BB9364_79%,#A67D53_100%)]'
      }`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={snapTransition}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[10%] top-[9%] h-28 w-28 rounded-full bg-[radial-gradient(circle_at_30%_28%,#FFFDF7_0%,#F4EFE0_56%,#DDD3BD_100%)] shadow-[0_0_90px_rgba(255,247,220,0.42)]">
          <div className="absolute left-[18%] top-[26%] h-3 w-3 rounded-full bg-[#B7AA93]/55" />
          <div className="absolute left-[47%] top-[18%] h-2.5 w-2.5 rounded-full bg-[#AC9E86]/50" />
          <div className="absolute left-[54%] top-[47%] h-4 w-4 rounded-full bg-[#B8AB94]/48" />
          <div className="absolute left-[28%] top-[58%] h-2 w-2 rounded-full bg-[#9D8F76]/45" />
        </div>

        <div
          className={`absolute inset-x-0 bottom-[24vh] h-[20vh] transition-colors duration-300 ${
            activeFeature === 'sand'
              ? isDark
                ? 'bg-[#5C462C]/72'
                : 'bg-[#C19667]/72'
              : isDark
              ? 'bg-[#4E3924]/52'
              : 'bg-[#A87E55]/50'
          } [clip-path:polygon(0_100%,0_43%,13%_62%,28%_49%,43%_64%,58%_50%,75%_62%,100%_44%,100%_100%)]`}
        />
        <div
          className={`absolute inset-x-0 bottom-[14vh] h-[21vh] transition-colors duration-300 ${
            activeFeature === 'sand'
              ? isDark
                ? 'bg-[#785937]/74'
                : 'bg-[#CB9B68]/70'
              : isDark
              ? 'bg-[#6D5032]/62'
              : 'bg-[#BC9567]/60'
          } [clip-path:polygon(0_100%,0_34%,19%_57%,37%_43%,58%_58%,77%_44%,100%_56%,100%_100%)]`}
        />
        <div
          className={`absolute inset-x-0 bottom-0 h-[28vh] transition-colors duration-300 ${
            activeFeature === 'sand'
              ? isDark
                ? 'bg-[#6C5032]'
                : 'bg-[#C28F5E]'
              : isDark
              ? 'bg-[#5C432A]'
              : 'bg-[#B3875A]'
          } [clip-path:polygon(0_100%,0_24%,17%_50%,34%_36%,56%_58%,74%_40%,100%_54%,100%_100%)]`}
        />

        <motion.div
          className={`absolute left-[16%] bottom-[20vh] h-8 w-8 rounded-full border-2 border-dashed ${
            isDark ? 'border-[#8B775D]/65' : 'border-[#9B754B]/70'
          }`}
          animate={{ rotate: [0, 360], x: [0, 24, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className={`absolute left-[61%] bottom-[18vh] h-6 w-6 rounded-full border-2 border-dashed ${
            isDark ? 'border-[#8B775D]/55' : 'border-[#9B754B]/65'
          }`}
          animate={{ rotate: [0, -360], x: [0, -20, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
        />

        <div
          className={`absolute bottom-[12vh] left-[9%] h-4 w-10 rounded-full transition-all duration-300 ${
            activeFeature === 'rock'
              ? isDark
                ? 'bg-[#7E6A4E] shadow-[0_0_22px_rgba(255,255,255,0.16)]'
                : 'bg-[#A78458] shadow-[0_0_16px_rgba(88,64,35,0.22)]'
              : isDark
              ? 'bg-[#5B4A36]'
              : 'bg-[#8C6E4A]'
          }`}
        />
        <div
          className={`absolute bottom-[11vh] left-[13%] h-5 w-12 rounded-full transition-all duration-300 ${
            activeFeature === 'rock'
              ? isDark
                ? 'bg-[#6F5A41] shadow-[0_0_20px_rgba(255,255,255,0.12)]'
                : 'bg-[#9C7850] shadow-[0_0_14px_rgba(88,64,35,0.18)]'
              : isDark
              ? 'bg-[#4D3E2D]'
              : 'bg-[#7E6242]'
          }`}
        />
        <div
          className={`absolute bottom-[10vh] right-[14%] h-4 w-10 rounded-full transition-all duration-300 ${
            activeFeature === 'rock'
              ? isDark
                ? 'bg-[#7B6549] shadow-[0_0_20px_rgba(255,255,255,0.12)]'
                : 'bg-[#A17C53] shadow-[0_0_14px_rgba(88,64,35,0.18)]'
              : isDark
              ? 'bg-[#524130]'
              : 'bg-[#846847]'
          }`}
        />
        <div
          className={`absolute bottom-[12vh] right-[9%] h-6 w-14 rounded-full transition-all duration-300 ${
            activeFeature === 'rock'
              ? isDark
                ? 'bg-[#745F46] shadow-[0_0_22px_rgba(255,255,255,0.14)]'
                : 'bg-[#9F7A54] shadow-[0_0_16px_rgba(88,64,35,0.2)]'
              : isDark
              ? 'bg-[#5F4A35]'
              : 'bg-[#8E714D]'
          }`}
        />

        <DesertCactus
          className="bottom-[18vh] left-[5%]"
          isDark={isDark}
          highlighted={activeFeature === 'cactus'}
          scale={1.1}
        />
        <DesertCactus
          className="bottom-[17vh] right-[9%]"
          isDark={isDark}
          highlighted={activeFeature === 'cactus'}
          scale={1.18}
        />

        <div
          className={`absolute bottom-[20vh] left-1/2 h-16 w-16 -translate-x-1/2 rounded-t-xl border transition-all duration-300 ${
            activeFeature === 'sand'
              ? isDark
                ? 'border-[#7F8F9E]/60 bg-[#2E3944] shadow-[0_0_26px_rgba(202,220,240,0.2)]'
                : 'border-[#7D8793]/55 bg-[#CBD2DA] shadow-[0_0_18px_rgba(70,80,92,0.2)]'
              : isDark
              ? 'border-[#5B6977]/45 bg-[#27323D]'
              : 'border-[#98A4AF]/45 bg-[#D8DEE4]'
          }`}
        />
      </div>

      <ParachuteCompanion
        stage="landing"
        theme={theme}
        className="pointer-events-none absolute left-[14%] top-[18%] z-20"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-end px-6 pb-8">
        <div className="flex flex-wrap items-end justify-center gap-3">
          {summaryCards.map((card, index) => {
            const isActive = activeFeature === card.feature
            return (
              <motion.button
                key={card.id}
                type="button"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.05 }}
                onClick={() => setActiveFeature(card.feature)}
                className={`max-w-[20rem] border px-3 py-2 text-left shadow-sm transition-all duration-200 ${
                  isActive
                    ? isDark
                      ? 'border-[#F1C182]/65 bg-[#6A4B2E]/92 text-[#FFE7CA] shadow-[0_0_20px_rgba(241,193,130,0.26)]'
                      : 'border-[#A9743E]/55 bg-[#E1B07D] text-[#4A2E1A] shadow-[0_0_14px_rgba(122,88,52,0.2)]'
                    : isDark
                    ? 'border-[#8A6A46]/40 bg-[#5A3F29]/86 text-[#F2DFC8]'
                    : 'border-[#B58C60]/45 bg-[#D4AD7C]/92 text-[#4A2E1A]'
                }`}
                style={{ transform: `rotate(${(index % 5) - 2}deg)` }}
              >
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em]">
                  {card.icon}
                  {card.title}
                </p>
                <p className="mt-1 text-annotation-script text-sm leading-snug">
                  {card.text}
                </p>
              </motion.button>
            )
          })}
        </div>

        <section
          className={`mx-auto mt-3 w-full max-w-3xl rounded-2xl border px-3 py-2 backdrop-blur ${
            isDark
              ? 'border-[#9C7A52]/40 bg-[#3E2C1E]/76'
              : 'border-[#C29A6B]/52 bg-[#E7C499]/86'
          }`}
        >
          <button
            type="button"
            onClick={() => setNotesExpanded((prev) => !prev)}
            className="flex w-full items-center justify-between gap-3 text-left"
            aria-expanded={notesExpanded}
            aria-label="Toggle community notes pile"
          >
            <div className="inline-flex min-w-0 items-center gap-2">
              <SandpileMarker isDark={isDark} />
              <div className="min-w-0">
                <p
                  className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] ${
                    isDark ? 'text-[#FFE7CA]' : 'text-[#5A3A1F]'
                  }`}
                >
                  <FaFlag className="h-3 w-3" />
                  Community Notes
                </p>
                <p className={`text-xs ${isDark ? 'text-[#F2DFC8]' : 'text-[#5A3A1F]'}`}>
                  {communityNotes.length} notes collected in this journey.
                </p>
              </div>
            </div>
            <span
              className={`shrink-0 rounded-full border px-2 py-1 text-[11px] font-semibold ${
                isDark
                  ? 'border-[#B08A60]/45 bg-[#5A3F29]/70 text-[#FFE7CA]'
                  : 'border-[#B58C60]/55 bg-[#D9B183]/75 text-[#4A2E1A]'
              }`}
            >
              {notesExpanded ? 'Collapse' : 'Expand'}
            </span>
          </button>

          <div className={`mt-2 ${notesExpanded ? 'max-h-40' : 'max-h-14'} overflow-y-auto pr-1 transition-all duration-300`}>
            {communityNotes.length === 0 ? (
              <p className={`px-1 text-xs ${isDark ? 'text-[#F2DFC8]' : 'text-[#5A3A1F]'}`}>
                No notes yet. Drop one from the sky note button and it lands here.
              </p>
            ) : (
              <div className="space-y-2">
                {notesToDisplay.map((note) => (
                  <article
                    key={note.id}
                    className={`rounded-lg border px-2.5 py-2 ${
                      isDark
                        ? 'border-[#B08A60]/35 bg-[#5A3F29]/64 text-[#FFE7CA]'
                        : 'border-[#B58C60]/45 bg-[#D9B183]/78 text-[#4A2E1A]'
                    }`}
                  >
                    <p className="text-annotation-script text-xs leading-snug">
                      &quot;{note.message}&quot;
                      {note.author && <span className="ml-1">— {note.author}</span>}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <footer className="mt-4 flex items-center justify-center gap-3 text-xs font-semibold">
          <span className={`${isDark ? 'text-[#E8D8C4]' : 'text-[#5A3B22]'}`}>
            Stephen Syl-Akinwale
          </span>
          <a
            href={links.linkedin.href}
            target="_blank"
            rel="noreferrer"
            className={`${isDark ? 'text-[#E8D8C4]' : 'text-[#5A3B22]'} underline-offset-2 hover:underline`}
          >
            <span className="inline-flex items-center gap-1">
              <FaLinkedin className="h-3 w-3" />
              LinkedIn
            </span>
          </a>
          <a
            href={links.github.href}
            target="_blank"
            rel="noreferrer"
            className={`${isDark ? 'text-[#E8D8C4]' : 'text-[#5A3B22]'} underline-offset-2 hover:underline`}
          >
            <span className="inline-flex items-center gap-1">
              <FaGithub className="h-3 w-3" />
              GitHub
            </span>
          </a>
        </footer>
      </div>
    </motion.div>
  )
}
