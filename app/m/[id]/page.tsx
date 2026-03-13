"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutShell } from "@/components/LayoutShell";
import type { SurprisePayload } from "@/lib/surprises";
import { loadSurpriseFromLocalStorage } from "@/lib/surprises";

export default function UnlockPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [data, setData] = useState<SurprisePayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const surprise = loadSurpriseFromLocalStorage(id);
    if (!surprise) {
      setError("We couldn’t find this love page. It may have expired on this device.");
    } else {
      setData(surprise);
    }
    setLoading(false);
  }, [id]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!data) return;

    const requiredCode = data.passcode?.trim();
    if (!requiredCode) {
      router.push(`/chat/${id}`);
      return;
    }

    if (code.trim() === requiredCode) {
      router.push(`/chat/${id}`);
    } else {
      setError("Secret code is not correct. Try again, my love.");
    }
  }

  return (
    <LayoutShell>
      <section className="mx-auto flex max-w-md flex-col items-center gap-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Unlock My Love
          </h1>
          <p className="mt-2 text-sm text-soft/80">
            A secret page has been prepared just for you.
            {data?.partnerName ? ` For ${data.partnerName}.` : ""} Enter the code to open it.
          </p>
        </motion.div>

        {loading && (
          <p className="text-sm text-soft/70">Warming up your surprise...</p>
        )}

        {!loading && !data && (
          <p className="text-sm text-soft/80">
            This love page couldn&apos;t be loaded on this device.
            The creator may need to open it here at least once.
          </p>
        )}

        {data && (
          <motion.form
            onSubmit={handleSubmit}
            className="glass-card w-full space-y-4 border border-white/10 p-5 text-left"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-xs uppercase tracking-[0.22em] text-soft/70">
              Secret Code
            </p>
            <p className="mt-1 text-xs text-soft/70">
              Only the person who knows the code can unlock this page.
            </p>

            <div className="mt-4">
              <label className="mb-1 block text-xs font-medium text-soft/80">
                Enter secret code
              </label>
              <input
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  if (error) setError(null);
                }}
                className="w-full rounded-2xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-soft placeholder-soft/40 outline-none ring-0 focus:border-primary/70 focus:ring-1 focus:ring-primary/60"
                placeholder="••••"
              />
            </div>

            {error && (
              <p className="text-xs font-medium text-red-300/90">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="btn-primary mt-2 w-full rounded-2xl py-3 text-sm font-semibold"
            >
              Unlock
            </button>

            {!data.passcode && (
              <p className="mt-2 text-[11px] text-soft/60">
                This surprise has no secret code. You&apos;ll be taken straight to the chat.
              </p>
            )}
          </motion.form>
        )}
      </section>
    </LayoutShell>
  );
}

