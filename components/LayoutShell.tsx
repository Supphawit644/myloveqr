import { ReactNode } from "react";
import { HeartParticles } from "./HeartParticles";
import Link from "next/link";
import { LanguageSwitch } from "./LanguageSwitch";
import { useLanguage } from "./LanguageContext";

// High-level layout wrapper used across pages
export function LayoutShell({ children }: { children: ReactNode }) {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-white">
      <HeartParticles /> 

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,46,136,0.22),_transparent_60%)]" />

      <header className="relative z-20 flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-glow shadow-glow">
            <span className="text-lg">❤️</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wide text-soft">
              MyLoveQR
            </span>
            <span className="text-[11px] text-soft/60">
              Luxury QR love surprises
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-2 text-xs sm:text-sm">
          <LanguageSwitch />
          <Link
            href="/#how-it-works"
            className="rounded-full px-3 py-1 text-soft/70 hover:text-soft hover:bg-white/5 transition-colors"
          >
            {t("navHow")}
          </Link>
          <Link
            href="/create"
            className="rounded-full bg-white/5 px-3 py-1 text-soft/90 hover:bg-white/10 transition-colors"
          >
            {t("navCreate")}
          </Link>
        </nav>
      </header>

      <main className="relative z-10 px-4 pb-16 pt-4 sm:px-6 sm:pt-6">
        {children}
      </main>
    </div>
  );
}

