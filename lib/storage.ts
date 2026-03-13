export type TemplateType = "love-card" | "secret-chat" | "countdown";

export type StoredMessage = {
  id: string;
  yourName: string;
  partnerName: string;
  message: string;
  template: TemplateType;
  createdAt: string;
};

const store: Record<string, StoredMessage> = {};

export function saveMessage(payload: Omit<StoredMessage, "createdAt">): StoredMessage {
  const createdAt = new Date().toISOString();
  const entry: StoredMessage = { ...payload, createdAt };
  store[payload.id] = entry;
  return entry;
}

export function getMessage(id: string): StoredMessage | null {
  return store[id] ?? null;
}

