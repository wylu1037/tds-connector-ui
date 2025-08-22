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
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Network } from "lucide-react";

interface NetworkSettingsProps {
  proxyConfig: string;
  setProxyConfig: (value: string) => void;
}

export default function NetworkSettings({
  proxyConfig,
  setProxyConfig,
}: NetworkSettingsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5" />
            Network Configuration
          </CardTitle>
          <CardDescription>
            Configure network settings and connections
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-endpoint">Default Endpoint</Label>
                <Input
                  id="default-endpoint"
                  className="bg-background"
                  defaultValue="https://connector.example.com:8080"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inbound-model">Inbound Model Version</Label>
                <Input
                  id="inbound-model"
                  className="bg-background"
                  defaultValue="4.2.7"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="outbound-model">Outbound Model Version</Label>
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
                  Proxy Configuration
                </Label>
                <RadioGroup
                  value={proxyConfig}
                  onValueChange={setProxyConfig}
                  className="flex justify-between items-center h-9"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no-proxy" id="no-proxy" />
                    <Label htmlFor="no-proxy">No proxy</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="manual-proxy" id="manual-proxy" />
                    <Label htmlFor="manual-proxy">Manual configuration</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="log-level">Log Level</Label>
                <Select defaultValue="info">
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debug">Debug</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warn">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <h4 className="font-medium">Connection Limits</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="max-connections"
                  className="text-muted-foreground"
                >
                  Max Concurrent Connections
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
                  Connection Timeout (seconds)
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
                  Read Timeout (seconds)
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
