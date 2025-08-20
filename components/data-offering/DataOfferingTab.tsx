"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Database, 
  FileText, 
  Globe, 
  Plus, 
  Edit, 
  Trash2, 
  Eye 
} from "lucide-react"
import { useDataOfferings } from "@/hooks"
import { MetricCard, StatusBadge, ActionDialog } from "@/components/shared"

export function DataOfferingTab() {
  const {
    dataOfferings,
    policyTemplates,
    isAddOfferingOpen,
    setIsAddOfferingOpen,
    isAddPolicyOpen,
    setIsAddPolicyOpen,
    newOffering,
    setNewOffering,
    newPolicy,
    setNewPolicy,
    createOffering,
    createPolicy,
  } = useDataOfferings()

  const activeOfferingsCount = dataOfferings.filter((o) => o.status === "active").length

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Active Offerings"
          value={activeOfferingsCount}
          description="Available for consumption"
          icon={Database}
          variant="primary"
        />
        <MetricCard
          title="Policy Templates"
          value={policyTemplates.length}
          description="Access control policies"
          icon={FileText}
          variant="secondary"
        />
        <MetricCard
          title="Total Offerings"
          value={dataOfferings.length}
          description="All data offerings"
          icon={Globe}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Data Offerings Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Data Offerings</CardTitle>
                <CardDescription>Manage your published data resources</CardDescription>
              </div>
              <ActionDialog
                trigger={
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Offering
                  </Button>
                }
                title="Create Data Offering"
                description="Configure a new data resource to share with other connectors"
                open={isAddOfferingOpen}
                onOpenChange={setIsAddOfferingOpen}
                maxWidth="md"
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="offering-title">Title</Label>
                    <Input
                      id="offering-title"
                      value={newOffering.title}
                      onChange={(e) => setNewOffering({ ...newOffering, title: e.target.value })}
                      placeholder="Customer Analytics Dataset"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="offering-description">Description</Label>
                    <Textarea
                      id="offering-description"
                      value={newOffering.description}
                      onChange={(e) => setNewOffering({ ...newOffering, description: e.target.value })}
                      placeholder="Describe your data offering..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="data-type">Data Type</Label>
                      <Select 
                        value={newOffering.dataType} 
                        onValueChange={(value) => setNewOffering({ ...newOffering, dataType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CSV">CSV</SelectItem>
                          <SelectItem value="JSON">JSON</SelectItem>
                          <SelectItem value="XML">XML</SelectItem>
                          <SelectItem value="Parquet">Parquet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="access-policy">Access Policy</Label>
                      <Select 
                        value={newOffering.accessPolicy} 
                        onValueChange={(value) => setNewOffering({ ...newOffering, accessPolicy: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select policy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Open">Open</SelectItem>
                          <SelectItem value="Restricted">Restricted</SelectItem>
                          <SelectItem value="Premium">Premium</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddOfferingOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={createOffering}>
                      Create Offering
                    </Button>
                  </div>
                </div>
              </ActionDialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dataOfferings.map((offering) => (
                <div key={offering.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{offering.title}</h4>
                      <StatusBadge status={offering.status} />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{offering.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                      <span>Type: {offering.dataType}</span>
                      <span>Policy: {offering.accessPolicy}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Policy Templates Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Policy Templates</CardTitle>
                <CardDescription>Define access control and usage policies</CardDescription>
              </div>
              <ActionDialog
                trigger={
                  <Button size="sm" variant="secondary">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Policy
                  </Button>
                }
                title="Create Policy Template"
                description="Define rules and restrictions for data access"
                open={isAddPolicyOpen}
                onOpenChange={setIsAddPolicyOpen}
                maxWidth="md"
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="policy-name">Policy Name</Label>
                    <Input
                      id="policy-name"
                      value={newPolicy.name}
                      onChange={(e) => setNewPolicy({ ...newPolicy, name: e.target.value })}
                      placeholder="Standard Access Policy"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="policy-description">Description</Label>
                    <Textarea
                      id="policy-description"
                      value={newPolicy.description}
                      onChange={(e) => setNewPolicy({ ...newPolicy, description: e.target.value })}
                      placeholder="Describe the policy..."
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="policy-category">Category</Label>
                      <Select 
                        value={newPolicy.category} 
                        onValueChange={(value) => setNewPolicy({ ...newPolicy, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="access">Access</SelectItem>
                          <SelectItem value="usage">Usage</SelectItem>
                          <SelectItem value="retention">Retention</SelectItem>
                          <SelectItem value="compliance">Compliance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="policy-severity">Severity</Label>
                      <Select 
                        value={newPolicy.severity} 
                        onValueChange={(value) => setNewPolicy({ ...newPolicy, severity: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="enforcement-type">Enforcement</Label>
                      <Select 
                        value={newPolicy.enforcementType} 
                        onValueChange={(value) => setNewPolicy({ ...newPolicy, enforcementType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="automatic">Automatic</SelectItem>
                          <SelectItem value="manual">Manual</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddPolicyOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={createPolicy}>
                      Create Policy
                    </Button>
                  </div>
                </div>
              </ActionDialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {policyTemplates.map((policy) => (
                <div key={policy.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{policy.name}</h4>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{policy.description}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <StatusBadge status={policy.category} type="default" className="text-xs" />
                    <StatusBadge status={policy.severity} type="default" className="text-xs" />
                    <span className="text-xs text-muted-foreground">{policy.enforcementType}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
