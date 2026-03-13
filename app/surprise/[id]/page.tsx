"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutShell } from "@/components/LayoutShell";
import { HeartParticles } from "@/components/HeartParticles";
import type { SurprisePayload } from "@/lib/surprises";
import { loadSurpriseFromLocalStorage } from "@/lib/surprises";

export default function SurprisePage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<SurprisePayload | null>(null);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!id) return;
    const surprise = loadSurpriseFromLocalStorage(id);
    setData(surprise);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    if (!data?.music || !audioRef.current) return;
    audioRef.current
      .play()
      .catch(() => {
        // Autoplay may be blocked; user can tap controls.
      });
  }, [data?.music]);

  return (
    <LayoutShell>
      <div className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden">
        <HeartParticles />

        {loading && (
          <p className="text-sm text-soft/70">Opening your surprise…</p>
        )}

        {!loading && !data && (
          <p className="max-w-sm text-center text-sm text-soft/80">
            This surprise couldn&apos;t be opened on this device.
          </p>
        )}

        {data && (
          <motion.div
            className="glass-card relative w-full max-w-md border border-white/10 px-5 py-6 text-center"
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
          >
            <div className="mb-4">
              <p className="text-xs uppercase tracking-[0.22em] text-soft/60">
                For
              </p>
              <h1 className="font-display pink-glow-text text-2xl font-semibold">
                {data.partnerName}
              </h1>
              <p className="mt-1 text-xs text-soft/60">
                From {data.yourName}
              </p>
            </div>

            {data.photo && (
              <motion.div
                className="mb-4 overflow-hidden rounded-2xl border border-white/15"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.photo}
                  alt="Love memory"
                  className="max-h-64 w-full object-cover"
                />
              </motion.div>
            )}

            <motion.p
              className="text-sm leading-relaxed text-soft/90"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {data.message}
            </motion.p>

            {data.music && (
              <motion.audio
                ref={audioRef}
                controls
                autoPlay
                loop
                className="mt-4 w-full rounded-full bg-black/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <source src={data.music} />
              </motion.audio>
            )}

            <motion.p
              className="mt-6 bg-gradient-to-r from-primary via-glow to-soft bg-clip-text text-xs font-semibold uppercase tracking-[0.22em] text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Made with MyLoveQR
            </motion.p>
          </motion.div>
        )}
      </div>
    </LayoutShell>
  );
}

