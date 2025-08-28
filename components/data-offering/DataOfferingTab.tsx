"use client";

import { DateTimePicker } from "@/components/DateTimePicker";
import { DataOfferingDetailsDialog } from "@/components/data-offering/DataOfferingDetailsDialog";
import { CreateDataOfferingDialog } from "@/components/data-offering/CreateDataOfferingDialog";
import { ActionDialog, MetricCard, StatusBadge } from "@/components/shared";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDataOfferings } from "@/hooks";
import { cn } from "@/lib/utils";
import {
  ContractStatus,
  CrossBorderAuditStatus,
  DataSourceType,
  HostingStatus,
} from "@/types";
import {
  Activity,
  AlertTriangle,
  ArrowUpDown,
  Ban,
  CheckCircle,
  Clock,
  Cloud,
  Database,
  Edit,
  Eye,
  File,
  FileText,
  Globe,
  Link,
  MoreHorizontal,
  Pause,
  Plus,
  Server,
  Shield,
  Trash2,
  WifiOff,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Data source type icon mapping
const getDataSourceIcon = (type: DataSourceType) => {
  switch (type) {
    case "local_file":
      return File;
    case "s3":
      return Cloud;
    case "nas":
      return Server;
    case "restful":
      return Link;
    default:
      return Database;
  }
};

// Registration status icon mapping
const getRegistrationIcon = (status: string) => {
  switch (status) {
    case "registered":
      return CheckCircle;
    case "registering":
      return Clock;
    case "failed":
      return XCircle;
    default:
      return AlertTriangle;
  }
};

// Contract status icon mapping
const getContractStatusIcon = (status: ContractStatus) => {
  switch (status) {
    case "active":
      return CheckCircle;
    case "transferring":
      return ArrowUpDown;
    case "in_use":
      return Activity;
    case "suspended":
      return Pause;
    case "expired":
      return Clock;
    case "data_unavailable":
      return WifiOff;
    case "violated":
      return Ban;
    default:
      return AlertTriangle;
  }
};

// Data source type label mapping
const getDataSourceLabel = (type: DataSourceType) => {
  switch (type) {
    case "local_file":
      return "Local File";
    case "s3":
      return "S3 Storage";
    case "nas":
      return "NAS Storage";
    case "restful":
      return "RESTful API";
    default:
      return "Unknown";
  }
};

// Contract status label mapping
const getContractStatusLabel = (status: ContractStatus) => {
  switch (status) {
    case "active":
      return "In Use";
    case "transferring":
      return "Transferring";
    case "in_use":
      return "In Use";
    case "suspended":
      return "Suspended";
    case "expired":
      return "Expired";
    case "data_unavailable":
      return "Data Unavailable";
    case "violated":
      return "Violated";
    default:
      return "Unknown";
  }
};

// Hosting status icon mapping
const getHostingStatusIcon = (status: HostingStatus) => {
  switch (status) {
    case "hosted":
      return Shield;
    case "self_managed":
      return Server;
    case "pending":
      return Clock;
    default:
      return AlertTriangle;
  }
};

// Hosting status label mapping
const getHostingStatusLabel = (status: HostingStatus) => {
  switch (status) {
    case "hosted":
      return "Hosted";
    case "self_managed":
      return "Self Managed";
    case "pending":
      return "Pending";
    default:
      return "Unknown";
  }
};

// Cross-border audit status icon mapping
const getCrossBorderAuditIcon = (status: CrossBorderAuditStatus) => {
  switch (status) {
    case "approved":
      return CheckCircle;
    case "pending":
      return Clock;
    case "rejected":
      return XCircle;
    case "not_required":
      return Shield;
    default:
      return AlertTriangle;
  }
};

// Cross-border audit status label mapping
const getCrossBorderAuditLabel = (status: CrossBorderAuditStatus) => {
  switch (status) {
    case "approved":
      return "Approved";
    case "pending":
      return "Pending";
    case "rejected":
      return "Rejected";
    case "not_required":
      return "Not Required";
    default:
      return "Unknown";
  }
};

export function DataOfferingTab() {
  const {
    dataOfferings,
    dataContracts,
    isAddOfferingOpen,
    setIsAddOfferingOpen,
    isAddContractOpen,
    setIsAddContractOpen,
    newContract,
    setNewContract,
    createContract,
  } = useDataOfferings();

  // State for data details dialog
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedOffering, setSelectedOffering] = useState<any>(null);

  const activeOfferingsCount = dataOfferings.filter(
    (o) => o.status === "active"
  ).length;

  // Handle view details click
  const handleViewDetails = (offering: any) => {
    setSelectedOffering(offering);
    setIsDetailsOpen(true);
  };

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
              <CreateDataOfferingDialog 
                open={isAddOfferingOpen}
                onOpenChange={setIsAddOfferingOpen}
                onSuccess={() => {
                  // 刷新数据列表，这里可以调用API重新获取数据
                  toast.success("数据资源创建成功");
                }}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dataOfferings.map((offering) => {
                const DataSourceIcon = getDataSourceIcon(offering.dataType);
                const RegistrationIcon = getRegistrationIcon(
                  offering.registrationStatus
                );
                const HostingIcon = getHostingStatusIcon(
                  offering.hostingStatus
                );
                const CrossBorderIcon = getCrossBorderAuditIcon(
                  offering.crossBorderAuditStatus
                );

                return (
                  <div
                    key={offering.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <DataSourceIcon className="text-muted-foreground h-4 w-4" />
                        <h4 className="font-medium whitespace-nowrap">
                          {offering.title}
                        </h4>
                        <StatusBadge status={offering.status} />
                        <div
                          className={cn(
                            "flex items-center space-x-1 rounded-md px-2 py-1 text-xs",
                            offering.registrationStatus === "registered" &&
                              "bg-green-100 text-green-800",
                            offering.registrationStatus === "registering" &&
                              "bg-yellow-100 text-yellow-800",
                            offering.registrationStatus === "unregistered" &&
                              "bg-gray-100 text-gray-800",
                            offering.registrationStatus === "failed" &&
                              "bg-red-100 text-red-800"
                          )}
                        >
                          <RegistrationIcon className="h-3 w-3" />
                          <span>
                            {offering.registrationStatus === "registered" &&
                              "Registered"}
                            {offering.registrationStatus === "registering" &&
                              "Registering"}
                            {offering.registrationStatus === "unregistered" &&
                              "Unregistered"}
                            {offering.registrationStatus === "failed" &&
                              "Failed"}
                          </span>
                        </div>
                        {/* Hosting Status Badge */}
                        <div
                          className={cn(
                            "flex items-center space-x-1 rounded-md px-2 py-1 text-xs",
                            offering.hostingStatus === "hosted" &&
                              "bg-blue-100 text-blue-800",
                            offering.hostingStatus === "self_managed" &&
                              "bg-purple-100 whitespace-nowrap text-purple-800",
                            offering.hostingStatus === "pending" &&
                              "bg-orange-100 text-orange-800"
                          )}
                        >
                          <HostingIcon className="h-3 w-3" />
                          <span>
                            {getHostingStatusLabel(offering.hostingStatus)}
                          </span>
                        </div>
                        {/* Cross-border Audit Status Badge */}
                        <div
                          className={cn(
                            "flex items-center space-x-1 rounded-md px-2 py-1 text-xs",
                            offering.crossBorderAuditStatus === "approved" &&
                              "bg-green-100 text-green-800",
                            offering.crossBorderAuditStatus === "pending" &&
                              "bg-yellow-100 text-yellow-800",
                            offering.crossBorderAuditStatus === "rejected" &&
                              "bg-red-100 text-red-800",
                            offering.crossBorderAuditStatus ===
                              "not_required" && "bg-gray-100 text-gray-800"
                          )}
                        >
                          <CrossBorderIcon className="h-3 w-3" />
                          <span>
                            {getCrossBorderAuditLabel(
                              offering.crossBorderAuditStatus
                            )}
                          </span>
                        </div>
                      </div>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {offering.description}
                      </p>
                      <div className="text-muted-foreground mt-2 flex items-center space-x-4 text-xs">
                        <div className="flex items-center space-x-1">
                          <span>Type:</span>
                          <span className="font-medium">
                            {getDataSourceLabel(offering.dataType)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>Policy:</span>
                          <span className="font-medium">
                            {offering.accessPolicy}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>Zone Code:</span>
                          <span className="font-mono text-xs">
                            {offering.dataZoneCode}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>Created:</span>
                          <span>
                            {new Date(offering.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Action Buttons */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleViewDetails(offering)}
                        >
                          <Eye className="mr-2 size-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 size-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 size-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                );
              })}
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
                    <Plus className="h-4 w-4" />
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
                    <Label htmlFor="contract-name">Contract Name</Label>
                    <Input
                      id="contract-name"
                      className="border-border"
                      value={newContract.name}
                      onChange={(e) =>
                        setNewContract({
                          ...newContract,
                          name: e.target.value,
                        })
                      }
                      placeholder="Data Usage Contract - 2024"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contract-address">Contract Address</Label>
                    <Input
                      id="contract-address"
                      className="border-border"
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="provider-did">Provider DID</Label>
                      <Input
                        id="provider-did"
                        className="border-border"
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
                        className="border-border"
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
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="policy">Access Policy</Label>
                    <Select
                      value={newContract.policy}
                      onValueChange={(value) =>
                        setNewContract({ ...newContract, policy: value })
                      }
                    >
                      <SelectTrigger className="border-border">
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="max-access">Max Access Count</Label>
                      <Input
                        id="max-access"
                        type="number"
                        className="border-border"
                        value={newContract.maxAccessCount || ""}
                        onChange={(e) =>
                          setNewContract({
                            ...newContract,
                            maxAccessCount: e.target.value
                              ? parseInt(e.target.value)
                              : undefined,
                          })
                        }
                        placeholder="1000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Expiration Date</Label>
                      <DateTimePicker
                        value={newContract.expiresAt}
                        onChange={(value) =>
                          setNewContract({
                            ...newContract,
                            expiresAt: value,
                          })
                        }
                      />
                    </div>
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
              {dataContracts.map((contract) => {
                const ContractStatusIcon = getContractStatusIcon(
                  contract.status
                );
                const isExpiredOrViolated =
                  contract.isExpired || contract.isViolated;
                const canSuspend =
                  contract.status === "active" || contract.status === "in_use";

                return (
                  <div key={contract.id} className="rounded-lg border p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center space-x-2">
                          <ContractStatusIcon className="text-muted-foreground h-4 w-4" />
                          <h4 className="text-sm font-medium">
                            {contract.name}
                          </h4>
                          <div
                            className={cn(
                              "flex items-center space-x-1 rounded-md px-2 py-1 text-xs",
                              contract.status === "active" &&
                                "bg-green-100 text-green-800",
                              contract.status === "transferring" &&
                                "bg-blue-100 text-blue-800",
                              contract.status === "in_use" &&
                                "bg-purple-100 text-purple-800",
                              contract.status === "suspended" &&
                                "bg-gray-100 text-gray-800",
                              contract.status === "expired" &&
                                "bg-orange-100 text-orange-800",
                              contract.status === "data_unavailable" &&
                                "bg-red-100 text-red-800",
                              contract.status === "violated" &&
                                "bg-red-100 text-red-800"
                            )}
                          >
                            <span>
                              {getContractStatusLabel(contract.status)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm" title="View Details">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Edit">
                          <Edit className="h-4 w-4" />
                        </Button>
                        {canSuspend && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                title={
                                  isExpiredOrViolated
                                    ? "Suspend Contract (Violated or Expired)"
                                    : "Suspend Contract"
                                }
                                className={
                                  isExpiredOrViolated ? "text-red-600" : ""
                                }
                              >
                                <Ban className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Confirm Contract Suspension
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  {isExpiredOrViolated ? (
                                    <>
                                      Issues detected with this contract:
                                      {contract.isExpired && (
                                        <div>• Contract has expired</div>
                                      )}
                                      {contract.isViolated && (
                                        <div>
                                          • Contract has violations (Violation
                                          count:
                                          {contract.violationCount})
                                        </div>
                                      )}
                                      <br />
                                      Are you sure you want to suspend this
                                      contract? This action cannot be undone.
                                    </>
                                  ) : (
                                    "Are you sure you want to suspend this contract? This will immediately stop data access and cannot be undone."
                                  )}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className={
                                    isExpiredOrViolated
                                      ? "bg-red-600 hover:bg-red-700"
                                      : ""
                                  }
                                  onClick={() => {
                                    // TODO: Implement suspension logic
                                    console.log(
                                      "Suspending contract:",
                                      contract.id
                                    );
                                  }}
                                >
                                  {isExpiredOrViolated
                                    ? "Force Suspend"
                                    : "Confirm Suspend"}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </div>

                    {/* Contract Address */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">
                          Contract Address:
                        </span>
                        <span className="text-muted-foreground ml-2 font-mono break-all">
                          {contract.contractAddress}
                        </span>
                      </div>
                    </div>

                    {/* Main Information */}
                    <div className="space-y-2">
                      <div className="grid grid-cols-1 gap-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Provider DID:
                          </span>
                          <span className="ml-2 truncate font-mono">
                            {contract.providerDID}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Consumer DID:
                          </span>
                          <span className="ml-2 truncate font-mono">
                            {contract.consumerDID}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Access Policy:
                          </span>
                          <span className="font-medium">{contract.policy}</span>
                        </div>
                      </div>
                    </div>

                    {/* Usage Statistics */}
                    <div className="mt-3 border-t pt-3">
                      <div className="grid grid-cols-3 gap-4 text-xs">
                        <div className="text-center">
                          <div className="text-muted-foreground">
                            Access Count
                          </div>
                          <div className="text-sm font-medium">
                            {contract.accessCount}
                            {contract.maxAccessCount && (
                              <span className="text-muted-foreground">
                                /{contract.maxAccessCount}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-muted-foreground">
                            Data Volume
                          </div>
                          <div className="text-sm font-medium">
                            {contract.dataVolume}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-muted-foreground">
                            Expiration Date
                          </div>
                          <div
                            className={cn(
                              "text-sm font-medium",
                              contract.isExpired && "text-red-600"
                            )}
                          >
                            {contract.expiresAt
                              ? new Date(
                                  contract.expiresAt
                                ).toLocaleDateString()
                              : "Unlimited"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Warning Information */}
                    {(contract.isExpired || contract.isViolated) && (
                      <div className="mt-3 rounded-md border border-red-200 bg-red-50 p-2">
                        <div className="flex items-center space-x-2 text-xs text-red-800">
                          <AlertTriangle className="h-4 w-4" />
                          <div>
                            {contract.isExpired && (
                              <div>Contract has expired</div>
                            )}
                            {contract.isViolated && (
                              <div>
                                Contract violations detected (Count:
                                {contract.violationCount})
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Details Dialog */}
      <DataOfferingDetailsDialog
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        selectedOffering={selectedOffering}
      />
    </div>
  );
}
