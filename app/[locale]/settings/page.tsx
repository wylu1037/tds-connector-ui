"use client";

import {
  AdvancedSettings,
  BlockchainSettings,
  GeneralSettings,
  NetworkSettings,
  NotificationsSettings,
  SecuritySettings,
} from "@/components/settings";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import { Suspense, useState } from "react";

const SettingsLoadingSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Tab Navigation Skeleton */}
      <div className="bg-muted flex w-full max-w-4xl space-x-1 rounded-lg p-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="bg-background h-10 flex-1" />
        ))}
      </div>

      {/* Main Content Skeleton */}
      <div className="space-y-6">
        {/* First Card - Connector Configuration */}
        <div className="space-y-4 rounded-lg border p-6">
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Second Card - System Information */}
        <div className="space-y-4 rounded-lg border p-6">
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-56" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 w-16" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-6 w-16" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        </div>

        {/* Third Card - Additional Settings */}
        <div className="space-y-4 rounded-lg border p-6">
          <div className="space-y-2">
            <Skeleton className="h-6 w-44" />
            <Skeleton className="h-4 w-60" />
          </div>

          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [showPassword, setShowPassword] = useState(false);
  const [proxyConfig, setProxyConfig] = useState("no-proxy");
  const [notifications, setNotifications] = useState({
    dataRequests: true,
    contractUpdates: true,
    securityAlerts: true,
    systemMaintenance: false,
  });

  const t = useTranslations("Settings.tabs");

  return (
    <div className="min-h-screen">
      <Suspense fallback={<SettingsLoadingSkeleton />}>
        <div className="mx-auto max-w-7xl px-6 py-8">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="general">{t("general")}</TabsTrigger>
              <TabsTrigger value="security">{t("security")}</TabsTrigger>
              <TabsTrigger value="network">{t("network")}</TabsTrigger>
              <TabsTrigger value="blockchain">{t("blockchain")}</TabsTrigger>
              <TabsTrigger value="notifications">
                {t("notifications")}
              </TabsTrigger>
              <TabsTrigger value="advanced">{t("advanced")}</TabsTrigger>
            </TabsList>

            {/* General Settings Tab */}
            <TabsContent value="general" className="space-y-6">
              <GeneralSettings />
            </TabsContent>

            {/* Security Settings Tab */}
            <TabsContent value="security" className="space-y-6">
              <SecuritySettings />
            </TabsContent>

            {/* Network Settings Tab */}
            <TabsContent value="network" className="space-y-6">
              <NetworkSettings
                proxyConfig={proxyConfig}
                setProxyConfig={setProxyConfig}
              />
            </TabsContent>

            {/* Blockchain Settings Tab */}
            <TabsContent value="blockchain" className="space-y-6">
              <BlockchainSettings
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <NotificationsSettings
                notifications={notifications}
                setNotifications={setNotifications}
              />
            </TabsContent>

            {/* Advanced Settings Tab */}
            <TabsContent value="advanced" className="space-y-6">
              <AdvancedSettings />
            </TabsContent>
          </Tabs>
        </div>
      </Suspense>
    </div>
  );
}
