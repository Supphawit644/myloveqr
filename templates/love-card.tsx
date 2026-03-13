"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { SurprisePayload } from "@/lib/surprises";
import { HeartParticles } from "@/components/HeartParticles";
import { PrimaryButton } from "@/components/PrimaryButton";
import confetti from "canvas-confetti";


type Props = {
  surprise: SurprisePayload;
};

// Love Card template – romantic tap-to-open card with hearts & music
export default function LoveCardTemplate({ surprise }: Props) {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (opened) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        shapes: ["heart"] as any,
        colors: ["#ff4d8d", "#ff7eb3", "#ffb3d9"]
      });
    }
  }, [opened]);

  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center">
      <HeartParticles />

      {!opened ? (
        <motion.button
          onClick={() => setOpened(true)}
          className="glass-card relative flex flex-col items-center gap-3 border border-white/10 px-6 py-8 text-center"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs uppercase tracking-[0.22em] text-soft/70">
            Tap to open
          </span>
          <h1 className="pink-glow-text text-2xl font-semibold">
            A message from {surprise.yourName}
          </h1>
          <p className="text-sm text-soft/80">
            For {surprise.partnerName}. Gently tap to open your Love Card.
          </p>
        </motion.button>
      ) : (
        <motion.div
          className="glass-card relative max-w-md border border-white/10 px-5 py-6 text-center"
          initial={{ opacity: 0, scale: 0.9, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
        >
          <div className="mb-4">
            <h2 className="pink-glow-text text-xl font-semibold">
              To {surprise.partnerName}
            </h2>
            <p className="mt-1 text-xs text-soft/60">
              from {surprise.yourName}
            </p>
          </div>

          {surprise.photo && (
            <motion.div
              className="mb-4 overflow-hidden rounded-2xl border border-white/15"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={surprise.photo}
                alt="Love memory"
                className="h-56 w-full object-cover"
              />
            </motion.div>
          )}

          <motion.p
            className="text-sm leading-relaxed text-soft/90"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {surprise.message}
          </motion.p>

          {surprise.music && (
            <motion.audio
              controls
              autoPlay
              className="mt-4 w-full rounded-full bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <source src={surprise.music} />
            </motion.audio>
          )}

          <div className="mt-6 border-t border-white/5 pt-4 text-center">
            <p className="text-[11px] text-soft/60">
              This surprise was created with MyLoveQR ❤️
            </p>
            <div className="mt-2 flex justify-center">
              <PrimaryButton href="/create" className="px-4 py-2 text-xs">
                Create your own
              </PrimaryButton>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

