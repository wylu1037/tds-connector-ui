"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Settings, Shield, Database, Network, Bell, Server, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    dataRequests: true,
    contractUpdates: true,
    securityAlerts: true,
    systemMaintenance: false,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 font-serif">System Settings</h1>
              <p className="text-slate-600">Configure connector settings and preferences</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
            <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          {/* General Settings Tab */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Connector Configuration
                </CardTitle>
                <CardDescription>Basic connector information and settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="connector-id">Connector ID</Label>
                      <Input id="connector-id" value="conn-7f8a9b2c-4d5e-6f7g-8h9i-0j1k2l3m4n5o" disabled />
                      <p className="text-sm text-slate-500 mt-1">Unique identifier for this connector</p>
                    </div>
                    <div>
                      <Label htmlFor="connector-title">Connector Title</Label>
                      <Input id="connector-title" defaultValue="Enterprise Data Connector" />
                    </div>
                    <div>
                      <Label htmlFor="connector-description">Description</Label>
                      <Textarea
                        id="connector-description"
                        defaultValue="Primary data connector for secure enterprise data exchange"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="curator">Curator</Label>
                      <Input id="curator" defaultValue="Data Management Team" />
                    </div>
                    <div>
                      <Label htmlFor="maintainer">Maintainer</Label>
                      <Input id="maintainer" defaultValue="IT Operations" />
                    </div>
                    <div>
                      <Label htmlFor="deploy-mode">Deploy Mode</Label>
                      <Select defaultValue="production">
                        <SelectTrigger>
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
                <Separator />
                <div className="flex justify-end">
                  <Button className="bg-cyan-600 hover:bg-cyan-700">Save Changes</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
                <CardDescription>Current system status and version information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm font-medium text-slate-700">Connector Version</p>
                    <p className="text-lg font-semibold">v2.1.3</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">IDS Framework</p>
                    <p className="text-lg font-semibold">v4.2.7</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Last Updated</p>
                    <p className="text-lg font-semibold">2024-01-15</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Configuration
                </CardTitle>
                <CardDescription>Manage security settings and authentication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-slate-500">Enable 2FA for enhanced security</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-lock Session</Label>
                      <p className="text-sm text-slate-500">Automatically lock after inactivity</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Audit Logging</Label>
                      <p className="text-sm text-slate-500">Log all security events</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h4 className="font-medium">Certificate Management</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>SSL Certificate Status</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-green-100 text-green-800">Valid</Badge>
                        <span className="text-sm text-slate-500">Expires: 2024-12-15</span>
                      </div>
                    </div>
                    <div>
                      <Label>DID Certificate Status</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                        <span className="text-sm text-slate-500">Last verified: 2024-01-15</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h4 className="font-medium">Access Control</h4>
                  <div>
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input id="session-timeout" type="number" defaultValue="30" className="w-32" />
                  </div>
                  <div>
                    <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
                    <Input id="max-login-attempts" type="number" defaultValue="5" className="w-32" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Network Settings Tab */}
          <TabsContent value="network" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5" />
                  Network Configuration
                </CardTitle>
                <CardDescription>Configure network settings and connections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="default-endpoint">Default Endpoint</Label>
                      <Input id="default-endpoint" defaultValue="https://connector.example.com:8080" />
                    </div>
                    <div>
                      <Label htmlFor="inbound-model">Inbound Model Version</Label>
                      <Input id="inbound-model" defaultValue="4.2.7" />
                    </div>
                    <div>
                      <Label htmlFor="outbound-model">Outbound Model Version</Label>
                      <Input id="outbound-model" defaultValue="4.2.7" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label>Proxy Configuration</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="no-proxy" name="proxy" defaultChecked />
                          <Label htmlFor="no-proxy">No proxy</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="manual-proxy" name="proxy" />
                          <Label htmlFor="manual-proxy">Manual configuration</Label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="log-level">Log Level</Label>
                      <Select defaultValue="info">
                        <SelectTrigger>
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
                    <div>
                      <Label htmlFor="max-connections">Max Concurrent Connections</Label>
                      <Input id="max-connections" type="number" defaultValue="100" />
                    </div>
                    <div>
                      <Label htmlFor="connection-timeout">Connection Timeout (seconds)</Label>
                      <Input id="connection-timeout" type="number" defaultValue="30" />
                    </div>
                    <div>
                      <Label htmlFor="read-timeout">Read Timeout (seconds)</Label>
                      <Input id="read-timeout" type="number" defaultValue="60" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blockchain Settings Tab */}
          <TabsContent value="blockchain" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Blockchain Configuration
                </CardTitle>
                <CardDescription>Configure blockchain network and DID settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="blockchain-network">Blockchain Network</Label>
                      <Select defaultValue="hyperledger">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hyperledger">Hyperledger Fabric</SelectItem>
                          <SelectItem value="ethereum">Ethereum Private</SelectItem>
                          <SelectItem value="quorum">Quorum</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="network-url">Network URL</Label>
                      <Input id="network-url" defaultValue="https://blockchain.example.com:7051" />
                    </div>
                    <div>
                      <Label htmlFor="channel-name">Channel Name</Label>
                      <Input id="channel-name" defaultValue="datachannel" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="did-method">DID Method</Label>
                      <Select defaultValue="fabric">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fabric">did:fabric</SelectItem>
                          <SelectItem value="ethr">did:ethr</SelectItem>
                          <SelectItem value="key">did:key</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="wallet-address">Wallet Address</Label>
                      <div className="relative">
                        <Input
                          id="wallet-address"
                          type={showPassword ? "text" : "password"}
                          defaultValue="0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="gas-limit">Gas Limit</Label>
                      <Input id="gas-limit" type="number" defaultValue="500000" />
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h4 className="font-medium">TrustStore Configuration</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="truststore-url">TrustStore URL</Label>
                      <Input id="truststore-url" defaultValue="https://truststore.example.com" />
                    </div>
                    <div>
                      <Label htmlFor="truststore-alias">TrustStore Alias</Label>
                      <Input id="truststore-alias" defaultValue="connector-cert" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="truststore-password">TrustStore Password</Label>
                    <div className="relative">
                      <Input
                        id="truststore-password"
                        type={showPassword ? "text" : "password"}
                        defaultValue="••••••••••••"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Configure notification settings and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Data Access Requests</Label>
                      <p className="text-sm text-slate-500">Notify when new data requests are received</p>
                    </div>
                    <Switch
                      checked={notifications.dataRequests}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, dataRequests: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Contract Updates</Label>
                      <p className="text-sm text-slate-500">Notify when contracts are modified or expire</p>
                    </div>
                    <Switch
                      checked={notifications.contractUpdates}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, contractUpdates: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Security Alerts</Label>
                      <p className="text-sm text-slate-500">Notify about security events and violations</p>
                    </div>
                    <Switch
                      checked={notifications.securityAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, securityAlerts: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>System Maintenance</Label>
                      <p className="text-sm text-slate-500">Notify about scheduled maintenance</p>
                    </div>
                    <Switch
                      checked={notifications.systemMaintenance}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, systemMaintenance: checked })}
                    />
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h4 className="font-medium">Notification Channels</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email-notifications">Email Address</Label>
                      <Input id="email-notifications" type="email" defaultValue="admin@example.com" />
                    </div>
                    <div>
                      <Label htmlFor="webhook-url">Webhook URL</Label>
                      <Input id="webhook-url" placeholder="https://your-webhook.com/notifications" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Settings Tab */}
          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  Advanced Configuration
                </CardTitle>
                <CardDescription>Advanced system settings and performance tuning</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Debug Mode</Label>
                      <p className="text-sm text-slate-500">Enable detailed logging and debugging</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Performance Monitoring</Label>
                      <p className="text-sm text-slate-500">Enable detailed performance metrics</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-backup</Label>
                      <p className="text-sm text-slate-500">Automatically backup configuration</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h4 className="font-medium">Resource Limits</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="memory-limit">Memory Limit (GB)</Label>
                      <Input id="memory-limit" type="number" defaultValue="8" />
                    </div>
                    <div>
                      <Label htmlFor="cpu-limit">CPU Limit (%)</Label>
                      <Input id="cpu-limit" type="number" defaultValue="80" />
                    </div>
                    <div>
                      <Label htmlFor="storage-limit">Storage Limit (GB)</Label>
                      <Input id="storage-limit" type="number" defaultValue="100" />
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h4 className="font-medium">Sandbox Configuration</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sandbox-runtime">Default Runtime</Label>
                      <Select defaultValue="libkrun">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="libkrun">libkrun</SelectItem>
                          <SelectItem value="docker">Docker</SelectItem>
                          <SelectItem value="podman">Podman</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="sandbox-timeout">Sandbox Timeout (minutes)</Label>
                      <Input id="sandbox-timeout" type="number" defaultValue="30" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
                <CardDescription>Irreversible and destructive actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-red-600">Reset Configuration</h4>
                    <p className="text-sm text-slate-500">Reset all settings to default values</p>
                  </div>
                  <Button variant="destructive">Reset</Button>
                </div>
                <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-red-600">Delete Connector</h4>
                    <p className="text-sm text-slate-500">Permanently delete this connector and all data</p>
                  </div>
                  <Button variant="destructive">Delete</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
