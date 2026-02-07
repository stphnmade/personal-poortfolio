import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  FaEnvelope,
  FaExternalLinkAlt,
  FaFilePdf,
  FaGlobe,
  FaGithub,
  FaLinkedin,
  FaLocationArrow,
  FaMusic,
  FaPhone,
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
import { SUBSTANCE } from "@/constants/substance";

function getStatusToneClasses(
  tone: (typeof SUBSTANCE.projects)[number]["status"]["tone"],
) {
  switch (tone) {
    case "live":
      return "border-[#59A96A]/35 bg-[#E8F6EC] text-[#2D6D3B] dark:border-[#59A96A]/30 dark:bg-[#59A96A]/15 dark:text-[#98E0A8]";
    case "building":
      return "border-[#F19A3E]/35 bg-[#FFF2E4] text-[#9A5C1A] dark:border-[#F19A3E]/30 dark:bg-[#F19A3E]/15 dark:text-[#FFD4A2]";
    case "private":
      return "border-[#6B7280]/35 bg-[#EEF1F4] text-[#475467] dark:border-[#6B7280]/30 dark:bg-[#6B7280]/20 dark:text-[#D5DBE1]";
    case "archived":
      return "border-[#4B5563]/35 bg-[#E9EEF2] text-[#3F4A56] dark:border-[#4B5563]/30 dark:bg-[#4B5563]/20 dark:text-[#CBD5DF]";
    case "completed":
    default:
      return "border-[#4A90E2]/35 bg-[#E9F3FF] text-[#245E9D] dark:border-[#4A90E2]/30 dark:bg-[#4A90E2]/14 dark:text-[#BFD8F7]";
  }
}

const panelBase =
  "rounded-3xl border border-[#D5E0E8] bg-white/95 shadow-[0_12px_28px_rgba(16,34,52,0.08)] transition-colors dark:border-white/10 dark:bg-[#121A20]/95 dark:shadow-[0_16px_34px_rgba(0,0,0,0.28)]";

const subPanelBase =
  "rounded-2xl border border-[#D5E0E8] bg-[#F7FAFC] p-4 transition-colors dark:border-white/10 dark:bg-white/5";

