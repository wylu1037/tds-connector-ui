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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings } from "lucide-react";

export default function GeneralSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Connector Configuration
          </CardTitle>
          <CardDescription>
            Basic connector information and settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="connector-id">Connector ID</Label>

                <Input
                  id="connector-id"
                  value="conn-7f8a9b2c-4d5e-6f7g-8h9i-0j1k2l3m4n5o"
                  readOnly
                  className="bg-background cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="connector-title">Connector Title</Label>
                <Input
                  id="connector-title"
                  defaultValue="Enterprise Data Connector"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="connector-description">Description</Label>
                <Textarea
                  id="connector-description"
                  defaultValue="Primary data connector for secure enterprise data exchange"
                  className="bg-background"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="curator">Curator</Label>
                <Input
                  id="curator"
                  defaultValue="Data Management Team"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maintainer">Maintainer</Label>
                <Input
                  id="maintainer"
                  defaultValue="IT Operations"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deploy-mode">Deploy Mode</Label>
                <Select defaultValue="production">
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="staging">Staging</SelectItem>
                    <SelectItem value="production">Production</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
          <CardDescription>
            Current system status and version information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Connector Version
              </p>
              <p className="text-lg font-semibold">v0.0.1</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                IDS Framework
              </p>
              <p className="text-lg font-semibold">v0.0.1</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Last Updated
              </p>
              <p className="text-lg font-semibold">2025-07-15</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
