import { PrimaryCTAButton } from '@/app/components/PrimaryCTAButton'
import { InfoCard } from '@/app/components/InfoCard'

export function RecruiterModeRoot() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <main className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-16">
        {/* Hero / About */}
        <section id="section-about" className="space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Story Mode / Recruiter Mode
          </p>
          <h1 className="text-h1-sans">[Your Name]</h1>
          <p className="text-body-sans text-muted-foreground">
            [Hook line about what you build – replace this placeholder]
          </p>
          <p className="text-body-sans">
            [Short journey paragraph – 2–3 sentences about your path into
            design, code, and interactive experiences.]
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <PrimaryCTAButton ctaId="cta-download-resume-recruiter">
              Download Resume
            </PrimaryCTAButton>
            <PrimaryCTAButton ctaId="cta-github" variant="secondary">
              GitHub
            </PrimaryCTAButton>
            <PrimaryCTAButton ctaId="cta-linkedin" variant="secondary">
              LinkedIn
            </PrimaryCTAButton>
          </div>
        </section>

        {/* Experience */}
        <section id="section-experience" className="space-y-6">
          <h2 className="text-h2-sans">Experience</h2>
          <div className="space-y-4">
            {['AT&T', 'eCornell', 'Cornell Music Production'].map((org) => (
              <div
                key={org}
                className="rounded-lg border border-border bg-card p-4 shadow-sm"
              >
                <p className="text-sm font-medium text-muted-foreground">{org}</p>
                <h3 className="text-body-sans font-semibold">
                  [Your role title here]
                </h3>
                <p className="text-body-sans text-muted-foreground">
                  [Impact line with a concrete outcome – fill this in.]
                </p>
                <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                  <li>[Bullet 1 – responsibility or achievement]</li>
                  <li>[Bullet 2 – responsibility or achievement]</li>
                  <li>[Optional Bullet 3]</li>
                </ul>
                <p className="mt-2 text-sm text-primary underline">
                  [Optional link – GitHub, case study, or site]
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="section-projects" className="space-y-4">
          <h2 className="text-h2-sans">Projects</h2>
          <p className="text-body-sans text-muted-foreground">
            [Add 3–4 key projects with short descriptions and links.]
          </p>
        </section>

        {/* Skills & Certifications */}
        <section id="section-skills" className="space-y-4">
          <h2 className="text-h2-sans">Skills & Certifications</h2>
          <InfoCard
            cardId="skills-recruiter"
            title="Coding Skills"
            items={[
              '[Skill 1]',
              '[Skill 2]',
              '[Skill 3]',
              '[Skill 4]',
              '[Skill 5]',
            ]}
          />
          <InfoCard
            cardId="pm-recruiter"
            title="PM Skills"
            items={[
              '[Skill 1]',
              '[Skill 2]',
              '[Skill 3]',
              '[Skill 4]',
            ]}
          />
          <InfoCard
            cardId="certs-recruiter"
            title="Certifications"
            items={[
              '[Certification 1]',
              '[Certification 2]',
              '[Certification 3]',
            ]}
          />
        </section>

        {/* Tools & Platforms */}
        <section id="section-tools" className="space-y-4">
          <h2 className="text-h2-sans">Tools & Platforms</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {['MS Office', 'FL Studio', 'GitHub', 'Upwork', 'Languages', 'Other'].map(
              (tool) => (
                <div
                  key={tool}
                  className="flex flex-col items-start gap-2 rounded-lg border border-border bg-card p-4 shadow-sm"
                >
                  <div className="h-8 w-8 rounded-full bg-muted" />
                  <p className="text-sm font-medium text-foreground">{tool}</p>
                  <p className="text-xs text-muted-foreground">
                    [Short descriptor about how you use this.]
                  </p>
                </div>
              ),
            )}
          </div>
        </section>

        {/* Contact & Resume */}
        <section id="section-beach" className="space-y-4">
          <h2 className="text-h2-sans">Contact & Resume</h2>
          <p className="text-body-sans text-muted-foreground">
            [Email] · [Location] · [Any availability note]
          </p>
          <div className="flex flex-wrap gap-4">
            <PrimaryCTAButton ctaId="cta-download-resume-bottom">
              Download Resume
            </PrimaryCTAButton>
            <PrimaryCTAButton ctaId="cta-email" variant="secondary">
              Email Me
            </PrimaryCTAButton>
          </div>
        </section>
      </main>
    </div>
  )
}

