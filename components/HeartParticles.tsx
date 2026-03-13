"use client";

import { motion } from "framer-motion";

// Simple decorative floating heart particles used across templates
export function HeartParticles() {
  const hearts = Array.from({ length: 14 });

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {hearts.map((_, i) => {
        const delay = Math.random() * 6;
        const duration = 12 + Math.random() * 10;
        const size = 16 + Math.random() * 18;
        const left = Math.random() * 100;

        return (
          <motion.div
            key={i}
            className="heart-particle absolute rounded-full opacity-40"
            style={{
              width: size,
              height: size,
              left: `${left}%`
            }}
            initial={{ y: "100vh", scale: 0.7, opacity: 0 }}
            animate={{
              y: "-120px",
              scale: 1,
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        );
      })}
    </div>
  );
}