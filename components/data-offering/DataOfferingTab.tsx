"use client";

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
import { cn } from "@/lib/utils";
import { ContractStatus, DataSourceType } from "@/types";
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
  Pause,
  Plus,
  Server,
  Trash2,
  WifiOff,
  XCircle,
} from "lucide-react";

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
                    <Plus className="h-4 w-4" />
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
                      className="border-border"
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
                      className="border-border"
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
                  <div className="flex justify-between">
                    <div className="space-y-2">
                      <Label htmlFor="data-type">Data Source Type</Label>
                      <Select
                        value={newOffering.dataType}
                        onValueChange={(value) =>
                          setNewOffering({
                            ...newOffering,
                            dataType: value as DataSourceType,
                            sourceConfig: undefined, // Reset configuration
                          })
                        }
                      >
                        <SelectTrigger className="border-border">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="local_file">
                            <div className="flex items-center space-x-2">
                              <File className="h-4 w-4" />
                              <span>Local File</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="s3">
                            <div className="flex items-center space-x-2">
                              <Cloud className="h-4 w-4" />
                              <span>S3 Storage</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="nas">
                            <div className="flex items-center space-x-2">
                              <Server className="h-4 w-4" />
                              <span>NAS Storage</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="restful">
                            <div className="flex items-center space-x-2">
                              <Link className="h-4 w-4" />
                              <span>RESTful API</span>
                            </div>
                          </SelectItem>
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
                        <SelectTrigger className="border-border">
                          <SelectValue placeholder="Select policy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Open">Open Access</SelectItem>
                          <SelectItem value="Restricted">
                            Restricted Access
                          </SelectItem>
                          <SelectItem value="Premium">
                            Premium Access
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Configuration based on data source type */}
                  {newOffering.dataType === "local_file" && (
                    <div className="bg-muted/50 space-y-4 rounded-lg border p-4">
                      <h4 className="font-medium">Local File Configuration</h4>
                      <div className="space-y-2">
                        <Label htmlFor="file-path">File Path</Label>
                        <Input
                          id="file-path"
                          className="border-border"
                          placeholder="/path/to/your/file.csv"
                          onChange={(e) =>
                            setNewOffering({
                              ...newOffering,
                              sourceConfig: {
                                ...newOffering.sourceConfig,
                                filePath: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="file-format">File Format</Label>
                        <Select
                          onValueChange={(value) =>
                            setNewOffering({
                              ...newOffering,
                              sourceConfig: {
                                ...newOffering.sourceConfig,
                                format: value,
                              },
                            })
                          }
                        >
                          <SelectTrigger className="border-border">
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CSV">CSV</SelectItem>
                            <SelectItem value="JSON">JSON</SelectItem>
                            <SelectItem value="XML">XML</SelectItem>
                            <SelectItem value="Parquet">Parquet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {newOffering.dataType === "s3" && (
                    <div className="bg-muted/50 space-y-4 rounded-lg border p-4">
                      <h4 className="font-medium">S3 Storage Configuration</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="bucket-name">Bucket Name</Label>
                          <Input
                            id="bucket-name"
                            className="border-border"
                            placeholder="my-data-bucket"
                            onChange={(e) =>
                              setNewOffering({
                                ...newOffering,
                                sourceConfig: {
                                  ...newOffering.sourceConfig,
                                  bucketName: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="object-key">Object Key</Label>
                          <Input
                            id="object-key"
                            className="border-border"
                            placeholder="data/file.csv"
                            onChange={(e) =>
                              setNewOffering({
                                ...newOffering,
                                sourceConfig: {
                                  ...newOffering.sourceConfig,
                                  objectKey: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="region">Region</Label>
                        <Input
                          id="region"
                          className="border-border"
                          placeholder="us-east-1"
                          onChange={(e) =>
                            setNewOffering({
                              ...newOffering,
                              sourceConfig: {
                                ...newOffering.sourceConfig,
                                region: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  )}

                  {newOffering.dataType === "nas" && (
                    <div className="bg-muted/50 space-y-4 rounded-lg border p-4">
                      <h4 className="font-medium">NAS Storage Configuration</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="server-address">Server Address</Label>
                          <Input
                            id="server-address"
                            className="border-border"
                            placeholder="192.168.1.100"
                            onChange={(e) =>
                              setNewOffering({
                                ...newOffering,
                                sourceConfig: {
                                  ...newOffering.sourceConfig,
                                  serverAddress: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="share-path">Share Path</Label>
                          <Input
                            id="share-path"
                            className="border-border"
                            placeholder="/shared/data"
                            onChange={(e) =>
                              setNewOffering({
                                ...newOffering,
                                sourceConfig: {
                                  ...newOffering.sourceConfig,
                                  sharePath: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="protocol">Protocol</Label>
                        <Select
                          onValueChange={(value) =>
                            setNewOffering({
                              ...newOffering,
                              sourceConfig: {
                                ...newOffering.sourceConfig,
                                protocol: value,
                              },
                            })
                          }
                        >
                          <SelectTrigger className="border-border">
                            <SelectValue placeholder="Select protocol" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nfs">NFS</SelectItem>
                            <SelectItem value="smb">SMB</SelectItem>
                            <SelectItem value="ftp">FTP</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {newOffering.dataType === "restful" && (
                    <div className="bg-muted/50 space-y-4 rounded-lg border p-4">
                      <h4 className="font-medium">RESTful API Configuration</h4>
                      <div className="space-y-2">
                        <Label htmlFor="api-endpoint">API Endpoint</Label>
                        <Input
                          id="api-endpoint"
                          className="border-border"
                          placeholder="https://api.example.com/data"
                          onChange={(e) =>
                            setNewOffering({
                              ...newOffering,
                              sourceConfig: {
                                ...newOffering.sourceConfig,
                                apiEndpoint: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="method">Request Method</Label>
                        <Select
                          onValueChange={(value) =>
                            setNewOffering({
                              ...newOffering,
                              sourceConfig: {
                                ...newOffering.sourceConfig,
                                method: value,
                              },
                            })
                          }
                        >
                          <SelectTrigger className="border-border">
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="GET">GET</SelectItem>
                            <SelectItem value="POST">POST</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="auth-type">Authentication Type</Label>
                        <Select
                          onValueChange={(value) =>
                            setNewOffering({
                              ...newOffering,
                              sourceConfig: {
                                ...newOffering.sourceConfig,
                                authentication: {
                                  type: value as "none" | "basic" | "api_key",
                                  credentials: undefined,
                                },
                              },
                            })
                          }
                        >
                          <SelectTrigger className="border-border">
                            <SelectValue placeholder="Select authentication" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="basic">Basic</SelectItem>
                            <SelectItem value="api_key">API Key</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Basic Authentication Fields */}
                      {(newOffering.sourceConfig as any)?.authentication
                        ?.type === "basic" && (
                        <div className="bg-muted/30 space-y-4 rounded border p-3">
                          <h5 className="text-sm font-medium">
                            Basic Authentication
                          </h5>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <Label htmlFor="auth-username">Username</Label>
                              <Input
                                id="auth-username"
                                className="border-border"
                                placeholder="Username"
                                onChange={(e) =>
                                  setNewOffering({
                                    ...newOffering,
                                    sourceConfig: {
                                      ...newOffering.sourceConfig,
                                      authentication: {
                                        ...(newOffering.sourceConfig as any)
                                          ?.authentication,
                                        credentials: {
                                          ...(newOffering.sourceConfig as any)
                                            ?.authentication?.credentials,
                                          username: e.target.value,
                                        },
                                      },
                                    },
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="auth-password">Password</Label>
                              <Input
                                id="auth-password"
                                type="password"
                                className="border-border"
                                placeholder="Password"
                                onChange={(e) =>
                                  setNewOffering({
                                    ...newOffering,
                                    sourceConfig: {
                                      ...newOffering.sourceConfig,
                                      authentication: {
                                        ...(newOffering.sourceConfig as any)
                                          ?.authentication,
                                        credentials: {
                                          ...(newOffering.sourceConfig as any)
                                            ?.authentication?.credentials,
                                          password: e.target.value,
                                        },
                                      },
                                    },
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* API Key Authentication Fields */}
                      {(newOffering.sourceConfig as any)?.authentication
                        ?.type === "api_key" && (
                        <div className="bg-muted/30 space-y-4 rounded border p-3">
                          <h5 className="text-sm font-medium">
                            API Key Authentication
                          </h5>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <Label htmlFor="header-name">Header Name</Label>
                              <Input
                                id="header-name"
                                className="border-border"
                                placeholder="X-API-Key"
                                onChange={(e) =>
                                  setNewOffering({
                                    ...newOffering,
                                    sourceConfig: {
                                      ...newOffering.sourceConfig,
                                      authentication: {
                                        ...(newOffering.sourceConfig as any)
                                          ?.authentication,
                                        credentials: {
                                          ...(newOffering.sourceConfig as any)
                                            ?.authentication?.credentials,
                                          headerName: e.target.value,
                                        },
                                      },
                                    },
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="header-value">Header Value</Label>
                              <Input
                                id="header-value"
                                type="password"
                                className="border-border"
                                placeholder="API Key Value"
                                onChange={(e) =>
                                  setNewOffering({
                                    ...newOffering,
                                    sourceConfig: {
                                      ...newOffering.sourceConfig,
                                      authentication: {
                                        ...(newOffering.sourceConfig as any)
                                          ?.authentication,
                                        credentials: {
                                          ...(newOffering.sourceConfig as any)
                                            ?.authentication?.credentials,
                                          headerValue: e.target.value,
                                        },
                                      },
                                    },
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddOfferingOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={createOffering}>
                      Create Data Resource
                    </Button>
                  </div>
                </div>
              </ActionDialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dataOfferings.map((offering) => {
                const DataSourceIcon = getDataSourceIcon(offering.dataType);
                const RegistrationIcon = getRegistrationIcon(
                  offering.registrationStatus
                );

                return (
                  <div
                    key={offering.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <DataSourceIcon className="text-muted-foreground h-4 w-4" />
                        <h4 className="font-medium">{offering.title}</h4>
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
                          <span>Created:</span>
                          <span>
                            {new Date(offering.createdAt).toLocaleDateString()}
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
                      <Button variant="ghost" size="sm" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
                      <Label htmlFor="expires-at">Expiration Date</Label>
                      <Input
                        id="expires-at"
                        type="datetime-local"
                        className="border-border"
                        value={newContract.expiresAt}
                        onChange={(e) =>
                          setNewContract({
                            ...newContract,
                            expiresAt: e.target.value,
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
    </div>
  );
}
