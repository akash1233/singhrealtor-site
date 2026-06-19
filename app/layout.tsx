import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { SITE_NAME } from "@/lib/site-content";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { UmamiAnalytics } from "@/components/layout/UmamiAnalytics";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | Northeast Atlanta Suburbs`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Buy or sell homes in Northeast Atlanta suburbs — Buford, Suwanee, Duluth, Lawrenceville, Sugar Hill, Cumming, and Gwinnett & Forsyth County with Singh Realtor LLC.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://shwetasinghrealty.com"
  ),
  openGraph: {
    title: SITE_NAME,
    description:
      "Northeast Atlanta suburban real estate — friendly, local help for buyers and sellers.",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <UmamiAnalytics />
      </body>
    </html>
  );
}
