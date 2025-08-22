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

export type SecurityRating = "S" | "A" | "B" | "C" | "D"

export interface SecurityDimension {
  name: string
  weight: number
  score: number // 0.0 to 1.0
  status: "green" | "yellow" | "red" // Mapped from score
  description: string
}

export interface SecurityAssessment {
  overallScore: number // 0 to 100
  rating: SecurityRating
  dimensions: SecurityDimension[]
  lastAssessed: string
  assessor: string
}

export interface ConnectedConnector {
  id: string
  name: string
  did: string
  status: "connected" | "disconnected" | "pending"
  lastSeen: string
  offeringsCount: number
  // Enhanced information
  description?: string
  location?: string
  organization?: string
  contactEmail?: string
  securityAssessment?: SecurityAssessment
  certifications?: string[]
  dataCategories?: string[]
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
