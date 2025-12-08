import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FaviconUpdater } from "./metadata";
import ConditionalLayout from "@/components/conditional-layout";

const inter = Inter({ subsets: ["latin"] });

export const dynamic = "force-static";

// Icon path'leri için - özel domain veya GitHub Pages otomatik algılanacak
const getIconPath = (path: string) => {
  // Build zamanında basePath yoksa (özel domain), direkt path döndür
  // Client-side'da FaviconUpdater düzeltecek
  return path;
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "https://bagkent.com.tr"),
  title: "BağKent A.Ş. - İnşaat ve Mimari Çözümler",
  description: "BağKent A.Ş. ile modern inşaat projeleri, mimari çözümler ve kaliteli yapılar. İstanbul'da güvenilir inşaat hizmetleri.",
  keywords: "BağKent, inşaat, mimari, yapı, konut, ticari yapı, İstanbul, Bağcılar",
  icons: {
    icon: [
      { url: getIconPath("/bagkent-logo.png"), type: "image/png", sizes: "any" },
      { url: getIconPath("/bagkent-logo.png"), type: "image/png", sizes: "192x192" },
      { url: getIconPath("/bagkent-logo.png"), type: "image/png", sizes: "32x32" },
      { url: getIconPath("/bagkent-logo.png"), type: "image/png", sizes: "16x16" },
    ],
    shortcut: getIconPath("/bagkent-logo.png"),
    apple: [
      { url: getIconPath("/bagkent-logo.png"), sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "BağKent A.Ş. - İnşaat ve Mimari Çözümler",
    description: "BağKent A.Ş. ile modern inşaat projeleri, mimari çözümler ve kaliteli yapılar.",
    images: ["/og-image.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <FaviconUpdater />
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
