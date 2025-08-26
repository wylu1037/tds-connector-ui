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

export default function SecuritySettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Configuration
          </CardTitle>
          <CardDescription>
            Manage security settings and authentication
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {/* <div className="flex items-center justify-between">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-slate-500">
                  Enable 2FA for enhanced security
                </p>
              </div>
              <Switch defaultChecked />
            </div> */}
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-lock Session</Label>
                <p className="text-sm text-slate-500">
                  Automatically lock after inactivity
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Audit Logging</Label>
                <p className="text-sm text-slate-500">
                  Log all security events
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <h4 className="font-medium">Certificate Management</h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label>SSL Certificate Status</Label>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm text-slate-500">
                    Expires: 2024-12-15
                  </span>
                  {/* <Badge className="bg-green-100 text-green-800">
                    Valid
                  </Badge> */}
                  <CheckCircle className="size-4 text-green-500" />
                </div>
              </div>
              <div>
                <Label>DID Certificate Status</Label>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm text-slate-500">
                    Last verified: 2024-01-15
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
            <h4 className="font-medium">Access Control</h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="session-timeout"
                  className="text-muted-foreground"
                >
                  Session Timeout (minutes)
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
                  Max Login Attempts
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
