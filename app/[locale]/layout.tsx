import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import type React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { DataSpaceProvider } from "@/lib/contexts/DataSpaceContext";
import Header from "@/components/header";
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import "../globals.css";

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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <div className={`${playfair.variable} ${sourceSans.variable} antialiased font-sans`}>
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
    </div>
  );
}
