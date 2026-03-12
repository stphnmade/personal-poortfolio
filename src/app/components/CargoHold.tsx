import { useEffect, useState } from "react";
import {
  motion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { SUBSTANCE } from "@/constants/substance";
import { ParachuteCompanion } from "@/app/components/ParachuteCompanion";
import { AuroraText } from "@/app/components/magic/AuroraText";

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
  const isDark = theme === "dark";
  const [playIntroDolly, setPlayIntroDolly] = useState(false);
  const lowerSkyOpacity = useTransform(scrollYProgress, [0, 0.12, 0.2], [0.34, 0.46, 0.72]);
  const horizonGlowOpacity = useTransform(scrollYProgress, [0, 0.12, 0.2], [0.18, 0.24, 0.38]);
  const contentY = useTransform(scrollYProgress, [0, 0.12, 0.2], ["0%", "0%", "-6%"]);
  const companionY = useTransform(scrollYProgress, [0, 0.12, 0.2], ["0%", "2%", "8%"]);
  const heroProjectBullets = [
    "Dear Days, collaborative family calendar platform focused on shared memories and connection",
    "Storybot, Reddit-to-video automation workflow for scripting, voiceover, editing, and delivery",
    "Blockopoly, multiplayer card game with real-time state management and seamless UI interactions",
    "Wishlist, collaborative gifting app built with React, Go, gRPC, and PostgreSQL",
  ];

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => {
      setPlayIntroDolly(true);
    });
    return () => window.cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      data-story-scene="cargo"
      className={`absolute inset-0 h-full w-full overflow-hidden ${
        isDark ? "bg-[#05080B]" : "bg-[#DDE5EC]"
      }`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        style={{ y: contentY }}
      >
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-[linear-gradient(180deg,#05080B_0%,#08111B_38%,#0E1B2A_74%,#13283D_100%)]"
              : "bg-[linear-gradient(180deg,#E7EDF2_0%,#DDE8F1_34%,#C9DEF1_70%,#B8D3EA_100%)]"
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
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[42vh]"
          style={{
            opacity: lowerSkyOpacity,
            background: isDark
              ? "linear-gradient(180deg, rgba(5,8,11,0) 0%, rgba(7,18,30,0.28) 26%, rgba(10,25,40,0.6) 58%, rgba(14,37,59,0.92) 100%)"
              : "linear-gradient(180deg, rgba(231,237,242,0) 0%, rgba(198,222,242,0.16) 28%, rgba(173,205,233,0.46) 62%, rgba(147,186,220,0.86) 100%)",
          }}
        />
        <motion.div
          className="absolute inset-x-[10%] bottom-[-10vh] h-[28vh] rounded-[999px] blur-3xl"
          style={{
            opacity: horizonGlowOpacity,
            background: isDark
              ? "radial-gradient(circle, rgba(149,196,235,0.22) 0%, rgba(58,117,173,0.16) 34%, transparent 74%)"
              : "radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(210,233,252,0.28) 38%, transparent 74%)",
          }}
        />
        <div
          className={`absolute inset-x-0 bottom-0 h-[1px] ${
            isDark ? "bg-white/8" : "bg-white/35"
          }`}
        />
        <div
          className={`relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-6 lg:px-10 ${
            playIntroDolly
              ? "animate-[cargoDollyReveal_6.6s_cubic-bezier(0.16,1,0.3,1)_forwards]"
              : ""
          }`}
        >
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
                <AuroraText text="Hi, I'm Stephen" />
              </h2>
              <p
                className={`max-w-3xl text-base leading-relaxed md:text-lg ${
                  isDark ? "text-[#D7E2E9]" : "text-[#2E3A44]"
                }`}
              >
                {SUBSTANCE.meta.title}
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
                LinkedIn header: {SUBSTANCE.meta.title}. I build practical,
                human-centered products that balance product strategy, UX, and
                engineering execution.
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
      </motion.div>

      <motion.div style={{ y: companionY }}>
        <ParachuteCompanion
          stage="cargo"
          theme={theme}
          className="pointer-events-none absolute left-[64%] top-[18%] z-[15] hidden md:block"
        />
      </motion.div>
    </motion.div>
  );
}
