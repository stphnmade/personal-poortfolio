import { useState } from "react";
import {
  FaEnvelope,
  FaFilePdf,
  FaGithub,
  FaLinkedin,
  FaMusic,
  FaDatabase,
  FaTools,
} from "react-icons/fa";
import {
  SiAirtable,
  SiGithub as SiGithubIcon,
  SiUpwork,
  SiPython,
  SiR,
} from "react-icons/si";
import { PrimaryCTAButton } from "@/app/components/PrimaryCTAButton";
import { InfoCard } from "@/app/components/InfoCard";
import { SUBSTANCE } from "@/constants/substance";

export function RecruiterModeRoot() {
  const hero = SUBSTANCE.recruiter.hero;
  const labels = SUBSTANCE.recruiter.sectionLabels;
  const highlights = SUBSTANCE.recruiter.scanHighlights;
  const experience = SUBSTANCE.experience;
  const projects = SUBSTANCE.projects;
  const skills = SUBSTANCE.skillsAndCerts;
  const tools = SUBSTANCE.toolsAndPlatforms;
  const links = SUBSTANCE.meta.links;

  // Tools carousel state
  const [toolIndex, setToolIndex] = useState(0);
  const totalToolGroups = tools.length;
  const currentToolGroup = tools[toolIndex];

  const goPrevTools = () =>
    setToolIndex((prev) => (prev - 1 + totalToolGroups) % totalToolGroups);
  const goNextTools = () =>
    setToolIndex((prev) => (prev + 1) % totalToolGroups);

  // Skills carousel state
  const [skillIndex, setSkillIndex] = useState(0);
  const totalSkillGroups = skills.length;
  const currentSkillGroup = skills[skillIndex];

  const goPrevSkills = () =>
    setSkillIndex((prev) => (prev - 1 + totalSkillGroups) % totalSkillGroups);
  const goNextSkills = () =>
    setSkillIndex((prev) => (prev + 1) % totalSkillGroups);

  const renderSkillIcon = (label: string) => {
    const lower = label.toLowerCase();
    if (lower.includes("python")) {
      return <SiPython className="h-3.5 w-3.5 text-[#59A96A]" />;
    }
    if (lower === "r" || lower.startsWith("r ")) {
      return <SiR className="h-3.5 w-3.5 text-[#3B413C]" />;
    }
    if (lower.includes("sql")) {
      return <FaDatabase className="h-3.5 w-3.5 text-[#F19A3E]" />;
    }
    return <FaTools className="h-3.5 w-3.5 text-[#59A96A]" />;
  };

  const renderToolIcon = (item: string) => {
    const label = item.toLowerCase();
    if (label.includes("airtable")) {
      return <SiAirtable className="h-5 w-5 text-[#F5F5F5]" />;
    }
    if (label.includes("github")) {
      return <SiGithubIcon className="h-5 w-5 text-[#F5F5F5]" />;
    }
    if (label.includes("upwork")) {
      return <SiUpwork className="h-5 w-5 text-[#F5F5F5]" />;
    }
    if (label.includes("fl studio")) {
      return <FaMusic className="h-5 w-5 text-[#F5F5F5]" />;
    }
    return <FaTools className="h-5 w-5 text-[#F5F5F5]" />;
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <main className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-16">
        {/* Hero / About */}
        <section id="section-about" className="space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Recruiter Mode
          </p>
          <h1 className="text-h1-sans">{hero.headline}</h1>
          <p className="text-body-sans text-muted-foreground">
            {hero.subheadline}
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <PrimaryCTAButton ctaId="cta-download-resume-recruiter">
              <FaFilePdf />
              {links.resume.label}
            </PrimaryCTAButton>
            <PrimaryCTAButton ctaId="cta-github" variant="secondary">
              <FaGithub />
              {links.github.label}
            </PrimaryCTAButton>
            <PrimaryCTAButton ctaId="cta-linkedin" variant="secondary">
              <FaLinkedin />
              {links.linkedin.label}
            </PrimaryCTAButton>
          </div>
        </section>

        {/* Experience */}
        <section id="section-experience" className="space-y-6">
          <h2 className="text-h2-sans">{labels.experience}</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div
                key={exp.id}
                className="rounded-lg border border-border bg-card p-4 shadow-sm"
              >
                <p className="text-sm font-medium text-muted-foreground">
                  {exp.org}
                </p>
                <h3 className="text-body-sans font-semibold">{exp.role}</h3>
                <p className="text-body-sans text-muted-foreground">
                  {exp.oneLineImpact}
                </p>
                <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                  {exp.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="section-projects" className="space-y-4">
          <h2 className="text-h2-sans">{labels.projects}</h2>
          <p className="text-body-sans text-muted-foreground">
            {SUBSTANCE.story.freefall.experienceIntro}
          </p>
          <div className="mt-4 space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-lg border border-border bg-card p-4 shadow-sm"
              >
                <p className="text-sm text-muted-foreground">
                  {project.timeframe}
                </p>
                <h3 className="text-body-sans font-semibold">{project.name}</h3>
                <p className="text-body-sans text-muted-foreground">
                  {project.tagline}
                </p>
                <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                  {project.impactBullets
                    .slice(
                      0,
                      SUBSTANCE.contentControls.maxImpactBulletsPerProject,
                    )
                    .map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Certifications */}
        <section id="section-skills" className="space-y-4">
          <h2 className="text-h2-sans">{labels.skills}</h2>
          <div className="rounded-2xl border-2 border-[#3B413C]/10 bg-card p-6 shadow-md">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3B413C]">
                  <FaTools className="h-5 w-5 text-[#F5F5F5]" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Skills profile
                  </p>
                  <p className="text-body-sans font-semibold">
                    {currentSkillGroup.title}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <button
                  type="button"
                  onClick={goPrevSkills}
                  className="rounded-full bg-[#F5F5F5] px-3 py-1 hover:bg-[#E5E7EB]"
                >
                  ◀
                </button>
                <span className="font-medium text-[#3B413C]">
                  {skillIndex + 1}/{totalSkillGroups}
                </span>
                <button
                  type="button"
                  onClick={goNextSkills}
                  className="rounded-full bg-[#F5F5F5] px-3 py-1 hover:bg-[#E5E7EB]"
                >
                  ▶
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              {currentSkillGroup.items.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-[#F5F5F5] px-3 py-1 text-xs text-[#3B413C]"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#59A96A]">
                    {renderSkillIcon(item)}
                  </span>
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Tools & Platforms */}
        <section id="section-tools" className="space-y-4">
          <h2 className="text-h2-sans">{labels.tools}</h2>
          <div className="rounded-2xl border-2 border-[#3B413C]/10 bg-card p-6 shadow-md">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3B413C]">
                  <FaTools className="h-5 w-5 text-[#F5F5F5]" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Tool belt
                  </p>
                  <p className="text-body-sans font-semibold">
                    {currentToolGroup.title}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <button
                  type="button"
                  onClick={goPrevTools}
                  className="rounded-full bg-[#F5F5F5] px-3 py-1 hover:bg-[#E5E7EB]"
                >
                  ◀
                </button>
                <span className="font-medium text-[#3B413C]">
                  {toolIndex + 1}/{totalToolGroups}
                </span>
                <button
                  type="button"
                  onClick={goNextTools}
                  className="rounded-full bg-[#F5F5F5] px-3 py-1 hover:bg-[#E5E7EB]"
                >
                  ▶
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              {currentToolGroup.items.map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-[#F5F5F5] px-3 py-1 text-xs text-[#3B413C]"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#59A96A]">
                    {renderToolIcon(item)}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact & Resume */}
        <section id="section-beach" className="space-y-4">
          <h2 className="text-h2-sans">{labels.contact}</h2>
          <p className="text-body-sans text-muted-foreground">
            {SUBSTANCE.meta.email} · {SUBSTANCE.meta.location}
          </p>
          <div className="flex flex-wrap gap-4">
            <PrimaryCTAButton ctaId="cta-download-resume-bottom">
              <FaFilePdf />
              {links.resume.label}
            </PrimaryCTAButton>
            <PrimaryCTAButton ctaId="cta-email" variant="secondary">
              <FaEnvelope />
              Email Me
            </PrimaryCTAButton>
          </div>
        </section>
      </main>
    </div>
  );
}
