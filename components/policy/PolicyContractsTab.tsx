"use client"

import {
  Clock,
  Edit,
  Eye,
  FileText,
  Plus,
  Shield,
  Trash2,
  Users,
} from "lucide-react";
import { ActionDialog, MetricCard, StatusBadge } from "@/components/shared";
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
import { Textarea } from "@/components/ui/textarea";
import { useContracts, useDataOfferings } from "@/hooks";

export function PolicyContractsTab() {
  const {
    digitalContracts,
    isCreateContractOpen,
    setIsCreateContractOpen,
    newContract,
    setNewContract,
    createContract,
    activeContracts,
    pendingContracts,
  } = useContracts();

  const { dataOfferings, policyTemplates } = useDataOfferings();

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          title="Active Contracts"
          value={activeContracts.length}
          description="Currently enforced"
          icon={FileText}
          variant="primary"
        />
        <MetricCard
          title="Pending Contracts"
          value={pendingContracts.length}
          description="Awaiting approval"
          icon={Clock}
          variant="secondary"
        />
        <MetricCard
          title="Total Contracts"
          value={digitalContracts.length}
          description="All contracts"
          icon={Users}
        />
        <MetricCard
          title="Policy Templates"
          value={policyTemplates.length}
          description="Available policies"
          icon={Shield}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Digital Contracts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Digital Contracts</CardTitle>
                <CardDescription>
                  Manage data sharing agreements and smart contracts
                </CardDescription>
              </div>
              <ActionDialog
                trigger={
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Contract
                  </Button>
                }
                title="Create Digital Contract"
                description="Define terms and conditions for data sharing"
                open={isCreateContractOpen}
                onOpenChange={setIsCreateContractOpen}
                maxWidth="lg"
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contract-title">Contract Title</Label>
                    <Input
                      id="contract-title"
                      value={newContract.title}
                      onChange={(e) =>
                        setNewContract({
                          ...newContract,
                          title: e.target.value,
                        })
                      }
                      placeholder="Data Sharing Agreement - Analytics"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contract-description">Description</Label>
                    <Textarea
                      id="contract-description"
                      value={newContract.description}
                      onChange={(e) =>
                        setNewContract({
                          ...newContract,
                          description: e.target.value,
                        })
                      }
                      placeholder="Describe the contract terms..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="provider">Data Provider</Label>
                      <Input
                        id="provider"
                        value={newContract.provider}
                        onChange={(e) =>
                          setNewContract({
                            ...newContract,
                            provider: e.target.value,
                          })
                        }
                        placeholder="Provider organization"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="consumer">Data Consumer</Label>
                      <Input
                        id="consumer"
                        value={newContract.consumer}
                        onChange={(e) =>
                          setNewContract({
                            ...newContract,
                            consumer: e.target.value,
                          })
                        }
                        placeholder="Consumer organization"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="data-offering">Data Offering</Label>
                      <Select
                        value={newContract.dataOfferingId}
                        onValueChange={(value) =>
                          setNewContract({
                            ...newContract,
                            dataOfferingId: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select offering" />
                        </SelectTrigger>
                        <SelectContent>
                          {dataOfferings.map((offering) => (
                            <SelectItem key={offering.id} value={offering.id}>
                              {offering.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="policy-template">Policy Template</Label>
                      <Select
                        value={newContract.policyTemplateId}
                        onValueChange={(value) =>
                          setNewContract({
                            ...newContract,
                            policyTemplateId: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select policy" />
                        </SelectTrigger>
                        <SelectContent>
                          {policyTemplates.map((policy) => (
                            <SelectItem key={policy.id} value={policy.id}>
                              {policy.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input
                        id="start-date"
                        type="datetime-local"
                        value={newContract.startDate}
                        onChange={(e) =>
                          setNewContract({
                            ...newContract,
                            startDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-date">End Date</Label>
                      <Input
                        id="end-date"
                        type="datetime-local"
                        value={newContract.endDate}
                        onChange={(e) =>
                          setNewContract({
                            ...newContract,
                            endDate: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateContractOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={createContract}>Create Contract</Button>
                  </div>
                </div>
              </ActionDialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {digitalContracts.map((contract) => (
                <div key={contract.id} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium">{contract.title}</h4>
                        <StatusBadge status={contract.status} type="contract" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {contract.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                        <span>Provider: {contract.provider}</span>
                        <span>Consumer: {contract.consumer}</span>
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                        <span>
                          Start:{" "}
                          {new Date(contract.startDate).toLocaleDateString()}
                        </span>
                        <span>
                          End: {new Date(contract.endDate).toLocaleDateString()}
                        </span>
                        {contract.violationCount > 0 && (
                          <span className="text-red-600">
                            Violations: {contract.violationCount}
                          </span>
                        )}
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
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Policy Management */}
        <Card>
          <CardHeader>
            <CardTitle>Policy Management</CardTitle>
            <CardDescription>
              Define and manage access control policies
            </CardDescription>
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
                  <p className="text-sm text-muted-foreground mb-2">
                    {policy.description}
                  </p>
                  <div className="flex items-center space-x-2 mb-2">
                    <StatusBadge status={policy.category} className="text-xs" />
                    <StatusBadge status={policy.severity} className="text-xs" />
                    <span className="text-xs text-muted-foreground">
                      {policy.enforcementType}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {policy.rules.slice(0, 2).map((rule, index) => (
                      <div
                        key={index}
                        className="text-xs text-muted-foreground"
                      >
                        • {rule}
                      </div>
                    ))}
                    {policy.rules.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{policy.rules.length - 2} more rules
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
