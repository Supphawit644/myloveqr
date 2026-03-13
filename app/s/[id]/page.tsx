"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { LayoutShell } from "@/components/LayoutShell";
import LoveCardTemplate from "@/templates/love-card";
import SecretChatTemplate from "@/templates/secret-chat";
import CountdownTemplate from "@/templates/countdown";
import type { SurprisePayload } from "@/lib/surprises";
import { loadSurpriseFromLocalStorage } from "@/lib/surprises";

export default function SurpriseViewerPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<SurprisePayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const surprise = loadSurpriseFromLocalStorage(id);
    if (!surprise) {
      setError("We couldn’t find this surprise. It may have expired.");
    } else {
      setData(surprise);
    }
    setLoading(false);
  }, [id]);

  return (
    <LayoutShell>
      {loading && (
        <div className="flex min-h-[60vh] items-center justify-center text-sm text-soft/70">
          Loading your surprise...
        </div>
      )}

      {!loading && error && (
        <div className="flex min-h-[60vh] items-center justify-center text-center text-sm text-soft/80">
          {error}
        </div>
      )}

      {!loading && !error && data && (
        <>
          {data.template === "love-card" && <LoveCardTemplate surprise={data} />}
          {data.template === "secret-chat" && (
            <SecretChatTemplate surprise={data} />
          )}
          {data.template === "countdown" && (
            <CountdownTemplate surprise={data} />
          )}
        </>
      )}
    </LayoutShell>
  );
}

