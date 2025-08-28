"use client";

import { StatusBadge } from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { crossBorderAuditService } from "@/lib/services/CrossBorderAuditService";
import {
  CrossBorderAuditStatus,
  DataOffering,
  DataSourceType,
  HostingStatus,
} from "@/types";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Cloud,
  Database,
  File,
  Link,
  Server,
  Shield,
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

interface DataOfferingDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedOffering: DataOffering | null;
}

export function DataOfferingDetailsDialog({
  open,
  onOpenChange,
  selectedOffering,
}: DataOfferingDetailsDialogProps) {
  if (!selectedOffering) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-3xl [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Data Details: {selectedOffering.title}
          </DialogTitle>
          <div className="overflow-y-auto">
            <DialogDescription asChild>
              <div className="px-6 py-4">
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-base font-semibold">
                      Basic Information
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Title</Label>
                        <p className="text-sm">{selectedOffering.title}</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">
                          Data Zone Code
                        </Label>
                        <p className="bg-muted text-muted-foreground/80 rounded px-2 py-1 font-mono text-sm break-all">
                          {selectedOffering.dataZoneCode}
                        </p>
                      </div>
                      <div className="col-span-full space-y-2">
                        <Label className="text-muted-foreground">
                          Description
                        </Label>
                        <p className="text-sm">
                          {selectedOffering.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Status Information */}
                  <div className="space-y-4">
                    <h3 className="text-base font-semibold">
                      Status Information
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">
                          Data Status
                        </Label>
                        <div>
                          <StatusBadge status={selectedOffering.status} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">
                          Registration Status
                        </Label>
                        <div className="flex items-center space-x-2">
                          {(() => {
                            const RegistrationIcon = getRegistrationIcon(
                              selectedOffering.registrationStatus
                            );
                            return <RegistrationIcon className="h-4 w-4" />;
                          })()}
                          <span className="text-sm capitalize">
                            {selectedOffering.registrationStatus}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">
                          Hosting Status
                        </Label>
                        <div className="flex items-center space-x-2">
                          {(() => {
                            const HostingIcon = getHostingStatusIcon(
                              selectedOffering.hostingStatus
                            );
                            return <HostingIcon className="h-4 w-4" />;
                          })()}
                          <span className="text-sm">
                            {getHostingStatusLabel(
                              selectedOffering.hostingStatus
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">
                          Cross-border Audit
                        </Label>
                        <div className="flex items-center space-x-2">
                          {(() => {
                            const CrossBorderIcon = getCrossBorderAuditIcon(
                              selectedOffering.crossBorderAuditStatus
                            );
                            return <CrossBorderIcon className="h-4 w-4" />;
                          })()}
                          <span className="text-sm">
                            {getCrossBorderAuditLabel(
                              selectedOffering.crossBorderAuditStatus
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Storage Information */}
                  <div className="space-y-4">
                    <h3 className="text-base font-semibold">
                      Storage Information
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">
                          Storage Location
                        </Label>
                        <p className="text-sm break-all">
                          {selectedOffering.storageLocation}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">
                          Data Type
                        </Label>
                        <div className="flex items-center space-x-2">
                          {(() => {
                            const DataSourceIcon = getDataSourceIcon(
                              selectedOffering.dataType
                            );
                            return <DataSourceIcon className="h-4 w-4" />;
                          })()}
                          <span className="text-sm">
                            {getDataSourceLabel(selectedOffering.dataType)}
                          </span>
                        </div>
                      </div>
                      <div className="col-span-full space-y-2">
                        <Label className="text-muted-foreground">
                          Access Policy
                        </Label>
                        <p className="text-sm">
                          {selectedOffering.accessPolicy}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Traceability Information */}
                  <div className="space-y-4">
                    <h3 className="text-base font-semibold">
                      Data Traceability Information
                    </h3>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">
                          Data Source
                        </Label>
                        <p className="text-sm break-all">
                          {selectedOffering.traceabilityInfo.dataSource}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="text-muted-foreground">
                            Blockchain Main Chain ID
                          </Label>
                          <p className="bg-muted rounded px-2 py-1 font-mono text-xs break-all">
                            {
                              selectedOffering.traceabilityInfo
                                .blockchainMainChainId
                            }
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-muted-foreground">
                            Owner DID
                          </Label>
                          <p className="bg-muted rounded px-2 py-1 font-mono text-xs break-all">
                            {selectedOffering.traceabilityInfo.ownerDID}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">
                          Traceability Hash
                        </Label>
                        <p className="bg-muted rounded px-2 py-1 font-mono text-xs break-all">
                          {selectedOffering.traceabilityInfo.traceabilityHash}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="space-y-4">
                    <h3 className="text-base font-semibold">Metadata</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">
                          Created Date
                        </Label>
                        <p className="text-sm">
                          {new Date(
                            selectedOffering.createdAt
                          ).toLocaleString()}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Data ID</Label>
                        <p className="font-mono text-xs break-all">
                          {selectedOffering.id}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Source Configuration */}
                  {selectedOffering.sourceConfig && (
                    <div className="space-y-4">
                      <h3 className="text-base font-semibold">
                        Source Configuration
                      </h3>
                      <div className="bg-muted rounded-lg p-4">
                        <pre className="text-muted-foreground text-xs break-all whitespace-pre-wrap">
                          {JSON.stringify(
                            selectedOffering.sourceConfig,
                            null,
                            2
                          )}
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Cross-border Audit Actions */}
                  <div className="space-y-4 border-t pt-4">
                    <h3 className="text-base font-semibold">
                      Cross-border Audit Actions
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        className="text-xs"
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          const result =
                            await crossBorderAuditService.checkAuditRequirement(
                              selectedOffering,
                              "US",
                              "offering_registration"
                            );
                          alert(
                            `Audit Required: ${result.required}\nReason: ${result.reason}`
                          );
                        }}
                      >
                        Check US Requirements
                      </Button>
                      <Button
                        className="text-xs"
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          const result =
                            await crossBorderAuditService.checkAuditRequirement(
                              selectedOffering,
                              "EU",
                              "offering_registration"
                            );
                          alert(
                            `Audit Required: ${result.required}\nReason: ${result.reason}`
                          );
                        }}
                      >
                        Check EU Requirements
                      </Button>
                      <Button
                        className="text-xs"
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          const complianceCheck =
                            await crossBorderAuditService.runComplianceCheck(
                              selectedOffering,
                              "US"
                            );
                          const issuesText =
                            complianceCheck.issues.length > 0
                              ? `\nIssues: ${complianceCheck.issues.join(", ")}`
                              : "";
                          const recommendationsText =
                            complianceCheck.recommendations.length > 0
                              ? `\nRecommendations: ${complianceCheck.recommendations.join(", ")}`
                              : "";
                          alert(
                            `Compliance Score: ${complianceCheck.score}/100\n` +
                              `Status: ${complianceCheck.passed ? "PASSED" : "FAILED"}${issuesText}${recommendationsText}`
                          );
                        }}
                      >
                        Run Compliance Check
                      </Button>
                      {selectedOffering?.crossBorderAuditStatus ===
                        "pending" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={async () => {
                            const auditRequest =
                              await crossBorderAuditService.submitAuditRequest(
                                selectedOffering,
                                "offering_registration",
                                "did:example:connector123",
                                "US"
                              );
                            alert(
                              `Audit request submitted with ID: ${auditRequest.id}`
                            );
                          }}
                        >
                          Submit Audit Request
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </DialogDescription>
            <DialogFooter className="px-6 pb-6 sm:justify-end">
              <DialogClose asChild>
                <Button onClick={() => onOpenChange(false)}>Close</Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}