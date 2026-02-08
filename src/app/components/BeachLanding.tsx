import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  FaBuilding,
  FaCubes,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaRoute,
  FaTools,
} from 'react-icons/fa'
import { SiPython } from 'react-icons/si'
import { SupplyCrate } from '@/app/components/SupplyCrate'
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
  }[]
  onOpenNote?: () => void
}

const snapTransition = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
  mass: 1,
}

function getSignalToneClass(tone: 'projects' | 'experience' | 'skills' | 'tools', isDark: boolean) {
  if (tone === 'projects') {
    return isDark
      ? 'border-[#4A90E2]/35 bg-[#4A90E2]/14 text-[#D6E9FF]'
      : 'border-[#4A90E2]/25 bg-[#EAF3FF] text-[#23598E]'
  }
  if (tone === 'experience') {
    return isDark
      ? 'border-[#59A96A]/35 bg-[#59A96A]/14 text-[#D7F2DD]'
      : 'border-[#59A96A]/25 bg-[#EAF7ED] text-[#2D6B3C]'
  }
  if (tone === 'skills') {
    return isDark
      ? 'border-[#F19A3E]/35 bg-[#F19A3E]/14 text-[#FFE8CB]'
      : 'border-[#F19A3E]/25 bg-[#FFF4E8] text-[#90561C]'
  }
  return isDark
    ? 'border-[#DD403A]/35 bg-[#DD403A]/14 text-[#FFD8D5]'
    : 'border-[#DD403A]/25 bg-[#FFEDEA] text-[#922A26]'
}

function getOldestYear(experienceItems: typeof SUBSTANCE.experience) {
  const years = experienceItems
    .map((exp) => Number(exp.start.match(/\b\d{4}\b/)?.[0] ?? Number.NaN))
    .filter((year) => Number.isFinite(year))
  if (years.length === 0) return new Date().getFullYear()
  return Math.min(...years)
}

