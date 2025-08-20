import { useState } from "react"
import { BlockchainNetwork, AuditLog, BlockchainTransaction } from "@/types"

export interface UseBlockchainReturn {
  // Networks
  blockchainNetworks: BlockchainNetwork[]
  setBlockchainNetworks: (networks: BlockchainNetwork[]) => void
  selectedNetwork: string
  setSelectedNetwork: (network: string) => void
  
  // Audit logs
  auditLogs: AuditLog[]
  setAuditLogs: (logs: AuditLog[]) => void
  
  // Transactions
  blockchainTransactions: BlockchainTransaction[]
  setBlockchainTransactions: (transactions: BlockchainTransaction[]) => void
  
  // Dialog states
  isAddNetworkOpen: boolean
  setIsAddNetworkOpen: (open: boolean) => void
  
  // Actions
  addNetwork: (networkData: any) => Promise<void>
  connectToNetwork: (networkId: string) => Promise<void>
  
  // Computed values
  activeNetworks: BlockchainNetwork[]
  recentTransactions: BlockchainTransaction[]
  recentAuditLogs: AuditLog[]
}

export function useBlockchain(): UseBlockchainReturn {
  const [blockchainNetworks, setBlockchainNetworks] = useState<BlockchainNetwork[]>([
    {
      id: "mainnet",
      name: "Ethereum Mainnet",
      type: "ethereum",
      rpcUrl: "https://mainnet.infura.io/v3/your-project-id",
      chainId: 1,
      status: "connected",
      blockHeight: 18500000,
      gasPrice: "25 gwei",
    },
    {
      id: "polygon",
      name: "Polygon",
      type: "polygon",
      rpcUrl: "https://polygon-rpc.com",
      chainId: 137,
      status: "connected",
      blockHeight: 51000000,
      gasPrice: "30 gwei",
    },
    {
      id: "private",
      name: "Private Network",
      type: "private",
      rpcUrl: "http://localhost:8545",
      chainId: 1337,
      status: "disconnected",
      blockHeight: 100,
      gasPrice: "1 gwei",
    },
  ])

  const [selectedNetwork, setSelectedNetwork] = useState<string>("mainnet")

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    {
      id: "1",
      timestamp: "2024-01-15T10:30:00Z",
      action: "did_registration",
      actor: "did:example:connector123",
      target: "Blockchain Registry",
      details: "DID document registered successfully",
      blockchainTxId: "0x1234567890abcdef",
      status: "success",
      gasUsed: "21000",
    },
    {
      id: "2",
      timestamp: "2024-01-15T09:15:00Z",
      action: "contract_deployment",
      actor: "did:example:provider456",
      target: "Smart Contract",
      details: "Data access control contract deployed",
      blockchainTxId: "0xabcdef1234567890",
      status: "success",
      gasUsed: "150000",
    },
    {
      id: "3",
      timestamp: "2024-01-15T08:45:00Z",
      action: "data_request",
      actor: "did:example:consumer789",
      target: "Data Provider A",
      details: "Data access request submitted",
      status: "pending",
    },
  ])

  const [blockchainTransactions, setBlockchainTransactions] = useState<BlockchainTransaction[]>([
    {
      id: "1",
      hash: "0x1234567890abcdef1234567890abcdef12345678",
      type: "did_registration",
      from: "0xabcdef1234567890abcdef1234567890abcdef12",
      to: "0x1234567890abcdef1234567890abcdef12345678",
      value: "0.001 ETH",
      gasUsed: "21000",
      gasPrice: "25 gwei",
      status: "confirmed",
      timestamp: "2024-01-15T10:30:00Z",
      blockNumber: 18500123,
    },
    {
      id: "2",
      hash: "0xabcdef1234567890abcdef1234567890abcdef12",
      type: "contract_deployment",
      from: "0x1234567890abcdef1234567890abcdef12345678",
      to: "0x0000000000000000000000000000000000000000",
      value: "0 ETH",
      gasUsed: "150000",
      gasPrice: "30 gwei",
      status: "confirmed",
      timestamp: "2024-01-15T09:15:00Z",
      blockNumber: 18500098,
    },
    {
      id: "3",
      hash: "0x567890abcdef1234567890abcdef1234567890ab",
      type: "data_access",
      from: "0xdef1234567890abcdef1234567890abcdef123456",
      to: "0x4567890abcdef1234567890abcdef1234567890ab",
      value: "0.05 ETH",
      gasUsed: "75000",
      gasPrice: "28 gwei",
      status: "pending",
      timestamp: "2024-01-15T11:00:00Z",
      blockNumber: 0,
    },
  ])

  const [isAddNetworkOpen, setIsAddNetworkOpen] = useState(false)

  const addNetwork = async (networkData: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const newNetwork: BlockchainNetwork = {
      id: Date.now().toString(),
      name: networkData.name,
      type: networkData.type,
      rpcUrl: networkData.rpcUrl,
      chainId: parseInt(networkData.chainId),
      status: "disconnected",
      blockHeight: 0,
      gasPrice: "0 gwei",
    }
    setBlockchainNetworks(prev => [...prev, newNetwork])
    setIsAddNetworkOpen(false)
  }

  const connectToNetwork = async (networkId: string) => {
    await new Promise(resolve => setTimeout(resolve, 1500))
    setBlockchainNetworks(prev => 
      prev.map(network => 
        network.id === networkId 
          ? { ...network, status: "connected" as const }
          : network
      )
    )
  }

  // Computed values
  const activeNetworks = blockchainNetworks.filter(network => network.status === "connected")
  const recentTransactions = blockchainTransactions
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10)
  const recentAuditLogs = auditLogs
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10)

  return {
    blockchainNetworks,
    setBlockchainNetworks,
    selectedNetwork,
    setSelectedNetwork,
    auditLogs,
    setAuditLogs,
    blockchainTransactions,
    setBlockchainTransactions,
    isAddNetworkOpen,
    setIsAddNetworkOpen,
    addNetwork,
    connectToNetwork,
    activeNetworks,
    recentTransactions,
    recentAuditLogs,
  }
}
