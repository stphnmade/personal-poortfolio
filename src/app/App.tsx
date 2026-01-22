import { useState, useRef, useEffect } from 'react';
import { motion, useScroll } from 'motion/react';
import { ProjectBillboard } from '@/app/components/ProjectBillboard';
import { FloatingNote } from '@/app/components/FloatingNote';
import { PrimaryCTAButton } from '@/app/components/PrimaryCTAButton';
import { DropNoteModal } from '@/app/components/DropNoteModal';
import { InfoCard } from '@/app/components/InfoCard';
import { 
  CARGO_VH, 
  FREEFALL_VH, 
  BEACH_VH, 
  TOTAL_VH,
  FREEFALL_START,
  NOTE_PADDING 
} from '@/constants/zones';

interface Note {
  id: string;
  message: string;
  author: string;
  position: { 
    x: number; // normalized 0-1 (left to right)
    y: number; // normalized 0-1 (top to bottom of freefall)
  };
}

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([
    { 
      id: crypto.randomUUID(), 
      message: "Welcome to the journey!", 
      author: "Anonymous", 
      position: { x: 0.2, y: 0.2 } 
    },
    { 
      id: crypto.randomUUID(), 
      message: "Enjoy the freefall", 
      author: "Sky Diver", 
      position: { x: 0.7, y: 0.5 } 
    },
    { 
      id: crypto.randomUUID(), 
      message: "Almost there...", 
      author: "", 
      position: { x: 0.4, y: 0.8 } 
    },
  ]);

  const artboardRef = useRef<HTMLDivElement>(null);
  const freefallRef = useRef<HTMLDivElement>(null);
  const [freefallHeight, setFreefallHeight] = useState(0);

  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: artboardRef,
    offset: ["start start", "end end"]
  });

  // Measure freefall height
  useEffect(() => {
    if (freefallRef.current) {
      const updateHeight = () => {
        setFreefallHeight(freefallRef.current!.clientHeight);
      };
      updateHeight();
      window.addEventListener('resize', updateHeight);
      return () => window.removeEventListener('resize', updateHeight);
    }
  }, []);

  const handleDropNote = (message: string, author: string) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      message,
      author,
      position: { 
        x: Math.random() * (1 - 2 * NOTE_PADDING) + NOTE_PADDING,
        y: Math.random() * (1 - 2 * NOTE_PADDING) + NOTE_PADDING
      }
    };
    setNotes([...notes, newNote]);
  };

  return (
    <div className="artboard-container w-full min-h-screen flex flex-col items-center bg-background">
      {/* Fixed CTA Button - Persistent across all zones */}
      <div className="fixed bottom-8 right-8 z-40">
        <PrimaryCTAButton 
          ctaId="cta-drop-note-fixed"
          onClick={() => setIsModalOpen(true)}
        >
          Drop a Note
        </PrimaryCTAButton>
      </div>

      {/* World Container with max-width 1440px */}
      <div 
        ref={artboardRef}
        className="artboard-content w-full max-w-[1440px] relative"
        style={{ height: `${TOTAL_VH}vh` }}
      >
        
        {/* CARGO HOLD - Top Zone */}
        <section 
          className="zone-cargo-hold w-full flex flex-col items-center justify-center relative border-b-2 border-foreground/20 bg-gradient-to-b from-gray-100 to-gray-200"
          style={{ height: `${CARGO_VH}vh` }}
          data-zone="cargo-hold"
        >
          <div className="zone-label absolute top-8 left-8 text-sm text-muted-foreground">
            Cargo Hold ({CARGO_VH}vh)
          </div>
          
          <div className="zone-cargo-hold-content text-center space-y-8 px-4">
            <h1 className="zone-title text-h1-sans">Cargo Hold</h1>
            <p className="zone-description text-body-sans text-muted-foreground max-w-2xl">
              Your projects are loaded and ready. Time to take the leap.
            </p>
            
            <div className="billboards-container flex gap-6 flex-wrap justify-center mt-12">
              <ProjectBillboard 
                projectId="alpha"
                title="Project Alpha"
                description="A revolutionary new approach to design systems"
              />
              <ProjectBillboard 
                projectId="beta"
                title="Project Beta"
                description="Interactive storytelling meets web animation"
              />
            </div>
          </div>
        </section>

        {/* FREEFALL - Middle Zone */}
        <section 
          ref={freefallRef}
          className="zone-freefall w-full relative border-b-2 border-foreground/20 bg-gradient-to-b from-blue-50 to-blue-100"
          style={{ height: `${FREEFALL_VH}vh` }}
          data-zone="freefall"
        >
          <div className="zone-label absolute top-8 left-8 text-sm text-muted-foreground z-10">
            Freefall ({FREEFALL_VH}vh)
          </div>
          
          <div className="zone-freefall-hero absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <h1 className="zone-title text-h1-sans">Freefall</h1>
              <p className="zone-description text-body-sans text-muted-foreground">
                The journey between ideas and reality
              </p>
            </div>
          </div>

          {/* Floating Notes with normalized positioning */}
          <div className="notes-container">
            {notes.map((note) => {
              const top = note.position.y * freefallHeight;
              const left = note.position.x * 100;
              
              return (
                <div
                  key={note.id}
                  className="note-wrapper absolute"
                  style={{
                    top: `${top}px`,
                    left: `${left}%`,
                    transform: 'translateX(-50%)' // Center the note horizontally
                  }}
                >
                  <FloatingNote 
                    noteId={`user-${note.id}`}
                    message={note.message}
                    author={note.author}
                  />
                </div>
              );
            })}
          </div>
        </section>

        {/* BEACH - Bottom Zone */}
        <section 
          className="zone-beach w-full relative bg-gradient-to-b from-amber-50 to-amber-100 py-16"
          style={{ height: `${BEACH_VH}vh` }}
          data-zone="beach"
        >
          <div className="zone-label absolute top-8 left-8 text-sm text-muted-foreground">
            Beach - Portfolio Summary ({BEACH_VH}vh)
          </div>
          
          <div className="zone-beach-content max-w-6xl mx-auto px-8 h-full flex flex-col justify-center">
            {/* Header */}
            <div className="beach-header text-center mb-12">
              <h1 className="zone-title text-h1-sans mb-4">Portfolio Summary</h1>
              <p className="zone-description text-body-sans text-muted-foreground">
                Safe landing. Here's everything at a glance.
              </p>
            </div>
            
            {/* Info Grid */}
            <div className="beach-info-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <InfoCard 
                cardId="skills"
                title="Skills"
                items={[
                  'React & TypeScript',
                  'Three.js & WebGL',
                  'Tailwind CSS',
                  'Figma to Code',
                  'Design Systems'
                ]}
              />
              
              <InfoCard 
                cardId="experience"
                title="Experience"
                items={[
                  '5+ years Frontend Dev',
                  'UI/UX Design',
                  'Interactive Experiences',
                  'Team Leadership',
                  'Agile Workflow'
                ]}
              />
              
              <InfoCard 
                cardId="contact"
                title="Contact"
                items={[
                  'email@example.com',
                  'linkedin.com/in/profile',
                  'github.com/username',
                  'Available for hire',
                  'Remote friendly'
                ]}
              />
            </div>

            {/* Featured Projects */}
            <div className="beach-projects">
              <h2 className="text-h2-sans text-center mb-6">Featured Work</h2>
              <div className="projects-showcase flex gap-6 flex-wrap justify-center">
                <ProjectBillboard 
                  projectId="blockopoly"
                  title="Blockopoly"
                  description="Blockchain-based property trading game with real-time multiplayer"
                />
                <ProjectBillboard 
                  projectId="designsystem"
                  title="Design System 2.0"
                  description="Scalable component library for enterprise applications"
                />
                <ProjectBillboard 
                  projectId="portfolio3d"
                  title="3D Portfolio"
                  description="Immersive portfolio experience using Three.js and scroll animations"
                />
              </div>
            </div>

            {/* CTA */}
            <div className="cta-container text-center mt-12">
              <PrimaryCTAButton 
                ctaId="cta-download-resume"
                variant="primary"
              >
                Download Resume
              </PrimaryCTAButton>
            </div>
          </div>
        </section>

      </div>

      {/* Drop Note Modal */}
      <DropNoteModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleDropNote}
      />
    </div>
  );
}
