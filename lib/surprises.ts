export type TemplateType = "love-card" | "secret-chat" | "countdown";

export type SurprisePayload = {
  id: string;
  createdAt: string;
  yourName: string;
  partnerName: string;
  message: string;
  template: TemplateType;
  passcode?: string;
  // Stored as data URLs for this prototype
  photo?: string;
  music?: string;
};

const STORAGE_PREFIX = "myloveqr_surprise_";

export function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

export function saveSurpriseToLocalStorage(payload: SurprisePayload) {
  if (typeof window === "undefined") return;
  const key = STORAGE_PREFIX + payload.id;
  window.localStorage.setItem(key, JSON.stringify(payload));
}

export function loadSurpriseFromLocalStorage(id: string): SurprisePayload | null {
  if (typeof window === "undefined") return null;
  const key = STORAGE_PREFIX + id;
  const raw = window.localStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SurprisePayload;
  } catch {
    return null;
  }
}

