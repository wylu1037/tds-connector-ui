"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Activity,
  Database,
  Key,
  Link as LinkIcon,
  Monitor,
  Network,
  Shield,
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function Navigation() {
  const pathname = usePathname();
  const t = useTranslations("Navigation");
  const tShort = useTranslations("Navigation");

  const navigationItems = [
    {
      value: "identity",
      href: "/identity",
      icon: Key,
      label: t("identity"),
      shortLabel: tShort("short.identity"),
    },
    {
      value: "data-offering",
      href: "/data-offering",
      icon: Database,
      label: t("dataOffering"),
      shortLabel: tShort("short.dataOffering"),
    },
    {
      value: "data-consumption",
      href: "/data-consumption",
      icon: Network,
      label: t("dataConsumption"),
      shortLabel: tShort("short.dataConsumption"),
    },
    {
      value: "policy",
      href: "/policy",
      icon: Shield,
      label: t("policy"),
      shortLabel: tShort("short.policy"),
    },
    {
      value: "blockchain",
      href: "/blockchain",
      icon: LinkIcon,
      label: t("blockchain"),
      shortLabel: tShort("short.blockchain"),
    },
    {
      value: "sandbox",
      href: "/sandbox",
      icon: Monitor,
      label: t("sandbox"),
      shortLabel: tShort("short.sandbox"),
    },
    {
      value: "monitoring",
      href: "/monitoring",
      icon: Activity,
      label: t("monitoring"),
      shortLabel: tShort("short.monitoring"),
    },
  ];

  // Get current active route
  const getActiveRoute = () => {
    if (pathname === "/") return "identity"; // default route
    const route = pathname.slice(1); // remove leading slash
    return navigationItems.some((item) => item.value === route)
      ? route
      : "identity";
  };

  const activeRoute = getActiveRoute();

  return (
    <div className="py-8">
      <nav className="bg-muted relative flex space-x-1 rounded-lg p-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeRoute === item.value;

          return (
            <Link
              key={item.value}
              href={item.href}
              className={cn(
                "relative flex items-center space-x-2 rounded-md px-3 py-1 text-sm font-medium transition-colors",
                "hover:text-foreground z-10 flex-1 justify-center",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {/* Active background with motion */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="bg-background absolute inset-0 rounded-md"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}

              {/* Content */}
              <div className="relative flex items-center space-x-2">
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                >
                  <Icon className="h-4 w-4" />
                </motion.div>
                <span className="hidden sm:inline">{item.label}</span>
                <span className="sm:hidden">{item.shortLabel}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
