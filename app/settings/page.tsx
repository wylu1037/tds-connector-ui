"use client";

import { Suspense, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GeneralSettings,
  SecuritySettings,
  NetworkSettings,
  BlockchainSettings,
  NotificationsSettings,
  AdvancedSettings,
} from "@/components/settings";
import { Skeleton } from "@/components/ui/skeleton";

const SettingsLoadingSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Tab Navigation Skeleton */}
      <div className="flex space-x-1 bg-muted rounded-lg p-1 w-full max-w-4xl">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-10 flex-1 bg-background" />
        ))}
      </div>

      {/* Main Content Skeleton */}
      <div className="space-y-6">
        {/* First Card - Connector Configuration */}
        <div className="border rounded-lg p-6 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <div className="border rounded-lg p-6 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-56" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        <div className="border rounded-lg p-6 space-y-4">
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

  return (
    <div className="min-h-screen ">
      <Suspense fallback={<SettingsLoadingSkeleton />}>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="network">Network</TabsTrigger>
              <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
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

