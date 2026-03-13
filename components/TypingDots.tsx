"use client";

import { motion } from "framer-motion";

// Small typing indicator used in the Secret Love Chat template
export function TypingDots() {
  return (
    <div className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1">
      <span className="text-[11px] text-soft/80 mr-1">typing</span>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-soft/80"
            animate={{ y: [0, -3, 0] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 0.7,
              delay: i * 0.15
            }}
          />
        ))}
      </div>
    </div>
  );
}

