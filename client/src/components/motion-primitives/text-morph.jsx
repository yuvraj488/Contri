import { AnimatePresence, motion } from "motion/react";

export function TextMorph({
  children,
  className = "",
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={children}
          initial={{
            opacity: 0,
            y: 6,
            filter: "blur(4px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          exit={{
            opacity: 0,
            y: -6,
            filter: "blur(4px)",
          }}
          transition={{
            duration: 0.2,
          }}
        >
          {children}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}