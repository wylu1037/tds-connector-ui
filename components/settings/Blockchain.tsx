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
import { Database, Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";

interface BlockchainSettingsProps {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

export default function BlockchainSettings({
  showPassword,
  setShowPassword,
}: BlockchainSettingsProps) {
  const t = useTranslations("Settings.blockchain");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            {t("blockchainConfiguration")}
          </CardTitle>
          <CardDescription>
            {t("configureBlockchainNetwork")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="blockchain-network">{t("blockchainNetwork")}</Label>
                <Select defaultValue="hyperledger">
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hyperledger">
                      {t("hyperledgerFabric")}
                    </SelectItem>
                    <SelectItem value="ethereum">{t("ethereumPrivate")}</SelectItem>
                    <SelectItem value="quorum">{t("quorum")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="network-url">{t("networkUrl")}</Label>
                <Input
                  id="network-url"
                  className="bg-background"
                  defaultValue="https://blockchain.example.com:7051"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="channel-name">{t("channelName")}</Label>
                <Input
                  id="channel-name"
                  className="bg-background"
                  defaultValue="datachannel"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="did-method">{t("didMethod")}</Label>
                <Select defaultValue="fabric">
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fabric">did:fabric</SelectItem>
                    <SelectItem value="ethr">did:ethr</SelectItem>
                    <SelectItem value="key">did:key</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="wallet-address">{t("walletAddress")}</Label>
                <div className="relative">
                  <Input
                    id="wallet-address"
                    type={showPassword ? "text" : "password"}
                    defaultValue="0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4"
                    className="bg-background"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gas-limit">{t("gasLimit")}</Label>
                <Input
                  id="gas-limit"
                  type="number"
                  defaultValue="500000"
                  className="bg-background"
                />
              </div>
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <h4 className="font-medium">{t("truststoreConfiguration")}</h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="truststore-url">{t("truststoreUrl")}</Label>
                <Input
                  id="truststore-url"
                  defaultValue="https://truststore.example.com"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="truststore-alias">{t("truststoreAlias")}</Label>
                <Input
                  id="truststore-alias"
                  defaultValue="connector-cert"
                  className="bg-background"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="truststore-password"
                className="text-muted-foreground"
              >
                {t("truststorePassword")}
              </Label>
              <div className="relative">
                <Input
                  id="truststore-password"
                  type={showPassword ? "text" : "password"}
                  defaultValue="••••••••••••"
                  className="bg-background"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
