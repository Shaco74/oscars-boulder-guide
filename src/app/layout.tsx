import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oscar's Boulder Guide - KI-gestützte Kletterrouten-Analyse",
  description: "Professionelle KI-Analyse deiner Boulderrouten. Lade einfach ein Foto hoch und erhalte sofort Expertentipps zur optimalen Lösung. Entwickelt von Oscar für die Klettergemeinschaft.",
  keywords: "Boulder, Klettern, KI, Routenanalyse, Climbing, Bouldering, Oscar",
  authors: [{ name: "Oscar" }],
  creator: "Oscar",
  openGraph: {
    title: "Oscar's Boulder Guide - KI Boulder Analyse",
    description: "Revolutionäre KI-Technologie für die Analyse von Boulderrouten. Einfach Foto hochladen und Expertentipps erhalten.",
    type: "website",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oscar's Boulder Guide",
    description: "KI-gestützte Boulderrouten-Analyse - Lade dein Foto hoch!",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
