import { motion } from 'motion/react'

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
  return (
    <motion.div
      className="grid w-full grid-cols-12 gap-6 bg-[#F5F5F5] p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={snapTransition}
    >
      {/* 1. The Experience Parachute (Flattened) */}
      <motion.div
        layoutId="parachute"
        transition={snapTransition}
        className="col-span-12 rounded-xl border-2 border-dashed border-[#DD403A] bg-white/80 p-8"
      >
        <h2 className="text-h2-sans font-bold text-[#3B413C]">Career Log</h2>
        <p className="text-body-sans mt-2 text-[#3B413C]/80">
          A quick snapshot of where I&apos;ve been and where I&apos;m headed.
        </p>
      </motion.div>

      {/* 2. The Project Billboards (Snapped into Cards) */}
      {projects.map((project) => (
        <motion.div
          key={project.id}
          layoutId={`project-${project.id}`}
          transition={snapTransition}
          className="col-span-12 bg-white p-4 shadow-lg border-b-4 md:col-span-4"
          style={{ borderColor: '#59A96A' }}
        >
          <h3 className="text-body-sans font-bold text-[#3B413C]">
            {project.title}
          </h3>
          <p className="text-body-sans mt-2 text-[#3B413C]/80">
            {project.description}
          </p>
        </motion.div>
      ))}

      {/* 3. The Note Guestbook (The Driftwood) */}
      <motion.div className="col-span-12 mt-20 text-center">
        <h3 className="text-annotation-script text-2xl text-[#F19A3E]">
          Community Driftwood
        </h3>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {userNotes.map((note) => (
            <motion.div
              key={note.id}
              layoutId={`note-${note.id}`}
              transition={snapTransition}
              className="rotate-2 border border-[#3B413C]/10 bg-white p-2 shadow-sm"
            >
              <p className="text-annotation-script text-sm text-[#3B413C]">
                &quot;{note.message}&quot;
                {note.author && <span className="ml-1">— {note.author}</span>}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

