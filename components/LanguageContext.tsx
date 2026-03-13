"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode
} from "react";

type Lang = "th" | "en";

type TranslationKey =
  | "heroTitle"
  | "heroSubtitle"
  | "heroButton"
  | "howItWorksTitle"
  | "howItWorksSubtitle"
  | "howStep1Title"
  | "howStep2Title"
  | "howStep3Title"
  | "howStep1Body"
  | "howStep2Body"
  | "howStep3Body"
  | "templatesTitle"
  | "templatesSubtitle"
  | "navHow"
  | "navCreate";

type Dictionary = Record<Lang, Record<TranslationKey, string>>;

const dictionary: Dictionary = {
  th: {
    heroTitle: "สร้างเซอร์ไพรส์ให้คนที่คุณรัก ❤️",
    heroSubtitle: "สแกน QR\nปลดล็อกข้อความ\nสัมผัสความรัก",
    heroButton: "สร้าง LoveQR",
    howItWorksTitle: "วิธีใช้งาน",
    howItWorksSubtitle:
      "เพียง 3 ขั้นตอนง่าย ๆ เพื่อเปลี่ยน QR Code ให้กลายเป็นโมเมนต์สุดพิเศษสำหรับคนที่คุณรัก",
    howStep1Title: "สร้างเซอร์ไพรส์",
    howStep2Title: "สร้าง QR Code",
    howStep3Title: "ให้คนที่คุณรักสแกน",
    howStep1Body:
      "กรอกชื่อของคุณและคนที่คุณรัก พร้อมข้อความพิเศษ และเลือกเทมเพลตสุดโรแมนติก",
    howStep2Body:
      "เราจะสร้าง QR Code สุดหรู ที่คุณสามารถส่งให้ หรือพิมพ์เก็บไว้เซอร์ไพรส์ได้ทันที",
    howStep3Body:
      "เมื่อเขาสแกน หน้าจอจะเปล่งประกาย พร้อมเซอร์ไพรส์ที่คุณเตรียมไว้ให้แบบสุดพิเศษ",
    templatesTitle: "เทมเพลตสุดโรแมนติก",
    templatesSubtitle:
      "เลือกสไตล์การเล่าเรื่องความรักของคุณให้เหมือนฉากในภาพยนตร์โรแมนติกสุดหรู",
    navHow: "วิธีใช้งาน",
    navCreate: "สร้าง"
  },
  en: {
    heroTitle: "Create a Romantic QR Surprise ❤️",
    heroSubtitle: "Scan the QR\nUnlock the message\nFeel the love",
    heroButton: "Create LoveQR",
    howItWorksTitle: "How it works",
    howItWorksSubtitle:
      "In three gentle steps, your QR turns into a moment that feels handcrafted, cinematic, and deeply personal.",
    howStep1Title: "Create your surprise",
    howStep2Title: "Generate QR code",
    howStep3Title: "Let your partner scan",
    howStep1Body:
      "Tell us your names, your love message, and pick the template that fits your moment.",
    howStep2Body:
      "We turn your surprise into a glowing QR you can print, send, or hide somewhere special.",
    howStep3Body:
      "They scan. The screen lights up. The reveal unfolds like a scene in a love movie.",
    templatesTitle: "Romantic templates",
    templatesSubtitle:
      "Choose the way your love story appears on screen. Each template is designed to feel luxurious and cinematic.",
    navHow: "How it works",
    navCreate: "Create"
  }
};

type LanguageContextValue = {
  lang: Lang;
  t: (key: TranslationKey) => string;
  setLang: (lang: Lang) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "myloveqr_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Load saved language on first mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "th" || stored === "en") {
      setLangState(stored);
      return;
    }
    // Basic browser language detection fallback
    const browserLang = window.navigator.language.toLowerCase();
    if (browserLang.startsWith("th")) {
      setLangState("th");
    }
  }, []);

  const setLang = useCallback((value: Lang) => {
    setLangState(value);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, value);
    }
  }, []);

  const t = useCallback(
    (key: TranslationKey) => {
      return dictionary[lang][key] ?? dictionary.en[key];
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, t, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

