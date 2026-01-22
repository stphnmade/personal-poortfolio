export type ChapterId =
  | 'about'
  | 'doors'
  | 'experience'
  | 'skills'
  | 'tools'
  | 'beach'

export interface ChapterConfig {
  id: ChapterId
  label: string
  navLabel: string
  start: number // normalized scroll start (0-1)
  end: number // normalized scroll end (0-1)
  recruiterAnchor: string
}

export const CHAPTERS: ChapterConfig[] = [
  {
    id: 'about',
    label: 'About Me',
    navLabel: 'Cargo Hold',
    start: 0,
    end: 0.15,
    recruiterAnchor: 'section-about',
  },
  {
    id: 'doors',
    label: 'Deep Dive Transition',
    navLabel: 'Doors',
    start: 0.15,
    end: 0.25,
    recruiterAnchor: 'section-about', // same content context
  },
  {
    id: 'experience',
    label: 'Experience',
    navLabel: 'Experience',
    start: 0.25,
    end: 0.5,
    recruiterAnchor: 'section-experience',
  },
  {
    id: 'skills',
    label: 'Skills & Certifications',
    navLabel: 'Skills',
    start: 0.5,
    end: 0.7,
    recruiterAnchor: 'section-skills',
  },
  {
    id: 'tools',
    label: 'Tools & Platforms',
    navLabel: 'Tools',
    start: 0.7,
    end: 0.85,
    recruiterAnchor: 'section-tools',
  },
  {
    id: 'beach',
    label: 'Landing',
    navLabel: 'Landing',
    start: 0.85,
    end: 1,
    recruiterAnchor: 'section-beach',
  },
]

export function getChapterForProgress(progress: number): ChapterConfig {
  const clamped = Math.max(0, Math.min(1, progress))
  return (
    CHAPTERS.find((c) => clamped >= c.start && clamped < c.end) ??
    CHAPTERS[CHAPTERS.length - 1]
  )
}

