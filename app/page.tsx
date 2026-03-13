"use client";

import { motion } from "framer-motion";
import { LayoutShell } from "@/components/LayoutShell";
import { PrimaryButton } from "@/components/PrimaryButton";
import { TemplateBadge } from "@/components/TemplateBadge";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";

export default function LandingPage() {
  const { t, lang } = useLanguage();
  const heroSubtitleLines = t("heroSubtitle").split("\n");

  return (
    <LayoutShell>
      <section className="mx-auto flex max-w-5xl flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-16">
        {/* Hero copy */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="mb-3 inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-soft/70">
              NEW • Luxury romantic QR surprises
            </p>

            <h1 className="pink-glow-text font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              {lang === "th" ? (
                <span>{t("heroTitle")}</span>
              ) : (
                <>
                  <span>Create a Romantic</span>
                  <span className="block bg-gradient-to-r from-primary via-glow to-soft bg-clip-text text-transparent">
                    QR Surprise ❤️
                  </span>
                </>
              )}
            </h1>

            <p className="mt-4 max-w-xl whitespace-pre-line text-sm text-soft/80 sm:text-base">
              {heroSubtitleLines.join("\n")}
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-3 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <PrimaryButton href="/create">
              {t("heroButton")}
            </PrimaryButton>
            <Link
              href="#templates"
              className="text-xs font-medium text-soft/70 hover:text-soft"
            >
              View romantic templates
            </Link>
          </motion.div>

          <motion.div
            className="mt-5 flex flex-wrap items-center gap-4 text-[11px] text-soft/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {lang === "en" ? (
              <>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-glow" />
                  No coding. Just love.
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-glow shadow-glow" />
                  Works with any QR scanner.
                </span>
              </>
            ) : (
              <>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-glow" />
                  สร้างได้ในไม่กี่วินาที
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-glow shadow-glow" />
                  ใช้ได้กับทุกแอปสแกน QR
                </span>
              </>
            )}
          </motion.div>
        </div>

        {/* Hero visual / mock phone */}
        <motion.div
          className="relative flex-1 max-w-xs sm:max-w-sm lg:max-w-md"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute -left-12 -top-10 h-40 w-40 rounded-full bg-primary/40 blur-3xl" />
          <div className="absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-glow/40 blur-3xl" />

          <div className="relative mx-auto w-full max-w-[320px] rounded-[32px] bg-gradient-to-br from-white/10 to-white/5 p-[1px] shadow-[0_0_80px_rgba(0,0,0,0.9)]">
            <div className="glass-card relative rounded-[31px] bg-gradient-to-b from-white/10 to-card/90 p-4">
              <div className="mb-3 flex items-center justify-between text-[11px] text-soft/60">
                <span>LoveQR • Tonight</span>
                <span>9:41 PM</span>
              </div>

              <div className="mb-4 rounded-2xl bg-black/40 p-3">
              <p className="text-xs text-soft/80">{t("scanUnlock")}</p>
              <p className="mt-1 text-sm font-medium text-soft">
              {t("previewMessage")}
              </p>
              </div>

              <div className="mb-3 rounded-2xl bg-black/70 p-3 text-center">
                <div className="mx-auto mb-2 h-28 w-28 rounded-2xl bg-gradient-to-br from-primary via-glow to-soft shadow-glow" />
                <p className="text-xs text-soft/80">
                {t("previewGlow")}
                </p>
              </div>

              <div className="space-y-2 text-[11px] text-soft/70">
              <p>
               • {t("loveCard")} • {t("secretChat")} • {t("countdownSurprise")}
              </p>
              <p className="text-soft/60">
              {t("madeForLove")}
              </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="mx-auto mt-16 max-w-5xl space-y-6"
      >
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {t("howItWorksTitle")}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-soft/80">
              {t("howItWorksSubtitle")}
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {[
            {
              step: "1",
              title: t("howStep1Title"),
              body: t("howStep1Body")
            },
            {
              step: "2",
              title: t("howStep2Title"),
              body: t("howStep2Body")
            },
            {
              step: "3",
              title: t("howStep3Title"),
              body: t("howStep3Body")
            }
          ].map((item, index) => (
            <motion.div
              key={item.step}
              className="glass-card relative flex flex-col gap-2 border border-white/10 p-4 shadow-black/50"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="absolute -top-3 left-4 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-primary to-glow text-xs font-semibold shadow-glow">
                {item.step}
              </div>
              <h3 className="mt-2 text-sm font-semibold text-soft">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-soft/90">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Templates preview */}
      <section id="templates" className="mx-auto mt-16 max-w-5xl space-y-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {t("templatesTitle")}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-soft/80">
              {t("templatesSubtitle")}
            </p>
          </div>
          <PrimaryButton href="/create" className="mt-2">
            {lang === "th" ? "เริ่มสร้างเซอร์ไพรส์ของฉัน" : "Start with my story"}
          </PrimaryButton>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {/* Love Card */}
          <TemplateCard
            title="Love Card"
            description="A glowing love letter with your photo, music, and soft heart particles."
            badge={<TemplateBadge label="Love Card (Free)" variant="free" />}
            accent="from-primary/80 to-glow/70"
            href="/create?template=love-card"
          />

          {/* Secret Love Chat */}
          <TemplateCard
            title="Secret Love Chat"
            description="A LINE-inspired fake chat that builds anticipation before revealing your message."
            badge={
              <TemplateBadge label="Secret Love Chat (Premium)" variant="premium" />
            }
            accent="from-glow/80 to-soft/80"
            href="/create?template=love-card"
          />

          {/* Countdown Surprise */}
          <TemplateCard
            title="Countdown Surprise"
            description="Watch a countdown to your reveal, then show a gallery of glowing memories."
            badge={
              <TemplateBadge
                label="Countdown Surprise (Premium)"
                variant="premium"
              />
            }
            accent="from-primary/70 via-glow/80 to-soft/80"
            href="/create?template=love-card"
          />
        </div>
      </section>

      {/* Pricing / plans */}
      <section className="mx-auto mt-16 max-w-5xl space-y-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Pricing made for love
            </h2>
            <p className="mt-2 max-w-xl text-sm text-soft/80">
              Start free with a tiny watermark, or upgrade for more messages,
              music, photos, and full glowing animations.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div className="glass-card flex flex-col justify-between border border-white/10 p-4 text-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-soft/60">
                Free
              </p>
              <p className="mt-1 text-xl font-semibold text-soft">0 THB</p>
              <p className="mt-2 text-xs text-soft/70">
                Perfect for a first surprise or simple love note.
              </p>
              <ul className="mt-4 space-y-1 text-[11px] text-soft/70">
                <li>• Watermark</li>
                <li>• Up to 3 chat messages</li>
                <li>• Basic glowing layout</li>
              </ul>
            </div>
            <p className="mt-4 text-[11px] text-soft/50">
              Great for testing MyLoveQR or sending a quick &ldquo;I miss you&rdquo;.
            </p>
          </div>

          <div className="glass-card relative flex flex-col justify-between border border-primary/60 p-4 text-sm shadow-glow">
            <div className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-primary to-glow px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
              Popular
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-soft/60">
                Premium
              </p>
              <p className="mt-1 text-xl font-semibold text-soft">39 THB</p>
              <p className="mt-2 text-xs text-soft/70">
                For deeper stories, longer chats, and more emotion.
              </p>
              <ul className="mt-4 space-y-1 text-[11px] text-soft/70">
                <li>• No watermark</li>
                <li>• Up to 10 chat messages</li>
                <li>• Secret unlock page + fake chat</li>
              </ul>
            </div>
            <p className="mt-4 text-[11px] text-soft/50">
              Ideal for anniversaries, birthdays, or long-distance surprises.
            </p>
          </div>

          <div className="glass-card flex flex-col justify-between border border-white/10 p-4 text-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-soft/60">
                Premium Plus
              </p>
              <p className="mt-1 text-xl font-semibold text-soft">59 THB</p>
              <p className="mt-2 text-xs text-soft/70">
                The full cinematic experience with every effect.
              </p>
              <ul className="mt-4 space-y-1 text-[11px] text-soft/70">
                <li>• Add music &amp; photo</li>
                <li>• Unlimited messages</li>
                <li>• Floating heart animation</li>
                <li>• Full luxury glow styling</li>
              </ul>
            </div>
            <p className="mt-4 text-[11px] text-soft/50">
              Designed for proposals, milestones, and once-in-a-lifetime moments.
            </p>
          </div>
        </div>
      </section>
    </LayoutShell>
  );
}

function TemplateCard({
  title,
  description,
  badge,
  accent,
  href
}: {
  title: string;
  description: string;
  badge: React.ReactNode;
  accent: string;
  href: string;
}) {
  return (
    <Link href={href}>
    <motion.div
      className="glass-card group flex flex-col justify-between border border-white/10 p-4 shadow-black/50"
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
    >
      <div className="mb-3 space-y-3">
        <div className="inline-flex items-center gap-2">{badge}</div>
        <h3 className="text-base font-semibold text-soft">{title}</h3>
        <p className="text-xs text-soft/70">{description}</p>
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] text-soft/60">
        <span>Tap to preview after creation</span>
        <span className="rounded-full bg-gradient-to-r from-primary/10 to-glow/10 px-2 py-1 text-[10px] text-soft/80">
          Includes music & animation
        </span>
      </div>
      <div
        className={`mt-4 h-1.5 w-full rounded-full bg-gradient-to-r ${accent} opacity-70 group-hover:opacity-100`}
      />
    </motion.div>
    </Link>
  );
}


