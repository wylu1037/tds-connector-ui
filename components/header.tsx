"use client";

import { DataSpaceSwitcher } from "@/components/DataSpaceSwitcher";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, useRouter } from "@/i18n/navigation";
import { Moon, Settings, Shield, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const [isRegistered, setIsRegistered] = useState(true);
  const t = useTranslations("Header");
  const tLayout = useTranslations("Layout");

  return (
    <div className="bg-card border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="text-primary h-8 w-8" />
              <h1 className="text-foreground hidden font-serif text-2xl font-bold md:block">
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
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
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
