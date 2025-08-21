import { useState, useEffect } from "react"
import { ConnectedConnector, ConnectorHealth } from "@/types"
import { getDataForSpace } from "@/lib/services/DataSpaceDataService"
import { useDataSpace } from "@/lib/contexts/DataSpaceContext"

export interface UseIdentityReturn {
  // Identity state
  connectorId: string
  setConnectorId: (id: string) => void
  didDocument: string
  setDidDocument: (document: string) => void
  isRegistered: boolean
  setIsRegistered: (registered: boolean) => void
  isGenerating: boolean
  setIsGenerating: (generating: boolean) => void
  
  // Connected connectors
  connectedConnectors: ConnectedConnector[]
  setConnectedConnectors: (connectors: ConnectedConnector[]) => void
  
  // Connector health
  connectorHealth: ConnectorHealth[]
  setConnectorHealth: (health: ConnectorHealth[]) => void
  
  // Dialog states
  isConnectConnectorOpen: boolean
  setIsConnectConnectorOpen: (open: boolean) => void
  
  // Form states
  newConnector: {
    did: string
    name: string
  }
  setNewConnector: (connector: { did: string; name: string }) => void
  
  // Actions
  generateDID: () => Promise<void>
  registerDID: () => Promise<void>
  connectConnector: () => Promise<void>
}

export function useIdentity(): UseIdentityReturn {
  const { currentDataSpace } = useDataSpace();
  const [connectorId, setConnectorId] = useState("")
  const [didDocument, setDidDocument] = useState("")
  const [isRegistered, setIsRegistered] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  
  const [connectedConnectors, setConnectedConnectors] = useState<ConnectedConnector[]>([]);
  
  // 当数据空间切换时，更新连接的连接器数据
  useEffect(() => {
    const spaceData = getDataForSpace(currentDataSpace.id);
    setConnectedConnectors(spaceData.connectedConnectors);
  }, [currentDataSpace.id]);

  const [connectorHealth, setConnectorHealth] = useState<ConnectorHealth[]>([
    {
      id: "1",
      name: "Main Connector",
      status: "healthy",
      lastHeartbeat: "2024-01-15T10:30:00Z",
      responseTime: 120,
      uptime: "99.9%",
      version: "v1.2.3",
    },
    {
      id: "2",
      name: "Backup Connector",
      status: "healthy",
      lastHeartbeat: "2024-01-15T10:29:00Z",
      responseTime: 150,
      uptime: "99.7%",
      version: "v1.2.2",
    },
  ])

  const [isConnectConnectorOpen, setIsConnectConnectorOpen] = useState(false)
  const [newConnector, setNewConnector] = useState({
    did: "",
    name: "",
  })

  const generateDID = async () => {
    setIsGenerating(true)
    // Simulate DID generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    const newDID = `did:example:connector${Date.now()}`
    setConnectorId(newDID)
    setDidDocument(JSON.stringify({
      "@context": ["https://www.w3.org/ns/did/v1"],
      id: newDID,
      verificationMethod: [{
        id: `${newDID}#keys-1`,
        type: "Ed25519VerificationKey2020",
        controller: newDID,
        publicKeyMultibase: "z6MkqRYqQiSgvZQdnBytw86Qbs2ZWUkGv22od935YF4s8M7V"
      }],
      authentication: [`${newDID}#keys-1`],
      service: [{
        id: `${newDID}#service-1`,
        type: "DataConnectorService",
        serviceEndpoint: "https://connector.example.com/api"
      }]
    }, null, 2))
    setIsGenerating(false)
  }

  const registerDID = async () => {
    // Simulate DID registration
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRegistered(true)
  }

  const connectConnector = async () => {
    // Simulate connector connection
    await new Promise(resolve => setTimeout(resolve, 1000))
    const newConnection: ConnectedConnector = {
      id: Date.now().toString(),
      name: newConnector.name,
      did: newConnector.did,
      status: "pending",
      lastSeen: new Date().toISOString(),
      offeringsCount: 0,
    }
    setConnectedConnectors(prev => [...prev, newConnection])
    setNewConnector({ did: "", name: "" })
    setIsConnectConnectorOpen(false)
  }

  return {
    connectorId,
    setConnectorId,
    didDocument,
    setDidDocument,
    isRegistered,
    setIsRegistered,
    isGenerating,
    setIsGenerating,
    connectedConnectors,
    setConnectedConnectors,
    connectorHealth,
    setConnectorHealth,
    isConnectConnectorOpen,
    setIsConnectConnectorOpen,
    newConnector,
    setNewConnector,
    generateDID,
    registerDID,
    connectConnector,
  }
}
