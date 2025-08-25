"use client";

import {
  Activity,
  Database,
  Key,
  Link as LinkIcon,
  Monitor,
  Network,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    value: "identity",
    href: "/identity",
    icon: Key,
    label: "Identity & DID",
    shortLabel: "Identity",
  },
  {
    value: "data-offering",
    href: "/data-offering",
    icon: Database,
    label: "Data Offering",
    shortLabel: "Offering",
  },
  {
    value: "data-consumption",
    href: "/data-consumption",
    icon: Network,
    label: "Data Consumption",
    shortLabel: "Consumption",
  },
  {
    value: "policy",
    href: "/policy",
    icon: Shield,
    label: "Policy & Contracts",
    shortLabel: "Policy",
  },
  {
    value: "blockchain",
    href: "/blockchain",
    icon: LinkIcon,
    label: "Blockchain",
    shortLabel: "Chain",
  },
  {
    value: "sandbox",
    href: "/sandbox",
    icon: Monitor,
    label: "Sandbox",
    shortLabel: "Sandbox",
  },
  {
    value: "monitoring",
    href: "/monitoring",
    icon: Activity,
    label: "Monitoring",
    shortLabel: "Monitor",
  },
];

export default function Navigation() {
  const pathname = usePathname();

  // Get current active route
  const getActiveRoute = () => {
    if (pathname === "/") return "identity"; // default route
    const route = pathname.slice(1); // remove leading slash
    return navigationItems.some(item => item.value === route) ? route : "identity";
  };

  const activeRoute = getActiveRoute();

  return (
    <div className="py-8">
      <nav className="relative flex space-x-1 p-1 bg-muted rounded-lg">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeRoute === item.value;

          return (
            <Link
              key={item.value}
              href={item.href}
              className={cn(
                "relative flex items-center space-x-2 px-3 py-1 rounded-md text-sm font-medium transition-colors",
                "hover:text-foreground flex-1 justify-center z-10",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {/* Active background with motion */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-background rounded-md"
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
