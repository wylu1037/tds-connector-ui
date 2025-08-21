"use client"

import {
  Clock,
  Database,
  Download,
  ExternalLink,
  Plus,
  Users,
} from "lucide-react";
import {
  ActionDialog,
  MetricCard,
  SearchFilter,
  StatusBadge,
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
import { useDataOfferings, useIdentity } from "@/hooks";
import type { DataRequest, ExternalDataOffering } from "@/types"

const categoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "analytics", label: "Analytics" },
  { value: "research", label: "Research" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "iot", label: "IoT" },
]

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
  } = useDataOfferings()

  const activeRequestsCount = dataRequests.filter((r: DataRequest) => r.status === "pending" || r.status === "approved").length

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
          title="Active Requests"
          value={activeRequestsCount}
          description="Pending/approved"
          icon={Clock}
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
          title="Total Requests"
          value={dataRequests.length}
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

        {/* Request Management */}
        <Card>
          <CardHeader>
            <CardTitle>Data Requests</CardTitle>
            <CardDescription>Track your data access requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dataRequests.map((request: DataRequest) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-sm">
                        {request.offeringTitle}
                      </h4>
                      <StatusBadge
                        status={request.status}
                        className="text-xs"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {request.provider}
                    </p>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                      <span>Mode: {request.accessMode}</span>
                      <span>
                        Requested:{" "}
                        {new Date(request.requestedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  {request.status === "approved" && (
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Access
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connected Connectors */}
      <Card>
        <CardHeader>
          <CardTitle>Connected Connectors</CardTitle>
          <CardDescription>
            Manage your trusted connector relationships
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {connectedConnectors.map((connector) => (
              <div key={connector.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{connector.name}</h4>
                  <StatusBadge status={connector.status} />
                </div>
                <p className="text-sm text-muted-foreground font-mono">
                  {connector.did}
                </p>
                <div className="flex items-center justify-between mt-3 text-sm">
                  <span className="text-muted-foreground">
                    {connector.offeringsCount} offerings
                  </span>
                  <span className="text-muted-foreground">
                    Last seen:{" "}
                    {new Date(connector.lastSeen).toLocaleDateString()}
                  </span>
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
