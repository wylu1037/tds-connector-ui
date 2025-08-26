"use client"

import {
  Clock,
  Database,
  Download,
  ExternalLink,
  Plus,
  Users,
  Eye,
  Edit,
  Ban,
  Shield,
  MapPin,
  Mail,
  Building,
  Calendar,
  Activity,
  Globe,
  AlertTriangle,
} from "lucide-react";
import {
  ActionDialog,
  MetricCard,
  SearchFilter,
  StatusBadge,
  SecurityRatingChart,
} from "@/components/shared";
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
import { Badge } from "@/components/ui/badge";
import { useDataOfferings, useIdentity } from "@/hooks";
import type {
  DataRequest,
  ExternalDataOffering,
  DataContract,
  ContractStatus,
} from "@/types";
import { cn } from "@/lib/utils";

const categoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "analytics", label: "Analytics" },
  { value: "research", label: "Research" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "iot", label: "IoT" },
];

// Contract status label mapping
const getContractStatusLabel = (status: ContractStatus) => {
  switch (status) {
    case "active":
      return "Active";
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

// Contract status icon mapping
const getContractStatusIcon = (status: ContractStatus) => {
  switch (status) {
    case "active":
      return Activity;
    case "transferring":
      return Download;
    case "in_use":
      return Activity;
    case "suspended":
      return Ban;
    case "expired":
      return Clock;
    case "data_unavailable":
      return AlertTriangle;
    case "violated":
      return Ban;
    default:
      return AlertTriangle;
  }
};

export function DataConsumptionTab() {
  const {
    connectedConnectors,
    isConnectConnectorOpen,
    setIsConnectConnectorOpen,
    newConnector,
    setNewConnector,
    connectConnector,
  } = useIdentity()

  const {
    externalOfferings,
    dataRequests,
    dataContracts,
    isRequestDataOpen,
    setIsRequestDataOpen,
    selectedOffering,
    setSelectedOffering,
    newRequest,
    setNewRequest,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    requestData,
    filteredOfferings,
  } = useDataOfferings();

  const activeRequestsCount = dataRequests.filter((r: DataRequest) => r.status === "pending" || r.status === "approved").length
  const activeContractsCount = dataContracts.filter(
    (c: DataContract) => c.status === "active" || c.status === "in_use"
  ).length;

  const handleRequestData = (offering: ExternalDataOffering) => {
    setSelectedOffering(offering)
    setIsRequestDataOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          title="Available Data"
          value={externalOfferings.length}
          description="External offerings"
          icon={Database}
          variant="primary"
        />
        <MetricCard
          title="Active Contracts"
          value={activeContractsCount}
          description="In use/active"
          icon={Activity}
          variant="secondary"
        />
        <MetricCard
          title="Connected Partners"
          value={
            connectedConnectors.filter((c) => c.status === "connected").length
          }
          description="Trusted connectors"
          icon={Users}
        />
        <MetricCard
          title="Total Contracts"
          value={dataContracts.length}
          description="All time"
          icon={ExternalLink}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Data Catalog */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Data Catalog</CardTitle>
                <CardDescription>
                  Discover and request data from other connectors
                </CardDescription>
              </div>
              {/* <ActionDialog
                trigger={
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Connect Connector
                  </Button>
                }
                title="Connect New Connector"
                description="Establish connection with another trusted connector"
                open={isConnectConnectorOpen}
                onOpenChange={setIsConnectConnectorOpen}
                maxWidth="sm"
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="connector-did">Connector DID</Label>
                    <Input
                      id="connector-did"
                      value={newConnector.did}
                      onChange={(e) => setNewConnector({ ...newConnector, did: e.target.value })}
                      placeholder="did:example:connector123"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="connector-name">Display Name</Label>
                    <Input
                      id="connector-name"
                      value={newConnector.name}
                      onChange={(e) => setNewConnector({ ...newConnector, name: e.target.value })}
                      placeholder="Research Institute"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsConnectConnectorOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={connectConnector}>
                      Connect
                    </Button>
                  </div>
                </div>
              </ActionDialog> */}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search and Filter */}
            <SearchFilter
              searchValue={searchQuery}
              onSearchChange={setSearchQuery}
              filterValue={categoryFilter}
              onFilterChange={setCategoryFilter}
              filterOptions={categoryOptions}
              searchPlaceholder="Search data offerings..."
            />

            {/* Offerings List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredOfferings.map((offering) => (
                <div key={offering.id} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{offering.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {offering.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                        <span>Provider: {offering.provider}</span>
                        <span>Type: {offering.dataType}</span>
                        <span>Size: {offering.size}</span>
                        {offering.price && <span>Price: {offering.price}</span>}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleRequestData(offering)}
                    >
                      Request
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Data Contracts */}
        <Card>
          <CardHeader>
            <CardTitle>Data Contracts</CardTitle>
            <CardDescription>Manage your active data contracts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {dataContracts.map((contract: DataContract) => {
                const ContractStatusIcon = getContractStatusIcon(
                  contract.status
                );
                const isExpiredOrViolated =
                  contract.isExpired || contract.isViolated;
                const canTerminate =
                  contract.status === "active" || contract.status === "in_use";

                return (
                  <div key={contract.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <ContractStatusIcon className="h-4 w-4 text-muted-foreground" />
                          <h4 className="font-medium text-sm">
                            {contract.name}
                          </h4>
                          <div
                            className={cn(
                              "flex items-center space-x-1 px-2 py-1 rounded-md text-xs",
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
                        {contract.connectorName && (
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground mb-1">
                            <Globe className="h-3 w-3" />
                            <span>Connected to: {contract.connectorName}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm" title="View Details">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {contract.accessMethods?.includes("download") && (
                          <Button
                            variant="ghost"
                            size="sm"
                            title="Download Data"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        {contract.accessMethods?.includes("api") && (
                          <Button variant="ghost" size="sm" title="API Access">
                            <Activity className="h-4 w-4" />
                          </Button>
                        )}
                        {canTerminate && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                title={
                                  isExpiredOrViolated
                                    ? "Terminate Contract (Issues Detected)"
                                    : "Terminate Contract"
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
                                  Confirm Contract Termination
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
                                          • Contract has violations (Count:{" "}
                                          {contract.violationCount})
                                        </div>
                                      )}
                                      <br />
                                      Are you sure you want to terminate this
                                      contract? This action cannot be undone.
                                    </>
                                  ) : (
                                    "Are you sure you want to terminate this contract? This will stop all data access and cannot be undone."
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
                                    // TODO: Implement termination logic
                                    console.log(
                                      "Terminating contract:",
                                      contract.id
                                    );
                                  }}
                                >
                                  {isExpiredOrViolated
                                    ? "Force Terminate"
                                    : "Confirm Terminate"}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </div>

                    {/* Contract Details */}
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
                            Access Policy:
                          </span>
                          <span className="font-medium">{contract.policy}</span>
                        </div>
                        {contract.dataOfferingTitle && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Data Offering:
                            </span>
                            <span className="font-medium">
                              {contract.dataOfferingTitle}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Usage Statistics */}
                    <div className="mt-3 pt-3 border-t">
                      <div className="grid grid-cols-3 gap-4 text-xs">
                        <div className="text-center">
                          <div className="text-muted-foreground">
                            Access Count
                          </div>
                          <div className="font-medium text-sm">
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
                          <div className="font-medium text-sm">
                            {contract.dataVolume}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-muted-foreground">
                            Last Access
                          </div>
                          <div className="font-medium text-sm">
                            {contract.lastAccessed
                              ? new Date(
                                  contract.lastAccessed
                                ).toLocaleDateString()
                              : "Never"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Warning Information */}
                    {(contract.isExpired || contract.isViolated) && (
                      <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-md">
                        <div className="flex items-center space-x-2 text-red-800 text-xs">
                          <AlertTriangle className="h-4 w-4" />
                          <div>
                            {contract.isExpired && (
                              <div>Contract has expired</div>
                            )}
                            {contract.isViolated && (
                              <div>
                                Contract violations detected (Count:{" "}
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

      {/* Connected Connectors */}
      <Card>
        <CardHeader>
          <CardTitle>Connected Connectors</CardTitle>
          <CardDescription>
            Manage your trusted connector relationships with security
            assessments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {connectedConnectors.map((connector) => (
              <div
                key={connector.id}
                className="p-6 border rounded-lg space-y-4"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-lg">
                        {connector.name}
                      </h4>
                      <StatusBadge status={connector.status} />
                    </div>
                    {connector.organization && (
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-1">
                        <Building className="h-3 w-3" />
                        <span>{connector.organization}</span>
                      </div>
                    )}
                    {connector.location && (
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-1">
                        <MapPin className="h-3 w-3" />
                        <span>{connector.location}</span>
                      </div>
                    )}
                    {connector.contactEmail && (
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        <span>{connector.contactEmail}</span>
                      </div>
                    )}
                  </div>
                  {connector.securityAssessment && (
                    <div className="flex flex-col items-center space-y-2">
                      <SecurityRatingChart
                        assessment={connector.securityAssessment}
                        size="md"
                        showModal={true}
                      />
                      <Badge
                        className={cn(
                          "text-white text-xs",
                          connector.securityAssessment.rating === "S" &&
                            "bg-green-600",
                          connector.securityAssessment.rating === "A" &&
                            "bg-green-500",
                          connector.securityAssessment.rating === "B" &&
                            "bg-yellow-500",
                          connector.securityAssessment.rating === "C" &&
                            "bg-orange-500",
                          connector.securityAssessment.rating === "D" &&
                            "bg-red-500"
                        )}
                      >
                        Security Rating {connector.securityAssessment.rating}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Description */}
                {connector.description && (
                  <p className="text-sm text-muted-foreground">
                    {connector.description}
                  </p>
                )}

                {/* DID */}
                <div className="bg-muted py-3 rounded-md">
                  <div className="text-xs text-muted-foreground mb-1">DID:</div>
                  <p className="text-sm font-mono break-all">{connector.did}</p>
                </div>

                {/* Data Categories */}
                {connector.dataCategories &&
                  connector.dataCategories.length > 0 && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-2">
                        Data Categories:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {connector.dataCategories.map((category, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Certifications */}
                {connector.certifications &&
                  connector.certifications.length > 0 && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-2">
                        Certifications:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {connector.certifications.map((cert, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            <Shield className="h-3 w-3 mr-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Statistics */}
                <div className="grid grid-cols-3 gap-4 pt-3 border-t">
                  <div className="text-center">
                    <div className="text-sm font-medium">
                      {connector.offeringsCount}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Offerings
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">
                      {new Date(connector.lastSeen).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Last Seen
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      {connector.securityAssessment && (
                        <div className="text-sm font-medium">
                          {new Date(
                            connector.securityAssessment.lastAssessed
                          ).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Security Review
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Request Dialog */}
      <ActionDialog
        trigger={<></>}
        title="Request Data Access"
        description={
          selectedOffering
            ? `Request access to "${selectedOffering.title}" from ${selectedOffering.provider}`
            : undefined
        }
        open={isRequestDataOpen}
        onOpenChange={setIsRequestDataOpen}
        maxWidth="md"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="access-mode">Access Mode</Label>
            <Select
              value={newRequest.accessMode}
              onValueChange={(value: "api" | "download") =>
                setNewRequest({ ...newRequest, accessMode: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="api">API Access</SelectItem>
                <SelectItem value="download">Download</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose</Label>
            <Textarea
              id="purpose"
              value={newRequest.purpose}
              onChange={(e) =>
                setNewRequest({ ...newRequest, purpose: e.target.value })
              }
              placeholder="Describe the intended use of this data..."
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsRequestDataOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={requestData}>Submit Request</Button>
          </div>
        </div>
      </ActionDialog>
    </div>
  );
}
