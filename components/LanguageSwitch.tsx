"use client";

import { useLanguage } from "./LanguageContext";

// Simple TH | EN switch that stores preference via LanguageProvider
export function LanguageSwitch() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="inline-flex items-center rounded-full bg-white/5 p-1 text-[11px] font-semibold text-soft/70 shadow-sm shadow-black/40">
      <button
        type="button"
        onClick={() => setLang("th")}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          lang === "th"
            ? "bg-gradient-to-r from-primary/80 to-glow/80 text-white shadow-glow"
            : "hover:text-soft"
        }`}
      >
        TH
      </button>
      <span className="px-1 text-soft/40">|</span>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          lang === "en"
            ? "bg-gradient-to-r from-primary/80 to-glow/80 text-white shadow-glow"
            : "hover:text-soft"
        }`}
      >
        EN
      </button>
    </div>
  );
}

