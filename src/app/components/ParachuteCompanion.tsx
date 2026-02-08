import { motion } from "motion/react";

interface ParachuteCompanionProps {
  stage: "cargo" | "freefall" | "landing";
  theme: "dark" | "light";
  className?: string;
}

export function ParachuteCompanion({
  stage,
  theme,
  className,
}: ParachuteCompanionProps) {
  const isDark = theme === "dark";
  const isLanding = stage === "landing";

  return (
    <motion.div
      className={className}
      animate={
        isLanding
          ? { y: [0, -2, 0], rotate: [0, 1, 0] }
          : { y: [0, -10, 0], x: [0, 8, 0], rotate: [-2, 2, -2] }
      }
      transition={{
        duration: isLanding ? 2.4 : 3.1,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    >
      <div className="relative h-28 w-20">
        <div
          className={`absolute left-1/2 top-0 h-7 w-20 -translate-x-1/2 rounded-t-full border ${
            isDark
              ? "border-[#B6C8D6] bg-[#3A4D61]"
              : "border-[#7A8DA3] bg-[#C7D8E6]"
          }`}
        />
        <div
          className={`absolute left-1/2 top-[3px] h-5 w-14 -translate-x-1/2 rounded-t-full border ${
            isDark
              ? "border-[#D5E2EC]/70 bg-[#4A6076]"
              : "border-[#7A8DA3] bg-[#E1EBF3]"
          }`}
        />
        <span className="absolute left-[11px] top-[26px] h-7 w-px bg-[#D7DEE5]" />
        <span className="absolute left-[40px] top-[26px] h-7 w-px bg-[#D7DEE5]" />
        <span className="absolute right-[11px] top-[26px] h-7 w-px bg-[#D7DEE5]" />

        <div className="absolute left-1/2 top-[52px] h-16 w-8 -translate-x-1/2">
          <div
            className={`absolute bottom-0 left-1/2 h-11 w-5 -translate-x-1/2 rounded-[8px] ${
              isDark ? "bg-[#4DAA5F]" : "bg-[#57B96A]"
            }`}
          />
          <div
            className={`absolute bottom-[12px] -left-[3px] h-6 w-2.5 rounded-full ${
              isDark ? "bg-[#4DAA5F]" : "bg-[#57B96A]"
            }`}
          />
          <div
            className={`absolute bottom-[14px] right-[-3px] h-5 w-2.5 rounded-full ${
              isDark ? "bg-[#4DAA5F]" : "bg-[#57B96A]"
            }`}
          />
          <div className="absolute bottom-[14px] left-1/2 h-1 w-1 -translate-x-1 rounded-full bg-[#1B232B]" />
          <div className="absolute bottom-[14px] left-1/2 ml-1 h-1 w-1 rounded-full bg-[#1B232B]" />
          <div className="absolute bottom-[10px] left-1/2 h-[1.5px] w-2 -translate-x-1/2 rounded-full bg-[#1B232B]/70" />
        </div>
      </div>
    </motion.div>
  );
}
