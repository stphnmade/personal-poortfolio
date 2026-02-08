import { motion } from 'motion/react'
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'
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
}

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
  const { email, links } = SUBSTANCE.meta

  const summaryNotes = [
    {
      id: 'career-span',
      text: `${careerSpanYears}+ years across systems support, product-minded engineering, UX, and automation.`,
    },
    {
      id: 'impact',
      text: `Impact highlights: 5,000+ users supported, 95% SLA resolution, +18% uptime, +270 member org growth.`,
    },
    {
      id: 'builds',
      text: `${allProjects.length} projects shipped or in progress across multiplayer apps, automation pipelines, and collaborative products.`,
    },
    {
      id: 'stack',
      text: `${totalSkills} core skills and ${totalTools} tools/platform workflows across data, backend, and frontend systems.`,
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
          animate={{ rotate: [0, 360], x: [0, 24, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className={`absolute left-[62%] bottom-[18vh] h-6 w-6 rounded-full border-2 border-dashed ${
            isDark ? 'border-[#8B775D]/55' : 'border-[#9B754B]/65'
          }`}
          animate={{ rotate: [0, -360], x: [0, -20, 0] }}
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
      </div>

      <ParachuteCompanion
        stage="landing"
        theme={theme}
        className="pointer-events-none absolute left-[14%] top-[18%] z-20"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-end px-6 pb-8">
        <div className="flex flex-wrap items-end justify-center gap-3">
          {summaryNotes.map((note, index) => (
            <motion.article
              key={note.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              className={`max-w-[20rem] border px-3 py-2 shadow-sm ${
                isDark
                  ? 'border-[#8A6A46]/40 bg-[#5A3F29]/86 text-[#F2DFC8]'
                  : 'border-[#B58C60]/45 bg-[#D4AD7C]/92 text-[#4A2E1A]'
              }`}
              style={{ transform: `rotate(${(index % 5) - 2}deg)` }}
            >
              <p className="text-annotation-script text-sm leading-snug">
                {note.text}
              </p>
            </motion.article>
          ))}

          {userNotes.map((note, index) => (
            <motion.article
              key={note.id}
              layoutId={`note-${note.id}`}
              transition={snapTransition}
              className={`max-w-[20rem] border px-3 py-2 shadow-sm ${
                isDark
                  ? 'border-[#8A6A46]/40 bg-[#5A3F29]/86 text-[#F2DFC8]'
                  : 'border-[#B58C60]/45 bg-[#D4AD7C]/92 text-[#4A2E1A]'
              }`}
              style={{ transform: `rotate(${((index + summaryNotes.length) % 5) - 2}deg)` }}
            >
              <p className="text-annotation-script text-sm leading-snug">
                &quot;{note.message}&quot;
                {note.author && <span className="ml-1">— {note.author}</span>}
              </p>
            </motion.article>
          ))}

          <article
            className={`max-w-[20rem] border px-3 py-2 shadow-sm ${
              isDark
                ? 'border-[#8A6A46]/40 bg-[#5A3F29]/86 text-[#F2DFC8]'
                : 'border-[#B58C60]/45 bg-[#D4AD7C]/92 text-[#4A2E1A]'
            }`}
          >
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <a href={`mailto:${email}`} className="inline-flex items-center gap-1 underline-offset-2 hover:underline">
                <FaEnvelope className="h-3 w-3" />
                <span>Email</span>
              </a>
              <a href={links.linkedin.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline-offset-2 hover:underline">
                <FaLinkedin className="h-3 w-3" />
                <span>LinkedIn</span>
              </a>
              <a href={links.github.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline-offset-2 hover:underline">
                <FaGithub className="h-3 w-3" />
                <span>GitHub</span>
              </a>
            </div>
            <p className="mt-2 text-annotation-script text-sm leading-snug">
              Contact trail is open. Reach out if you want to build something meaningful together.
            </p>
          </article>
        </div>
      </div>
    </motion.div>
  )
}
