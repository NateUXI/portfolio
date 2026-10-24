// app/layout.tsx
import type { Metadata } from "next";
import { Anton_SC, Inter, Overpass } from "next/font/google";
import "./globals.css";
import { TransitionHandler } from "../components//TransitionHandler";

const antonSC = Anton_SC({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton-sc",
  display: "swap",
});

const overpass = Overpass({
  subsets: ["latin"],
  variable: "--font-overpass",
  display: "swap",
});

const inter = Inter({
  weight: "900",
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nate Turner",
  description: "Design Engineer Nate Turner's Portfolio. Working with UX/UI design across Figma, Next.js, React and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${antonSC.variable} ${overpass.variable} ${inter.variable}`}>
      <body className="antialiased">
        <TransitionHandler />
        {children}
      </body>
    </html>
  );
}