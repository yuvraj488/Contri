import { motion } from "motion/react";

import { GlowEffect } from "@/components/motion-primitives/glow-effect";
import { TextMorph } from "@/components/motion-primitives/text-morph";

export default function LoadingButton({
  loading = false,
  text,
  loadingText,
  type = "button",
  onClick,
  className = "",
}) {
  return (
    <div className="relative w-full">
      {/* Animated Glow */}

      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl"
        animate={{
          opacity: loading ? 1 : 0,
        }}
        transition={{
          duration: 0.25,
        }}
      >
        <GlowEffect
          className="rounded-xl"
          mode="colorShift"
          blur="medium"
          duration={5}
          colors={[
            "#047857",
            "#10B981",
            "#34D399",
            "#6EE7B7",
          ]}
        />
      </motion.div>

      {/* Button */}

      <motion.button
        whileHover={{
          scale: loading ? 1 : 1.02,
        }}
        whileTap={{
          scale: loading ? 1 : 0.98,
        }}
        transition={{
          duration: 0.15,
        }}
        disabled={loading}
        type={type}
        onClick={onClick}
        className={`
          relative
          z-10
          flex
          h-12
          w-full
          items-center
          justify-center
          rounded-xl
          bg-emerald-600
          font-semibold
          text-white
          transition-colors
          hover:bg-emerald-700
          disabled:cursor-not-allowed
          disabled:opacity-90
          ${className}
        `}
      >
        <TextMorph>
          {loading ? loadingText : text}
        </TextMorph>
      </motion.button>
    </div>
  );
}