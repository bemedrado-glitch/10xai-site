import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://10xai.us"),
  title: "10XAI | AI implementation and automation for ambitious SMBs",
  description:
    "10XAI helps small and mid-sized businesses turn repetitive work into automated revenue, operations, and service systems with practical AI implementation.",
  keywords: [
    "AI agency",
    "AI implementation",
    "AI automation for small business",
    "SMB AI consulting",
    "AI agents",
    "operational AI",
  ],
  openGraph: {
    title: "10XAI | AI implementation and automation for ambitious SMBs",
    description:
      "Operational AI for growing companies. Strategy, build, rollout, and team enablement without enterprise-level drag.",
    url: "https://10xai.us",
    siteName: "10XAI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "10XAI | AI implementation and automation for ambitious SMBs",
    description:
      "Operational AI for growing companies. Strategy, build, rollout, and team enablement without enterprise-level drag.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