export function RecruiterModeRoot() {
  const hero = SUBSTANCE.recruiter.hero;
  const labels = SUBSTANCE.recruiter.sectionLabels;
  const highlights = SUBSTANCE.recruiter.scanHighlights;
  const experience = SUBSTANCE.experience;
  const projects = SUBSTANCE.projects;
  const skills = SUBSTANCE.skillsAndCerts;
  const tools = SUBSTANCE.toolsAndPlatforms;
  const links = SUBSTANCE.meta.links;

  const [toolIndex, setToolIndex] = useState(0);
  const totalToolGroups = tools.length;
  const currentToolGroup = tools[toolIndex];

  const goPrevTools = () =>
    setToolIndex((prev) => (prev - 1 + totalToolGroups) % totalToolGroups);
  const goNextTools = () =>
    setToolIndex((prev) => (prev + 1) % totalToolGroups);

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
      return <SiPython className="h-3.5 w-3.5 text-[#3776AB]" />;
    }
    if (lower === "r" || lower.startsWith("r ")) {
      return <SiR className="h-3.5 w-3.5 text-[#276DC3]" />;
    }
    if (lower.includes("sql")) {
      return <FaDatabase className="h-3.5 w-3.5 text-[#F19A3E]" />;
    }
    return <FaTools className="h-3.5 w-3.5 text-[#59A96A]" />;
  };

  const renderToolIcon = (item: string) => {
    const label = item.toLowerCase();
    if (label.includes("airtable")) {
      return <SiAirtable className="h-5 w-5 text-[#FC5D7D]" />;
    }
    if (label.includes("github")) {
      return <SiGithubIcon className="h-5 w-5 text-[#111827] dark:text-[#E9EEF4]" />;
    }
    if (label.includes("upwork")) {
      return <SiUpwork className="h-5 w-5 text-[#14A800]" />;
    }
    if (label.includes("fl studio")) {
      return <FaMusic className="h-5 w-5 text-[#F19A3E]" />;
    }
    return <FaTools className="h-5 w-5 text-[#59A96A]" />;
  };

  const sectionLinks = [
    { id: "section-about", label: "About" },
    { id: "section-experience", label: labels.experience },
    { id: "section-projects", label: labels.projects },
    { id: "section-skills", label: labels.skills },
    { id: "section-tools", label: labels.tools },
    { id: "section-beach", label: labels.contact },
  ];

  const jumpToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="recruiter-shell min-h-screen w-full bg-[#F3F6F8] px-4 py-10 text-[#1E2A33] transition-colors dark:bg-[#0E151B] dark:text-[#ECF3F7] sm:px-6">
      <main className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[19rem_minmax(0,1fr)]">
        <aside className="self-start lg:sticky lg:top-24">
          <div className={`${panelBase} p-6`}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5C6A77] dark:text-[#B8C4CD]">
              Recruiter Mode
            </p>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#C8D4DE] bg-[#EEF3F7] text-xl font-semibold text-[#1F2B35] dark:border-white/20 dark:bg-white/10 dark:text-[#F7FBFF]">
                SS
              </div>
              <div>
                <h1 className="text-xl font-semibold text-[#102133] dark:text-[#F7FBFF]">
                  {hero.headline}
                </h1>
                <p className="text-xs text-[#5C6A77] dark:text-[#B8C4CD]">{SUBSTANCE.meta.title}</p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-[#3D4D5B] dark:text-[#D6E0E7]">
              {hero.subheadline}
            </p>

            <div className={`mt-6 ${subPanelBase} text-sm`}>
              <p className="flex items-center gap-2 text-[#1C2E3D] dark:text-[#ECF3F7]">
                <FaEnvelope className="h-3.5 w-3.5 text-[#59A96A]" />
                {SUBSTANCE.meta.email}
              </p>
              <p className="mt-2 flex items-center gap-2 text-[#1C2E3D] dark:text-[#ECF3F7]">
                <FaPhone className="h-3.5 w-3.5 text-[#F19A3E]" />
                {SUBSTANCE.meta.phone}
              </p>
              <p className="mt-2 flex items-center gap-2 text-[#1C2E3D] dark:text-[#ECF3F7]">
                <FaLocationArrow className="h-3.5 w-3.5 text-[#DD403A]" />
                {SUBSTANCE.meta.location}
              </p>
            </div>

            <div className="mt-6 grid gap-2">
              <a
                href={links.github.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#C8D4DE] bg-[#EFF4F8] px-3 py-2 text-sm font-medium text-[#1C2E3D] transition-colors duration-200 hover:bg-[#E4ECF3] dark:border-white/15 dark:bg-white/8 dark:text-[#F7FBFF] dark:hover:bg-white/16"
              >
                <FaGithub className="h-4 w-4" />
                {links.github.label}
              </a>
              <a
                href={links.linkedin.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#C8D4DE] bg-[#EFF4F8] px-3 py-2 text-sm font-medium text-[#1C2E3D] transition-colors duration-200 hover:bg-[#E4ECF3] dark:border-white/15 dark:bg-white/8 dark:text-[#F7FBFF] dark:hover:bg-white/16"
              >
                <FaLinkedin className="h-4 w-4" />
                {links.linkedin.label}
              </a>
              <a
                href={links.resume.href}
                download
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#59A96A]/50 bg-[#59A96A] px-3 py-2 text-sm font-semibold text-[#051108] transition-colors duration-200 hover:bg-[#4F9A61]"
              >
                <FaFilePdf className="h-4 w-4" />
                {links.resume.label}
              </a>
            </div>

            <div className={`mt-6 ${subPanelBase}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5C6A77] dark:text-[#B8C4CD]">
                Highlights
              </p>
              <ul className="mt-3 space-y-2">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs leading-relaxed text-[#3D4D5B] dark:text-[#D6E0E7]"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#59A96A]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          <nav className="sticky top-4 z-20">
            <div className={`${panelBase} p-2 backdrop-blur`}>
              <div className="flex flex-wrap gap-2">
                {sectionLinks.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => jumpToSection(section.id)}
                    className="rounded-full border border-[#C8D4DE] bg-[#EEF4F8] px-3 py-1.5 text-xs font-medium text-[#1F3242] transition-colors duration-200 hover:bg-[#E1EAF2] dark:border-white/15 dark:bg-white/6 dark:text-[#F1F6FA] dark:hover:bg-white/15"
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          <section id="section-about" className="scroll-mt-24">
            <div className={`${panelBase} p-6`}>
              <h2 className="text-h2-sans text-[#102133] dark:text-[#F7FBFF]">About</h2>
              <p className="mt-3 text-body-sans text-[#3D4D5B] dark:text-[#D6E0E7]">
                {hero.subheadline}
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {highlights.map((item) => (
                  <article
                    key={item}
                    className="rounded-2xl border border-[#D5E0E8] bg-[#F7FAFC] p-4 text-sm leading-relaxed text-[#2A3B49] transition-colors duration-300 dark:border-white/12 dark:bg-white/5 dark:text-[#ECF3F7]"
                  >
                    {item}
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="section-experience" className="scroll-mt-24">
            <div className={`${panelBase} p-6`}>
              <h2 className="text-h2-sans text-[#102133] dark:text-[#F7FBFF]">{labels.experience}</h2>
              <p className="mt-2 text-sm text-[#546575] dark:text-[#B8C4CD]">
                Experience presented as a clean progression from earlier to most recent.
              </p>

              <div className="relative mt-6 space-y-4 before:absolute before:bottom-0 before:left-[14px] before:top-0 before:w-px before:bg-[#C3D0DA] dark:before:bg-white/10">
                {experience.map((exp) => (
                  <article
                    key={exp.id}
                    className="relative rounded-2xl border border-[#D5E0E8] bg-[#F7FAFC] p-5 pl-10 transition-colors duration-300 dark:border-white/10 dark:bg-white/5"
                  >
                    <span className="absolute left-[9px] top-6 h-3 w-3 rounded-full border-2 border-[#4A90E2] bg-white dark:border-[#59A96A] dark:bg-[#0E151B]" />
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-[#13283A] dark:text-[#F4F9FD]">{exp.org}</p>
                      <p className="text-xs text-[#5C6A77] dark:text-[#B8C4CD]">
                        {exp.start} to {exp.end}
                      </p>
                    </div>
                    <h3 className="mt-1 text-base font-semibold text-[#0F2132] dark:text-[#FFFFFF]">
                      {exp.role}
                    </h3>
                    <p className="mt-2 text-sm text-[#334656] dark:text-[#D6E0E7]">
                      {exp.oneLineImpact}
                    </p>
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[#3D4D5B] dark:text-[#D6E0E7]">
                      {exp.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="section-projects" className="scroll-mt-24">
            <div className={`${panelBase} p-6`}>
              <h2 className="text-h2-sans text-[#102133] dark:text-[#F7FBFF]">{labels.projects}</h2>
              <p className="mt-2 text-sm text-[#546575] dark:text-[#D6E0E7]">
                {SUBSTANCE.story.freefall.experienceIntro}
              </p>
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {projects.map((project) => (
                  <article
                    key={project.id}
                    className="rounded-2xl border border-[#D5E0E8] bg-[#F7FAFC] p-5 transition-colors duration-300 dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs text-[#5C6A77] dark:text-[#B8C4CD]">{project.timeframe}</p>
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold ${getStatusToneClasses(
                          project.status.tone,
                        )}`}
                      >
                        {project.status.label}
                      </span>
                    </div>
                    <h3 className="mt-1 text-base font-semibold text-[#102133] dark:text-[#FFFFFF]">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-sm text-[#3D4D5B] dark:text-[#D6E0E7]">
                      {project.tagline}
                    </p>
                    <p className="mt-2 text-xs text-[#5C6A77] dark:text-[#B8C4CD]">{project.status.access}</p>

                    <div className="mt-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5C6A77] dark:text-[#B8C4CD]">
                        Quick Look
                      </p>
                      <div className="mt-2 overflow-hidden rounded-xl border border-[#C8D4DE] bg-[#EAF0F5] dark:border-white/14 dark:bg-[#0F171F]">
                        {project.media && project.media.length > 0 ? (
                          project.media[0].kind === "image" ? (
                            <img
                              src={project.media[0].src}
                              alt={project.media[0].alt}
                              className="h-44 w-full object-cover"
                            />
                          ) : (
                            <div className="aspect-video w-full overflow-hidden">
                              <iframe
                                src={project.media[0].embedUrl}
                                title={project.media[0].title || project.name}
                                className="h-full w-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          )
                        ) : (
                          <div className="relative flex h-44 items-center justify-center bg-[#E6EDF3] dark:bg-[#0F1519]">
                            <div className="absolute -left-8 -top-10 h-28 w-28 rounded-full bg-[#59A96A]/18 blur-xl" />
                            <div className="absolute -bottom-12 -right-8 h-32 w-32 rounded-full bg-[#F19A3E]/20 blur-xl" />
                            <FaTools className="h-11 w-11 text-[#1F2E3B]/70 dark:text-white/75" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5C6A77] dark:text-[#B8C4CD]">
                        Built With
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {project.stack.map((tool) => (
                          <span
                            key={`${project.id}-${tool}`}
                            className="inline-flex items-center rounded-full border border-[#C8D4DE] bg-[#EEF4F8] px-2.5 py-1 text-[11px] text-[#1F3242] dark:border-white/12 dark:bg-white/8 dark:text-[#ECF3F7]"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5C6A77] dark:text-[#B8C4CD]">
                        Visit
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(project.links && project.links.length > 0
                          ? project.links
                          : [
                              {
                                label: "Request Access",
                                href: `mailto:${SUBSTANCE.meta.email}?subject=${encodeURIComponent(
                                  `Project Access: ${project.name}`,
                                )}`,
                                external: false,
                              },
                            ]
                        ).map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target={link.external ? "_blank" : undefined}
                            rel={link.external ? "noreferrer" : undefined}
                            className="inline-flex items-center gap-2 rounded-full border border-[#C8D4DE] bg-[#EEF4F8] px-3 py-1 text-xs font-semibold text-[#1F3242] transition-colors duration-200 hover:bg-[#E1EAF2] dark:border-white/15 dark:bg-white/8 dark:text-[#F1F6FA] dark:hover:bg-white/16"
                          >
                            {link.label.toLowerCase().includes("github") ? (
                              <FaGithub className="h-3 w-3" />
                            ) : (
                              <FaGlobe className="h-3 w-3" />
                            )}
                            <span>{link.label}</span>
                            {link.external && <FaExternalLinkAlt className="h-3 w-3" />}
                          </a>
                        ))}
                      </div>
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-[#3D4D5B] dark:text-[#D6E0E7]">
                      {project.impactBullets[0]}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <div className="grid gap-6 xl:grid-cols-2">
            <section id="section-skills" className="scroll-mt-24">
              <div className={`${panelBase} p-6`}>
                <h2 className="text-h2-sans text-[#102133] dark:text-[#F7FBFF]">{labels.skills}</h2>
                <div className={`mt-4 ${subPanelBase}`}>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold text-[#102133] dark:text-[#FFFFFF]">
                      {currentSkillGroup.title}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-[#5C6A77] dark:text-[#B8C4CD]">
                      <button
                        type="button"
                        onClick={goPrevSkills}
                        aria-label="Previous skills group"
                        className="rounded-full border border-[#C8D4DE] bg-[#EEF4F8] px-3 py-1 text-[#1F3242] transition-colors duration-200 hover:bg-[#E1EAF2] dark:border-white/20 dark:bg-white/8 dark:text-[#F1F6FA] dark:hover:bg-white/16"
                      >
                        ◀
                      </button>
                      <span className="font-medium text-[#1F3242] dark:text-[#F1F6FA]">
                        {skillIndex + 1}/{totalSkillGroups}
                      </span>
                      <button
                        type="button"
                        onClick={goNextSkills}
                        aria-label="Next skills group"
                        className="rounded-full border border-[#C8D4DE] bg-[#EEF4F8] px-3 py-1 text-[#1F3242] transition-colors duration-200 hover:bg-[#E1EAF2] dark:border-white/20 dark:bg-white/8 dark:text-[#F1F6FA] dark:hover:bg-white/16"
                      >
                        ▶
                      </button>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSkillGroup.id}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="mt-4 flex flex-wrap gap-2"
                    >
                      {currentSkillGroup.items.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-2 rounded-full border border-[#C8D4DE] bg-[#EEF4F8] px-3 py-1 text-xs text-[#1F3242] transition-colors duration-300 dark:border-white/12 dark:bg-white/8 dark:text-[#ECF3F7]"
                        >
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D8EAD7] dark:bg-[#59A96A]/20">
                            {renderSkillIcon(item)}
                          </span>
                          <span>{item}</span>
                        </span>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </section>

            <section id="section-tools" className="scroll-mt-24">
              <div className={`${panelBase} p-6`}>
                <h2 className="text-h2-sans text-[#102133] dark:text-[#F7FBFF]">{labels.tools}</h2>
                <div className={`mt-4 ${subPanelBase}`}>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold text-[#102133] dark:text-[#FFFFFF]">
                      {currentToolGroup.title}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-[#5C6A77] dark:text-[#B8C4CD]">
                      <button
                        type="button"
                        onClick={goPrevTools}
                        aria-label="Previous tools group"
                        className="rounded-full border border-[#C8D4DE] bg-[#EEF4F8] px-3 py-1 text-[#1F3242] transition-colors duration-200 hover:bg-[#E1EAF2] dark:border-white/20 dark:bg-white/8 dark:text-[#F1F6FA] dark:hover:bg-white/16"
                      >
                        ◀
                      </button>
                      <span className="font-medium text-[#1F3242] dark:text-[#F1F6FA]">
                        {toolIndex + 1}/{totalToolGroups}
                      </span>
                      <button
                        type="button"
                        onClick={goNextTools}
                        aria-label="Next tools group"
                        className="rounded-full border border-[#C8D4DE] bg-[#EEF4F8] px-3 py-1 text-[#1F3242] transition-colors duration-200 hover:bg-[#E1EAF2] dark:border-white/20 dark:bg-white/8 dark:text-[#F1F6FA] dark:hover:bg-white/16"
                      >
                        ▶
                      </button>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentToolGroup.id}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="mt-4 flex flex-wrap gap-2"
                    >
                      {currentToolGroup.items.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-2 rounded-full border border-[#C8D4DE] bg-[#EEF4F8] px-3 py-1 text-xs text-[#1F3242] transition-colors duration-300 dark:border-white/12 dark:bg-white/8 dark:text-[#ECF3F7]"
                        >
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D8EAD7] dark:bg-[#59A96A]/20">
                            {renderToolIcon(item)}
                          </span>
                          <span>{item}</span>
                        </span>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </section>
          </div>

          <section id="section-beach" className="scroll-mt-24">
            <div className={`${panelBase} p-6`}>
              <h2 className="text-h2-sans text-[#102133] dark:text-[#F7FBFF]">{labels.contact}</h2>
              <p className="mt-2 text-sm text-[#3D4D5B] dark:text-[#D6E0E7]">
                Reach out directly or use one of the links below.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={links.resume.href}
                  download
                  className="inline-flex items-center gap-2 rounded-xl border border-[#59A96A]/45 bg-[#59A96A] px-4 py-2 text-sm font-semibold text-[#08100C] transition-colors hover:bg-[#4F9A61]"
                >
                  <FaFilePdf className="h-4 w-4" />
                  {links.resume.label}
                </a>
                <a
                  href={`mailto:${SUBSTANCE.meta.email}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#C8D4DE] bg-[#EEF4F8] px-4 py-2 text-sm font-semibold text-[#1F3242] transition-colors hover:bg-[#E1EAF2] dark:border-white/15 dark:bg-white/8 dark:text-[#F1F6FA] dark:hover:bg-white/16"
                >
                  <FaEnvelope className="h-4 w-4" />
                  Email Me
                </a>
                <a
                  href={links.github.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#C8D4DE] bg-[#EEF4F8] px-4 py-2 text-sm font-semibold text-[#1F3242] transition-colors hover:bg-[#E1EAF2] dark:border-white/15 dark:bg-white/8 dark:text-[#F1F6FA] dark:hover:bg-white/16"
                >
                  <FaGithub className="h-4 w-4" />
                  GitHub
                </a>
                <a
                  href={links.linkedin.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#C8D4DE] bg-[#EEF4F8] px-4 py-2 text-sm font-semibold text-[#1F3242] transition-colors hover:bg-[#E1EAF2] dark:border-white/15 dark:bg-white/8 dark:text-[#F1F6FA] dark:hover:bg-white/16"
                >
                  <FaLinkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
