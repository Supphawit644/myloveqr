"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutShell } from "@/components/LayoutShell";
import { PrimaryButton } from "@/components/PrimaryButton";
import { useLanguage } from "@/components/LanguageContext";
import type { TemplateType } from "@/lib/storage";
import { generateId } from "@/lib/generateId";

type TemplateOption = {
  id: TemplateType;
  labelEn: string;
  labelTh: string;
  descriptionEn: string;
  descriptionTh: string;
};

const TEMPLATE_OPTIONS: TemplateOption[] = [
  {
    id: "love-card",
    labelEn: "Love Card (Free)",
    labelTh: "การ์ดบอกรัก (ฟรี)",
    descriptionEn: "A glowing love letter with your photo, music, and hearts.",
    descriptionTh: "การ์ดข้อความโรแมนติกพร้อมรูปและเพลงสุดประทับใจ"
  },
  {
    id: "secret-chat",
    labelEn: "Secret Love Chat",
    labelTh: "แชทลับบอกรัก",
    descriptionEn: "A fake LINE-style chat that builds to a big reveal.",
    descriptionTh: "ห้องแชทจำลองสไตล์ LINE ค่อย ๆ เล่าเรื่องจนถึงจุดเซอร์ไพรส์"
  },
  {
    id: "countdown",
    labelEn: "Countdown Surprise",
    labelTh: "เคานท์ดาวน์เซอร์ไพรส์",
    descriptionEn: "Countdown to your reveal with a glowing gallery.",
    descriptionTh: "นับถอยหลังก่อนเปิดภาพความทรงจำแสนโรแมนติก"
  }
];

