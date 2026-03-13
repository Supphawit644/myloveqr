const ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";

export function generateId(length: number = 6): string {
  let id = "";
  for (let i = 0; i < length; i += 1) {
    const index = Math.floor(Math.random() * ALPHABET.length);
    id += ALPHABET[index];
  }

  const prefixes = ["love", "qr", "my"];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];

  return Math.random() > 0.5 ? `${prefix}${id}`.slice(0, length + 2) : id;
}

