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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { CheckCircle, Shield } from "lucide-react";
import { useTranslations } from "next-intl";

export default function SecuritySettings() {
  const t = useTranslations("Settings.security");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {t("securityConfiguration")}
          </CardTitle>
          <CardDescription>
            {t("manageSecuritySettings")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {/* <div className="flex items-center justify-between">
              <div>
                <Label>{t("twoFactorAuth")}</Label>
                <p className="text-sm text-slate-500">
                  {t("enable2faForSecurity")}
                </p>
              </div>
              <Switch defaultChecked />
            </div> */}
            <div className="flex items-center justify-between">
              <div>
                <Label>{t("autoLockSession")}</Label>
                <p className="text-sm text-slate-500">
                  {t("autoLockAfterInactivity")}
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>{t("auditLogging")}</Label>
                <p className="text-sm text-slate-500">
                  {t("logAllSecurityEvents")}
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <h4 className="font-medium">{t("certificateManagement")}</h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label>{t("sslCertificateStatus")}</Label>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm text-slate-500">
                    {t("expires")}: 2024-12-15
                  </span>
                  {/* <Badge className="bg-green-100 text-green-800">
                    Valid
                  </Badge> */}
                  <CheckCircle className="size-4 text-green-500" />
                </div>
              </div>
              <div>
                <Label>{t("didCertificateStatus")}</Label>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm text-slate-500">
                    {t("lastVerified")}: 2024-01-15
                  </span>
                  {/* <Badge className="bg-green-100 text-green-800">
                    Active
                  </Badge> */}
                  <CheckCircle className="size-4 text-green-500" />
                </div>
              </div>
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <h4 className="font-medium">{t("accessControl")}</h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="session-timeout"
                  className="text-muted-foreground"
                >
                  {t("sessionTimeout")}
                </Label>
                <Input
                  id="session-timeout"
                  type="number"
                  defaultValue="30"
                  className="bg-background w-32"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="max-login-attempts"
                  className="text-muted-foreground"
                >
                  {t("maxLoginAttempts")}
                </Label>
                <Input
                  id="max-login-attempts"
                  type="number"
                  defaultValue="5"
                  className="bg-background w-32"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
