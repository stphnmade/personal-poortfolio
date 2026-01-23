import { motion, useTransform, type MotionValue } from "motion/react";
import { CHAPTERS } from "@/constants/chapters";
import { SUBSTANCE } from "@/constants/substance";
import cargoLeft from "@/app/assets/Cargo_left.png";
import cargoRight from "@/app/assets/Cargo_right.png";

interface CargoHoldProps {
  scrollYProgress: MotionValue<number>;
  onJump: () => void;
}

export function CargoHold({ scrollYProgress, onJump }: CargoHoldProps) {
  const about = CHAPTERS.find((c) => c.id === "about")!;
  const doors = CHAPTERS.find((c) => c.id === "doors")!;
  const experience = CHAPTERS.find((c) => c.id === "experience")!;
  const copy = SUBSTANCE.story.cargoHold;

  // Normalized open progress for doors: 0 closed, 1 fully open
  const openProgress = useTransform(
    scrollYProgress,
    [about.start, doors.end],
    [0, 1],
  );
  // Door travel in viewport width, tune 28 for how far they open
  const leftDoorTransform = useTransform(
    openProgress,
    (v) => `translateX(-${v * 28}vw)`,
  );
  const rightDoorTransform = useTransform(
    openProgress,
    (v) => `translateX(${v * 28}vw)`,
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [about.start, doors.start, doors.end, experience.start],
    [0, 1, 1, 0],
  );

  const containerOpacity = useTransform(
    scrollYProgress,
    [about.start, experience.start - 0.02, experience.start],
    [1, 1, 0],
  );

  return (
    <motion.div
      style={{ opacity: containerOpacity }}
      className="sticky top-0 h-screen w-screen overflow-hidden bg-black relative"
    >
      {/* Doors stage: full-screen, doors meet at center seam */}
      <motion.div
        style={{
          transform: leftDoorTransform,
          willChange: "transform",
        }}
        className="absolute inset-y-0 left-0 z-20 flex w-1/2 justify-end bg-black"
      >
        <img
          src={cargoLeft}
          alt=""
          className="h-full select-none object-contain pointer-events-none"
          draggable={false}
        />
        {/* Left door details overlay */}
        <div className="pointer-events-none absolute inset-0 flex h-full w-full items-center justify-center">
          <div className="absolute inset-y-10 left-6 flex flex-col justify-between">
            <div className="flex gap-2">
              <span className="h-2 w-2 rounded-full bg-[#59A96A]" />
              <span className="h-2 w-2 rounded-full bg-[#F19A3E]" />
              <span className="h-2 w-2 rounded-full bg-[#DD403A]" />
            </div>
            <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-300/70">
              About Manifest
            </div>
          </div>
          <div className="absolute right-4 top-1/2 h-24 w-3 -translate-y-1/2 rounded-full bg-[#2B3237] shadow-inner" />
        </div>
      </motion.div>
      <motion.div
        style={{
          transform: rightDoorTransform,
          willChange: "transform",
        }}
        className="absolute inset-y-0 left-1/2 z-20 flex w-1/2 justify-start bg-black"
      >
        <img
          src={cargoRight}
          alt=""
          className="h-full select-none object-contain pointer-events-none"
          draggable={false}
        />
        {/* Right door details overlay */}
        <div className="pointer-events-none absolute inset-0 flex h-full w-full items-center justify-center">
          <div className="absolute inset-y-12 right-8 flex flex-col items-end justify-between">
            <div className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-gray-200">
              Jump Bay 01
            </div>
            <div className="text-[10px] text-gray-300">
              [Short about-me snippet here]
            </div>
          </div>
          <div className="absolute left-4 top-1/2 h-20 w-1.5 -translate-y-1/2 rounded-full bg-[#2B3237]" />
        </div>
      </motion.div>

      {/* Manifest Card - Layer B */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute inset-0 z-30 flex items-center justify-center"
      >
        <div className="max-w-xl rounded-2xl border-t-4 border-[#DD403A] bg-white/98 p-10 shadow-2xl">
          <h1 className="text-h1-sans font-bold text-[#3B413C]">
            {copy.headline}
          </h1>
          <p className="text-annotation-script text-[#DD403A] -rotate-2 mt-2">
            {copy.subheadline}
          </p>
          {copy.shortBio.map((line) => (
            <p key={line} className="text-body-sans mt-2 text-[#3B413C]">
              {line}
            </p>
          ))}

          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex items-center justify-center animate-bounce">
              <span className="text-body-sans text-[#F19A3E]">
                {copy.doorsClosedLabel}
              </span>
            </div>
            {/* Layer C - Interactive Trigger */}
            <button
              type="button"
              onClick={onJump}
              className="px-8 py-3 rounded-full bg-[#59A96A] text-white font-medium shadow-[0_0_30px_rgba(89,169,106,0.7)] hover:shadow-[0_0_40px_rgba(89,169,106,0.9)] hover:scale-105 active:scale-95 transition-transform transition-shadow"
            >
              JUMP
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
