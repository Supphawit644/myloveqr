"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { LayoutShell } from "@/components/LayoutShell";
import LoveCardTemplate from "@/templates/love-card";
import SecretChatTemplate from "@/templates/secret-chat";
import CountdownTemplate from "@/templates/countdown";
import type { StoredMessage, TemplateType } from "@/lib/storage";
import type { SurprisePayload } from "@/lib/surprises";

export default function SurprisePage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<StoredMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    if (!id) return;

    fetch(`/api/messages/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Not found");
        }
        return res.json() as Promise<StoredMessage>;
      })
      .then((json) => {
        setData(json);
      })
      .catch(() => {
        setError("We couldn’t find this QR surprise. It may have expired.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  let content: React.ReactNode = null;

  if (loading) {
    content = (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-soft/70">
        Loading your surprise...
      </div>
    );
  } else if (error || !data) {
    content = (
      <div className="flex min-h-[60vh] items-center justify-center text-center text-sm text-soft/80">
        {error ?? "This surprise is not available."}
      </div>
    );
  } else {
    const base: SurprisePayload = {
      id: data.id,
      createdAt: data.createdAt,
      yourName: data.yourName,
      partnerName: data.partnerName,
      message: data.message,
      template: data.template as TemplateType,
      passcode: undefined,
      photo: undefined,
      music: undefined
    };

    if (data.template === "love-card") {
      content = <LoveCardTemplate surprise={base} />;
    } else if (data.template === "secret-chat") {
      content = <SecretChatTemplate surprise={base} />;
    } else {
      content = <CountdownTemplate surprise={base} />;
    }
  }
  if (!unlocked && !loading && !error && data) {
    return (
      <LayoutShell>
        <div className="flex min-h-[70vh] items-center justify-center text-center">
          <div className="space-y-6">
  
            <h1 className="text-3xl md:text-4xl font-semibold">
              Someone prepared something special for you ❤️
            </h1>
  
            <button
              onClick={() => setUnlocked(true)}
              className="text-6xl animate-pulse hover:scale-110 transition"
            >
              ❤️
            </button>
  
            <p className="text-sm opacity-70">
              Tap the heart to reveal your surprise
            </p>
  
          </div>
        </div>
      </LayoutShell>
    );
  }
  return <LayoutShell>{content}</LayoutShell>;
}

