import type { Metadata } from "next";
import { Cousine } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/ui/CookieBanner";
import "./globals.css";

// Sans-Stack ist system-ui (auf Apple-Plattformen = SF Pro, sonst nativer
// System-Font). SF Pro darf nicht als Webfont serviert werden — Apple-Lizenz.
const cousine = Cousine({
  variable: "--font-cousine",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://xn--souverneki-v5a.de"),
  title: "Souveräne KI — Souveränität ist keine Region. Souveränität ist Recht.",
  description:
    "Eine 'EU-Cloud' bedeutet wenig, wenn das betreibende Unternehmen US-amerikanischem Recht unterliegt. Souveräne KI baut auf europäischem Recht — Open-Source-Modelle, EU-Rechenzentren, Verträge unter ausschließlich europäischer Jurisdiktion.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://xn--souverneki-v5a.de",
    siteName: "Souveräne KI",
    title: "Souveränität ist keine Region. Souveränität ist Recht.",
    description:
      "Souveräne KI baut auf europäischem Recht, nicht auf Geographie. Praxisleitfaden für Entscheider — EU AI Act, CLOUD Act, Architektur-Optionen.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Souveränität ist keine Region. Souveränität ist Recht.",
    description:
      "Souveräne KI für Unternehmen und Institutionen in Europa — unter ausschließlich europäischer Jurisdiktion.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={cousine.variable}>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
