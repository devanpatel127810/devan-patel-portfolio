import type { Metadata } from "next";
import { Fraunces, Nunito_Sans, IBM_Plex_Mono } from "next/font/google";
import { profile } from "@/lib/data";
import SmoothScroll from "@/components/motion/SmoothScroll";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://devan-patel-portfolio.vercel.app"),
  title: "Devan Patel — Software Engineer in Austin, TX",
  description:
    "Forward Deployed Engineer at Deloitte (ZoraAI). I build AI-powered systems that survive production. An illustrated cruise through Austin: the garage, the café, the kitchen, the courts.",
  keywords: [
    "Devan Patel",
    "software engineer",
    "forward deployed engineer",
    "Deloitte",
    "ZoraAI",
    "Austin",
    "GenAI",
    "React",
    "Next.js",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: "Devan Patel — Software Engineer in Austin, TX",
    description:
      "Forward Deployed Engineer at Deloitte (ZoraAI). I build software that ships — told as an illustrated day in Austin.",
    type: "website",
    images: [{ url: "/art/hero.webp", alt: "Painted golden-hour panorama of Austin, Texas" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
