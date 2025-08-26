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

export default function AdvancedSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Advanced Configuration
          </CardTitle>
          <CardDescription>
            Advanced system settings and performance tuning
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Debug Mode</Label>
                <p className="text-sm text-slate-500">
                  Enable detailed logging and debugging
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Performance Monitoring</Label>
                <p className="text-sm text-slate-500">
                  Enable detailed performance metrics
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-backup</Label>
                <p className="text-sm text-slate-500">
                  Automatically backup configuration
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <h4 className="font-medium">Resource Limits</h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="memory-limit">Memory Limit (GB)</Label>
                <Input
                  id="memory-limit"
                  type="number"
                  defaultValue="8"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpu-limit">CPU Limit (%)</Label>
                <Input
                  id="cpu-limit"
                  type="number"
                  defaultValue="80"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storage-limit">Storage Limit (GB)</Label>
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
            <h4 className="font-medium">Sandbox Configuration</h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="sandbox-runtime">Default Runtime</Label>
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
                  Sandbox Timeout (minutes)
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
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
          <CardDescription>
            Irreversible and destructive actions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-red-200 p-4">
            <div>
              <h4 className="font-medium text-red-600">Reset Configuration</h4>
              <p className="text-sm text-slate-500">
                Reset all settings to default values
              </p>
            </div>
            <Button variant="destructive">Reset</Button>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-red-200 p-4">
            <div>
              <h4 className="font-medium text-red-600">Delete Connector</h4>
              <p className="text-sm text-slate-500">
                Permanently delete this connector and all data
              </p>
            </div>
            <Button variant="destructive">Delete</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
