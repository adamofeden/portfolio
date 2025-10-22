import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adam Dugan — Software Engineer",
  description:
    "Portfolio of Adam Dugan: builder of BalancingIQ & SOA Assist Pro. Unity/VR, Python, AWS, Next.js, secure automation.",
  openGraph: {
    title: "Adam Dugan — Software Engineer",
    description:
      "Portfolio of Adam Dugan: builder of BalancingIQ & SOA Assist Pro. Unity/VR, Python, AWS, Next.js, secure automation.",
    url: "https://adamdugan.com",
    siteName: "Adam Dugan",
    images: [{ url: "/og-cover.png", width: 1200, height: 630, alt: "Adam Dugan Portfolio" }],
    locale: "en_US",
    type: "website",
  },
  metadataBase: new URL("https://adamdugan.com"),

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}