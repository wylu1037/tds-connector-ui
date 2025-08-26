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
import { Bell } from "lucide-react";

interface NotificationsProps {
  notifications: {
    dataRequests: boolean;
    contractUpdates: boolean;
    securityAlerts: boolean;
    systemMaintenance: boolean;
  };
  setNotifications: React.Dispatch<
    React.SetStateAction<{
      dataRequests: boolean;
      contractUpdates: boolean;
      securityAlerts: boolean;
      systemMaintenance: boolean;
    }>
  >;
}

export default function NotificationsSettings({
  notifications,
  setNotifications,
}: NotificationsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Configure notification settings and alerts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Data Access Requests</Label>
                <p className="text-sm text-slate-500">
                  Notify when new data requests are received
                </p>
              </div>
              <Switch
                checked={notifications.dataRequests}
                onCheckedChange={(checked) =>
                  setNotifications({
                    ...notifications,
                    dataRequests: checked,
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Contract Updates</Label>
                <p className="text-sm text-slate-500">
                  Notify when contracts are modified or expire
                </p>
              </div>
              <Switch
                checked={notifications.contractUpdates}
                onCheckedChange={(checked) =>
                  setNotifications({
                    ...notifications,
                    contractUpdates: checked,
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Security Alerts</Label>
                <p className="text-sm text-slate-500">
                  Notify about security events and violations
                </p>
              </div>
              <Switch
                checked={notifications.securityAlerts}
                onCheckedChange={(checked) =>
                  setNotifications({
                    ...notifications,
                    securityAlerts: checked,
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>System Maintenance</Label>
                <p className="text-sm text-slate-500">
                  Notify about scheduled maintenance
                </p>
              </div>
              <Switch
                checked={notifications.systemMaintenance}
                onCheckedChange={(checked) =>
                  setNotifications({
                    ...notifications,
                    systemMaintenance: checked,
                  })
                }
              />
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <h4 className="font-medium">Notification Channels</h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email-notifications">Email Address</Label>
                <Input
                  id="email-notifications"
                  type="email"
                  defaultValue="admin@example.com"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input
                  id="webhook-url"
                  placeholder="https://your-webhook.com/notifications"
                  className="bg-background"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
