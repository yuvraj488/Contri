import { motion } from "motion/react";

export function GlowEffect({
  className = "",
  colors = ["#047857", "#10B981", "#34D399", "#6EE7B7"],
  mode = "colorShift",
  blur = "medium",
  duration = 5,
}) {
  const blurClasses = {
    none: "blur-none",
    soft: "blur-sm",
    medium: "blur-md",
    strong: "blur-lg",
  };

  const animations = {
    colorShift: {
      background: colors.map((color, index) => {
        const next = colors[(index + 1) % colors.length];

        return `conic-gradient(from 0deg at 50% 50%, ${color}, ${next}, ${color})`;
      }),

      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration,
        ease: "linear",
      },
    },

    static: {
      background: `linear-gradient(to right, ${colors.join(",")})`,
    },
  };

  return (
    <motion.div
      animate={animations[mode]}
      className={`
        absolute
        inset-0
        pointer-events-none
        rounded-xl
        ${blurClasses[blur]}
        ${className}
      `}
    />
  );
}