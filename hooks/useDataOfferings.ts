import { useState } from "react"
import { DataOffering, ExternalDataOffering, DataRequest, PolicyTemplate, DataContract } from "@/types"

export interface UseDataOfferingsReturn {
  // Data offerings
  dataOfferings: DataOffering[]
  setDataOfferings: (offerings: DataOffering[]) => void
  
  // Policy templates
  policyTemplates: PolicyTemplate[]
  setPolicyTemplates: (templates: PolicyTemplate[]) => void
  
  // Data contracts
  dataContracts: DataContract[]
  setDataContracts: (contracts: DataContract[]) => void
  
  // External offerings
  externalOfferings: ExternalDataOffering[]
  setExternalOfferings: (offerings: ExternalDataOffering[]) => void
  
  // Data requests
  dataRequests: DataRequest[]
  setDataRequests: (requests: DataRequest[]) => void
  
  // Dialog states
  isAddOfferingOpen: boolean
  setIsAddOfferingOpen: (open: boolean) => void
  isAddContractOpen: boolean
  setIsAddContractOpen: (open: boolean) => void
  isRequestDataOpen: boolean
  setIsRequestDataOpen: (open: boolean) => void
  
  // Selected items
  selectedOffering: ExternalDataOffering | null
  setSelectedOffering: (offering: ExternalDataOffering | null) => void
  
  // Form states
  newOffering: {
    title: string
    description: string
    dataType: string
    accessPolicy: string
  }
  setNewOffering: (offering: any) => void
  
  newContract: {
    contractAddress: string
    providerDID: string
    consumerDID: string
    policy: string
  }
  setNewContract: (contract: any) => void
  
  newRequest: {
    accessMode: "api" | "download"
    purpose: string
  }
  setNewRequest: (request: any) => void
  
  // Search & filter
  searchQuery: string
  setSearchQuery: (query: string) => void
  categoryFilter: string
  setCategoryFilter: (filter: string) => void
  
  // Actions
  createOffering: () => Promise<void>
  createContract: () => Promise<void>
  requestData: () => Promise<void>
  
  // Computed values
  filteredOfferings: ExternalDataOffering[]
}

