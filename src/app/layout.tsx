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
  title: "Your Name — Software Engineer",
  description: "Building reliable, performant web products with modern web tech.",
  metadataBase: new URL("https://your-domain.com"),
  openGraph: {
    title: "Your Name — Software Engineer",
    description: "Building reliable, performant web products with modern web tech.",
    url: "https://your-domain.com",
    siteName: "Your Name",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Name — Software Engineer",
    description: "Building reliable, performant web products with modern web tech.",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}