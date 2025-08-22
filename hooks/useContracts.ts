import { useState, useEffect } from "react"
import { DigitalContract, SmartContractTemplate, PolicyTemplate, ContractTemplate } from "@/types"
import { getDataForSpace } from "@/lib/services/DataSpaceDataService"
import { useDataSpace } from "@/lib/contexts/DataSpaceContext"

export interface UseContractsReturn {
  // Digital contracts
  digitalContracts: DigitalContract[]
  setDigitalContracts: (contracts: DigitalContract[]) => void
  
  // Policy templates
  policyTemplates: PolicyTemplate[]
  setPolicyTemplates: (templates: PolicyTemplate[]) => void
  
  // Contract templates
  contractTemplates: ContractTemplate[]
  setContractTemplates: (templates: ContractTemplate[]) => void
  
  // Smart contract templates
  smartContractTemplates: SmartContractTemplate[]
  setSmartContractTemplates: (templates: SmartContractTemplate[]) => void
  
  // Dialog states
  isCreateContractOpen: boolean
  setIsCreateContractOpen: (open: boolean) => void
  isCreateContractTemplateOpen: boolean
  setIsCreateContractTemplateOpen: (open: boolean) => void
  isDeploySmartContractOpen: boolean
  setIsDeploySmartContractOpen: (open: boolean) => void
  
  // Selected items
  selectedContract: DigitalContract | null
  setSelectedContract: (contract: DigitalContract | null) => void
  selectedSmartContractTemplate: SmartContractTemplate | null
  setSelectedSmartContractTemplate: (template: SmartContractTemplate | null) => void
  
  // Form states
  newContract: {
    title: string
    description: string
    provider: string
    consumer: string
    dataOfferingId: string
    policyTemplateId: string
    startDate: string
    endDate: string
  }
  setNewContract: (contract: any) => void
  
  // Actions
  createContract: () => Promise<void>
  createContractTemplate: (template: Omit<ContractTemplate, "id" | "createdAt" | "usageCount">) => Promise<void>
  deploySmartContract: () => Promise<void>
  
  // Computed values
  activeContracts: DigitalContract[]
  pendingContracts: DigitalContract[]
}

