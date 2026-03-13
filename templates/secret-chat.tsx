"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { SurprisePayload } from "@/lib/surprises";
import { TypingDots } from "@/components/TypingDots";
import { PrimaryButton } from "@/components/PrimaryButton";
import { HeartParticles } from "@/components/HeartParticles";

type Props = {
  surprise: SurprisePayload;
};

const buildScript = (partnerName: string) => [
  { from: "them", text: "เธอว่างไหม" },
  { from: "you", text: "เรามีอะไรอยากให้ดู" },
  { from: "you", text: "จริงๆ เตรียมไว้นานแล้ว" },
  { from: "you", text: "พร้อมแล้วกดที่กล่องของขวัญด้านล่างเลยนะ" }
];

// Secret Love Chat – fake LINE-like chat with typing animation
export default function SecretChatTemplate({ surprise }: Props) {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [showGift, setShowGift] = useState(false);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    if (!started || reveal) return;
    const script = buildScript(surprise.partnerName);
    if (step >= script.length) {
      const timeout = setTimeout(() => setShowGift(true), 1200);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => setStep((s) => s + 1), 1300);
    return () => clearTimeout(timeout);
  }, [started, step, reveal, surprise.partnerName]);

  const messages = buildScript(surprise.partnerName).slice(0, step);

  return (
    <div className="relative flex min-h-[75vh] flex-col items-center justify-center overflow-hidden">
      <HeartParticles />

      {!started ? (
        <motion.button
          onClick={() => setStarted(true)}
          className="glass-card relative flex flex-col items-center gap-3 border border-white/10 px-6 py-8 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-xs uppercase tracking-[0.22em] text-soft/70">
            Fake notification
          </span>
          <p className="text-sm text-soft/80">
            {surprise.partnerName} มีข้อความลับจาก {surprise.yourName}
          </p>
          <span className="mt-2 rounded-full bg-white/10 px-3 py-1 text-xs text-soft/70">
            แตะเพื่อเปิดแชท
          </span>
        </motion.button>
      ) : (
        <motion.div
          className="glass-card relative w-full max-w-md border border-white/10 p-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <header className="mb-3 flex items-center justify-between text-xs text-soft/80">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-glow text-sm">
                💬
              </div>
              <div>
                <p className="font-semibold">{surprise.yourName}</p>
                <p className="text-[10px] text-soft/60">Secret Love Chat</p>
              </div>
            </div>
            <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] text-soft/60">
              LINE style
            </span>
          </header>

          <div className="space-y-2 rounded-2xl bg-black/40 p-3 text-xs">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                  msg.from === "you"
                    ? "ml-auto bg-[#25D366] text-white" // LINE green bubble
                    : "bg-white/10 text-soft/90"
                }`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {msg.text}
              </motion.div>
            ))}

            {!showGift && started && !reveal && (
              <div className="mt-2">
                <TypingDots />
              </div>
            )}

            {showGift && !reveal && (
              <motion.button
                type="button"
                onClick={() => setReveal(true)}
                className="mx-auto mt-4 flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-glow px-4 py-2 text-xs font-semibold text-white shadow-glow"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                🎁 เปิดของขวัญของเธอ
              </motion.button>
            )}
          </div>

          {reveal && (
            <motion.div
              className="mt-4 rounded-2xl bg-black/50 p-4 text-center text-sm text-soft/90"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="mb-2 text-xs uppercase tracking-[0.22em] text-soft/60">
                จาก {surprise.yourName}
              </p>
              <p className="mb-3 text-soft/90">{surprise.message}</p>

              {surprise.photo && (
                <motion.div
                  className="mb-3 overflow-hidden rounded-2xl border border-white/15"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={surprise.photo}
                    alt="Love memory"
                    className="max-h-56 w-full object-cover"
                  />
                </motion.div>
              )}

              {surprise.music && (
                <audio
                  controls
                  autoPlay
                  className="mt-2 w-full rounded-full bg-black/40"
                >
                  <source src={surprise.music} />
                </audio>
              )}

              <div className="mt-4 border-t border-white/10 pt-3 text-[11px] text-soft/70">
                <p>This surprise was created with MyLoveQR ❤️</p>
                <div className="mt-2 flex justify-center">
                  <PrimaryButton href="/create" className="px-4 py-2 text-xs">
                    Create your own
                  </PrimaryButton>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}

