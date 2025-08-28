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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Network } from "lucide-react";
import { useTranslations } from "next-intl";

interface NetworkSettingsProps {
  proxyConfig: string;
  setProxyConfig: (value: string) => void;
}

export default function NetworkSettings({
  proxyConfig,
  setProxyConfig,
}: NetworkSettingsProps) {
  const t = useTranslations("Settings.network");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5" />
            {t("networkConfiguration")}
          </CardTitle>
          <CardDescription>
            {t("configureNetworkSettings")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-endpoint">{t("defaultEndpoint")}</Label>
                <Input
                  id="default-endpoint"
                  className="bg-background"
                  defaultValue="https://connector.example.com:8080"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inbound-model">{t("inboundModelVersion")}</Label>
                <Input
                  id="inbound-model"
                  className="bg-background"
                  defaultValue="4.2.7"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="outbound-model">{t("outboundModelVersion")}</Label>
                <Input
                  id="outbound-model"
                  className="bg-background"
                  defaultValue="4.2.7"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-muted-foreground">
                  {t("proxyConfiguration")}
                </Label>
                <RadioGroup
                  value={proxyConfig}
                  onValueChange={setProxyConfig}
                  className="flex h-9 items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no-proxy" id="no-proxy" />
                    <Label htmlFor="no-proxy">{t("noProxy")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="manual-proxy" id="manual-proxy" />
                    <Label htmlFor="manual-proxy">{t("manualConfiguration")}</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="log-level">{t("logLevel")}</Label>
                <Select defaultValue="info">
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debug">{t("debug")}</SelectItem>
                    <SelectItem value="info">{t("info")}</SelectItem>
                    <SelectItem value="warn">{t("warning")}</SelectItem>
                    <SelectItem value="error">{t("error")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <h4 className="font-medium">{t("connectionLimits")}</h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label
                  htmlFor="max-connections"
                  className="text-muted-foreground"
                >
                  {t("maxConcurrentConnections")}
                </Label>
                <Input
                  id="max-connections"
                  className="bg-background"
                  type="number"
                  defaultValue="100"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="connection-timeout"
                  className="text-muted-foreground"
                >
                  {t("connectionTimeout")}
                </Label>
                <Input
                  id="connection-timeout"
                  className="bg-background"
                  type="number"
                  defaultValue="30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="read-timeout" className="text-muted-foreground">
                  {t("readTimeout")}
                </Label>
                <Input
                  id="read-timeout"
                  className="bg-background"
                  type="number"
                  defaultValue="60"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
