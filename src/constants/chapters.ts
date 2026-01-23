import { SUBSTANCE, type Chapter, type ChapterId } from './substance'

export type { ChapterId, Chapter }

export const CHAPTERS = SUBSTANCE.chapters.map((c) => ({
  ...c,
  start: c.range.start,
  end: c.range.end,
  recruiterAnchor:
    c.id === 'about'
      ? 'section-about'
      : c.id === 'experience'
      ? 'section-experience'
      : c.id === 'skills_certs'
      ? 'section-skills'
      : c.id === 'tools'
      ? 'section-tools'
      : 'section-beach',
}))

export function getChapterForProgress(progress: number) {
  const clamped = Math.max(0, Math.min(1, progress))
  return (
    CHAPTERS.find((c) => clamped >= c.start && clamped < c.end) ??
    CHAPTERS[CHAPTERS.length - 1]
  )
}
