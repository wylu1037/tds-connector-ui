"use client";

import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const router = useRouter();
  const t = useTranslations("Layout");

  useEffect(() => {
    // Redirect to identity page by default
    router.replace("/identity");
  }, [router]);

  // Show loading state while redirecting
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="text-center">
        <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
        <p className="text-muted-foreground">
          {t("loading") || "Loading dashboard..."}
        </p>
      </div>
    </div>
  );
}
