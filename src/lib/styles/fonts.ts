import { Geist, Geist_Mono, DM_Serif_Display } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

/**
 * Space-separated CSS variable class names for Geist Sans + Geist Mono + DM Serif Display.
 * Apply to `<body>` to make the font variables available throughout the tree.
 */
export const fontVariables = `${geistSans.variable} ${geistMono.variable} ${dmSerif.variable}`;
