import { useState, useEffect } from "react"
import { BlockchainNetwork, AuditLog, BlockchainTransaction } from "@/types"
import { getDataForSpace } from "@/lib/services/DataSpaceDataService"
import { useDataSpace } from "@/lib/contexts/DataSpaceContext"

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
  const { currentDataSpace } = useDataSpace();
  
  const [blockchainNetworks, setBlockchainNetworks] = useState<BlockchainNetwork[]>([]);
  const [blockchainTransactions, setBlockchainTransactions] = useState<BlockchainTransaction[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  // 当数据空间切换时，更新区块链相关数据
  useEffect(() => {
    const spaceData = getDataForSpace(currentDataSpace.id);
    setBlockchainNetworks(spaceData.blockchainNetworks);
    setBlockchainTransactions(spaceData.blockchainTransactions);
    setAuditLogs(spaceData.auditLogs);
  }, [currentDataSpace.id]);

  const [selectedNetwork, setSelectedNetwork] = useState<string>("")
  const [isAddNetworkOpen, setIsAddNetworkOpen] = useState(false)

  const addNetwork = async (networkData: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const newNetwork: BlockchainNetwork = {
      id: Date.now().toString(),
      name: networkData.name,
      type: "ZLTC",
      chainType: networkData.chainType,
      chainId: parseInt(networkData.chainId),
      status: "disconnected",
      curveAlgorithm: networkData.curveAlgorithm,
      witnessNodes: parseInt(networkData.witnessNodes) || 0,
      consensusNodes: parseInt(networkData.consensusNodes) || 0,
      blockHeight: 0,
      purpose: networkData.purpose,
      description: networkData.description,
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
