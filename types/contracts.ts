// Contract and policy related types

export interface PolicyTemplate {
  id: string
  name: string
  description: string
  rules: string[]
  category: "access" | "usage" | "retention" | "compliance"
  severity: "low" | "medium" | "high"
  enforcementType: "automatic" | "manual" | "hybrid"
}

export interface DigitalContract {
  id: string
  title: string
  description: string
  provider: string
  consumer: string
  dataOfferingId: string
  policyTemplateId: string
  status: "draft" | "pending" | "active" | "expired" | "terminated" | "violated"
  createdAt: string
  startDate: string
  endDate: string
  terms: ContractTerm[]
  blockchainTxId?: string
  violationCount: number
}

export interface ContractTerm {
  id: string
  type: "access_limit" | "retention_period" | "usage_restriction" | "payment" | "compliance"
  description: string
  value: string
  unit?: string
  enforced: boolean
}

export interface SmartContractTemplate {
  id: string
  name: string
  description: string
  category: "data_sharing" | "payment" | "compliance" | "access_control"
  code: string
  parameters: ContractParameter[]
  deploymentCost: string
}

export interface ContractParameter {
  name: string
  type: "string" | "number" | "boolean" | "address"
  description: string
  required: boolean
  defaultValue?: string
}
