import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import type React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { DataSpaceProvider } from "@/lib/contexts/DataSpaceContext";
import Header from "@/components/header";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
});

export const metadata: Metadata = {
  title: "Trusted Data Space Connector",
  description:
    "Enterprise-grade IDS-compliant data space connector for secure data exchange",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${sourceSans.variable} antialiased`}
    >
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DataSpaceProvider>
            <div className="min-h-screen bg-background">
              {/* Header */}
              <Header />

              {/* Main Content */}
              <div className="container mx-auto px-6 pb-8">{children}</div>
            </div>
          </DataSpaceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
