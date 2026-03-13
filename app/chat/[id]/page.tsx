"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutShell } from "@/components/LayoutShell";
import { TypingDots } from "@/components/TypingDots";
import { HeartParticles } from "@/components/HeartParticles";
import type { SurprisePayload } from "@/lib/surprises";
import { loadSurpriseFromLocalStorage } from "@/lib/surprises";

type ScriptMessage = {
  from: "you" | "them";
  text: string;
};

function buildScript(surprise: SurprisePayload): ScriptMessage[] {
  const base: ScriptMessage[] = [
    { from: "you", text: "Hello baby ❤️" },
    { from: "you", text: "วันนี้เป็นวันพิเศษของเรา" },
    { from: "you", text: "ถึงฉันจะอยู่ไกล" },
    { from: "you", text: "แต่ฉันมีเซอร์ไพรส์ให้คุณ" }
  ];

  const personalized: ScriptMessage[] = [
    {
      from: "them",
      text: `คุณพร้อมแล้วหรือยัง, ${surprise.partnerName || "ที่รัก"}`
    },
    {
      from: "you",
      text:
        surprise.message.length > 80
          ? `${surprise.message.slice(0, 80).trim()}...`
          : surprise.message
    },
    {
      from: "you",
      text: "ลองกดที่กล่องของขวัญด้านล่างดูนะ 🎁"
    }
  ];

  return [...base, ...personalized];
}

export default function ChatPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [data, setData] = useState<SurprisePayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [showGift, setShowGift] = useState(false);

  useEffect(() => {
    if (!id) return;
    const surprise = loadSurpriseFromLocalStorage(id);
    if (!surprise) {
      setLoading(false);
      return;
    }
    setData(surprise);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    if (!data) return;
    const script = buildScript(data);
    if (step >= script.length) {
      const timeout = setTimeout(() => setShowGift(true), 1800);
      return () => clearTimeout(timeout);
    }
    const timeout = setTimeout(() => setStep((s) => s + 1), 2000);
    return () => clearTimeout(timeout);
  }, [data, step]);

  if (loading) {
    return (
      <LayoutShell>
        <div className="flex min-h-[60vh] items-center justify-center text-sm text-soft/70">
          Loading chat…
        </div>
      </LayoutShell>
    );
  }

  if (!data) {
    return (
      <LayoutShell>
        <div className="flex min-h-[60vh] items-center justify-center text-center text-sm text-soft/80">
          We couldn&apos;t open this chat on this device.
        </div>
      </LayoutShell>
    );
  }

  const script = buildScript(data);
  const messages = script.slice(0, step);

  return (
    <LayoutShell>
      <div className="relative flex min-h-[75vh] flex-col items-center justify-center overflow-hidden">
        <HeartParticles />

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
                <p className="font-semibold">
                  {data.partnerName || "My Love"}
                </p>
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
                key={`${idx}-${msg.text}`}
                className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                  msg.from === "you"
                    ? "ml-auto bg-[#25D366] text-white"
                    : "bg-white/10 text-soft/90"
                }`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {msg.text}
              </motion.div>
            ))}

            {!showGift && step < script.length && (
              <div className="mt-2">
                <TypingDots />
              </div>
            )}

            {showGift && (
              <motion.button
                type="button"
                onClick={() => router.push(`/surprise/${id}`)}
                className="mx-auto mt-6 flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-glow px-5 py-2 text-xs font-semibold text-white shadow-glow"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: [1, 1.06, 1] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                🎁 Open your gift
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </LayoutShell>
  );
}

