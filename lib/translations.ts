export const translations = {
    en: {
      heroTitle: "Create a Romantic QR Surprise ❤️",
      heroSubtitle: "Scan the QR\nUnlock the message\nFeel the love",
      heroButton: "Create LoveQR",
  
      howItWorksTitle: "How it works",
      howItWorksSubtitle:
        "In three gentle steps, your QR turns into a magical moment.",

        howStep1Title: "Create your surprise",
        howStep1Body:
          "Tell us your names, your love message, and pick the template that fits your moment.",
    
        howStep2Title: "Generate QR code",
        howStep2Body:
          "We turn your surprise into a glowing QR you can print or send.",
    
        howStep3Title: "Let your partner scan",
        howStep3Body:
          "They scan and the surprise reveals like a love movie scene.",
    
        templatesTitle: "Romantic templates",
        templatesSubtitle:
          "Choose the way your love story appears on screen.",  
  
      scanUnlock: "Scan to unlock",
      previewMessage: "A message from you to your person.",
      previewGlow: "Preview of your glowing LoveQR.",
  
      loveCard: "Love Card",
      secretChat: "Secret Love Chat",
      countdownSurprise: "Countdown Surprise",
  
      madeForLove:
        "Made for anniversaries, proposals, and everyday I-love-yous.",

        countdownTitle: "Countdown surprise",
        countdownDesc: "When you're ready, tap to begin the countdown.",
        startCountdown: "Start countdown",
        revealingIn: "Revealing in",
        createdWith: "This surprise was created with MyLoveQR ❤️",
        createYourOwn: "Create your own",

        navHow: "How it works",
        navCreate: "Create",
    },
  
    th: {
      heroTitle: "สร้างเซอร์ไพรส์ให้คนที่คุณรัก ❤️",
      heroSubtitle: "สแกน QR\nปลดล็อกข้อความ\nสัมผัสความรัก",
      heroButton: "สร้าง LoveQR",
  
      howItWorksTitle: "วิธีใช้งาน",
      howItWorksSubtitle:
        "เพียง 3 ขั้นตอนง่าย ๆ เพื่อเปลี่ยน QR Code ให้กลายเป็นโมเมนต์พิเศษ",

        howStep1Title: "สร้างเซอร์ไพรส์",
        howStep1Body:
          "กรอกชื่อของคุณและคนที่คุณรัก พร้อมข้อความพิเศษ",
    
        howStep2Title: "สร้าง QR Code",
        howStep2Body:
          "ระบบจะสร้าง QR Code ที่คุณสามารถส่งให้หรือพิมพ์ได้",
    
        howStep3Title: "ให้คนที่คุณรักสแกน",
        howStep3Body:
          "เมื่อเขาสแกน เซอร์ไพรส์ของคุณจะปรากฏขึ้น",
    
        templatesTitle: "เทมเพลตสุดโรแมนติก",
        templatesSubtitle:
          "เลือกสไตล์การเล่าเรื่องความรักของคุณ",
  
      scanUnlock: "สแกนเพื่อปลดล็อก",
      previewMessage: "ข้อความจากคุณถึงคนพิเศษ",
      previewGlow: "ตัวอย่าง LoveQR ของคุณ",
  
      loveCard: "การ์ดรัก",
      secretChat: "แชทรักลับ",
      countdownSurprise: "เซอร์ไพรส์นับถอยหลัง",
  
      madeForLove:
        "สร้างมาเพื่อวันครบรอบ การขอแต่งงาน และโมเมนต์รักในทุกวัน",

        countdownTitle: "เซอร์ไพรส์กำลังจะเริ่ม",
        countdownDesc: "เมื่อคุณพร้อม กดเพื่อเริ่มนับถอยหลัง",
        startCountdown: "เริ่มนับถอยหลัง",
        revealingIn: "กำลังเปิดใน",
        createdWith: "เซอร์ไพรส์นี้สร้างด้วย MyLoveQR ❤️",
        createYourOwn: "สร้างของคุณเอง",

        navHow: "วิธีใช้งาน",
        navCreate: "สร้าง",
    }
  };
  
  export type Lang = "en" | "th";
  
  export type TranslationKey = keyof typeof translations.en;