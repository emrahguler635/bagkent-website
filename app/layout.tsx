import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const dynamic = "force-static";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  title: "BağKent A.Ş. - İnşaat ve Mimari Çözümler",
  description: "BağKent A.Ş. ile modern inşaat projeleri, mimari çözümler ve kaliteli yapılar. İstanbul'da güvenilir inşaat hizmetleri.",
  keywords: "BağKent, inşaat, mimari, yapı, konut, ticari yapı, İstanbul, Bağcılar",
  icons: {
    icon: [
      { url: "/bagkent-logo.png", type: "image/png", sizes: "any" },
      { url: "/bagkent-logo.png", type: "image/png", sizes: "192x192" },
      { url: "/bagkent-logo.png", type: "image/png", sizes: "32x32" },
      { url: "/bagkent-logo.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: "/bagkent-logo.png",
    apple: [
      { url: "/bagkent-logo.png", sizes: "180x180", type: "image/png" },
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
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
