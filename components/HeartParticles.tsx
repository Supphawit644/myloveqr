"use client";

import { motion } from "framer-motion";

// Floating heart particles
export function HeartParticles() {
  const hearts = Array.from({ length: 18 });

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {hearts.map((_, i) => {
        const delay = Math.random() * 6;
        const duration = 10 + Math.random() * 8;
        const size = 16 + Math.random() * 20;
        const left = Math.random() * 100;
        const hearts = Array.from({ length: 28 });


        return (
          <motion.div
            key={i}
            className="absolute text-pink-400 opacity-60 drop-shadow-[0_0_8px_rgba(255,80,140,0.7)]"
            style={{
              fontSize: size,
              left: `${left}%`
            }}
            initial={{ y: "100vh", scale: 0.8, opacity: 0 }}
            animate={{
              y: "-120px",
              scale: 1,
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ❤️
          </motion.div>
        );
      })}
    </div>
  );
}