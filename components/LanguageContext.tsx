"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from "react";

import {
  translations,
  Lang,
  TranslationKey
} from "@/lib/translations";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "myloveqr_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored === "th" || stored === "en") {
      setLang(stored);
      return;
    }

    if (navigator.language.toLowerCase().startsWith("th")) {
      setLang("th");
    }
  }, []);

  const changeLang = (value: Lang) => {
    setLang(value);
    localStorage.setItem(STORAGE_KEY, value);
  };

  const t = (key: TranslationKey) => {
    return translations[lang][key] ?? translations.en[key];
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}