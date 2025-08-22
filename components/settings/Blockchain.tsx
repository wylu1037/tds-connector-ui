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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Database, Eye, EyeOff } from "lucide-react";

interface BlockchainSettingsProps {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

export default function BlockchainSettings({
  showPassword,
  setShowPassword,
}: BlockchainSettingsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Blockchain Configuration
          </CardTitle>
          <CardDescription>
            Configure blockchain network and DID settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="blockchain-network">Blockchain Network</Label>
                <Select defaultValue="hyperledger">
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hyperledger">
                      Hyperledger Fabric
                    </SelectItem>
                    <SelectItem value="ethereum">Ethereum Private</SelectItem>
                    <SelectItem value="quorum">Quorum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="network-url">Network URL</Label>
                <Input
                  id="network-url"
                  className="bg-background"
                  defaultValue="https://blockchain.example.com:7051"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="channel-name">Channel Name</Label>
                <Input
                  id="channel-name"
                  className="bg-background"
                  defaultValue="datachannel"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="did-method">DID Method</Label>
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
                <Label htmlFor="wallet-address">Wallet Address</Label>
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
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
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
                <Label htmlFor="gas-limit">Gas Limit</Label>
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
            <h4 className="font-medium">TrustStore Configuration</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="truststore-url">TrustStore URL</Label>
                <Input
                  id="truststore-url"
                  defaultValue="https://truststore.example.com"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="truststore-alias">TrustStore Alias</Label>
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
                TrustStore Password
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
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
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
