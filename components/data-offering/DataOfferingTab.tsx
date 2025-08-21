"use client"

import {
  Database,
  Edit,
  Eye,
  FileText,
  Globe,
  Plus,
  Trash2,
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
import { useDataOfferings } from "@/hooks";

export function DataOfferingTab() {
  const {
    dataOfferings,
    dataContracts,
    isAddOfferingOpen,
    setIsAddOfferingOpen,
    isAddContractOpen,
    setIsAddContractOpen,
    newOffering,
    setNewOffering,
    newContract,
    setNewContract,
    createOffering,
    createContract,
  } = useDataOfferings();

  const activeOfferingsCount = dataOfferings.filter(
    (o) => o.status === "active"
  ).length;

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
          title="Data Contracts"
          value={dataContracts.length}
          description="Signed data usage contracts"
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
                <CardDescription>
                  Manage your published data resources
                </CardDescription>
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
                      onChange={(e) =>
                        setNewOffering({
                          ...newOffering,
                          title: e.target.value,
                        })
                      }
                      placeholder="Customer Analytics Dataset"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="offering-description">Description</Label>
                    <Textarea
                      id="offering-description"
                      value={newOffering.description}
                      onChange={(e) =>
                        setNewOffering({
                          ...newOffering,
                          description: e.target.value,
                        })
                      }
                      placeholder="Describe your data offering..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="data-type">Data Type</Label>
                      <Select
                        value={newOffering.dataType}
                        onValueChange={(value) =>
                          setNewOffering({ ...newOffering, dataType: value })
                        }
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
                        onValueChange={(value) =>
                          setNewOffering({
                            ...newOffering,
                            accessPolicy: value,
                          })
                        }
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
                    <Button
                      variant="outline"
                      onClick={() => setIsAddOfferingOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={createOffering}>Create Offering</Button>
                  </div>
                </div>
              </ActionDialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dataOfferings.map((offering) => (
                <div
                  key={offering.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{offering.title}</h4>
                      <StatusBadge status={offering.status} />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {offering.description}
                    </p>
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

        {/* Data Contract Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Data Contract</CardTitle>
                <CardDescription>
                  Show the data usage contract information
                </CardDescription>
              </div>
              <ActionDialog
                trigger={
                  <Button size="sm" variant="secondary">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Contract
                  </Button>
                }
                title="Create Data Contract"
                description="Add a new data usage contract"
                open={isAddContractOpen}
                onOpenChange={setIsAddContractOpen}
                maxWidth="md"
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contract-address">Contract Address</Label>
                    <Input
                      id="contract-address"
                      value={newContract.contractAddress}
                      onChange={(e) =>
                        setNewContract({
                          ...newContract,
                          contractAddress: e.target.value,
                        })
                      }
                      placeholder="0x1234abcd...ef56"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="provider-did">Provider DID</Label>
                    <Input
                      id="provider-did"
                      value={newContract.providerDID}
                      onChange={(e) =>
                        setNewContract({
                          ...newContract,
                          providerDID: e.target.value,
                        })
                      }
                      placeholder="did:example:provider123"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="consumer-did">Consumer DID</Label>
                    <Input
                      id="consumer-did"
                      value={newContract.consumerDID}
                      onChange={(e) =>
                        setNewContract({
                          ...newContract,
                          consumerDID: e.target.value,
                        })
                      }
                      placeholder="did:example:consumer456"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="policy">Policy</Label>
                    <Select
                      value={newContract.policy}
                      onValueChange={(value) =>
                        setNewContract({ ...newContract, policy: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select policy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Restricted Access">
                          Restricted Access
                        </SelectItem>
                        <SelectItem value="Partner Only">
                          Partner Only
                        </SelectItem>
                        <SelectItem value="GDPR Compliance">
                          GDPR Compliance
                        </SelectItem>
                        <SelectItem value="Open Access">Open Access</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddContractOpen(false)}
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
              {dataContracts.map((contract) => (
                <div key={contract.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium text-sm">
                          Contract Address
                        </h4>
                        <StatusBadge status={contract.status} />
                      </div>
                      <p className="text-xs font-mono text-muted-foreground break-all">
                        {contract.contractAddress}
                      </p>
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
                  <div className="space-y-2">
                    <div className="grid grid-cols-1 gap-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Provider DID:
                        </span>
                        <span className="font-mono truncate ml-2">
                          {contract.providerDID}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Consumer DID:
                        </span>
                        <span className="font-mono truncate ml-2">
                          {contract.consumerDID}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Policy:</span>
                        <span className="font-medium">{contract.policy}</span>
                      </div>
                    </div>
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
