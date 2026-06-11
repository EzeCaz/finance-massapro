import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MassaPro - Agentic AI for Finance | Your AI Secretary That Never Sleeps",
  description: "MassaPro deploys a single intelligent agentic solution that manages the entire trader lifecycle — from first click to funded account — across every channel, priced by full conversations, not minutes.",
  keywords: ["MassaPro", "Agentic AI", "Finance", "AI Secretary", "Trading", "Omni-channel", "Automation"],
  authors: [{ name: "MassaPro" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "MassaPro - Agentic AI for Finance",
    description: "One Brain. Every Channel. Full Journey Automation.",
    siteName: "MassaPro",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
