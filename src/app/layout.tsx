import type { Metadata, Viewport } from "next";
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
  title: "Yash Pakale | AI Engineer & Data Scientist",
  description:
    "Yash Pakale builds agentic AI, RAG systems, machine learning and computer vision products. IEEE-published researcher, hackathon winner, B.Tech AI & Data Science at VIIT Pune.",
  authors: [{ name: "Yash Pakale" }],
  openGraph: {
    title: "Yash Pakale | AI Engineer & Data Scientist",
    description: "Agentic AI, RAG, machine learning and computer vision. IEEE-published. Based in Pune, India.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
