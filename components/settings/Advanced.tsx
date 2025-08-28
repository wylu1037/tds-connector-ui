"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Server } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AdvancedSettings() {
  const t = useTranslations("Settings.advanced");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            {t("advancedConfiguration")}
          </CardTitle>
          <CardDescription>
            {t("advancedSystemSettings")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>{t("debugMode")}</Label>
                <p className="text-sm text-slate-500">
                  {t("enableDetailedLogging")}
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>{t("performanceMonitoring")}</Label>
                <p className="text-sm text-slate-500">
                  {t("enablePerformanceMetrics")}
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>{t("autoBackup")}</Label>
                <p className="text-sm text-slate-500">
                  {t("autoBackupConfiguration")}
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <h4 className="font-medium">{t("resourceLimits")}</h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="memory-limit">{t("memoryLimit")}</Label>
                <Input
                  id="memory-limit"
                  type="number"
                  defaultValue="8"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpu-limit">{t("cpuLimit")}</Label>
                <Input
                  id="cpu-limit"
                  type="number"
                  defaultValue="80"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storage-limit">{t("storageLimit")}</Label>
                <Input
                  id="storage-limit"
                  type="number"
                  defaultValue="100"
                  className="bg-background"
                />
              </div>
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <h4 className="font-medium">{t("sandboxConfiguration")}</h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="sandbox-runtime">{t("defaultRuntime")}</Label>
                <Select defaultValue="libkrun">
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="libkrun">libkrun</SelectItem>
                    <SelectItem value="docker">Docker</SelectItem>
                    <SelectItem value="podman">Podman</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sandbox-timeout">
                  {t("sandboxTimeout")}
                </Label>
                <Input
                  id="sandbox-timeout"
                  type="number"
                  defaultValue="30"
                  className="bg-background"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">{t("dangerZone")}</CardTitle>
          <CardDescription>
            {t("irreversibleActions")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-red-200 p-4">
            <div>
              <h4 className="font-medium text-red-600">{t("resetConfiguration")}</h4>
              <p className="text-sm text-slate-500">
                {t("resetToDefaults")}
              </p>
            </div>
            <Button variant="destructive">{t("reset")}</Button>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-red-200 p-4">
            <div>
              <h4 className="font-medium text-red-600">{t("deleteConnector")}</h4>
              <p className="text-sm text-slate-500">
                {t("permanentlyDelete")}
              </p>
            </div>
            <Button variant="destructive">{t("delete")}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
