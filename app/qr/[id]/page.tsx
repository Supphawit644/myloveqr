"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutShell } from "@/components/LayoutShell";
import { PrimaryButton } from "@/components/PrimaryButton";
import { QRGenerator } from "@/components/QRGenerator";

export default function QrResultPage() {
  const { id } = useParams<{ id: string }>();
  const [link, setLink] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined" || !id) return;
    const url = `${window.location.origin}/q/${id}`;
    setLink(url);
  }, [id]);

  function handleCopy() {
    if (!link) return;
    navigator.clipboard?.writeText(link).catch(() => {});
  }

  return (
    <LayoutShell>
      <section className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Your LoveQR is ready ❤️
          </h1>
          <p className="mt-2 text-sm text-soft/80">
            Share this QR with your special person. When they scan, they&apos;ll
            be taken to your glowing surprise page.
          </p>
        </motion.div>

        <motion.div
          className="glass-card flex flex-col items-center gap-4 border border-white/10 p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          {link && <QRGenerator url={link} />}
          <p className="max-w-sm text-xs text-soft/70">
            Tip: Print this QR, set it as your wallpaper, or hide it somewhere
            romantic for them to find.
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
          <PrimaryButton as="button" type="button" onClick={handleCopy}>
            Copy link
          </PrimaryButton>
        </div>

        {link && (
          <p className="mt-3 break-all text-[11px] text-soft/60">{link}</p>
        )}
      </section>
    </LayoutShell>
  );
}

