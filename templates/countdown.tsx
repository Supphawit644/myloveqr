"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { SurprisePayload } from "@/lib/surprises";
import { PrimaryButton } from "@/components/PrimaryButton";
import { HeartParticles } from "@/components/HeartParticles";

type Props = {
  surprise: SurprisePayload;
};

// Countdown Surprise – timer then reveal with gallery & music
export default function CountdownTemplate({ surprise }: Props) {
  const [seconds, setSeconds] = useState(5);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!running || finished) return;
    if (seconds <= 0) {
      setFinished(true);
      return;
    }
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [running, seconds, finished]);

  return (
    <div className="relative flex min-h-[75vh] flex-col items-center justify-center overflow-hidden">
      <HeartParticles />

      {!running && !finished && (
        <motion.button
          type="button"
          onClick={() => setRunning(true)}
          className="glass-card relative flex flex-col items-center gap-3 border border-white/10 px-6 py-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-xs uppercase tracking-[0.22em] text-soft/70">
            Your surprise will unlock soon
          </span>
          <p className="text-sm text-soft/80">
            When you&apos;re ready, tap to begin the countdown to your surprise.
          </p>
          <span className="mt-2 rounded-full bg-white/10 px-3 py-1 text-xs text-soft/70">
            Start countdown
          </span>
        </motion.button>
      )}

      {running && !finished && (
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-xs uppercase tracking-[0.22em] text-soft/70">
            Revealing in
          </p>
          <motion.div
            key={seconds}
            className="mt-4 flex h-32 w-32 items-center justify-center rounded-full border border-glow/60 bg-black/40 text-5xl font-semibold text-soft shadow-glow"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            {seconds}
          </motion.div>
        </motion.div>
      )}

      {finished && (
        <motion.div
          className="glass-card relative mt-4 w-full max-w-md border border-white/10 px-5 py-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="pink-glow-text text-xl font-semibold">
            For {surprise.partnerName}
          </h2>
          <p className="mt-1 text-xs text-soft/60">
            From {surprise.yourName}
          </p>

          <motion.p
            className="mt-4 text-sm leading-relaxed text-soft/90"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {surprise.message}
          </motion.p>

          {surprise.photo && (
            <motion.div
              className="mt-4 grid grid-cols-2 gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={surprise.photo}
                alt="Gallery photo"
                className="col-span-2 h-40 w-full rounded-2xl object-cover"
              />
              {/* simple mirrored gallery */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={surprise.photo}
                alt="Gallery photo"
                className="h-20 w-full rounded-2xl object-cover opacity-70"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={surprise.photo}
                alt="Gallery photo"
                className="h-20 w-full rounded-2xl object-cover opacity-50"
              />
            </motion.div>
          )}

          {surprise.music && (
            <audio
              controls
              autoPlay
              className="mt-4 w-full rounded-full bg-black/40"
            >
              <source src={surprise.music} />
            </audio>
          )}

          <motion.p
            className="mt-5 bg-gradient-to-r from-primary via-glow to-soft bg-clip-text text-sm font-semibold text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            This surprise was created with MyLoveQR ❤️
          </motion.p>
          <div className="mt-2 flex justify-center">
            <PrimaryButton href="/create" className="px-4 py-2 text-xs">
              Create your own
            </PrimaryButton>
          </div>
        </motion.div>
      )}
    </div>
  );
}

