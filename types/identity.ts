// Identity & DID related types

export interface DIDDocument {
  id: string
  context: string[]
  verificationMethod: VerificationMethod[]
  authentication: string[]
  assertionMethod: string[]
  keyAgreement: string[]
  capabilityInvocation: string[]
  capabilityDelegation: string[]
  service: ServiceEndpoint[]
}

export interface VerificationMethod {
  id: string
  type: string
  controller: string
  publicKeyJwk?: JsonWebKey
  publicKeyMultibase?: string
}

export interface ServiceEndpoint {
  id: string
  type: string
  serviceEndpoint: string
}

export interface ConnectedConnector {
  id: string
  name: string
  did: string
  status: "connected" | "disconnected" | "pending"
  lastSeen: string
  offeringsCount: number
}

export interface ConnectorHealth {
  id: string
  name: string
  status: "healthy" | "warning" | "critical" | "offline"
  lastHeartbeat: string
  responseTime: number
  uptime: string
  version: string
}
