// Data offering and consumption related types

export type DataSourceType = "local_file" | "s3" | "nas" | "restful";
export type RegistrationStatus =
  | "registered"
  | "unregistered"
  | "registering"
  | "failed";

// Hosting status types
export type HostingStatus = "hosted" | "self_managed" | "pending";

// Cross-border audit status types
export type CrossBorderAuditStatus = "approved" | "pending" | "rejected" | "not_required";

// Traceability information interface
export interface TraceabilityInfo {
  dataSource: string;
  blockchainMainChainId: string;
  ownerDID: string;
  traceabilityHash: string;
}

export interface DataOffering {
  id: string;
  title: string;
  description: string;
  dataType: DataSourceType;
  accessPolicy: string;
  status: "active" | "inactive" | "pending";
  registrationStatus: RegistrationStatus;
  createdAt: string;
  // New enhanced fields
  hostingStatus: HostingStatus;
  crossBorderAuditStatus: CrossBorderAuditStatus;
  dataZoneCode: string;
  storageLocation: string;
  traceabilityInfo: TraceabilityInfo;
  // Configuration based on data type
  sourceConfig?: LocalFileConfig | S3Config | NASConfig | RESTfulConfig;
}

export interface LocalFileConfig {
  filePath: string;
  fileSize?: string;
  format: string;
}

export interface S3Config {
  bucketName: string;
  objectKey: string;
  region: string;
  accessKeyId?: string;
  secretAccessKey?: string;
}

export interface NASConfig {
  serverAddress: string;
  sharePath: string;
  protocol: "nfs" | "smb" | "ftp";
  credentials?: {
    username: string;
    password: string;
  };
}

export interface RESTfulConfig {
  apiEndpoint: string;
  method: "GET" | "POST";
  headers?: Record<string, string>;
  authentication?: {
    type: "none" | "basic" | "api_key";
    credentials?: {
      username?: string;
      password?: string;
      headerName?: string;
      headerValue?: string;
    };
  };
}

export interface ExternalDataOffering {
  id: string;
  title: string;
  description: string;
  dataType: string;
  provider: string;
  providerDID: string;
  accessPolicy: string;
  category: string;
  lastUpdated: string;
  size: string;
  price?: string;
  // New enhanced fields
  hostingStatus: HostingStatus;
  crossBorderAuditStatus: CrossBorderAuditStatus;
  dataZoneCode: string;
  storageLocation: string;
  traceabilityInfo: TraceabilityInfo;
}

export interface DataRequest {
  id: string;
  offeringId: string;
  offeringTitle: string;
  provider: string;
  requestedAt: string;
  status: "pending" | "approved" | "rejected" | "completed";
  accessMode: "api" | "download";
  purpose: string;
}

export type ContractStatus =
  | "active"
  | "expired"
  | "suspended"
  | "transferring"
  | "in_use"
  | "data_unavailable"
  | "violated";

export interface DataContract {
  id: string;
  name: string;
  contractAddress: string;
  providerDID: string;
  consumerDID: string;
  policy: string;
  status: ContractStatus;
  createdAt: string;
  expiresAt?: string;
  // 新增字段
  accessCount: number;
  dataVolume: string;
  maxAccessCount?: number;
  violationCount: number;
  isViolated: boolean;
  isExpired: boolean;
  // Consumer perspective fields
  connectorId?: string; // Which connector this contract is with
  connectorName?: string;
  dataOfferingId?: string;
  dataOfferingTitle?: string;
  accessMethods?: ("download" | "api")[];
  lastAccessed?: string;
}
