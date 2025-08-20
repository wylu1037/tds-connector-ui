// Blockchain related types

export interface BlockchainNetwork {
  id: string
  name: string
  type: "ethereum" | "hyperledger" | "polygon" | "private"
  rpcUrl: string
  chainId: number
  status: "connected" | "disconnected" | "syncing"
  blockHeight: number
  gasPrice: string
}

export interface BlockchainTransaction {
  id: string
  hash: string
  type: "did_registration" | "contract_deployment" | "data_access" | "payment"
  from: string
  to: string
  value: string
  gasUsed: string
  gasPrice: string
  status: "pending" | "confirmed" | "failed"
  timestamp: string
  blockNumber: number
}

export interface AuditLog {
  id: string
  timestamp: string
  action: "did_registration" | "contract_deployment" | "data_request" | "data_transfer" | "policy_update"
  actor: string
  target: string
  details: string
  blockchainTxId?: string
  status: "success" | "failed" | "pending"
  gasUsed?: string
}