export default function CreatePage() {
  const router = useRouter();
  const { lang } = useLanguage();

  const [yourName, setYourName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [message, setMessage] = useState("");
  const [template, setTemplate] = useState<TemplateType>("love-card");
  const [passcode, setPasscode] = useState("");
  const [photoDataUrl, setPhotoDataUrl] = useState<string | undefined>();
  const [musicDataUrl, setMusicDataUrl] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lightweight AI-style love message generator controls
  const [occasion, setOccasion] = useState("");
  const [tone, setTone] = useState<"sweet" | "playful" | "deep">("sweet");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const id = generateId();

      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          yourName,
          partnerName,
          message,
          template
        })
      });

      router.push(`/qr/${id}`);
    } catch (err) {
      setError(
        lang === "th"
          ? "ไม่สามารถสร้างเซอร์ไพรส์ได้ กรุณาลองใหม่อีกครั้ง"
          : "We couldn’t create your surprise. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function generateLoveMessage() {
    const targetName = partnerName || "ที่รัก";
    const fromName = yourName || "ฉัน";

    let generated = "";

    if (lang === "th") {
      const base =
        `ถึง ${targetName}\n\n` +
        `${occasion || "วันนี้"} สำหรับเราเป็นวันที่พิเศษมาก ` +
        `ไม่ใช่เพราะบรรยากาศหรือสถานที่ แต่เป็นเพราะมีคุณอยู่ในเรื่องราวของฉันเสมอ\n\n`;

      const sweet =
        `${fromName} อาจจะไม่ได้เก่งไปซะทุกอย่าง ` +
        `แต่จะพยายามเก่งในเรื่องการดูแลหัวใจของคุณให้ดีที่สุดเท่าที่ทำได้ 💗\n\n` +
        `ขอบคุณที่เข้ามาอยู่ในชีวิตของฉัน และยอมให้ฉันได้รักคุณแบบนี้ไปเรื่อย ๆ\n`;

      const playful =
        `ถ้าโลกนี้มีคำว่าน่ารักเกินไปอยู่จริง ๆ ก็คงใช้กับคุณนี่แหละ ` +
        `เพราะแค่ได้คิดถึงคุณหัวใจก็เต้นแรงเหมือนตอนสแกน QR นี้เลย 😳\n\n` +
        `สัญญาว่าจะเป็นคนจุกจิกกวนใจในทุก ๆ วัน แต่จะเป็นคนที่ไม่ไปไหนจากคุณเลย\n`;

      const deep =
        `ในทุกช่วงเวลาที่เหนื่อยหรือสับสน แค่มีชื่อของคุณลอยขึ้นมาในหัว ` +
        `ทุกอย่างก็เหมือนกลับมานุ่มละมุนอีกครั้ง\n\n` +
        `อยากใช้ทั้งวันนี้และวันข้างหน้าเติบโตไปพร้อมกับคุณ จับมือกันในวันที่ดี และกอดกันให้แน่นขึ้นในวันที่ไม่ง่าย\n`;

      generated = base + (tone === "sweet" ? sweet : tone === "playful" ? playful : deep);
      generated += `\nจาก ${fromName} คนเดิมของคุณ ❤️`;
    } else {
      const base =
        `To ${targetName},\n\n` +
        `For me, ${occasion || "today"} feels special – not because of where we are or what we do, ` +
        `but because somehow you&apos;re in every version of the future I dream about.\n\n`;

      const sweet =
        `I may not be perfect at everything, but I want to be really, really good ` +
        `at loving you gently, loudly, and consistently, in all the small everyday ways. 💗\n\n` +
        `Thank you for letting me love you like this.\n`;

      const playful =
        `If being obsessed with you is wrong, then I don&apos;t want to be right. ` +
        `My heart literally does the little happy glitch every time I think of you scanning this QR. 😳\n\n` +
        `I&apos;ll keep teasing you, annoying you, and choosing you – every single day.\n`;

      const deep =
        `On the hardest days, just thinking of you softens every sharp edge inside me. ` +
        `You are my safe place, my calm, and my favorite kind of chaos.\n\n` +
        `I want to grow through every season with you – holding your hand in the light, ` +
        `and holding you closer in the dark.\n`;

      generated = base + (tone === "sweet" ? sweet : tone === "playful" ? playful : deep);
      generated += `\n\nAlways,\n${fromName}`;
    }

    setMessage(generated);
  }

  function handleFileToDataUrl(
    file: File | null,
    setter: (value: string | undefined) => void
  ) {
    if (!file) {
      setter(undefined);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setter(typeof reader.result === "string" ? reader.result : undefined);
    };
    reader.readAsDataURL(file);
  }

  return (
    <LayoutShell>
      <section className="mx-auto flex max-w-4xl flex-col gap-8 lg:flex-row">
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {lang === "th" ? "สร้าง LoveQR ของคุณ" : "Create your LoveQR"}
          </h1>
          <p className="text-sm text-soft/80">
            {lang === "th"
              ? "กรอกรายละเอียดเล็ก ๆ น้อย ๆ เราจะช่วยคุณสร้างหน้าเซอร์ไพรส์สุดโรแมนติกพร้อม QR Code ให้ทันที"
              : "Tell us a few beautiful details and we’ll turn them into a romantic surprise page with a shareable QR code."}
          </p>

          <form
            onSubmit={handleSubmit}
            className="glass-card mt-4 space-y-4 border border-white/10 p-4 sm:p-5"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label={lang === "th" ? "ชื่อของคุณ" : "Your Name"}
                value={yourName}
                onChange={(e) => setYourName(e.target.value)}
                placeholder={lang === "th" ? "เช่น Beam" : "e.g. Alex"}
                required
              />
              <Field
                label={lang === "th" ? "ชื่อคนที่คุณรัก" : "Partner Name"}
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                placeholder={
                  lang === "th" ? "เช่น Praew (จะโชว์บนหน้าเซอร์ไพรส์)" : "Their name"
                }
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-soft/80">
                {lang === "th" ? "ข้อความบอกรัก" : "Love message"}
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-soft placeholder-soft/40 outline-none ring-0 focus:border-primary/70 focus:ring-1 focus:ring-primary/60"
                placeholder={
                  lang === "th"
                    ? "พิมพ์ข้อความบอกรักหรือความทรงจำพิเศษที่อยากส่งให้เขา..."
                    : "Write the romantic message or memory you want them to feel..."
                }
              />

              <div className="mt-3 rounded-2xl border border-dashed border-white/12 bg-black/40 p-3">
                <p className="mb-2 text-[11px] font-medium text-soft/80">
                  {lang === "th"
                    ? "ให้ AI ช่วยเขียนข้อความบอกรัก"
                    : "Let AI help you write a love message"}
                </p>
                <div className="grid gap-2 sm:grid-cols-3">
                  <input
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="rounded-2xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-soft placeholder-soft/40 outline-none ring-0 focus:border-primary/60 focus:ring-1 focus:ring-primary/40 sm:col-span-2"
                    placeholder={
                      lang === "th"
                        ? "โอกาสพิเศษ เช่น ครบรอบ 1 ปี"
                        : "Occasion, e.g. 1st anniversary"
                    }
                  />
                  <select
                    value={tone}
                    onChange={(e) =>
                      setTone(e.target.value as "sweet" | "playful" | "deep")
                    }
                    className="rounded-2xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-soft outline-none ring-0 focus:border-primary/60 focus:ring-1 focus:ring-primary/40"
                  >
                    <option value="sweet">
                      {lang === "th" ? "หวานละมุน" : "Sweet"}
                    </option>
                    <option value="playful">
                      {lang === "th" ? "ละมุนปนเขิน" : "Playful"}
                    </option>
                    <option value="deep">
                      {lang === "th" ? "ลึกซึ้งกินใจ" : "Deep"}
                    </option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={generateLoveMessage}
                  className="mt-2 text-[11px] font-semibold text-primary hover:text-glow"
                >
                  {lang === "th"
                    ? "สุ่มสร้างข้อความบอกรักด้วย AI"
                    : "Generate a romantic message"}
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-soft/80">
                  {lang === "th" ? "อัปโหลดรูปภาพ" : "Upload photo"}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileToDataUrl(e.target.files?.[0] ?? null, setPhotoDataUrl)
                  }
                  className="block w-full cursor-pointer rounded-2xl border border-dashed border-white/15 bg-black/40 px-3 py-2 text-xs text-soft/70 file:mr-3 file:rounded-full file:border-0 file:bg-gradient-to-r file:from-primary file:to-glow file:px-3 file:py-1 file:text-[11px] file:font-semibold file:text-white"
                />
                <p className="mt-1 text-[11px] text-soft/50">
                  {lang === "th"
                    ? "ตัวอย่าง: รูปคู่หรือโมเมนต์ที่คุณชอบ"
                    : "Think of a favorite photo together."}
                </p>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-soft/80">
                  {lang === "th" ? "อัปโหลดเพลง" : "Upload music"}
                </label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) =>
                    handleFileToDataUrl(e.target.files?.[0] ?? null, setMusicDataUrl)
                  }
                  className="block w-full cursor-pointer rounded-2xl border border-dashed border-white/15 bg-black/40 px-3 py-2 text-xs text-soft/70 file:mr-3 file:rounded-full file:border-0 file:bg-gradient-to-r file:from-primary file:to-glow file:px-3 file:py-1 file:text-[11px] file:font-semibold file:text-white"
                />
                <p className="mt-1 text-[11px] text-soft/50">
                  {lang === "th"
                    ? "เลือกเพลงที่ทำให้คุณนึกถึงเขา"
                    : "Optional – pick a song that feels like them."}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label={lang === "th" ? "ตั้งรหัสผ่าน (ไม่บังคับ)" : "Set passcode (optional)"}
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder={lang === "th" ? "ใช้ตัวเลขหรือตัวอักษรสั้น ๆ" : "Short word or number"}
              />

              <div>
                <label className="mb-1 block text-xs font-medium text-soft/80">
                  {lang === "th" ? "เลือกเทมเพลต" : "Select template"}
                </label>
                <div className="space-y-2">
                  {TEMPLATE_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setTemplate(opt.id)}
                      className={`flex w-full items-start justify-between rounded-2xl border px-3 py-2 text-left text-xs transition-colors ${
                        template === opt.id
                          ? "border-primary/80 bg-white/10"
                          : "border-white/10 bg-black/30 hover:border-primary/40 hover:bg-white/5"
                      }`}
                    >
                      <div>
                        <p className="font-semibold text-soft">
                          {lang === "th" ? opt.labelTh : opt.labelEn}
                        </p>
                        <p className="mt-1 text-[11px] text-soft/60">
                          {lang === "th" ? opt.descriptionTh : opt.descriptionEn}
                        </p>
                      </div>
                      {opt.id !== "love-card" && (
                        <span className="ml-2 rounded-full bg-gradient-to-r from-primary to-glow px-2 py-0.5 text-[10px] font-semibold text-white">
                          PREMIUM
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && (
              <p className="text-xs font-medium text-red-300/90">
                {error}
              </p>
            )}

            <div className="pt-2">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <PrimaryButton as="button" type="submit" disabled={loading}>
                  {loading
                    ? lang === "th"
                      ? "กำลังสร้าง LoveQR..."
                      : "Generating your LoveQR..."
                    : lang === "th"
                    ? "สร้าง QR เซอร์ไพรส์"
                    : "Generate QR Surprise"}
                </PrimaryButton>
              </motion.div>
              <p className="mt-2 text-[11px] text-soft/50">
                {lang === "th"
                  ? "เราจะสร้างลิงก์ /s/ID สำหรับส่งให้คนที่คุณรัก พร้อมหน้าดูเซอร์ไพรส์แบบโกลว์หรูหรา"
                  : "We’ll generate a /s/ID link and a glowing surprise page ready to share."}
              </p>
            </div>
          </form>
        </div>

        <motion.div
          className="hidden flex-1 lg:block"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-card relative mt-10 h-full min-h-[340px] overflow-hidden border border-white/10 p-5">
            <div className="absolute -left-20 top-10 h-40 w-40 rounded-full bg-primary/40 blur-3xl" />
            <div className="absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-glow/40 blur-3xl" />

            <div className="relative flex h-full flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-soft/60">
                  {lang === "th" ? "ตัวอย่างหน้าปลายทาง" : "Surprise preview"}
                </p>
                <p className="mt-2 text-sm text-soft/80">
                  {lang === "th"
                    ? "เมื่อเขาสแกน QR Code หน้าจอของเขาจะกลายเป็นฉากเซอร์ไพรส์สุดโรแมนติก"
                    : "When they scan your QR, their screen transforms into a cinematic surprise."}
                </p>
              </div>

              <div className="mt-6 space-y-3 text-[11px] text-soft/70">
                <p>
                  • Love Card –{" "}
                  {lang === "th"
                    ? "การ์ดข้อความเรืองแสงพร้อมหัวใจ"
                    : "Glowing love card with hearts"}
                </p>
                <p>
                  • Secret Love Chat –{" "}
                  {lang === "th"
                    ? "แชทจำลองพร้อมเอฟเฟกต์กำลังพิมพ์"
                    : "Fake chat with typing animation"}
                </p>
                <p>
                  • Countdown Surprise –{" "}
                  {lang === "th"
                    ? "เคานท์ดาวน์ก่อนเผยข้อความสำคัญ"
                    : "Countdown before the big reveal"}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </LayoutShell>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
};

function Field({ label, value, onChange, placeholder, required }: FieldProps) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-soft/80">
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-soft placeholder-soft/40 outline-none ring-0 focus:border-primary/70 focus:ring-1 focus:ring-primary/60"
      />
    </div>
  );
}

