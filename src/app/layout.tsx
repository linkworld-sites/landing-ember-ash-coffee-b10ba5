import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { FunnelTracker } from "@/components/FunnelTracker";
import { CookieConsent } from "@/components/CookieConsent";
import { CartProvider } from "@/components/CartContext";
import NavHeader from "@/components/NavHeader";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Ember & Ash Coffee — Roasted to Order",
  description:
    "Single-origin, roast-to-order coffee. Every bag carries a traceable origin story and a roast date you can trust.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-body bg-parchment text-ember-dark antialiased">
        <FunnelTracker />
        <CartProvider>
          <NavHeader />
          <SmoothScroll>{children}</SmoothScroll>
        </CartProvider>
        <CookieConsent />
      </body>
    </html>
  );
}
