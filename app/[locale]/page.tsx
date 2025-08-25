"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const router = useRouter();
  const t = useTranslations('Layout');

  useEffect(() => {
    // Redirect to identity page by default
    router.replace("/identity");
  }, [router]);

  // Show loading state while redirecting
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">{t('loading') || 'Loading dashboard...'}</p>
      </div>
    </div>
  );
}