export function BeachLanding({ projects, userNotes, theme, onOpenNote }: BeachLandingProps) {
  const isDark = theme === 'dark'
  const [openCrate, setOpenCrate] = useState<'experience' | 'skills' | 'tools' | null>(null)
  const crateLabels = SUBSTANCE.story.landing.crates
  const experienceItems = SUBSTANCE.experience
  const skillGroups = SUBSTANCE.skillsAndCerts
  const toolGroups = SUBSTANCE.toolsAndPlatforms
  const allProjects = SUBSTANCE.projects
  const totalSkills = skillGroups.reduce((sum, group) => sum + group.items.length, 0)
  const totalTools = toolGroups.reduce((sum, group) => sum + group.items.length, 0)
  const oldestYear = getOldestYear(experienceItems)
  const careerSpanYears = Math.max(1, new Date().getFullYear() - oldestYear + 1)
  const { email, links } = SUBSTANCE.meta

  const desertSignals = [
    {
      id: 'projects-outpost',
      title: `${allProjects.length} Project Outposts`,
      detail: 'Each build is a desert structure made to survive real users.',
      tone: 'projects' as const,
      icon: <FaBuilding className="h-4 w-4" />,
      positionClass: 'left-[6%] bottom-[36vh]',
    },
    {
      id: 'experience-cactus',
      title: `${experienceItems.length} Cactus Milestones`,
      detail: 'Roles that held up through pressure, scale, and shifting terrain.',
      tone: 'experience' as const,
      icon: <FaRoute className="h-4 w-4" />,
      positionClass: 'left-[28%] bottom-[30vh]',
    },
    {
      id: 'skills-rocks',
      title: `${totalSkills} Skill Stones`,
      detail: 'Stacked capabilities, from systems support to product delivery.',
      tone: 'skills' as const,
      icon: <FaCubes className="h-4 w-4" />,
      positionClass: 'right-[30%] bottom-[32vh]',
    },
    {
      id: 'python-sidewinder',
      title: 'Python Sidewinder',
      detail: 'Data wrangling and automation slithering through the tool belt.',
      tone: 'tools' as const,
      icon: <SiPython className="h-4 w-4" />,
      positionClass: 'right-[8%] bottom-[40vh]',
    },
    {
      id: 'tool-tumbleweed',
      title: `${totalTools} Tool Tumbleweeds`,
      detail: 'Workflow tools that roll into whatever terrain the team is in.',
      tone: 'tools' as const,
      icon: <FaTools className="h-4 w-4" />,
      positionClass: 'right-[12%] bottom-[24vh]',
    },
  ]

  return (
    <>
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
          <div
            className={`absolute right-[9%] top-[10%] h-24 w-24 rounded-full ${
              isDark
                ? 'border border-[#D9E5F2]/20 bg-[#E5EDF7]/10'
                : 'border border-[#F0D6B3]/70 bg-[#FDECCF]/90'
            }`}
          />
          <div
            className={`absolute inset-x-0 bottom-[24vh] h-[20vh] ${
              isDark ? 'bg-[#4E3924]/52' : 'bg-[#A87E55]/50'
            } [clip-path:polygon(0_100%,0_43%,13%_62%,28%_49%,43%_64%,58%_50%,75%_62%,100%_44%,100%_100%)]`}
          />
          <div
            className={`absolute inset-x-0 bottom-[14vh] h-[21vh] ${
              isDark ? 'bg-[#6D5032]/62' : 'bg-[#BC9567]/60'
            } [clip-path:polygon(0_100%,0_34%,19%_57%,37%_43%,58%_58%,77%_44%,100%_56%,100%_100%)]`}
          />
          <div
            className={`absolute inset-x-0 bottom-0 h-[28vh] ${
              isDark ? 'bg-[#5C432A]' : 'bg-[#B3875A]'
            } [clip-path:polygon(0_100%,0_24%,17%_50%,34%_36%,56%_58%,74%_40%,100%_54%,100%_100%)]`}
          />

          <motion.div
            className={`absolute left-[18%] bottom-[20vh] h-8 w-8 rounded-full border-2 border-dashed ${
              isDark ? 'border-[#8B775D]/65' : 'border-[#9B754B]/70'
            }`}
            animate={{ rotate: [0, 360], x: [0, 28, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className={`absolute left-[62%] bottom-[18vh] h-6 w-6 rounded-full border-2 border-dashed ${
              isDark ? 'border-[#8B775D]/55' : 'border-[#9B754B]/65'
            }`}
            animate={{ rotate: [0, -360], x: [0, -22, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
          />

          <div className={`absolute bottom-[12vh] left-[9%] h-4 w-10 rounded-full ${isDark ? 'bg-[#5B4A36]' : 'bg-[#8C6E4A]'}`} />
          <div className={`absolute bottom-[11vh] left-[13%] h-5 w-12 rounded-full ${isDark ? 'bg-[#4D3E2D]' : 'bg-[#7E6242]'}`} />
          <div className={`absolute bottom-[10vh] right-[14%] h-4 w-10 rounded-full ${isDark ? 'bg-[#524130]' : 'bg-[#846847]'}`} />
          <div className={`absolute bottom-[12vh] right-[9%] h-6 w-14 rounded-full ${isDark ? 'bg-[#5F4A35]' : 'bg-[#8E714D]'}`} />

          <div className={`absolute bottom-[18vh] left-[6%] h-24 w-9 rounded-full ${isDark ? 'bg-[#295039]' : 'bg-[#4F8A4D]'}`} />
          <div className={`absolute bottom-[22vh] left-[3.8%] h-9 w-3.5 rounded-full ${isDark ? 'bg-[#2E5D40]' : 'bg-[#5A9A59]'}`} />
          <div className={`absolute bottom-[22vh] left-[8.7%] h-10 w-3.5 rounded-full ${isDark ? 'bg-[#2E5D40]' : 'bg-[#5A9A59]'}`} />
          <div className={`absolute bottom-[18vh] right-[10%] h-24 w-10 rounded-full ${isDark ? 'bg-[#244A34]' : 'bg-[#4A854A]'}`} />
          <div className={`absolute bottom-[23vh] right-[8%] h-10 w-4 rounded-full ${isDark ? 'bg-[#2D5C3F]' : 'bg-[#5A9A59]'}`} />

          {desertSignals.map((signal) => (
            <motion.div
              key={signal.id}
              className={`absolute hidden max-w-[15rem] rounded-xl border px-3 py-2 text-xs shadow-lg backdrop-blur-sm lg:block ${signal.positionClass} ${getSignalToneClass(
                signal.tone,
                isDark,
              )}`}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p className="flex items-center gap-2 font-semibold">
                {signal.icon}
                {signal.title}
              </p>
              <p className="mt-1 leading-relaxed opacity-90">{signal.detail}</p>
            </motion.div>
          ))}
        </div>

        <div
          className={`absolute right-4 top-5 z-30 max-w-sm rounded-2xl border p-4 shadow-lg backdrop-blur-sm sm:right-6 ${
            isDark
              ? 'border-white/15 bg-[#10202C]/82 text-[#E6F0F7]'
              : 'border-[#3B413C]/14 bg-white/85 text-[#24313A]'
          }`}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em]">Sky Invite</p>
          <p className={`mt-2 text-sm leading-relaxed ${isDark ? 'text-[#C9D9E6]' : 'text-[#4A5965]'}`}>
            Leave a note in freefall and it lands here as community driftwood.
          </p>
          {onOpenNote && (
            <button
              type="button"
              onClick={onOpenNote}
              className="mt-3 inline-flex items-center rounded-full bg-[#59A96A] px-3 py-1 text-xs font-semibold text-[#06120A] transition-colors hover:bg-[#4C975D]"
            >
              Drop a Sky Note
            </button>
          )}
        </div>

        <ParachuteCompanion
          stage="landing"
          theme={theme}
          className="pointer-events-none absolute left-[14%] top-[18%] z-20"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-end px-6 pb-10">
          <div className="grid w-full grid-cols-12 gap-6">
            <motion.div
              layoutId="parachute"
              transition={snapTransition}
              className={`col-span-12 rounded-2xl border p-6 shadow-lg backdrop-blur-sm ${
                isDark
                  ? 'border-white/15 bg-[#101E2A]/84 text-[#EAF2F8]'
                  : 'border-[#3B413C]/14 bg-white/82 text-[#24313A]'
              }`}
            >
              <h2 className="text-h2-sans font-bold">Deadlands Career Map</h2>
              <p className={`mt-2 text-sm md:text-base ${isDark ? 'text-[#C9D9E6]' : 'text-[#4A5965]'}`}>
                {careerSpanYears}+ years of building across product, UX, systems support, automation, and interactive software.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className={`rounded-full border px-3 py-1 text-xs ${getSignalToneClass('experience', isDark)}`}>
                  {experienceItems.length} experiences
                </span>
                <span className={`rounded-full border px-3 py-1 text-xs ${getSignalToneClass('projects', isDark)}`}>
                  {allProjects.length} projects
                </span>
                <span className={`rounded-full border px-3 py-1 text-xs ${getSignalToneClass('skills', isDark)}`}>
                  {totalSkills} skills
                </span>
                <span className={`rounded-full border px-3 py-1 text-xs ${getSignalToneClass('tools', isDark)}`}>
                  {totalTools} tools
                </span>
                <span className={`rounded-full border px-3 py-1 text-xs ${isDark ? 'border-white/20 bg-white/10 text-[#DDE8F0]' : 'border-[#3B413C]/14 bg-[#EEF4F8] text-[#33414C]'}`}>
                  {projects.length} freefall payload cards
                </span>
              </div>
            </motion.div>

            <div className="crate-experience col-span-12 flex justify-start md:col-span-4">
              <SupplyCrate
                title={crateLabels.experience}
                accentColor="#F5F5F5"
                note={crateLabels.note}
                theme={theme}
                onClick={() => setOpenCrate('experience')}
              />
            </div>
            <div className="crate-skills col-span-12 flex justify-center md:col-span-4">
              <SupplyCrate
                title={crateLabels.skills}
                accentColor="#59A96A"
                note={crateLabels.note}
                theme={theme}
                onClick={() => setOpenCrate('skills')}
              />
            </div>
            <div className="crate-tools col-span-12 flex justify-end md:col-span-4">
              <SupplyCrate
                title={crateLabels.tools}
                accentColor="#F19A3E"
                note={crateLabels.note}
                theme={theme}
                onClick={() => setOpenCrate('tools')}
              />
            </div>

            <motion.div
              className={`col-span-12 mt-8 rounded-2xl border p-5 ${
                isDark ? 'border-white/14 bg-[#10212F]/85' : 'border-[#3B413C]/14 bg-white/88'
              }`}
            >
              <h3 className={`text-annotation-script text-2xl ${isDark ? 'text-[#F6C07B]' : 'text-[#9A6332]'}`}>
                Community Driftwood
              </h3>
              <p className={`mt-2 text-sm ${isDark ? 'text-[#C9D9E6]' : 'text-[#4A5965]'}`}>
                Notes dropped during freefall wash up here as carved planks.
              </p>
              {userNotes.length === 0 ? (
                <p className={`mt-4 text-sm italic ${isDark ? 'text-[#AFC0CD]' : 'text-[#5C6A77]'}`}>
                  No driftwood yet. Toss the first note from the sky.
                </p>
              ) : (
                <div className="mt-5 flex flex-wrap gap-3">
                  {userNotes.map((note, index) => (
                    <motion.div
                      key={note.id}
                      layoutId={`note-${note.id}`}
                      transition={snapTransition}
                      className={`border px-3 py-2 shadow-sm ${
                        isDark
                          ? 'border-[#8A6A46]/40 bg-[#5A3F29]/86 text-[#F2DFC8]'
                          : 'border-[#B58C60]/45 bg-[#D4AD7C]/92 text-[#4A2E1A]'
                      }`}
                      style={{ transform: `rotate(${(index % 5) - 2}deg)` }}
                    >
                      <p className="text-annotation-script text-sm leading-snug">
                        &quot;{note.message}&quot;
                        {note.author && <span className="ml-1">— {note.author}</span>}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            <footer
              className={`col-span-12 rounded-2xl border p-4 ${
                isDark ? 'border-white/12 bg-[#0E1B25]/82 text-[#DDE8F0]' : 'border-[#3B413C]/14 bg-white/86 text-[#33414C]'
              }`}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em]">Desert Camp Footer</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={`mailto:${email}`}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
                    isDark
                      ? 'border-white/15 bg-white/8 text-[#EAF2F8] hover:bg-white/14'
                      : 'border-[#C8D4DE] bg-[#EEF4F8] text-[#1F3242] hover:bg-[#E1EAF2]'
                  }`}
                >
                  <FaEnvelope className="h-3 w-3" />
                  {email}
                </a>
                <a
                  href={links.linkedin.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
                    isDark
                      ? 'border-white/15 bg-white/8 text-[#EAF2F8] hover:bg-white/14'
                      : 'border-[#C8D4DE] bg-[#EEF4F8] text-[#1F3242] hover:bg-[#E1EAF2]'
                  }`}
                >
                  <FaLinkedin className="h-3 w-3" />
                  LinkedIn
                </a>
                <a
                  href={links.github.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
                    isDark
                      ? 'border-white/15 bg-white/8 text-[#EAF2F8] hover:bg-white/14'
                      : 'border-[#C8D4DE] bg-[#EEF4F8] text-[#1F3242] hover:bg-[#E1EAF2]'
                  }`}
                >
                  <FaGithub className="h-3 w-3" />
                  GitHub
                </a>
              </div>
            </footer>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {openCrate && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16 }}
            className={`fixed inset-0 z-[300] flex items-center justify-center backdrop-blur-sm ${
              isDark ? 'bg-[#06111B]/80' : 'bg-[#3B413C]/60'
            }`}
          >
            <div
              className={`max-w-3xl border-t-8 p-8 shadow-2xl ${
                isDark
                  ? 'border-[#59A96A] bg-[#0F1D29] text-[#EAF2F8]'
                  : 'border-[#59A96A] bg-[#F5F5F5] text-[#3B413C]'
              }`}
            >
              {openCrate === 'experience' && (
                <>
                  <h2 className="mb-6 text-h2-sans font-bold">
                    Experience Log
                  </h2>
                  <ul className="space-y-6">
                    {experienceItems.map((exp) => (
                      <li
                        key={exp.id}
                        className="border-l-4 border-[#F19A3E] pl-4"
                      >
                        <h4 className="font-sans text-base font-semibold">
                          {exp.org}
                        </h4>
                        <p className={`text-sm ${isDark ? 'text-[#C4D2DD]' : 'text-[#3B413C]/80'}`}>
                          {exp.oneLineImpact}
                        </p>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {openCrate === 'skills' && (
                <>
                  <h2 className="mb-6 text-h2-sans font-bold">
                    Skills and Certifications
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {skillGroups.map((group) => (
                      <div
                        key={group.id}
                        className={`rounded-lg border p-4 ${
                          isDark ? 'border-white/15 bg-[#162736]' : 'border-[#E5E7EB] bg-white/95'
                        }`}
                      >
                        <p className={`text-sm font-semibold ${isDark ? 'text-[#EAF2F8]' : 'text-[#111827]'}`}>
                          {group.title}
                        </p>
                        <ul className={`mt-2 space-y-1 text-sm ${isDark ? 'text-[#C4D2DD]' : 'text-[#4B5563]'}`}>
                          {group.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {openCrate === 'tools' && (
                <>
                  <h2 className="mb-6 text-h2-sans font-bold">
                    Tools and Platforms
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {toolGroups.map((group) => (
                      <div
                        key={group.id}
                        className={`rounded-lg border p-4 ${
                          isDark ? 'border-white/15 bg-[#162736]' : 'border-[#E5E7EB] bg-white/95'
                        }`}
                      >
                        <p className={`text-sm font-semibold ${isDark ? 'text-[#EAF2F8]' : 'text-[#111827]'}`}>
                          {group.title}
                        </p>
                        <ul className={`mt-2 space-y-1 text-sm ${isDark ? 'text-[#C4D2DD]' : 'text-[#4B5563]'}`}>
                          {group.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <button
                type="button"
                onClick={() => setOpenCrate(null)}
                className="mt-8 text-sm font-bold text-[#DD403A]"
              >
                Close Manifest
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