export function useContracts(): UseContractsReturn {
  const { currentDataSpace } = useDataSpace();
  
  const [digitalContracts, setDigitalContracts] = useState<DigitalContract[]>([
    {
      id: "1",
      title: "Data Sharing Agreement - Analytics",
      description: "Agreement for sharing customer analytics data",
      provider: "Data Provider A",
      consumer: "Analytics Corp",
      dataOfferingId: "1",
      policyTemplateId: "1",
      status: "active",
      createdAt: "2024-01-10T10:00:00Z",
      startDate: "2024-01-10T00:00:00Z",
      endDate: "2024-12-31T23:59:59Z",
      terms: [
        {
          id: "1",
          type: "access_limit",
          description: "Maximum 1000 API calls per day",
          value: "1000",
          unit: "calls/day",
          enforced: true,
        },
        {
          id: "2",
          type: "retention_period",
          description: "Data must be deleted after 90 days",
          value: "90",
          unit: "days",
          enforced: true,
        },
      ],
      blockchainTxId: "0x1234567890abcdef",
      violationCount: 0,
    },
    {
      id: "2",
      title: "Research Data Access Contract",
      description: "Contract for academic research data access",
      provider: "Research Institute",
      consumer: "University Lab",
      dataOfferingId: "2",
      policyTemplateId: "2",
      status: "pending",
      createdAt: "2024-01-12T14:00:00Z",
      startDate: "2024-01-15T00:00:00Z",
      endDate: "2024-06-30T23:59:59Z",
      terms: [
        {
          id: "3",
          type: "usage_restriction",
          description: "Non-commercial use only",
          value: "non-commercial",
          enforced: false,
        },
      ],
      violationCount: 0,
    },
  ])

  const [policyTemplates, setPolicyTemplates] = useState<PolicyTemplate[]>([]);
  const [contractTemplates, setContractTemplates] = useState<ContractTemplate[]>([]);
  
  // 当数据空间切换时，更新Policy和Contract模板数据
  useEffect(() => {
    const spaceData = getDataForSpace(currentDataSpace.id);
    setPolicyTemplates(spaceData.policyTemplates);
    setContractTemplates(spaceData.contractTemplates);
  }, [currentDataSpace.id]);

  const [smartContractTemplates, setSmartContractTemplates] = useState<SmartContractTemplate[]>([
    {
      id: "1",
      name: "Data Access Control",
      description: "Smart contract for managing data access permissions",
      category: "access_control",
      code: `pragma solidity ^0.8.0;\n\ncontract DataAccessControl {\n    mapping(address => bool) public authorizedUsers;\n    \n    function grantAccess(address user) public {\n        authorizedUsers[user] = true;\n    }\n    \n    function revokeAccess(address user) public {\n        authorizedUsers[user] = false;\n    }\n}`,
      parameters: [
        {
          name: "dataOffering",
          type: "address",
          description: "Address of the data offering contract",
          required: true,
        },
        {
          name: "accessDuration",
          type: "number",
          description: "Access duration in seconds",
          required: true,
          defaultValue: "86400",
        },
      ],
      deploymentCost: "0.05 ETH",
    },
    {
      id: "2",
      name: "Payment Escrow",
      description: "Escrow contract for secure data payments",
      category: "payment",
      code: `pragma solidity ^0.8.0;\n\ncontract PaymentEscrow {\n    address public buyer;\n    address public seller;\n    uint256 public amount;\n    bool public released;\n    \n    constructor(address _seller) payable {\n        buyer = msg.sender;\n        seller = _seller;\n        amount = msg.value;\n    }\n    \n    function release() public {\n        require(msg.sender == buyer);\n        require(!released);\n        released = true;\n        payable(seller).transfer(amount);\n    }\n}`,
      parameters: [
        {
          name: "seller",
          type: "address",
          description: "Data provider address",
          required: true,
        },
        {
          name: "amount",
          type: "number",
          description: "Payment amount in wei",
          required: true,
        },
      ],
      deploymentCost: "0.03 ETH",
    },
  ])

  // Dialog states
  const [isCreateContractOpen, setIsCreateContractOpen] = useState(false)
  const [isCreateContractTemplateOpen, setIsCreateContractTemplateOpen] = useState(false)
  const [isDeploySmartContractOpen, setIsDeploySmartContractOpen] = useState(false)
  
  // Selected items
  const [selectedContract, setSelectedContract] = useState<DigitalContract | null>(null)
  const [selectedSmartContractTemplate, setSelectedSmartContractTemplate] = useState<SmartContractTemplate | null>(null)
  
  // Form states
  const [newContract, setNewContract] = useState({
    title: "",
    description: "",
    provider: "",
    consumer: "",
    dataOfferingId: "",
    policyTemplateId: "",
    startDate: "",
    endDate: "",
  })

  // Actions
  const createContract = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const newDigitalContract: DigitalContract = {
      id: Date.now().toString(),
      title: newContract.title,
      description: newContract.description,
      provider: newContract.provider,
      consumer: newContract.consumer,
      dataOfferingId: newContract.dataOfferingId,
      policyTemplateId: newContract.policyTemplateId,
      status: "draft",
      createdAt: new Date().toISOString(),
      startDate: newContract.startDate,
      endDate: newContract.endDate,
      terms: [],
      violationCount: 0,
    }
    setDigitalContracts(prev => [...prev, newDigitalContract])
    setNewContract({
      title: "",
      description: "",
      provider: "",
      consumer: "",
      dataOfferingId: "",
      policyTemplateId: "",
      startDate: "",
      endDate: "",
    })
    setIsCreateContractOpen(false)
  }

  const createContractTemplate = async (template: Omit<ContractTemplate, "id" | "createdAt" | "usageCount">) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const newContractTemplate: ContractTemplate = {
      ...template,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      usageCount: 0,
    }
    setContractTemplates(prev => [...prev, newContractTemplate])
    setIsCreateContractTemplateOpen(false)
  }

  const deploySmartContract = async () => {
    if (!selectedSmartContractTemplate) return
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    // In a real implementation, this would deploy to blockchain
    console.log("Deploying smart contract:", selectedSmartContractTemplate.name)
    setIsDeploySmartContractOpen(false)
    setSelectedSmartContractTemplate(null)
  }

  // Computed values
  const activeContracts = digitalContracts.filter(contract => contract.status === "active")
  const pendingContracts = digitalContracts.filter(contract => contract.status === "pending" || contract.status === "draft")

  return {
    digitalContracts,
    setDigitalContracts,
    policyTemplates,
    setPolicyTemplates,
    contractTemplates,
    setContractTemplates,
    smartContractTemplates,
    setSmartContractTemplates,
    isCreateContractOpen,
    setIsCreateContractOpen,
    isCreateContractTemplateOpen,
    setIsCreateContractTemplateOpen,
    isDeploySmartContractOpen,
    setIsDeploySmartContractOpen,
    selectedContract,
    setSelectedContract,
    selectedSmartContractTemplate,
    setSelectedSmartContractTemplate,
    newContract,
    setNewContract,
    createContract,
    createContractTemplate,
    deploySmartContract,
    activeContracts,
    pendingContracts,
  }
}
