// Data offering and consumption related types

export interface DataOffering {
  id: string
  title: string
  description: string
  dataType: string
  accessPolicy: string
  status: "active" | "inactive" | "pending"
  createdAt: string
}

export interface ExternalDataOffering {
  id: string
  title: string
  description: string
  dataType: string
  provider: string
  providerDID: string
  accessPolicy: string
  category: string
  lastUpdated: string
  size: string
  price?: string
}

export interface DataRequest {
  id: string
  offeringId: string
  offeringTitle: string
  provider: string
  requestedAt: string
  status: "pending" | "approved" | "rejected" | "completed"
  accessMode: "api" | "download"
  purpose: string
}

export interface DataContract {
  id: string
  contractAddress: string
  providerDID: string
  consumerDID: string
  policy: string
  status: "active" | "expired" | "suspended"
  createdAt: string
  expiresAt?: string
}
