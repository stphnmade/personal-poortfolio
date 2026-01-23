import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { SupplyCrate } from '@/app/components/SupplyCrate'
import { SUBSTANCE } from '@/constants/substance'
import beachEnd from '@/app/assets/Beach_endpage.png'

interface BeachLandingProps {
  projects: {
    id: string
    title: string
    description: string
  }[]
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

export function BeachLanding({ projects, userNotes }: BeachLandingProps) {
  const [openCrate, setOpenCrate] = useState<'experience' | 'skills' | 'tools' | null>(null)
  const crateLabels = SUBSTANCE.story.landing.crates
  const experienceItems = SUBSTANCE.experience
  const skillGroups = SUBSTANCE.skillsAndCerts
  const toolGroups = SUBSTANCE.toolsAndPlatforms

  return (
    <>
      <motion.div
        className="relative flex h-full w-full items-end justify-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${beachEnd})`,
          backgroundPosition: 'center bottom',
        }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={snapTransition}
      >
        {/* Content crates sitting on the sand image */}
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-end px-6 pb-10">
          <div className="grid w-full grid-cols-12 gap-6">
        {/* 1. The Experience Parachute (Flattened) */}
        <motion.div
          layoutId="parachute"
          transition={snapTransition}
          className="col-span-12 rounded-xl border-2 border-dashed border-[#DD403A] bg-white/85 p-8 shadow-lg"
        >
          <h2 className="text-h2-sans font-bold text-[#3B413C]">Career Log</h2>
          <p className="text-body-sans mt-2 text-[#3B413C]/80">
            A quick snapshot of where I&apos;ve been and where I&apos;m headed.
          </p>
        </motion.div>

            {/* 2. Supply crates for Experience, Skills, Tools */}
            <div className="crate-experience col-span-12 flex justify-start md:col-span-4">
              <SupplyCrate
                title={crateLabels.experience}
                accentColor="#F5F5F5"
                note={crateLabels.note}
                onClick={() => setOpenCrate('experience')}
              />
            </div>
            <div className="crate-skills col-span-12 flex justify-center md:col-span-4">
              <SupplyCrate
                title={crateLabels.skills}
                accentColor="#59A96A"
                note={crateLabels.note}
                onClick={() => setOpenCrate('skills')}
              />
            </div>
            <div className="crate-tools col-span-12 flex justify-end md:col-span-4">
              <SupplyCrate
                title={crateLabels.tools}
                accentColor="#F19A3E"
                note={crateLabels.note}
                onClick={() => setOpenCrate('tools')}
              />
            </div>

            {/* 3. The Note Guestbook (Driftwood) */}
            <motion.div className="col-span-12 mt-10 text-center">
              <h3 className="text-annotation-script text-2xl text-[#F19A3E]">
                Community Driftwood
              </h3>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                {userNotes.map((note) => (
                  <motion.div
                    key={note.id}
                    layoutId={`note-${note.id}`}
                    transition={snapTransition}
                    className="rotate-2 border border-[#3B413C]/15 bg-white/95 p-2 shadow-sm"
                  >
                    <p className="text-annotation-script text-sm text-[#3B413C]">
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
            className="fixed inset-0 z-[300] flex items-center justify-center bg-[#3B413C]/80 backdrop-blur-sm"
          >
            <div className="max-w-3xl border-t-8 border-[#59A96A] bg-[#F5F5F5] p-8 shadow-2xl">
              {openCrate === 'experience' && (
                <>
                  <h2 className="mb-6 text-h2-sans font-bold text-[#3B413C]">
                    Experience Log
                  </h2>
                  <ul className="space-y-6">
                    {experienceItems.map((exp) => (
                      <li
                        key={exp.id}
                        className="border-l-4 border-[#F19A3E] pl-4"
                      >
                        <h4 className="font-sans text-base font-semibold text-[#3B413C]">
                          {exp.org}
                        </h4>
                        <p className="text-sm text-[#3B413C]/80">
                          {exp.oneLineImpact}
                        </p>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {openCrate === 'skills' && (
                <>
                  <h2 className="mb-6 text-h2-sans font-bold text-[#3B413C]">
                    Skills and Certifications
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {skillGroups.map((group) => (
                      <div
                        key={group.id}
                        className="rounded-lg border border-[#E5E7EB] bg-white/95 p-4"
                      >
                        <p className="text-sm font-semibold text-[#111827]">
                          {group.title}
                        </p>
                        <ul className="mt-2 space-y-1 text-sm text-[#4B5563]">
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
                  <h2 className="mb-6 text-h2-sans font-bold text-[#3B413C]">
                    Tools and Platforms
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {toolGroups.map((group) => (
                      <div
                        key={group.id}
                        className="rounded-lg border border-[#E5E7EB] bg-white/95 p-4"
                      >
                        <p className="text-sm font-semibold text-[#111827]">
                          {group.title}
                        </p>
                        <ul className="mt-2 space-y-1 text-sm text-[#4B5563]">
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
