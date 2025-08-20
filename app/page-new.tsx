"use client"

import { useTheme } from "next-themes"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { 
  Shield,
  Key,
  Network,
  Database,
  Settings,
  Activity,
  Moon,
  Sun,
  Monitor,
} from "lucide-react"

// Import the new Tab components
import { IdentityTab } from "@/components/identity"
import { DataOfferingTab } from "@/components/data-offering"
import { DataConsumptionTab } from "@/components/data-consumption"
import { PolicyContractsTab } from "@/components/policy"
import { BlockchainTab } from "@/components/blockchain"
import { SandboxTab } from "@/components/sandbox"
import { MonitoringTab } from "@/components/monitoring"

export default function ConnectorDashboard() {
  const { setTheme, theme } = useTheme()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold">TDS Connector</h1>
                  <p className="text-sm text-muted-foreground">Trusted Data Space Management Platform</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="identity" className="space-y-6">
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="identity" className="flex items-center space-x-2">
              <Key className="h-4 w-4" />
              <span className="hidden sm:inline">Identity & DID</span>
              <span className="sm:hidden">Identity</span>
            </TabsTrigger>
            <TabsTrigger value="data-offering" className="flex items-center space-x-2">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">Data Offering</span>
              <span className="sm:hidden">Offering</span>
            </TabsTrigger>
            <TabsTrigger value="data-consumption" className="flex items-center space-x-2">
              <Network className="h-4 w-4" />
              <span className="hidden sm:inline">Data Consumption</span>
              <span className="sm:hidden">Consumption</span>
            </TabsTrigger>
            <TabsTrigger value="policy" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Policy & Contracts</span>
              <span className="sm:hidden">Policy</span>
            </TabsTrigger>
            <TabsTrigger value="blockchain" className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Blockchain</span>
              <span className="sm:hidden">Chain</span>
            </TabsTrigger>
            <TabsTrigger value="sandbox" className="flex items-center space-x-2">
              <Monitor className="h-4 w-4" />
              <span className="hidden sm:inline">Sandbox</span>
              <span className="sm:hidden">Sandbox</span>
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Monitoring</span>
              <span className="sm:hidden">Monitor</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Content */}
          <TabsContent value="identity">
            <IdentityTab />
          </TabsContent>

          <TabsContent value="data-offering">
            <DataOfferingTab />
          </TabsContent>

          <TabsContent value="data-consumption">
            <DataConsumptionTab />
          </TabsContent>

          <TabsContent value="policy">
            <PolicyContractsTab />
          </TabsContent>

          <TabsContent value="blockchain">
            <BlockchainTab />
          </TabsContent>

          <TabsContent value="sandbox">
            <SandboxTab />
          </TabsContent>

          <TabsContent value="monitoring">
            <MonitoringTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
