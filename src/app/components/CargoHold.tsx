import { useState } from "react";
import {
  motion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { CHAPTERS } from "@/constants/chapters";
import cargoLeft from "@/app/assets/Cargo_left.png";

interface CargoHoldProps {
  scrollYProgress: MotionValue<number>;
  theme: "dark" | "light";
}

const STAR_POSITIONS = [
  { top: "14%", left: "8%", size: "h-1 w-1" },
  { top: "9%", left: "22%", size: "h-1.5 w-1.5" },
  { top: "21%", left: "33%", size: "h-1 w-1" },
  { top: "12%", left: "47%", size: "h-1.5 w-1.5" },
  { top: "18%", left: "61%", size: "h-1 w-1" },
  { top: "11%", left: "75%", size: "h-1.5 w-1.5" },
  { top: "26%", left: "84%", size: "h-1 w-1" },
  { top: "31%", left: "16%", size: "h-1 w-1" },
  { top: "34%", left: "42%", size: "h-1.5 w-1.5" },
  { top: "29%", left: "68%", size: "h-1 w-1" },
];

export function CargoHold({ scrollYProgress, theme }: CargoHoldProps) {
  const about = CHAPTERS.find((c) => c.id === "about")!;
  const experience = CHAPTERS.find((c) => c.id === "experience")!;
  const [hasDoorFinished, setHasDoorFinished] = useState(false);
  const isDark = theme === "dark";
  const heroProjectBullets = [
    "Dear Days, collaborative family calendar platform focused on shared memories and connection",
    "Storybot, Reddit-to-video automation workflow for scripting, voiceover, editing, and delivery",
    "Blockopoly, multiplayer card game with real-time state management and seamless UI interactions",
    "Wishlist, collaborative gifting app built with React, Go, gRPC, and PostgreSQL",
  ];

  const containerOpacity = useTransform(
    scrollYProgress,
    [about.start, experience.start - 0.02, experience.start],
    [1, 1, 0],
  );

  return (
    <motion.div
      style={{ opacity: containerOpacity }}
      className={`relative sticky top-0 h-screen w-screen overflow-hidden ${
        isDark ? "bg-[#05080B]" : "bg-[#DDE5EC]"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 z-10">
        <div
          className={`absolute inset-0 ${
            isDark ? "bg-[#040A12]" : "bg-[#DDE5EC]"
          }`}
        />
        {isDark ? (
          STAR_POSITIONS.map((star, index) => (
            <div
              key={`${star.top}-${star.left}-${index}`}
              className={`absolute rounded-full bg-[#D9E6F5]/90 ${star.size}`}
              style={{ top: star.top, left: star.left }}
            />
          ))
        ) : (
          <div className="absolute inset-x-0 top-[8%] mx-auto h-16 w-16 rounded-full border border-[#F19A3E]/30 bg-[#F5F7FA]" />
        )}
        <div
          className={`absolute inset-x-0 bottom-0 h-[34vh] ${
            isDark ? "bg-[#1B3A2A]" : "bg-[#7A9A75]"
          } [clip-path:polygon(0_100%,0_45%,18%_62%,36%_50%,52%_66%,70%_52%,86%_64%,100%_46%,100%_100%)]`}
        />
        <div
          className={`absolute inset-x-0 bottom-0 h-[22vh] ${
            isDark ? "bg-[#0D1F18]/88" : "bg-[#4E6650]/65"
          }`}
        />
        <div
          className={`absolute bottom-0 left-1/2 h-[18vh] w-[26vw] -translate-x-1/2 rounded-t-[2rem] border border-white/15 ${
            isDark ? "bg-[#1C4B36]/80" : "bg-[#6F8B6A]/75"
          }`}
        />
        <div
          className={`absolute bottom-[9vh] left-1/2 h-[2px] w-[26vw] -translate-x-1/2 ${
            isDark ? "bg-white/20" : "bg-[#3B413C]/25"
          }`}
        />
        <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-6 lg:px-10">
          <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <section className="space-y-5">
              <span
                className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${
                  isDark
                    ? "border-[#59A96A]/35 bg-[#59A96A]/10 text-[#BDE6C6]"
                    : "border-[#3B413C]/20 bg-white/70 text-[#2F3A37]"
                }`}
              >
                Working
              </span>
              <h2
                className={`text-4xl font-bold tracking-tight md:text-6xl ${
                  isDark ? "text-[#F4FAFD]" : "text-[#1F2C36]"
                }`}
              >
                Hi, I am Stephen.
              </h2>
              <p
                className={`max-w-3xl text-base leading-relaxed md:text-lg ${
                  isDark ? "text-[#D7E2E9]" : "text-[#2E3A44]"
                }`}
              >
                I love building things that start as questions, frustrations, or
                half formed ideas. I build across consumer apps, interactive data
                visualizations, multiplayer systems, and creative automation.
              </p>
              <p
                className={`max-w-3xl text-sm leading-relaxed md:text-base ${
                  isDark ? "text-[#B5C4CF]" : "text-[#45525C]"
                }`}
              >
                I bridge product, UX, data, and engineering to turn insights into
                clear, usable, and emotionally resonant products for real people.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] ${
                    isDark
                      ? "border-white/15 bg-white/5 text-[#EAF2F8]"
                      : "border-[#3B413C]/18 bg-white/80 text-[#24313A]"
                  }`}
                >
                  Product-minded
                </span>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] ${
                    isDark
                      ? "border-white/15 bg-white/5 text-[#EAF2F8]"
                      : "border-[#3B413C]/18 bg-white/80 text-[#24313A]"
                  }`}
                >
                  Human-centered
                </span>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] ${
                    isDark
                      ? "border-white/15 bg-white/5 text-[#EAF2F8]"
                      : "border-[#3B413C]/18 bg-white/80 text-[#24313A]"
                  }`}
                >
                  Systems builder
                </span>
              </div>
            </section>

            <aside
              className={`rounded-2xl border p-5 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur ${
                isDark
                  ? "border-white/12 bg-[#111C25]/92"
                  : "border-[#3B413C]/16 bg-white/90"
              }`}
            >
              <p
                className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
                  isDark ? "text-[#B9C8D3]" : "text-[#4A5965]"
                }`}
              >
                Candidate Snapshot
              </p>
              <p
                className={`mt-3 text-sm leading-relaxed ${
                  isDark ? "text-[#DDE8EF]" : "text-[#2B3842]"
                }`}
              >
                Across projects, I focus on clarity, usability, and emotional
                resonance. I am energized by tools that support communities,
                empower creativity, and help everyday people navigate choices.
              </p>
              <ul
                className={`mt-4 space-y-2 text-sm leading-relaxed ${
                  isDark ? "text-[#D2DFE8]" : "text-[#33414C]"
                }`}
              >
                {heroProjectBullets.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#59A96A]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p
                className={`mt-4 text-sm leading-relaxed ${
                  isDark ? "text-[#B9C8D3]" : "text-[#4A5965]"
                }`}
              >
                Long term, I want to grow into product leadership and guide teams
                from insight to scalable, human-centered solutions.
              </p>
            </aside>
          </div>
        </div>
      </div>

      {!hasDoorFinished && (
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: "-160vw" }}
          transition={{
            duration: 3,
            ease: [0.22, 1, 0.36, 1],
          }}
          onAnimationComplete={() => setHasDoorFinished(true)}
          className="pointer-events-none absolute inset-y-0 right-0 z-20 flex w-[58vw] justify-end"
        >
          <img
            src={cargoLeft}
            alt=""
            className="h-full w-full select-none object-contain"
            draggable={false}
          />
          <div className="absolute right-6 top-1/2 h-24 w-3 -translate-y-1/2 rounded-full bg-[#1B242C] shadow-inner" />
        </motion.div>
      )}
    </motion.div>
  );
}
