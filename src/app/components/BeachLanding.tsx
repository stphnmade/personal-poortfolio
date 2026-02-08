import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
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
}

const snapTransition = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
  mass: 1,
}

export function BeachLanding({ projects, userNotes, theme }: BeachLandingProps) {
  const isDark = theme === 'dark'
  const [openCrate, setOpenCrate] = useState<'experience' | 'skills' | 'tools' | null>(null)
  const crateLabels = SUBSTANCE.story.landing.crates
  const experienceItems = SUBSTANCE.experience
  const skillGroups = SUBSTANCE.skillsAndCerts
  const toolGroups = SUBSTANCE.toolsAndPlatforms

  return (
    <>
      <motion.div
        className={`relative flex h-full w-full items-end justify-center overflow-hidden ${
          isDark
            ? 'bg-[linear-gradient(180deg,#07111D_0%,#112130_28%,#29331F_58%,#3E3323_80%,#4A3A24_100%)]'
            : 'bg-[linear-gradient(180deg,#EAF3FF_0%,#C9E2FF_30%,#D8CFC1_62%,#B9976D_84%,#9D784F_100%)]'
        }`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={snapTransition}
      >
        <div className="pointer-events-none absolute inset-0">
          <div
            className={`absolute right-[12%] top-[11%] h-24 w-24 rounded-full ${
              isDark
                ? 'border border-[#D9E5F2]/20 bg-[#E5EDF7]/10'
                : 'border border-[#F0D6B3]/70 bg-[#FDECCF]/90'
            }`}
          />
          <div
            className={`absolute inset-x-0 bottom-[25vh] h-[18vh] ${
              isDark ? 'bg-[#4F3A24]/55' : 'bg-[#A98158]/48'
            } [clip-path:polygon(0_100%,0_44%,13%_62%,27%_50%,43%_66%,58%_48%,76%_62%,100%_40%,100%_100%)]`}
          />
          <div
            className={`absolute inset-x-0 bottom-[17vh] h-[20vh] ${
              isDark ? 'bg-[#6E5032]/65' : 'bg-[#BC9365]/60'
            } [clip-path:polygon(0_100%,0_36%,20%_58%,42%_44%,61%_60%,79%_45%,100%_57%,100%_100%)]`}
          />
          <div
            className={`absolute inset-x-0 bottom-0 h-[28vh] ${
              isDark ? 'bg-[#5A4129]' : 'bg-[#B4875A]'
            } [clip-path:polygon(0_100%,0_26%,18%_52%,33%_38%,55%_60%,72%_42%,100%_56%,100%_100%)]`}
          />

          <div
            className={`absolute bottom-[17vh] left-[10%] h-20 w-8 rounded-full ${
              isDark ? 'bg-[#274D35]' : 'bg-[#4E8A4D]'
            }`}
          />
          <div
            className={`absolute bottom-[20vh] left-[7.8%] h-10 w-3.5 rounded-full ${
              isDark ? 'bg-[#2C5A3D]' : 'bg-[#5A9A59]'
            }`}
          />
          <div
            className={`absolute bottom-[20vh] left-[12.3%] h-9 w-3.5 rounded-full ${
              isDark ? 'bg-[#2C5A3D]' : 'bg-[#5A9A59]'
            }`}
          />
          <div
            className={`absolute bottom-[18vh] right-[12%] h-24 w-9 rounded-full ${
              isDark ? 'bg-[#244A34]' : 'bg-[#4A854A]'
            }`}
          />
          <div
            className={`absolute bottom-[22vh] right-[10%] h-10 w-4 rounded-full ${
              isDark ? 'bg-[#2C5A3D]' : 'bg-[#5A9A59]'
            }`}
          />
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
              <h2 className="text-h2-sans font-bold">Deadlands Landing</h2>
              <p className={`mt-2 text-sm md:text-base ${isDark ? 'text-[#C9D9E6]' : 'text-[#4A5965]'}`}>
                Cargo unpack complete. {projects.length} project payloads are indexed for review.
              </p>
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

            <motion.div className="col-span-12 mt-10 text-center">
              <h3 className={`text-annotation-script text-2xl ${isDark ? 'text-[#F6C07B]' : 'text-[#9A6332]'}`}>
                Community Driftwood
              </h3>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                {userNotes.map((note) => (
                  <motion.div
                    key={note.id}
                    layoutId={`note-${note.id}`}
                    transition={snapTransition}
                    className={`rotate-2 border p-2 shadow-sm ${
                      isDark
                        ? 'border-white/15 bg-[#10212F]/94'
                        : 'border-[#3B413C]/15 bg-white/95'
                    }`}
                  >
                    <p className={`text-annotation-script text-sm ${isDark ? 'text-[#DDE8F0]' : 'text-[#3B413C]'}`}>
                      &quot;{note.message}&quot;
                      {note.author && <span className="ml-1">— {note.author}</span>}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
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
