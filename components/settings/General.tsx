"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { Settings } from "lucide-react";
import { useTranslations } from "next-intl";

export default function GeneralSettings() {
  const t = useTranslations("Settings.general");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            {t("connectorConfiguration")}
          </CardTitle>
          <CardDescription>
            {t("basicConnectorInfo")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="connector-id">{t("connectorId")}</Label>

                <Input
                  id="connector-id"
                  value="conn-7f8a9b2c-4d5e-6f7g-8h9i-0j1k2l3m4n5o"
                  readOnly
                  className="bg-background cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="connector-title">{t("connectorTitle")}</Label>
                <Input
                  id="connector-title"
                  defaultValue={t("defaultValues.connectorTitle")}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="connector-description">{t("description")}</Label>
                <Textarea
                  id="connector-description"
                  defaultValue={t("defaultValues.description")}
                  className="bg-background"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="curator">{t("curator")}</Label>
                <Input
                  id="curator"
                  defaultValue={t("defaultValues.curator")}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maintainer">{t("maintainer")}</Label>
                <Input
                  id="maintainer"
                  defaultValue={t("defaultValues.maintainer")}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deploy-mode">{t("deployMode")}</Label>
                <Select defaultValue="production">
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="development">{t("development")}</SelectItem>
                    <SelectItem value="staging">{t("staging")}</SelectItem>
                    <SelectItem value="production">{t("production")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("systemInformation")}</CardTitle>
          <CardDescription>
            {t("currentSystemStatus")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                {t("connectorVersion")}
              </p>
              <p className="text-lg font-semibold">v0.0.1</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                {t("idsFramework")}
              </p>
              <p className="text-lg font-semibold">v0.0.1</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                {t("lastUpdated")}
              </p>
              <p className="text-lg font-semibold">2025-07-15</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