export function useDataOfferings(): UseDataOfferingsReturn {
  const [dataOfferings, setDataOfferings] = useState<DataOffering[]>([
    {
      id: "1",
      title: "Customer Analytics Dataset",
      description: "Anonymized customer behavior data for analytics",
      dataType: "CSV",
      accessPolicy: "Restricted",
      status: "active",
      createdAt: "2024-01-10T10:00:00Z",
    },
    {
      id: "2",
      title: "Product Performance Metrics",
      description: "Real-time product usage and performance data",
      dataType: "JSON",
      accessPolicy: "Open",
      status: "active",
      createdAt: "2024-01-12T14:30:00Z",
    },
  ])

  const [policyTemplates, setPolicyTemplates] = useState<PolicyTemplate[]>([
    {
      id: "1",
      name: "Standard Access Policy",
      description: "Basic access control with time-based restrictions",
      rules: ["Access allowed during business hours", "Maximum 1000 requests per day", "Data must be anonymized"],
      category: "access",
      severity: "medium",
      enforcementType: "automatic",
    },
    {
      id: "2",
      name: "Research Data Policy",
      description: "Policy for academic and research use cases",
      rules: ["Non-commercial use only", "Attribution required", "Results must be published openly"],
      category: "usage",
      severity: "high",
      enforcementType: "manual",
    },
  ])

  const [dataContracts, setDataContracts] = useState<DataContract[]>([
    {
      id: "1",
      contractAddress: "0x1234abcd567890ef1234567890abcdef56789012",
      providerDID: "did:example:provider123",
      consumerDID: "did:example:consumer456",
      policy: "Restricted Access",
      status: "active",
      createdAt: "2024-01-10T10:00:00Z",
      expiresAt: "2024-12-31T23:59:59Z",
    },
    {
      id: "2", 
      contractAddress: "0xabcdef1234567890abcdef1234567890ef123456",
      providerDID: "did:example:provider789",
      consumerDID: "did:example:consumer123",
      policy: "Partner Only",
      status: "active",
      createdAt: "2024-01-12T14:30:00Z",
    },
    {
      id: "3",
      contractAddress: "0x567890abcdef123456789012345678901234abcd",
      providerDID: "did:example:provider456",
      consumerDID: "did:example:consumer789",
      policy: "GDPR Compliance",
      status: "expired",
      createdAt: "2023-12-01T09:00:00Z",
      expiresAt: "2024-01-01T00:00:00Z",
    },
  ])

  const [externalOfferings, setExternalOfferings] = useState<ExternalDataOffering[]>([
    {
      id: "1",
      title: "Global Market Intelligence",
      description: "Comprehensive market analysis and trends data",
      dataType: "JSON/CSV",
      provider: "Market Analytics Corp",
      providerDID: "did:example:market123",
      accessPolicy: "Premium",
      category: "analytics",
      lastUpdated: "2024-01-15T08:00:00Z",
      size: "2.3 GB",
      price: "$500/month",
    },
    {
      id: "2",
      title: "Climate Data Archive",
      description: "Historical weather and climate datasets",
      dataType: "NetCDF",
      provider: "Climate Research Institute",
      providerDID: "did:example:climate456",
      accessPolicy: "Open Access",
      category: "research",
      lastUpdated: "2024-01-14T12:00:00Z",
      size: "15.7 TB",
    },
  ])

  const [dataRequests, setDataRequests] = useState<DataRequest[]>([
    {
      id: "1",
      offeringId: "1",
      offeringTitle: "Global Market Intelligence",
      provider: "Market Analytics Corp",
      requestedAt: "2024-01-15T09:00:00Z",
      status: "pending",
      accessMode: "api",
      purpose: "Market trend analysis for product development",
    },
  ])

  // Dialog states
  const [isAddOfferingOpen, setIsAddOfferingOpen] = useState(false)
  const [isAddContractOpen, setIsAddContractOpen] = useState(false)
  const [isRequestDataOpen, setIsRequestDataOpen] = useState(false)
  
  // Selected items
  const [selectedOffering, setSelectedOffering] = useState<ExternalDataOffering | null>(null)
  
  // Form states
  const [newOffering, setNewOffering] = useState({
    title: "",
    description: "",
    dataType: "",
    accessPolicy: "",
  })

  const [newContract, setNewContract] = useState({
    contractAddress: "",
    providerDID: "",
    consumerDID: "",
    policy: "",
  })

  const [newRequest, setNewRequest] = useState({
    accessMode: "api" as "api" | "download",
    purpose: "",
  })

  // Search & filter
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Computed values
  const filteredOfferings = externalOfferings.filter((offering) => {
    const matchesSearch =
      offering.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offering.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offering.provider.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || offering.category.toLowerCase() === categoryFilter.toLowerCase()
    return matchesSearch && matchesCategory
  })

  // Actions
  const createOffering = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const newDataOffering: DataOffering = {
      id: Date.now().toString(),
      title: newOffering.title,
      description: newOffering.description,
      dataType: newOffering.dataType,
      accessPolicy: newOffering.accessPolicy,
      status: "active",
      createdAt: new Date().toISOString(),
    }
    setDataOfferings(prev => [...prev, newDataOffering])
    setNewOffering({ title: "", description: "", dataType: "", accessPolicy: "" })
    setIsAddOfferingOpen(false)
  }

  const createContract = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const newDataContract: DataContract = {
      id: Date.now().toString(),
      contractAddress: newContract.contractAddress,
      providerDID: newContract.providerDID,
      consumerDID: newContract.consumerDID,
      policy: newContract.policy,
      status: "active",
      createdAt: new Date().toISOString(),
    }
    setDataContracts(prev => [...prev, newDataContract])
    setNewContract({ contractAddress: "", providerDID: "", consumerDID: "", policy: "" })
    setIsAddContractOpen(false)
  }

  const requestData = async () => {
    if (!selectedOffering) return
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    const newDataRequest: DataRequest = {
      id: Date.now().toString(),
      offeringId: selectedOffering.id,
      offeringTitle: selectedOffering.title,
      provider: selectedOffering.provider,
      requestedAt: new Date().toISOString(),
      status: "pending",
      accessMode: newRequest.accessMode,
      purpose: newRequest.purpose,
    }
    setDataRequests(prev => [...prev, newDataRequest])
    setNewRequest({ accessMode: "api", purpose: "" })
    setIsRequestDataOpen(false)
    setSelectedOffering(null)
  }

  return {
    dataOfferings,
    setDataOfferings,
    policyTemplates,
    setPolicyTemplates,
    dataContracts,
    setDataContracts,
    externalOfferings,
    setExternalOfferings,
    dataRequests,
    setDataRequests,
    isAddOfferingOpen,
    setIsAddOfferingOpen,
    isAddContractOpen,
    setIsAddContractOpen,
    isRequestDataOpen,
    setIsRequestDataOpen,
    selectedOffering,
    setSelectedOffering,
    newOffering,
    setNewOffering,
    newContract,
    setNewContract,
    newRequest,
    setNewRequest,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    createOffering,
    createContract,
    requestData,
    filteredOfferings,
  }
}
