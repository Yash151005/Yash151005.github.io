import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Yash Pakale — AI Engineer & Full-Stack Developer",
  description:
    "Yash Pakale builds production machine learning systems and the software around them. IEEE-published researcher, hackathon winner, B.Tech AI & Data Science at VIIT Pune.",
  authors: [{ name: "Yash Pakale" }],
  openGraph: {
    title: "Yash Pakale — AI Engineer & Full-Stack Developer",
    description:
      "Production ML systems, computer vision, and full-stack products. IEEE-published. Based in Pune, India.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable} font-sans antialiased`}
      >
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
