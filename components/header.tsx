"use client";

import { Button } from "@/components/ui/button";
import { Moon, Settings, Sun, Shield } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { DataSpaceSwitcher } from "@/components/DataSpaceSwitcher";
import { useRouter } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {
  Tooltip,
  TooltipTrigger,
  TooltipProvider,
  TooltipContent,
} from "@/components/ui/tooltip";

export default function Header() {
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const [isRegistered, setIsRegistered] = useState(true);
  const t = useTranslations("Header");
  const tLayout = useTranslations("Layout");

  return (
    <div className="border-b bg-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold font-serif text-foreground hidden md:block">
                {tLayout("title")}
              </h1>
            </Link>
            <Badge
              variant={isRegistered ? "default" : "secondary"}
              className="ml-4"
            >
              {isRegistered ? t("registered") : t("notRegistered")}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <DataSpaceSwitcher />
            <LanguageSwitcher />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">{t("toggleTheme")}</span>
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => router.push("/settings")}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={5}>
                  {t("settings")}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
