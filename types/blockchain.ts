// Blockchain related types

export interface BlockchainNetwork {
  id: string;
  name: string;
  type: "ZLTC";
  chainType: "main" | "sub";
  subChainType?: "catalog" | "audit" | "business" | "lineage";
  chainId: number;
  status: "connected" | "disconnected" | "syncing";
  curveAlgorithm: "Secp256k1" | "Sm2p256v1";
  witnessNodes: number;
  consensusNodes: number;
  blockHeight: number;
  purpose: string;
  description: string;
}

export interface BlockchainTransaction {
  id: string;
  hash: string;
  type:
    | "did_registration"
    | "contract_deployment"
    | "data_access"
    | "audit_log"
    | "catalog_query"
    | "connector_operation"
    | "business_contract"
    | "lineage_trace";
  from: string;
  to: string;
  status: "pending" | "confirmed" | "failed";
  timestamp: string;
  blockNumber: number;
  chainType: "main" | "sub";
  subChainType?: "catalog" | "audit" | "business" | "lineage";
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action:
    | "did_registration"
    | "contract_deployment"
    | "data_request"
    | "data_transfer"
    | "policy_update";
  actor: string;
  target: string;
  details: string;
  blockchainTxId?: string;
  status: "success" | "failed" | "pending";
  gasUsed?: string;
}
