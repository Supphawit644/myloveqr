import "./globals.css";
import { LanguageProvider } from "@/components/LanguageContext";
import { Inter, Prompt } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
  variable: "--font-inter"
});

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["300","400","500","600","700"],
  variable: "--font-prompt"
});

export const metadata = {
  title: "MyLoveQR",
  description: "Romantic QR surprise creator"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${prompt.variable}`}>
      <body className="bg-background text-white font-sans">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
