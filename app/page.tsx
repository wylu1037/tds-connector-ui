"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Shield,
  Key,
  Network,
  Database,
  Settings,
  Activity,
  CheckCircle,
  AlertCircle,
  Copy,
  RefreshCw,
  Plus,
  FileText,
  Globe,
  Lock,
  Eye,
  Edit,
  Trash2,
  Search,
  Download,
  Clock,
  ExternalLink,
  Users,
  Filter,
  FileCodeIcon as FileContract,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Upload,
  Play,
  Square,
} from "lucide-react"

interface DataOffering {
  id: string
  title: string
  description: string
  dataType: string
  accessPolicy: string
  status: "active" | "inactive" | "pending"
  createdAt: string
}

interface PolicyTemplate {
  id: string
  name: string
  description: string
  rules: string[]
  category: "access" | "usage" | "retention" | "compliance"
  severity: "low" | "medium" | "high"
  enforcementType: "automatic" | "manual" | "hybrid"
}

interface DigitalContract {
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

interface ContractTerm {
  id: string
  type: "access_limit" | "retention_period" | "usage_restriction" | "payment" | "compliance"
  description: string
  value: string
  unit?: string
  enforced: boolean
}

interface SmartContractTemplate {
  id: string
  name: string
  description: string
  category: "data_sharing" | "payment" | "compliance" | "access_control"
  code: string
  parameters: ContractParameter[]
  deploymentCost: string
}

interface ContractParameter {
  name: string
  type: "string" | "number" | "boolean" | "address"
  description: string
  required: boolean
  defaultValue?: string
}

interface ExternalDataOffering {
  id: string
  title: string
  description: string
  dataType: string
  provider: string
  providerDID: string
  accessPolicy: string
  category: string
  lastUpdated: string
  size: string
  price?: string
}

interface DataRequest {
  id: string
  offeringId: string
  offeringTitle: string
  provider: string
  requestedAt: string
  status: "pending" | "approved" | "rejected" | "completed"
  accessMode: "api" | "download"
  purpose: string
}

interface ConnectedConnector {
  id: string
  name: string
  did: string
  status: "connected" | "disconnected" | "pending"
  lastSeen: string
  offeringsCount: number
}

interface BlockchainNetwork {
  id: string
  name: string
  type: "ethereum" | "hyperledger" | "polygon" | "private"
  rpcUrl: string
  chainId: number
  status: "connected" | "disconnected" | "syncing"
  blockHeight: number
  gasPrice: string
}

interface AuditLog {
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

interface BlockchainTransaction {
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

interface SandboxEnvironment {
  id: string
  name: string
  status: "running" | "stopped" | "creating" | "destroying" | "error"
  image: string
  runtime: "python" | "nodejs" | "java" | "r" | "custom"
  createdAt: string
  lastUsed: string
  cpuUsage: number
  memoryUsage: number
  memoryLimit: string
  dataVolumes: string[]
  networkIsolated: boolean
  startupTime: number
}

interface OCIImage {
  id: string
  name: string
  tag: string
  runtime: "python" | "nodejs" | "java" | "r" | "custom"
  size: string
  description: string
  lastUpdated: string
  verified: boolean
  downloads: number
}

interface DataProcessingJob {
  id: string
  name: string
  sandboxId: string
  dataOfferingId: string
  status: "queued" | "running" | "completed" | "failed" | "cancelled"
  startTime: string
  endTime?: string
  inputSize: string
  outputSize?: string
  script: string
  results?: string
  errorMessage?: string
}

interface SystemMetrics {
  timestamp: string
  cpuUsage: number
  memoryUsage: number
  diskUsage: number
  networkIn: number
  networkOut: number
  activeConnections: number
  requestsPerMinute: number
}

interface SecurityAlert {
  id: string
  timestamp: string
  severity: "low" | "medium" | "high" | "critical"
  type: "authentication" | "data_access" | "policy_violation" | "network" | "system"
  title: string
  description: string
  source: string
  resolved: boolean
}

interface ConnectorHealth {
  id: string
  name: string
  status: "healthy" | "warning" | "critical" | "offline"
  lastHeartbeat: string
  responseTime: number
  uptime: string
  version: string
}

export default function ConnectorDashboard() {
  const [connectorId, setConnectorId] = useState("")
  const [didDocument, setDidDocument] = useState("")
  const [isRegistered, setIsRegistered] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const [dataOfferings, setDataOfferings] = useState<DataOffering[]>([
    {
      id: "1",
      title: "Customer Analytics Dataset",
      description: "Anonymized customer behavior data for market research",
      dataType: "JSON",
      accessPolicy: "Restricted Access",
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      title: "Financial Reports Q4",
      description: "Quarterly financial performance metrics",
      dataType: "CSV",
      accessPolicy: "Partner Only",
      status: "pending",
      createdAt: "2024-01-10",
    },
  ])

  const [policyTemplates, setPolicyTemplates] = useState<PolicyTemplate[]>([
    {
      id: "1",
      name: "Restricted Access",
      description: "Data can only be accessed by verified partners",
      rules: ["Require partner verification", "Limit to 100 requests/day", "Audit all access"],
      category: "access",
      severity: "high",
      enforcementType: "automatic",
    },
    {
      id: "2",
      name: "Partner Only",
      description: "Exclusive access for strategic partners",
      rules: ["Partner agreement required", "Data retention: 30 days", "No redistribution allowed"],
      category: "usage",
      severity: "medium",
      enforcementType: "hybrid",
    },
    {
      id: "3",
      name: "GDPR Compliance",
      description: "Ensures GDPR compliance for EU data subjects",
      rules: ["Right to erasure", "Data minimization", "Consent tracking", "Breach notification within 72h"],
      category: "compliance",
      severity: "high",
      enforcementType: "automatic",
    },
  ])

  const [digitalContracts, setDigitalContracts] = useState<DigitalContract[]>([
    {
      id: "contract-1",
      title: "Market Data Sharing Agreement",
      description: "Access to customer analytics dataset for Q1 2024",
      provider: "Our Connector",
      consumer: "MarketInsights Corp",
      dataOfferingId: "1",
      policyTemplateId: "1",
      status: "active",
      createdAt: "2024-01-15",
      startDate: "2024-01-15",
      endDate: "2024-04-15",
      terms: [
        {
          id: "term-1",
          type: "access_limit",
          description: "Maximum API calls per day",
          value: "100",
          unit: "requests/day",
          enforced: true,
        },
        {
          id: "term-2",
          type: "retention_period",
          description: "Data retention period",
          value: "90",
          unit: "days",
          enforced: true,
        },
      ],
      blockchainTxId: "0x1234...abcd",
      violationCount: 0,
    },
    {
      id: "contract-2",
      title: "Financial Data Access Contract",
      description: "Limited access to Q4 financial reports",
      provider: "Our Connector",
      consumer: "FinRisk Analytics",
      dataOfferingId: "2",
      policyTemplateId: "2",
      status: "pending",
      createdAt: "2024-01-20",
      startDate: "2024-02-01",
      endDate: "2024-05-01",
      terms: [
        {
          id: "term-3",
          type: "payment",
          description: "Monthly subscription fee",
          value: "500",
          unit: "EUR/month",
          enforced: false,
        },
      ],
      violationCount: 0,
    },
  ])

  const [smartContractTemplates, setSmartContractTemplates] = useState<SmartContractTemplate[]>([
    {
      id: "template-1",
      name: "Data Access Control",
      description: "Automated access control with usage limits",
      category: "access_control",
      code: `pragma solidity ^0.8.0;\n\ncontract DataAccessControl {\n    mapping(address => uint256) public accessLimits;\n    mapping(address => uint256) public usageCount;\n    \n    function setAccessLimit(address user, uint256 limit) public {\n        accessLimits[user] = limit;\n    }\n    \n    function checkAccess(address user) public view returns (bool) {\n        return usageCount[user] < accessLimits[user];\n    }\n}`,
      parameters: [
        {
          name: "maxRequests",
          type: "number",
          description: "Maximum requests per period",
          required: true,
          defaultValue: "100",
        },
        {
          name: "period",
          type: "number",
          description: "Time period in seconds",
          required: true,
          defaultValue: "86400",
        },
      ],
      deploymentCost: "0.05 ETH",
    },
    {
      id: "template-2",
      name: "Payment Escrow",
      description: "Automated payment release upon data delivery",
      category: "payment",
      code: `pragma solidity ^0.8.0;\n\ncontract PaymentEscrow {\n    address public buyer;\n    address public seller;\n    uint256 public amount;\n    bool public dataDelivered;\n    \n    function confirmDelivery() public {\n        require(msg.sender == buyer);\n        dataDelivered = true;\n        payable(seller).transfer(amount);\n    }\n}`,
      parameters: [
        {
          name: "buyerAddress",
          type: "address",
          description: "Data consumer address",
          required: true,
        },
        {
          name: "sellerAddress",
          type: "address",
          description: "Data provider address",
          required: true,
        },
        {
          name: "escrowAmount",
          type: "number",
          description: "Payment amount in wei",
          required: true,
        },
      ],
      deploymentCost: "0.03 ETH",
    },
  ])

  const [externalOfferings, setExternalOfferings] = useState<ExternalDataOffering[]>([
    {
      id: "ext-1",
      title: "Global Market Trends 2024",
      description: "Comprehensive market analysis and trend predictions",
      dataType: "JSON",
      provider: "MarketInsights Corp",
      providerDID: "did:example:market123",
      accessPolicy: "Partner Access",
      category: "Analytics",
      lastUpdated: "2024-01-20",
      size: "2.5 GB",
      price: "€500/month",
    },
    {
      id: "ext-2",
      title: "Supply Chain Logistics Data",
      description: "Real-time logistics and supply chain optimization data",
      dataType: "CSV",
      provider: "LogiTech Solutions",
      providerDID: "did:example:logi456",
      accessPolicy: "Verified Partners",
      category: "Logistics",
      lastUpdated: "2024-01-18",
      size: "1.2 GB",
    },
    {
      id: "ext-3",
      title: "Financial Risk Assessment Models",
      description: "AI-powered risk assessment algorithms and datasets",
      dataType: "API",
      provider: "FinRisk Analytics",
      providerDID: "did:example:finrisk789",
      accessPolicy: "Premium Access",
      category: "Finance",
      lastUpdated: "2024-01-22",
      size: "API Access",
      price: "€1200/month",
    },
  ])

  const [dataRequests, setDataRequests] = useState<DataRequest[]>([
    {
      id: "req-1",
      offeringId: "ext-1",
      offeringTitle: "Global Market Trends 2024",
      provider: "MarketInsights Corp",
      requestedAt: "2024-01-21",
      status: "pending",
      accessMode: "api",
      purpose: "Market research and competitive analysis",
    },
    {
      id: "req-2",
      offeringId: "ext-2",
      offeringTitle: "Supply Chain Logistics Data",
      provider: "LogiTech Solutions",
      requestedAt: "2024-01-19",
      status: "approved",
      accessMode: "download",
      purpose: "Supply chain optimization project",
    },
  ])

  const [connectedConnectors, setConnectedConnectors] = useState<ConnectedConnector[]>([
    {
      id: "conn-1",
      name: "MarketInsights Corp",
      did: "did:example:market123",
      status: "connected",
      lastSeen: "2024-01-22",
      offeringsCount: 5,
    },
    {
      id: "conn-2",
      name: "LogiTech Solutions",
      did: "did:example:logi456",
      status: "connected",
      lastSeen: "2024-01-21",
      offeringsCount: 3,
    },
    {
      id: "conn-3",
      name: "FinRisk Analytics",
      did: "did:example:finrisk789",
      status: "pending",
      lastSeen: "2024-01-20",
      offeringsCount: 8,
    },
  ])

  const [blockchainNetworks, setBlockchainNetworks] = useState<BlockchainNetwork[]>([
    {
      id: "mainnet",
      name: "Ethereum Mainnet",
      type: "ethereum",
      rpcUrl: "https://mainnet.infura.io/v3/...",
      chainId: 1,
      status: "connected",
      blockHeight: 18500000,
      gasPrice: "25 gwei",
    },
    {
      id: "private",
      name: "Private Consortium Chain",
      type: "private",
      rpcUrl: "http://localhost:8545",
      chainId: 1337,
      status: "connected",
      blockHeight: 12450,
      gasPrice: "1 gwei",
    },
  ])

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    {
      id: "audit-1",
      timestamp: "2024-01-15T10:30:00Z",
      action: "did_registration",
      actor: "did:example:123456789abcdefghi",
      target: "Blockchain Registry",
      details: "DID document registered on blockchain",
      blockchainTxId: "0x1234567890abcdef...",
      status: "success",
      gasUsed: "21000",
    },
    {
      id: "audit-2",
      timestamp: "2024-01-15T11:15:00Z",
      action: "contract_deployment",
      actor: "Connector Admin",
      target: "Smart Contract: Data Access Control",
      details: "Deployed access control contract for data offering #123",
      blockchainTxId: "0xabcdef1234567890...",
      status: "success",
      gasUsed: "150000",
    },
    {
      id: "audit-3",
      timestamp: "2024-01-15T12:00:00Z",
      action: "data_request",
      actor: "did:example:consumer123",
      target: "Data Offering: Financial Dataset",
      details: "Data access request submitted with policy compliance check",
      status: "pending",
    },
  ])

  const [blockchainTransactions, setBlockchainTransactions] = useState<BlockchainTransaction[]>([
    {
      id: "tx-1",
      hash: "0x1234567890abcdef1234567890abcdef12345678",
      type: "did_registration",
      from: "0xabcd1234...",
      to: "0x5678efgh...",
      value: "0.001 ETH",
      gasUsed: "21000",
      gasPrice: "25 gwei",
      status: "confirmed",
      timestamp: "2024-01-15T10:30:00Z",
      blockNumber: 18500001,
    },
    {
      id: "tx-2",
      hash: "0xabcdef1234567890abcdef1234567890abcdef12",
      type: "contract_deployment",
      from: "0xabcd1234...",
      to: "0x0000000000000000000000000000000000000000",
      value: "0.05 ETH",
      gasUsed: "150000",
      gasPrice: "25 gwei",
      status: "confirmed",
      timestamp: "2024-01-15T11:15:00Z",
      blockNumber: 18500025,
    },
  ])

  const [selectedNetwork, setSelectedNetwork] = useState<string>("mainnet")
  const [isAddNetworkOpen, setIsAddNetworkOpen] = useState(false)

  const [isAddOfferingOpen, setIsAddOfferingOpen] = useState(false)
  const [isAddPolicyOpen, setIsAddPolicyOpen] = useState(false)
  const [isRequestDataOpen, setIsRequestDataOpen] = useState(false)
  const [isConnectConnectorOpen, setIsConnectConnectorOpen] = useState(false)
  const [isCreateContractOpen, setIsCreateContractOpen] = useState(false)
  const [isDeploySmartContractOpen, setIsDeploySmartContractOpen] = useState(false)
  const [selectedContract, setSelectedContract] = useState<DigitalContract | null>(null)
  const [selectedSmartContractTemplate, setSelectedSmartContractTemplate] = useState<SmartContractTemplate | null>(null)
  const [selectedOffering, setSelectedOffering] = useState<ExternalDataOffering | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const [newOffering, setNewOffering] = useState({
    title: "",
    description: "",
    dataType: "",
    accessPolicy: "",
    endpoint: "",
  })
  const [newPolicy, setNewPolicy] = useState({
    name: "",
    description: "",
    rules: "",
    category: "access" as "access" | "usage" | "retention" | "compliance",
    severity: "medium" as "low" | "medium" | "high",
    enforcementType: "automatic" as "automatic" | "manual" | "hybrid",
  })
  const [newRequest, setNewRequest] = useState({
    accessMode: "api" as "api" | "download",
    purpose: "",
    duration: "30",
  })
  const [newConnector, setNewConnector] = useState({
    did: "",
    name: "",
  })
  const [newContract, setNewContract] = useState({
    title: "",
    description: "",
    consumer: "",
    dataOfferingId: "",
    policyTemplateId: "",
    startDate: "",
    endDate: "",
    terms: [] as ContractTerm[],
  })

  const [connectorDID, setConnectorDID] = useState("did:example:connector123")
  const [connectorStatus, setConnectorStatus] = useState<"registered" | "not_registered">("not_registered")

  const [sandboxEnvironments, setSandboxEnvironments] = useState<SandboxEnvironment[]>([
    {
      id: "sandbox-1",
      name: "Python Analytics Environment",
      status: "running",
      image: "python:3.11-analytics",
      runtime: "python",
      createdAt: "2024-01-15T10:00:00Z",
      lastUsed: "2024-01-22T14:30:00Z",
      cpuUsage: 25,
      memoryUsage: 45,
      memoryLimit: "2GB",
      dataVolumes: ["/data/customer-analytics", "/data/temp"],
      networkIsolated: true,
      startupTime: 180,
    },
    {
      id: "sandbox-2",
      name: "Node.js Processing Environment",
      status: "stopped",
      image: "nodejs:18-processing",
      runtime: "nodejs",
      createdAt: "2024-01-20T09:15:00Z",
      lastUsed: "2024-01-21T16:45:00Z",
      cpuUsage: 0,
      memoryUsage: 0,
      memoryLimit: "1GB",
      dataVolumes: ["/data/financial-reports"],
      networkIsolated: true,
      startupTime: 120,
    },
  ])

  const [ociImages, setOciImages] = useState<OCIImage[]>([
    {
      id: "img-1",
      name: "python-analytics",
      tag: "3.11-analytics",
      runtime: "python",
      size: "1.2GB",
      description: "Python environment with pandas, numpy, scikit-learn for data analytics",
      lastUpdated: "2024-01-15",
      verified: true,
      downloads: 1250,
    },
    {
      id: "img-2",
      name: "nodejs-processing",
      tag: "18-processing",
      runtime: "nodejs",
      size: "800MB",
      description: "Node.js runtime with data processing libraries",
      lastUpdated: "2024-01-18",
      verified: true,
      downloads: 890,
    },
    {
      id: "img-3",
      name: "r-statistics",
      tag: "4.3-stats",
      runtime: "r",
      size: "1.5GB",
      description: "R environment for statistical analysis and visualization",
      lastUpdated: "2024-01-12",
      verified: false,
      downloads: 340,
    },
  ])

  const [dataProcessingJobs, setDataProcessingJobs] = useState<DataProcessingJob[]>([
    {
      id: "job-1",
      name: "Customer Segmentation Analysis",
      sandboxId: "sandbox-1",
      dataOfferingId: "1",
      status: "completed",
      startTime: "2024-01-22T14:00:00Z",
      endTime: "2024-01-22T14:25:00Z",
      inputSize: "150MB",
      outputSize: "2.5MB",
      script:
        "import pandas as pd\nimport numpy as np\n# Customer segmentation analysis\ndf = pd.read_csv('/data/customers.csv')\n# Analysis code...",
      results: "Successfully identified 5 customer segments with 89% accuracy",
    },
    {
      id: "job-2",
      name: "Financial Risk Assessment",
      sandboxId: "sandbox-2",
      dataOfferingId: "2",
      status: "running",
      startTime: "2024-01-22T15:30:00Z",
      inputSize: "75MB",
      script:
        "const fs = require('fs');\nconst data = JSON.parse(fs.readFileSync('/data/financial.json'));\n// Risk assessment logic...",
    },
  ])

  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics[]>([
    {
      timestamp: "2024-01-22T15:00:00Z",
      cpuUsage: 45,
      memoryUsage: 62,
      diskUsage: 78,
      networkIn: 1250,
      networkOut: 890,
      activeConnections: 12,
      requestsPerMinute: 45,
    },
    {
      timestamp: "2024-01-22T15:01:00Z",
      cpuUsage: 52,
      memoryUsage: 65,
      diskUsage: 78,
      networkIn: 1380,
      networkOut: 920,
      activeConnections: 15,
      requestsPerMinute: 52,
    },
    {
      timestamp: "2024-01-22T15:02:00Z",
      cpuUsage: 38,
      memoryUsage: 58,
      diskUsage: 79,
      networkIn: 1100,
      networkOut: 780,
      activeConnections: 10,
      requestsPerMinute: 38,
    },
  ])

  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>([
    {
      id: "alert-1",
      timestamp: "2024-01-22T14:30:00Z",
      severity: "high",
      type: "policy_violation",
      title: "Policy Violation Detected",
      description: "Unauthorized access attempt to restricted data offering",
      source: "did:example:suspicious123",
      resolved: false,
    },
    {
      id: "alert-2",
      timestamp: "2024-01-22T13:45:00Z",
      severity: "medium",
      type: "authentication",
      title: "Multiple Failed Authentication Attempts",
      description: "5 failed login attempts from IP 192.168.1.100",
      source: "Authentication Service",
      resolved: true,
    },
    {
      id: "alert-3",
      timestamp: "2024-01-22T12:15:00Z",
      severity: "low",
      type: "system",
      title: "High Memory Usage",
      description: "Memory usage exceeded 80% threshold",
      source: "System Monitor",
      resolved: true,
    },
  ])

  const [connectorHealth, setConnectorHealth] = useState<ConnectorHealth[]>([
    {
      id: "conn-health-1",
      name: "MarketInsights Corp",
      status: "healthy",
      lastHeartbeat: "2024-01-22T15:02:30Z",
      responseTime: 120,
      uptime: "99.8%",
      version: "v2.1.0",
    },
    {
      id: "conn-health-2",
      name: "LogiTech Solutions",
      status: "warning",
      lastHeartbeat: "2024-01-22T15:01:45Z",
      responseTime: 850,
      uptime: "98.2%",
      version: "v2.0.3",
    },
    {
      id: "conn-health-3",
      name: "FinRisk Analytics",
      status: "critical",
      lastHeartbeat: "2024-01-22T14:45:12Z",
      responseTime: 2100,
      uptime: "95.1%",
      version: "v1.9.8",
    },
  ])

  const [isCreateSandboxOpen, setIsCreateSandboxOpen] = useState(false)
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false)
  const [selectedSandbox, setSelectedSandbox] = useState<SandboxEnvironment | null>(null)
  const [newSandbox, setNewSandbox] = useState({
    name: "",
    image: "",
    runtime: "python" as "python" | "nodejs" | "java" | "r" | "custom",
    memoryLimit: "2GB",
    networkIsolated: true,
  })
  const [newJob, setNewJob] = useState({
    name: "",
    sandboxId: "",
    dataOfferingId: "",
    script: "",
  })

  const handleRegisterDIDOnBlockchain = async () => {
    const newAuditLog: AuditLog = {
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: "did_registration",
      actor: connectorDID,
      target: "Blockchain Registry",
      details: "DID document registration initiated",
      status: "pending",
    }
    setAuditLogs((prev) => [newAuditLog, ...prev])

    // Simulate blockchain transaction
    setTimeout(() => {
      const txHash = `0x${Math.random().toString(16).substr(2, 40)}`
      setAuditLogs((prev) =>
        prev.map((log) =>
          log.id === newAuditLog.id
            ? { ...log, status: "success" as const, blockchainTxId: txHash, gasUsed: "21000" }
            : log,
        ),
      )

      const newTransaction: BlockchainTransaction = {
        id: `tx-${Date.now()}`,
        hash: txHash,
        type: "did_registration",
        from: "0xabcd1234...",
        to: "0x5678efgh...",
        value: "0.001 ETH",
        gasUsed: "21000",
        gasPrice: "25 gwei",
        status: "confirmed",
        timestamp: new Date().toISOString(),
        blockNumber: 18500000 + Math.floor(Math.random() * 100),
      }
      setBlockchainTransactions((prev) => [newTransaction, ...prev])
      setConnectorStatus("registered")
    }, 2000)
  }

  const handleDeploySmartContract = async (templateId: string) => {
    const template = smartContractTemplates.find((t) => t.id === templateId)
    if (!template) return

    const newAuditLog: AuditLog = {
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: "contract_deployment",
      actor: "Connector Admin",
      target: `Smart Contract: ${template.name}`,
      details: `Deploying ${template.name} contract to blockchain`,
      status: "pending",
    }
    setAuditLogs((prev) => [newAuditLog, ...prev])

    // Simulate contract deployment
    setTimeout(() => {
      const txHash = `0x${Math.random().toString(16).substr(2, 40)}`
      setAuditLogs((prev) =>
        prev.map((log) =>
          log.id === newAuditLog.id
            ? { ...log, status: "success" as const, blockchainTxId: txHash, gasUsed: "150000" }
            : log,
        ),
      )

      const newTransaction: BlockchainTransaction = {
        id: `tx-${Date.now()}`,
        hash: txHash,
        type: "contract_deployment",
        from: "0xabcd1234...",
        to: "0x0000000000000000000000000000000000000000",
        value: template.deploymentCost,
        gasUsed: "150000",
        gasPrice: "25 gwei",
        status: "confirmed",
        timestamp: new Date().toISOString(),
        blockNumber: 18500000 + Math.floor(Math.random() * 100),
      }
      setBlockchainTransactions((prev) => [newTransaction, ...prev])
    }, 3000)
  }

  const handleGenerateDID = async () => {
    setIsGenerating(true)
    // Simulate DID generation
    setTimeout(() => {
      const newDID = `did:example:${Math.random().toString(36).substr(2, 9)}`
      setConnectorId(newDID)
      setDidDocument(
        JSON.stringify(
          {
            "@context": ["https://www.w3.org/ns/did/v1"],
            id: newDID,
            publicKey: [
              {
                id: `${newDID}#keys-1`,
                type: "Ed25519VerificationKey2018",
                controller: newDID,
                publicKeyBase58: "H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV",
              },
            ],
            authentication: [`${newDID}#keys-1`],
            service: [
              {
                id: `${newDID}#connector-endpoint`,
                type: "ConnectorService",
                serviceEndpoint: "https://connector.example.com/api",
              },
            ],
          },
          null,
          2,
        ),
      )
      setIsGenerating(false)
    }, 2000)
  }

  const handleRegisterConnector = () => {
    setIsRegistered(true)
  }

  const handleAddOffering = () => {
    const offering: DataOffering = {
      id: Date.now().toString(),
      title: newOffering.title,
      description: newOffering.description,
      dataType: newOffering.dataType,
      accessPolicy: newOffering.accessPolicy,
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
    }
    setDataOfferings([...dataOfferings, offering])
    setNewOffering({ title: "", description: "", dataType: "", accessPolicy: "", endpoint: "" })
    setIsAddOfferingOpen(false)
  }

  const handleAddPolicy = () => {
    const policy: PolicyTemplate = {
      id: Date.now().toString(),
      name: newPolicy.name,
      description: newPolicy.description,
      rules: newPolicy.rules.split("\n").filter((rule) => rule.trim()),
      category: newPolicy.category,
      severity: newPolicy.severity,
      enforcementType: newPolicy.enforcementType,
    }
    setPolicyTemplates([...policyTemplates, policy])
    setNewPolicy({
      name: "",
      description: "",
      rules: "",
      category: "access",
      severity: "medium",
      enforcementType: "automatic",
    })
    setIsAddPolicyOpen(false)
  }

  const handleDeleteOffering = (id: string) => {
    setDataOfferings(dataOfferings.filter((offering) => offering.id !== id))
  }

  const handleToggleOfferingStatus = (id: string) => {
    setDataOfferings(
      dataOfferings.map((offering) =>
        offering.id === id
          ? { ...offering, status: offering.status === "active" ? "inactive" : ("active" as const) }
          : offering,
      ),
    )
  }

  const handleRequestData = () => {
    if (!selectedOffering) return

    const request: DataRequest = {
      id: `req-${Date.now()}`,
      offeringId: selectedOffering.id,
      offeringTitle: selectedOffering.title,
      provider: selectedOffering.provider,
      requestedAt: new Date().toISOString().split("T")[0],
      status: "pending",
      accessMode: newRequest.accessMode,
      purpose: newRequest.purpose,
    }

    setDataRequests([...dataRequests, request])
    setNewRequest({ accessMode: "api", purpose: "", duration: "30" })
    setIsRequestDataOpen(false)
    setSelectedOffering(null)
  }

  const handleConnectConnector = () => {
    const connector: ConnectedConnector = {
      id: `conn-${Date.now()}`,
      name: newConnector.name,
      did: newConnector.did,
      status: "pending",
      lastSeen: new Date().toISOString().split("T")[0],
      offeringsCount: 0,
    }

    setConnectedConnectors([...connectedConnectors, connector])
    setNewConnector({ did: "", name: "" })
    setIsConnectConnectorOpen(false)
  }

  const handleCreateContract = () => {
    const contract: DigitalContract = {
      id: `contract-${Date.now()}`,
      title: newContract.title,
      description: newContract.description,
      provider: "Our Connector",
      consumer: newContract.consumer,
      dataOfferingId: newContract.dataOfferingId,
      policyTemplateId: newContract.policyTemplateId,
      status: "draft",
      createdAt: new Date().toISOString().split("T")[0],
      startDate: newContract.startDate,
      endDate: newContract.endDate,
      terms: newContract.terms,
      violationCount: 0,
    }
    setDigitalContracts([...digitalContracts, contract])
    setNewContract({
      title: "",
      description: "",
      consumer: "",
      dataOfferingId: "",
      policyTemplateId: "",
      startDate: "",
      endDate: "",
      terms: [],
    })
    setIsCreateContractOpen(false)
  }

  const handleActivateContract = (contractId: string) => {
    setDigitalContracts(
      digitalContracts.map((contract) =>
        contract.id === contractId
          ? {
              ...contract,
              status: "active" as const,
              blockchainTxId: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
            }
          : contract,
      ),
    )
  }

  const handleTerminateContract = (contractId: string) => {
    setDigitalContracts(
      digitalContracts.map((contract) =>
        contract.id === contractId ? { ...contract, status: "terminated" as const } : contract,
      ),
    )
  }

  const getContractStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "pending":
      case "draft":
        return "secondary"
      case "expired":
      case "terminated":
        return "outline"
      case "violated":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getContractStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="h-4 w-4" />
      case "pending":
      case "draft":
        return <Clock className="h-4 w-4" />
      case "violated":
        return <AlertTriangle className="h-4 w-4" />
      case "terminated":
      case "expired":
        return <XCircle className="h-4 w-4" />
      default:
        return <FileContract className="h-4 w-4" />
    }
  }

  const filteredOfferings = externalOfferings.filter((offering) => {
    const matchesSearch =
      offering.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offering.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offering.provider.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || offering.category.toLowerCase() === categoryFilter.toLowerCase()
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
      case "connected":
      case "active":
        return "default"
      case "pending":
        return "secondary"
      case "rejected":
      case "disconnected":
      case "inactive":
        return "destructive"
      case "completed":
        return "outline"
      default:
        return "secondary"
    }
  }

  const handleCreateSandbox = () => {
    const sandbox: SandboxEnvironment = {
      id: `sandbox-${Date.now()}`,
      name: newSandbox.name,
      status: "creating",
      image: newSandbox.image,
      runtime: newSandbox.runtime,
      createdAt: new Date().toISOString(),
      lastUsed: new Date().toISOString(),
      cpuUsage: 0,
      memoryUsage: 0,
      memoryLimit: newSandbox.memoryLimit,
      dataVolumes: [],
      networkIsolated: newSandbox.networkIsolated,
      startupTime: 0,
    }
    setSandboxEnvironments([...sandboxEnvironments, sandbox])

    // Simulate sandbox creation
    setTimeout(() => {
      setSandboxEnvironments((prev) =>
        prev.map((s) => (s.id === sandbox.id ? { ...s, status: "running" as const, startupTime: 150 } : s)),
      )
    }, 3000)

    setNewSandbox({ name: "", image: "", runtime: "python", memoryLimit: "2GB", networkIsolated: true })
    setIsCreateSandboxOpen(false)
  }

  const handleStartSandbox = (sandboxId: string) => {
    setSandboxEnvironments((prev) =>
      prev.map((s) =>
        s.id === sandboxId ? { ...s, status: "running" as const, lastUsed: new Date().toISOString() } : s,
      ),
    )
  }

  const handleStopSandbox = (sandboxId: string) => {
    setSandboxEnvironments((prev) =>
      prev.map((s) => (s.id === sandboxId ? { ...s, status: "stopped" as const, cpuUsage: 0, memoryUsage: 0 } : s)),
    )
  }

  const handleDestroySandbox = (sandboxId: string) => {
    setSandboxEnvironments((prev) => prev.filter((s) => s.id !== sandboxId))
  }

  const handleCreateJob = () => {
    const job: DataProcessingJob = {
      id: `job-${Date.now()}`,
      name: newJob.name,
      sandboxId: newJob.sandboxId,
      dataOfferingId: newJob.dataOfferingId,
      status: "queued",
      startTime: new Date().toISOString(),
      inputSize: "Unknown",
      script: newJob.script,
    }
    setDataProcessingJobs([...dataProcessingJobs, job])

    // Simulate job execution
    setTimeout(() => {
      setDataProcessingJobs((prev) => prev.map((j) => (j.id === job.id ? { ...j, status: "running" as const } : j)))
    }, 1000)

    setTimeout(() => {
      setDataProcessingJobs((prev) =>
        prev.map((j) =>
          j.id === job.id
            ? {
                ...j,
                status: "completed" as const,
                endTime: new Date().toISOString(),
                outputSize: "5.2MB",
                results: "Processing completed successfully",
              }
            : j,
        ),
      )
    }, 5000)

    setNewJob({ name: "", sandboxId: "", dataOfferingId: "", script: "" })
    setIsCreateJobOpen(false)
  }

  const getSandboxStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "default"
      case "stopped":
        return "secondary"
      case "creating":
        return "secondary"
      case "destroying":
        return "destructive"
      case "error":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getJobStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "running":
        return "secondary"
      case "queued":
        return "outline"
      case "failed":
        return "destructive"
      case "cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive"
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "default"
      case "warning":
        return "secondary"
      case "critical":
        return "destructive"
      case "offline":
        return "destructive"
      default:
        return "outline"
    }
  }

  const handleResolveAlert = (alertId: string) => {
    setSecurityAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, resolved: true } : alert)))
  }

  const getCurrentMetrics = () => {
    return (
      systemMetrics[systemMetrics.length - 1] || {
        cpuUsage: 0,
        memoryUsage: 0,
        diskUsage: 0,
        networkIn: 0,
        networkOut: 0,
        activeConnections: 0,
        requestsPerMinute: 0,
      }
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-serif font-bold text-foreground">Trusted Data Space Connector</h1>
              </div>
              <Badge variant={isRegistered ? "default" : "secondary"} className="ml-4">
                {isRegistered ? "Registered" : "Not Registered"}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="identity" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="identity" className="flex items-center space-x-2">
              <Key className="h-4 w-4" />
              <span>Identity & DID</span>
            </TabsTrigger>
            <TabsTrigger value="data-offering">
              <Database className="h-4 w-4 mr-2" />
              Data Offering
            </TabsTrigger>
            <TabsTrigger value="data-consumption">
              <Network className="h-4 w-4 mr-2" />
              Data Consumption
            </TabsTrigger>
            <TabsTrigger value="contracts">
              <FileContract className="h-4 w-4 mr-2" />
              Policy & Contracts
            </TabsTrigger>
            <TabsTrigger value="blockchain">
              <Shield className="h-4 w-4 mr-2" />
              Blockchain & Audit
            </TabsTrigger>
            <TabsTrigger value="sandbox">
              <Lock className="h-4 w-4 mr-2" />
              Sandbox Environment
            </TabsTrigger>
            <TabsTrigger value="monitoring">
              <Activity className="h-4 w-4 mr-2" />
              Monitoring
            </TabsTrigger>
          </TabsList>

          {/* Identity & DID Management Tab */}
          <TabsContent value="identity" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Connector Identity Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Key className="h-5 w-5 text-primary" />
                    <span>Connector Identity</span>
                  </CardTitle>
                  <CardDescription>Generate and manage your connector's decentralized identity (DID)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="connector-id">Connector DID</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="connector-id"
                        value={connectorId}
                        placeholder="did:example:..."
                        readOnly
                        className="font-mono text-sm"
                      />
                      {connectorId && (
                        <Button variant="outline" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <Button onClick={handleGenerateDID} disabled={isGenerating} className="w-full">
                    {isGenerating ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Generating DID...
                      </>
                    ) : (
                      <>
                        <Key className="h-4 w-4 mr-2" />
                        Generate New DID
                      </>
                    )}
                  </Button>

                  {connectorId && !isRegistered && (
                    <Button onClick={handleRegisterConnector} variant="secondary" className="w-full">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Register with Platform
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* DID Document Card */}
              <Card>
                <CardHeader>
                  <CardTitle>DID Document</CardTitle>
                  <CardDescription>
                    Your connector's identity document containing public keys and service endpoints
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {didDocument ? (
                    <div className="space-y-2">
                      <pre className="bg-muted p-4 rounded-lg text-xs overflow-auto max-h-64 font-mono">
                        {didDocument}
                      </pre>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        <Copy className="h-4 w-4 mr-2" />
                        Copy DID Document
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Key className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Generate a DID to view the document</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Registration Status */}
            {connectorId && (
              <Alert className={isRegistered ? "border-green-200 bg-green-50" : "border-yellow-200 bg-yellow-50"}>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {isRegistered ? (
                    <span className="text-green-800">
                      ✅ Connector successfully registered with the trusted data space platform. Your identity is now
                      verified and you can begin secure data exchange.
                    </span>
                  ) : (
                    <span className="text-yellow-800">
                      ⚠️ Connector identity generated but not yet registered. Register with the platform to enable secure
                      data exchange capabilities.
                    </span>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>

          <TabsContent value="data-offering" className="space-y-6">
            {/* Overview Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Offerings</CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    {dataOfferings.filter((o) => o.status === "active").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Available for consumption</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Policy Templates</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-secondary">{policyTemplates.length}</div>
                  <p className="text-xs text-muted-foreground">Access control policies</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Offerings</CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dataOfferings.length}</div>
                  <p className="text-xs text-muted-foreground">All data offerings</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Data Offerings Management */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Data Offerings</CardTitle>
                      <CardDescription>Manage your published data resources</CardDescription>
                    </div>
                    <Dialog open={isAddOfferingOpen} onOpenChange={setIsAddOfferingOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Offering
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Create Data Offering</DialogTitle>
                          <DialogDescription>
                            Configure a new data resource to share with other connectors
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="offering-title">Title</Label>
                            <Input
                              id="offering-title"
                              value={newOffering.title}
                              onChange={(e) => setNewOffering({ ...newOffering, title: e.target.value })}
                              placeholder="Customer Analytics Dataset"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="offering-description">Description</Label>
                            <Textarea
                              id="offering-description"
                              value={newOffering.description}
                              onChange={(e) => setNewOffering({ ...newOffering, description: e.target.value })}
                              placeholder="Describe your data offering..."
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="data-type">Data Type</Label>
                              <Select
                                value={newOffering.dataType}
                                onValueChange={(value) => setNewOffering({ ...newOffering, dataType: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="JSON">JSON</SelectItem>
                                  <SelectItem value="CSV">CSV</SelectItem>
                                  <SelectItem value="XML">XML</SelectItem>
                                  <SelectItem value="API">API Endpoint</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="access-policy">Access Policy</Label>
                              <Select
                                value={newOffering.accessPolicy}
                                onValueChange={(value) => setNewOffering({ ...newOffering, accessPolicy: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select policy" />
                                </SelectTrigger>
                                <SelectContent>
                                  {policyTemplates.map((policy) => (
                                    <SelectItem key={policy.id} value={policy.name}>
                                      {policy.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="endpoint">Data Endpoint</Label>
                            <Input
                              id="endpoint"
                              value={newOffering.endpoint}
                              onChange={(e) => setNewOffering({ ...newOffering, endpoint: e.target.value })}
                              placeholder="https://api.example.com/data"
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setIsAddOfferingOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleAddOffering}>Create Offering</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dataOfferings.map((offering) => (
                      <div key={offering.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{offering.title}</h4>
                            <Badge
                              variant={
                                offering.status === "active"
                                  ? "default"
                                  : offering.status === "pending"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {offering.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{offering.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                            <span>Type: {offering.dataType}</span>
                            <span>Policy: {offering.accessPolicy}</span>
                            <span>Created: {offering.createdAt}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleToggleOfferingStatus(offering.id)}>
                            {offering.status === "active" ? <Eye className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteOffering(offering.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Policy Templates Management */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Policy Templates</CardTitle>
                      <CardDescription>Define access control and usage policies</CardDescription>
                    </div>
                    <Dialog open={isAddPolicyOpen} onOpenChange={setIsAddPolicyOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="secondary">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Policy
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Create Policy Template</DialogTitle>
                          <DialogDescription>Define rules and restrictions for data access</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="policy-name">Policy Name</Label>
                            <Input
                              id="policy-name"
                              value={newPolicy.name}
                              onChange={(e) => setNewPolicy({ ...newPolicy, name: e.target.value })}
                              placeholder="Restricted Access"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="policy-description">Description</Label>
                            <Textarea
                              id="policy-description"
                              value={newPolicy.description}
                              onChange={(e) => setNewPolicy({ ...newPolicy, description: e.target.value })}
                              placeholder="Describe the policy purpose..."
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="policy-rules">Rules (one per line)</Label>
                            <Textarea
                              id="policy-rules"
                              value={newPolicy.rules}
                              onChange={(e) => setNewPolicy({ ...newPolicy, rules: e.target.value })}
                              placeholder="Require partner verification&#10;Limit to 100 requests/day&#10;Audit all access"
                              rows={4}
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setIsAddPolicyOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleAddPolicy}>Create Policy</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {policyTemplates.map((policy) => (
                      <div key={policy.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{policy.name}</h4>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{policy.description}</p>
                        <div className="space-y-1">
                          {policy.rules.map((rule, index) => (
                            <div key={index} className="flex items-center space-x-2 text-xs">
                              <div className="w-1 h-1 bg-primary rounded-full"></div>
                              <span>{rule}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="data-consumption" className="space-y-6">
            {/* Overview Cards */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Available Data</CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{externalOfferings.length}</div>
                  <p className="text-xs text-muted-foreground">External offerings</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-secondary">
                    {dataRequests.filter((r) => r.status === "pending" || r.status === "approved").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Pending/approved</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Connected</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {connectedConnectors.filter((c) => c.status === "connected").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Trusted connectors</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                  <Network className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dataRequests.length}</div>
                  <p className="text-xs text-muted-foreground">All time</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Data Catalog */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Data Catalog</CardTitle>
                      <CardDescription>Discover and request data from other connectors</CardDescription>
                    </div>
                    <Dialog open={isConnectConnectorOpen} onOpenChange={setIsConnectConnectorOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Plus className="h-4 w-4 mr-2" />
                          Connect Connector
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[400px]">
                        <DialogHeader>
                          <DialogTitle>Connect New Connector</DialogTitle>
                          <DialogDescription>Establish connection with another trusted connector</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="connector-did">Connector DID</Label>
                            <Input
                              id="connector-did"
                              value={newConnector.did}
                              onChange={(e) => setNewConnector({ ...newConnector, did: e.target.value })}
                              placeholder="did:example:connector123"
                              className="font-mono text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="connector-name">Display Name</Label>
                            <Input
                              id="connector-name"
                              value={newConnector.name}
                              onChange={(e) => setNewConnector({ ...newConnector, name: e.target.value })}
                              placeholder="Partner Organization"
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setIsConnectConnectorOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleConnectConnector}>Connect</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Search and Filter */}
                  <div className="flex space-x-2">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search data offerings..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-40">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="analytics">Analytics</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="logistics">Logistics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Data Offerings List */}
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {filteredOfferings.map((offering) => (
                      <div key={offering.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium">{offering.title}</h4>
                              <Badge variant="outline">{offering.category}</Badge>
                              {offering.price && <Badge variant="secondary">{offering.price}</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{offering.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <span className="flex items-center space-x-1">
                                <Users className="h-3 w-3" />
                                <span>{offering.provider}</span>
                              </span>
                              <span>Type: {offering.dataType}</span>
                              <span>Size: {offering.size}</span>
                              <span>Updated: {offering.lastUpdated}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedOffering(offering)
                                setIsRequestDataOpen(true)
                              }}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Request
                            </Button>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Request Management */}
              <Card>
                <CardHeader>
                  <CardTitle>My Requests</CardTitle>
                  <CardDescription>Track your data access requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {dataRequests.map((request) => (
                      <div key={request.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-sm">{request.offeringTitle}</h5>
                          <Badge variant={getStatusColor(request.status)} className="text-xs">
                            {request.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">Provider: {request.provider}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Mode: {request.accessMode}</span>
                          <span>{request.requestedAt}</span>
                        </div>
                        {request.status === "approved" && (
                          <Button size="sm" className="w-full mt-2 bg-transparent" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Access Data
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Connected Connectors */}
            <Card>
              <CardHeader>
                <CardTitle>Connected Connectors</CardTitle>
                <CardDescription>Manage your trusted connector relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {connectedConnectors.map((connector) => (
                    <div key={connector.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{connector.name}</h4>
                        <Badge variant={getStatusColor(connector.status)}>{connector.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 font-mono">{connector.did}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{connector.offeringsCount} offerings</span>
                        <span>Last seen: {connector.lastSeen}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Data Request Dialog */}
            <Dialog open={isRequestDataOpen} onOpenChange={setIsRequestDataOpen}>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Request Data Access</DialogTitle>
                  <DialogDescription>
                    {selectedOffering &&
                      `Request access to "${selectedOffering.title}" from ${selectedOffering.provider}`}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Access Mode</Label>
                    <Select
                      value={newRequest.accessMode}
                      onValueChange={(value: "api" | "download") => setNewRequest({ ...newRequest, accessMode: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="api">API Access</SelectItem>
                        <SelectItem value="download">Full Download</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="purpose">Purpose of Use</Label>
                    <Textarea
                      id="purpose"
                      value={newRequest.purpose}
                      onChange={(e) => setNewRequest({ ...newRequest, purpose: e.target.value })}
                      placeholder="Describe how you plan to use this data..."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Access Duration (days)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={newRequest.duration}
                      onChange={(e) => setNewRequest({ ...newRequest, duration: e.target.value })}
                      placeholder="30"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsRequestDataOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleRequestData}>Submit Request</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="policy-contracts" className="space-y-6">
            {/* Overview Cards */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
                  <FileContract className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    {digitalContracts.filter((c) => c.status === "active").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Currently enforced</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Policy Templates</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-secondary">{policyTemplates.length}</div>
                  <p className="text-xs text-muted-foreground">Available policies</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Smart Contracts</CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{smartContractTemplates.length}</div>
                  <p className="text-xs text-muted-foreground">Blockchain templates</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Violations</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">
                    {digitalContracts.reduce((sum, c) => sum + c.violationCount, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">Policy violations</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Digital Contracts Management */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Digital Contracts</CardTitle>
                      <CardDescription>Manage data sharing agreements and smart contracts</CardDescription>
                    </div>
                    <Dialog open={isCreateContractOpen} onOpenChange={setIsCreateContractOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Create Contract
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Create Digital Contract</DialogTitle>
                          <DialogDescription>Define terms and conditions for data sharing</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="contract-title">Contract Title</Label>
                              <Input
                                id="contract-title"
                                value={newContract.title}
                                onChange={(e) => setNewContract({ ...newContract, title: e.target.value })}
                                placeholder="Data Sharing Agreement"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="consumer">Consumer</Label>
                              <Input
                                id="consumer"
                                value={newContract.consumer}
                                onChange={(e) => setNewContract({ ...newContract, consumer: e.target.value })}
                                placeholder="Partner Organization"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="contract-description">Description</Label>
                            <Textarea
                              id="contract-description"
                              value={newContract.description}
                              onChange={(e) => setNewContract({ ...newContract, description: e.target.value })}
                              placeholder="Describe the contract purpose and scope..."
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="data-offering">Data Offering</Label>
                              <Select
                                value={newContract.dataOfferingId}
                                onValueChange={(value) => setNewContract({ ...newContract, dataOfferingId: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select offering" />
                                </SelectTrigger>
                                <SelectContent>
                                  {dataOfferings.map((offering) => (
                                    <SelectItem key={offering.id} value={offering.id}>
                                      {offering.title}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="policy-template">Policy Template</Label>
                              <Select
                                value={newContract.policyTemplateId}
                                onValueChange={(value) => setNewContract({ ...newContract, policyTemplateId: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select policy" />
                                </SelectTrigger>
                                <SelectContent>
                                  {policyTemplates.map((policy) => (
                                    <SelectItem key={policy.id} value={policy.id}>
                                      {policy.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="start-date">Start Date</Label>
                              <Input
                                id="start-date"
                                type="date"
                                value={newContract.startDate}
                                onChange={(e) => setNewContract({ ...newContract, startDate: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="end-date">End Date</Label>
                              <Input
                                id="end-date"
                                type="date"
                                value={newContract.endDate}
                                onChange={(e) => setNewContract({ ...newContract, endDate: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setIsCreateContractOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleCreateContract}>Create Contract</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {digitalContracts.map((contract) => (
                      <div key={contract.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              {getContractStatusIcon(contract.status)}
                              <h4 className="font-medium">{contract.title}</h4>
                              <Badge variant={getContractStatusColor(contract.status)}>{contract.status}</Badge>
                              {contract.violationCount > 0 && (
                                <Badge variant="destructive" className="text-xs">
                                  {contract.violationCount} violations
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{contract.description}</p>
                            <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                              <div>
                                <span className="font-medium">Consumer:</span> {contract.consumer}
                              </div>
                              <div>
                                <span className="font-medium">Period:</span> {contract.startDate} - {contract.endDate}
                              </div>
                              <div>
                                <span className="font-medium">Terms:</span> {contract.terms.length} conditions
                              </div>
                              {contract.blockchainTxId && (
                                <div>
                                  <span className="font-medium">Blockchain:</span> {contract.blockchainTxId}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {contract.status === "draft" && (
                              <Button variant="outline" size="sm" onClick={() => handleActivateContract(contract.id)}>
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Activate
                              </Button>
                            )}
                            {contract.status === "active" && (
                              <Button variant="outline" size="sm" onClick={() => handleTerminateContract(contract.id)}>
                                <XCircle className="h-4 w-4 mr-1" />
                                Terminate
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        {contract.terms.length > 0 && (
                          <div className="mt-3 pt-3 border-t">
                            <h5 className="text-sm font-medium mb-2">Contract Terms</h5>
                            <div className="space-y-1">
                              {contract.terms.slice(0, 2).map((term) => (
                                <div key={term.id} className="flex items-center justify-between text-xs">
                                  <span>{term.description}</span>
                                  <div className="flex items-center space-x-2">
                                    <span className="font-mono">
                                      {term.value} {term.unit}
                                    </span>
                                    {term.enforced ? (
                                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                                    ) : (
                                      <Clock className="h-3 w-3 text-yellow-500" />
                                    )}
                                  </div>
                                </div>
                              ))}
                              {contract.terms.length > 2 && (
                                <div className="text-xs text-muted-foreground">
                                  +{contract.terms.length - 2} more terms
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Policy Templates Management */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Policy Templates</CardTitle>
                      <CardDescription>Define and manage access control policies</CardDescription>
                    </div>
                    <Dialog open={isAddPolicyOpen} onOpenChange={setIsAddPolicyOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="secondary">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Policy
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Create Policy Template</DialogTitle>
                          <DialogDescription>Define rules and restrictions for data access</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="policy-name">Policy Name</Label>
                            <Input
                              id="policy-name"
                              value={newPolicy.name}
                              onChange={(e) => setNewPolicy({ ...newPolicy, name: e.target.value })}
                              placeholder="Restricted Access"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="policy-description">Description</Label>
                            <Textarea
                              id="policy-description"
                              value={newPolicy.description}
                              onChange={(e) => setNewPolicy({ ...newPolicy, description: e.target.value })}
                              placeholder="Describe the policy purpose..."
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="policy-category">Category</Label>
                              <Select
                                value={newPolicy.category}
                                onValueChange={(value: "access" | "usage" | "retention" | "compliance") =>
                                  setNewPolicy({ ...newPolicy, category: value })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="access">Access</SelectItem>
                                  <SelectItem value="usage">Usage</SelectItem>
                                  <SelectItem value="retention">Retention</SelectItem>
                                  <SelectItem value="compliance">Compliance</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="policy-severity">Severity</Label>
                              <Select
                                value={newPolicy.severity}
                                onValueChange={(value: "low" | "medium" | "high") =>
                                  setNewPolicy({ ...newPolicy, severity: value })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">Low</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="high">High</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="enforcement-type">Enforcement</Label>
                              <Select
                                value={newPolicy.enforcementType}
                                onValueChange={(value: "automatic" | "manual" | "hybrid") =>
                                  setNewPolicy({ ...newPolicy, enforcementType: value })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="automatic">Automatic</SelectItem>
                                  <SelectItem value="manual">Manual</SelectItem>
                                  <SelectItem value="hybrid">Hybrid</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="policy-rules">Rules (one per line)</Label>
                            <Textarea
                              id="policy-rules"
                              value={newPolicy.rules}
                              onChange={(e) => setNewPolicy({ ...newPolicy, rules: e.target.value })}
                              placeholder="Require partner verification&#10;Limit to 100 requests/day&#10;Audit all access"
                              rows={4}
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setIsAddPolicyOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleAddPolicy}>Create Policy</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {policyTemplates.map((policy) => (
                      <div key={policy.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{policy.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              {policy.category}
                            </Badge>
                            <Badge
                              variant={
                                policy.severity === "high"
                                  ? "destructive"
                                  : policy.severity === "medium"
                                    ? "secondary"
                                    : "outline"
                              }
                              className="text-xs"
                            >
                              {policy.severity}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{policy.description}</p>
                        <div className="flex items-center justify-between mb-2 text-xs text-muted-foreground">
                          <span>Enforcement: {policy.enforcementType}</span>
                          <span>{policy.rules.length} rules</span>
                        </div>
                        <div className="space-y-1">
                          {policy.rules.slice(0, 2).map((rule, index) => (
                            <div key={index} className="flex items-center space-x-2 text-xs">
                              <div className="w-1 h-1 bg-primary rounded-full"></div>
                              <span>{rule}</span>
                            </div>
                          ))}
                          {policy.rules.length > 2 && (
                            <div className="text-xs text-muted-foreground ml-3">
                              +{policy.rules.length - 2} more rules
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Smart Contract Templates */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Smart Contract Templates</CardTitle>
                    <CardDescription>Blockchain-based automated contract enforcement</CardDescription>
                  </div>
                  <Dialog open={isDeploySmartContractOpen} onOpenChange={setIsDeploySmartContractOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Deploy Contract
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Deploy Smart Contract</DialogTitle>
                        <DialogDescription>Deploy a smart contract template to the blockchain</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Select Template</Label>
                          <Select
                            onValueChange={(value) =>
                              setSelectedSmartContractTemplate(
                                smartContractTemplates.find((t) => t.id === value) || null,
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a template" />
                            </SelectTrigger>
                            <SelectContent>
                              {smartContractTemplates.map((template) => (
                                <SelectItem key={template.id} value={template.id}>
                                  {template.name} - {template.category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        {selectedSmartContractTemplate && (
                          <div className="space-y-4">
                            <div className="p-3 bg-muted rounded-lg">
                              <h4 className="font-medium mb-2">{selectedSmartContractTemplate.name}</h4>
                              <p className="text-sm text-muted-foreground mb-2">
                                {selectedSmartContractTemplate.description}
                              </p>
                              <div className="text-xs text-muted-foreground">
                                Deployment Cost: {selectedSmartContractTemplate.deploymentCost}
                              </div>
                            </div>
                            <div className="space-y-3">
                              <Label>Contract Parameters</Label>
                              {selectedSmartContractTemplate.parameters.map((param) => (
                                <div key={param.name} className="space-y-2">
                                  <Label htmlFor={param.name} className="text-sm">
                                    {param.name} {param.required && <span className="text-destructive">*</span>}
                                  </Label>
                                  <Input
                                    id={param.name}
                                    placeholder={param.defaultValue || param.description}
                                    type={param.type === "number" ? "number" : "text"}
                                  />
                                  <p className="text-xs text-muted-foreground">{param.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsDeploySmartContractOpen(false)}>
                            Cancel
                          </Button>
                          <Button
                            disabled={!selectedSmartContractTemplate}
                            onClick={() => handleDeploySmartContract(selectedSmartContractTemplate.id)}
                          >
                            Deploy Contract
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {smartContractTemplates.map((template) => (
                    <div key={template.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{template.name}</h4>
                          <Badge variant="outline" className="text-xs mt-1">
                            {template.category.replace("_", " ")}
                          </Badge>
                        </div>
                        <div className="text-right text-xs text-muted-foreground">{template.deploymentCost}</div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground">Parameters: {template.parameters.length}</div>
                        <div className="flex flex-wrap gap-1">
                          {template.parameters.slice(0, 3).map((param) => (
                            <Badge key={param.name} variant="secondary" className="text-xs">
                              {param.name}
                            </Badge>
                          ))}
                          {template.parameters.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{template.parameters.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blockchain" className="space-y-6">
            {/* Blockchain Networks */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Blockchain Networks</CardTitle>
                    <CardDescription>
                      Manage blockchain network connections for DID and contract operations
                    </CardDescription>
                  </div>
                  <Dialog open={isAddNetworkOpen} onOpenChange={setIsAddNetworkOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Network
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Blockchain Network</DialogTitle>
                        <DialogDescription>Connect to a new blockchain network</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="network-name">Network Name</Label>
                          <Input id="network-name" placeholder="e.g., Polygon Mainnet" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="network-type">Network Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select network type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ethereum">Ethereum</SelectItem>
                              <SelectItem value="polygon">Polygon</SelectItem>
                              <SelectItem value="hyperledger">Hyperledger Fabric</SelectItem>
                              <SelectItem value="private">Private Chain</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rpc-url">RPC URL</Label>
                          <Input id="rpc-url" placeholder="https://..." />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="chain-id">Chain ID</Label>
                          <Input id="chain-id" type="number" placeholder="1" />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsAddNetworkOpen(false)}>
                          Cancel
                        </Button>
                        <Button>Add Network</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {blockchainNetworks.map((network) => (
                    <Card
                      key={network.id}
                      className={`cursor-pointer transition-colors ${selectedNetwork === network.id ? "ring-2 ring-primary" : ""}`}
                      onClick={() => setSelectedNetwork(network.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{network.name}</h3>
                          <Badge
                            variant={
                              network.status === "connected"
                                ? "default"
                                : network.status === "syncing"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {network.status}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div>Type: {network.type}</div>
                          <div>Chain ID: {network.chainId}</div>
                          <div>Block Height: {network.blockHeight.toLocaleString()}</div>
                          <div>Gas Price: {network.gasPrice}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* DID Blockchain Registration */}
            <Card>
              <CardHeader>
                <CardTitle>DID Blockchain Registration</CardTitle>
                <CardDescription>Register and manage DID documents on the blockchain</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">Current DID Status</h3>
                      <p className="text-sm text-muted-foreground">DID: {connectorDID}</p>
                      <p className="text-sm text-muted-foreground">
                        Status: {connectorStatus === "registered" ? "Registered on blockchain" : "Not registered"}
                      </p>
                    </div>
                    <Button onClick={handleRegisterDIDOnBlockchain} disabled={connectorStatus === "registered"}>
                      <Shield className="h-4 w-4 mr-2" />
                      {connectorStatus === "registered" ? "Registered" : "Register on Blockchain"}
                    </Button>
                  </div>

                  {connectorStatus === "registered" && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span className="font-medium text-green-800">DID Successfully Registered</span>
                      </div>
                      <p className="text-sm text-green-700 mt-1">
                        Your DID document is now immutably stored on the blockchain and can be verified by other
                        connectors.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Audit Logs */}
            <Card>
              <CardHeader>
                <CardTitle>Audit Trail</CardTitle>
                <CardDescription>Immutable log of all connector operations and blockchain interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                      <div className="flex-shrink-0">
                        {log.action === "did_registration" && <Shield className="h-5 w-5 text-blue-500" />}
                        {log.action === "contract_deployment" && <FileText className="h-5 w-5 text-purple-500" />}
                        {log.action === "data_request" && <Download className="h-5 w-5 text-green-500" />}
                        {log.action === "data_transfer" && <Upload className="h-5 w-5 text-orange-500" />}
                        {log.action === "policy_update" && <Settings className="h-5 w-5 text-gray-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">
                            {log.action.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                          </p>
                          <Badge
                            variant={
                              log.status === "success"
                                ? "default"
                                : log.status === "failed"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {log.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{log.details}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                          <span>Actor: {log.actor}</span>
                          <span>Target: {log.target}</span>
                          <span>{new Date(log.timestamp).toLocaleString()}</span>
                        </div>
                        {log.blockchainTxId && (
                          <div className="mt-2 p-2 bg-muted rounded text-xs">
                            <span className="font-medium">Blockchain TX:</span> {log.blockchainTxId}
                            {log.gasUsed && <span className="ml-4">Gas Used: {log.gasUsed}</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Blockchain Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>Blockchain Transactions</CardTitle>
                <CardDescription>Recent blockchain transactions from this connector</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blockchainTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline">{tx.type.replace(/_/g, " ")}</Badge>
                          <Badge
                            variant={
                              tx.status === "confirmed"
                                ? "default"
                                : tx.status === "failed"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {tx.status}
                          </Badge>
                        </div>
                        <div className="text-sm space-y-1">
                          <div>
                            <span className="font-medium">Hash:</span> {tx.hash}
                          </div>
                          <div>
                            <span className="font-medium">Block:</span> #{tx.blockNumber}
                          </div>
                          <div>
                            <span className="font-medium">Value:</span> {tx.value}
                          </div>
                          <div>
                            <span className="font-medium">Gas:</span> {tx.gasUsed} @ {tx.gasPrice}
                          </div>
                        </div>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        {new Date(tx.timestamp).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sandbox" className="space-y-6">
            {/* Overview Cards */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Sandboxes</CardTitle>
                  <Lock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    {sandboxEnvironments.filter((s) => s.status === "running").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Currently running</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Processing Jobs</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-secondary">
                    {dataProcessingJobs.filter((j) => j.status === "running" || j.status === "queued").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Active jobs</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">OCI Images</CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{ociImages.length}</div>
                  <p className="text-xs text-muted-foreground">Available runtimes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed Jobs</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {dataProcessingJobs.filter((j) => j.status === "completed").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Successfully processed</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Sandbox Environments */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Sandbox Environments</CardTitle>
                      <CardDescription>
                        Manage isolated execution environments for secure data processing
                      </CardDescription>
                    </div>
                    <Dialog open={isCreateSandboxOpen} onOpenChange={setIsCreateSandboxOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Create Sandbox
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Create Sandbox Environment</DialogTitle>
                          <DialogDescription>Set up a new isolated environment for data processing</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="sandbox-name">Environment Name</Label>
                            <Input
                              id="sandbox-name"
                              value={newSandbox.name}
                              onChange={(e) => setNewSandbox({ ...newSandbox, name: e.target.value })}
                              placeholder="Python Analytics Environment"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="runtime">Runtime</Label>
                              <Select
                                value={newSandbox.runtime}
                                onValueChange={(value: "python" | "nodejs" | "java" | "r" | "custom") =>
                                  setNewSandbox({ ...newSandbox, runtime: value })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="python">Python</SelectItem>
                                  <SelectItem value="nodejs">Node.js</SelectItem>
                                  <SelectItem value="java">Java</SelectItem>
                                  <SelectItem value="r">R</SelectItem>
                                  <SelectItem value="custom">Custom</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="memory-limit">Memory Limit</Label>
                              <Select
                                value={newSandbox.memoryLimit}
                                onValueChange={(value) => setNewSandbox({ ...newSandbox, memoryLimit: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="512MB">512MB</SelectItem>
                                  <SelectItem value="1GB">1GB</SelectItem>
                                  <SelectItem value="2GB">2GB</SelectItem>
                                  <SelectItem value="4GB">4GB</SelectItem>
                                  <SelectItem value="8GB">8GB</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="oci-image">OCI Image</Label>
                            <Select
                              value={newSandbox.image}
                              onValueChange={(value) => setNewSandbox({ ...newSandbox, image: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select an image" />
                              </SelectTrigger>
                              <SelectContent>
                                {ociImages
                                  .filter((img) => img.runtime === newSandbox.runtime)
                                  .map((image) => (
                                    <SelectItem key={image.id} value={`${image.name}:${image.tag}`}>
                                      {image.name}:{image.tag} ({image.size})
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="network-isolated"
                              checked={newSandbox.networkIsolated}
                              onChange={(e) => setNewSandbox({ ...newSandbox, networkIsolated: e.target.checked })}
                              className="rounded"
                            />
                            <Label htmlFor="network-isolated" className="text-sm">
                              Network Isolation (Recommended for security)
                            </Label>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setIsCreateSandboxOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleCreateSandbox}>Create Sandbox</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sandboxEnvironments.map((sandbox) => (
                      <div key={sandbox.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Lock className="h-4 w-4 text-primary" />
                              <h4 className="font-medium">{sandbox.name}</h4>
                              <Badge variant={getSandboxStatusColor(sandbox.status)}>{sandbox.status}</Badge>
                              {sandbox.networkIsolated && (
                                <Badge variant="outline" className="text-xs">
                                  <Shield className="h-3 w-3 mr-1" />
                                  Isolated
                                </Badge>
                              )}
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                              <div>
                                <span className="font-medium">Runtime:</span> {sandbox.runtime}
                              </div>
                              <div>
                                <span className="font-medium">Image:</span> {sandbox.image}
                              </div>
                              <div>
                                <span className="font-medium">Memory:</span> {sandbox.memoryLimit}
                              </div>
                              <div>
                                <span className="font-medium">Startup:</span> {sandbox.startupTime}ms
                              </div>
                            </div>
                            {sandbox.status === "running" && (
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                  <span>CPU Usage</span>
                                  <span>{sandbox.cpuUsage}%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                  <div
                                    className="bg-primary h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${sandbox.cpuUsage}%` }}
                                  ></div>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                  <span>Memory Usage</span>
                                  <span>{sandbox.memoryUsage}%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                  <div
                                    className="bg-secondary h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${sandbox.memoryUsage}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            {sandbox.status === "stopped" && (
                              <Button variant="outline" size="sm" onClick={() => handleStartSandbox(sandbox.id)}>
                                <Play className="h-4 w-4" />
                              </Button>
                            )}
                            {sandbox.status === "running" && (
                              <Button variant="outline" size="sm" onClick={() => handleStopSandbox(sandbox.id)}>
                                <Square className="h-4 w-4" />
                              </Button>
                            )}
                            <Button variant="ghost" size="sm" onClick={() => handleDestroySandbox(sandbox.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        {sandbox.dataVolumes.length > 0 && (
                          <div className="pt-3 border-t">
                            <h5 className="text-sm font-medium mb-2">Data Volumes</h5>
                            <div className="flex flex-wrap gap-1">
                              {sandbox.dataVolumes.map((volume, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {volume}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Data Processing Jobs */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Processing Jobs</CardTitle>
                      <CardDescription>Manage data processing tasks</CardDescription>
                    </div>
                    <Dialog open={isCreateJobOpen} onOpenChange={setIsCreateJobOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="secondary">
                          <Plus className="h-4 w-4 mr-2" />
                          New Job
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Create Processing Job</DialogTitle>
                          <DialogDescription>
                            Set up a new data processing task in a sandbox environment
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="job-name">Job Name</Label>
                            <Input
                              id="job-name"
                              value={newJob.name}
                              onChange={(e) => setNewJob({ ...newJob, name: e.target.value })}
                              placeholder="Customer Analysis Job"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="job-sandbox">Sandbox Environment</Label>
                              <Select
                                value={newJob.sandboxId}
                                onValueChange={(value) => setNewJob({ ...newJob, sandboxId: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select sandbox" />
                                </SelectTrigger>
                                <SelectContent>
                                  {sandboxEnvironments
                                    .filter((s) => s.status === "running")
                                    .map((sandbox) => (
                                      <SelectItem key={sandbox.id} value={sandbox.id}>
                                        {sandbox.name} ({sandbox.runtime})
                                      </SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="job-data">Data Source</Label>
                              <Select
                                value={newJob.dataOfferingId}
                                onValueChange={(value) => setNewJob({ ...newJob, dataOfferingId: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select data" />
                                </SelectTrigger>
                                <SelectContent>
                                  {dataOfferings.map((offering) => (
                                    <SelectItem key={offering.id} value={offering.id}>
                                      {offering.title}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="job-script">Processing Script</Label>
                            <Textarea
                              id="job-script"
                              value={newJob.script}
                              onChange={(e) => setNewJob({ ...newJob, script: e.target.value })}
                              placeholder="# Enter your processing script here..."
                              rows={8}
                              className="font-mono text-sm"
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setIsCreateJobOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleCreateJob}>Create Job</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {dataProcessingJobs.map((job) => (
                      <div key={job.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-sm">{job.name}</h5>
                          <Badge variant={getJobStatusColor(job.status)}>{job.status}</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div>
                            Sandbox: {sandboxEnvironments.find((s) => s.id === job.sandboxId)?.name || "Unknown"}
                          </div>
                          <div>Input: {job.inputSize}</div>
                          {job.outputSize && <div>Output: {job.outputSize}</div>}
                          <div>Started: {new Date(job.startTime).toLocaleString()}</div>
                          {job.endTime && <div>Completed: {new Date(job.endTime).toLocaleString()}</div>}
                        </div>
                        {job.results && (
                          <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-xs text-green-800">
                            {job.results}
                          </div>
                        )}
                        {job.errorMessage && (
                          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-800">
                            {job.errorMessage}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* OCI Images Repository */}
            <Card>
              <CardHeader>
                <CardTitle>OCI Images Repository</CardTitle>
                <CardDescription>Available container images for sandbox environments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {ociImages.map((image) => (
                    <div key={image.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">
                            {image.name}:{image.tag}
                          </h4>
                          {image.verified && (
                            <Badge variant="default" className="text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <Badge variant="outline">{image.runtime}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{image.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Size: {image.size}</span>
                        <span>{image.downloads} downloads</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">Updated: {image.lastUpdated}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring">
            <div className="space-y-6">
              {/* System Overview Cards */}
              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">System Status</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">Healthy</div>
                    <p className="text-xs text-muted-foreground">All systems operational</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
                    <Network className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">{getCurrentMetrics().activeConnections}</div>
                    <p className="text-xs text-muted-foreground">Connected peers</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Requests/Min</CardTitle>
                    <Globe className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-secondary">{getCurrentMetrics().requestsPerMinute}</div>
                    <p className="text-xs text-muted-foreground">API requests</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Security Alerts</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-destructive">
                      {securityAlerts.filter((a) => !a.resolved).length}
                    </div>
                    <p className="text-xs text-muted-foreground">Unresolved alerts</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* System Performance Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle>System Performance</CardTitle>
                    <CardDescription>Real-time resource usage and performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* CPU Usage */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">CPU Usage</span>
                        <span className="text-muted-foreground">{getCurrentMetrics().cpuUsage}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getCurrentMetrics().cpuUsage}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Memory Usage */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Memory Usage</span>
                        <span className="text-muted-foreground">{getCurrentMetrics().memoryUsage}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-secondary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getCurrentMetrics().memoryUsage}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Disk Usage */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Disk Usage</span>
                        <span className="text-muted-foreground">{getCurrentMetrics().diskUsage}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getCurrentMetrics().diskUsage}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Network Activity */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{getCurrentMetrics().networkIn}</div>
                        <p className="text-xs text-muted-foreground">KB/s In</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{getCurrentMetrics().networkOut}</div>
                        <p className="text-xs text-muted-foreground">KB/s Out</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Security Alerts */}
                <Card>
                  <CardHeader>
                    <CardTitle>Security Alerts</CardTitle>
                    <CardDescription>Monitor security events and policy violations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {securityAlerts.map((alert) => (
                        <div key={alert.id} className="flex items-start space-x-4 p-3 border rounded-lg">
                          <div className="flex-shrink-0">
                            {alert.severity === "critical" && <AlertTriangle className="h-5 w-5 text-red-500" />}
                            {alert.severity === "high" && <AlertTriangle className="h-5 w-5 text-orange-500" />}
                            {alert.severity === "medium" && <AlertCircle className="h-5 w-5 text-yellow-500" />}
                            {alert.severity === "low" && <AlertCircle className="h-5 w-5 text-blue-500" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium text-sm">{alert.title}</p>
                              <div className="flex items-center space-x-2">
                                <Badge variant={getAlertSeverityColor(alert.severity)} className="text-xs">
                                  {alert.severity}
                                </Badge>
                                {alert.resolved && (
                                  <Badge variant="outline" className="text-xs">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Resolved
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">{alert.description}</p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>Source: {alert.source}</span>
                              <span>{new Date(alert.timestamp).toLocaleString()}</span>
                            </div>
                            {!alert.resolved && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="mt-2 bg-transparent"
                                onClick={() => handleResolveAlert(alert.id)}
                              >
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Resolve
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Connector Health Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Connector Health Status</CardTitle>
                  <CardDescription>Monitor the health and performance of connected peers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    {connectorHealth.map((connector) => (
                      <div key={connector.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">{connector.name}</h4>
                          <Badge variant={getHealthStatusColor(connector.status)}>{connector.status}</Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Response Time:</span>
                            <span
                              className={`font-mono ${connector.responseTime > 1000 ? "text-red-600" : connector.responseTime > 500 ? "text-yellow-600" : "text-green-600"}`}
                            >
                              {connector.responseTime}ms
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Uptime:</span>
                            <span className="font-mono">{connector.uptime}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Version:</span>
                            <span className="font-mono text-xs">{connector.version}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Last Heartbeat:</span>
                            <span className="text-xs">{new Date(connector.lastHeartbeat).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Timeline of recent system events and transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {[
                      ...auditLogs,
                      ...securityAlerts.map((alert) => ({
                        id: alert.id,
                        timestamp: alert.timestamp,
                        action: alert.type as any,
                        actor: alert.source,
                        target: alert.title,
                        details: alert.description,
                        status: alert.resolved ? ("success" as const) : ("pending" as const),
                      })),
                    ]
                      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                      .slice(0, 10)
                      .map((event) => (
                        <div
                          key={event.id}
                          className="flex items-start space-x-4 p-3 border-l-2 border-primary/20 pl-4"
                        >
                          <div className="flex-shrink-0">
                            {event.action === "did_registration" && <Shield className="h-4 w-4 text-blue-500" />}
                            {event.action === "contract_deployment" && <FileText className="h-4 w-4 text-purple-500" />}
                            {event.action === "data_request" && <Download className="h-4 w-4 text-green-500" />}
                            {event.action === "data_transfer" && <Upload className="h-4 w-4 text-orange-500" />}
                            {event.action === "policy_update" && <Settings className="h-4 w-4 text-gray-500" />}
                            {event.action === "authentication" && <Key className="h-4 w-4 text-red-500" />}
                            {event.action === "policy_violation" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                            {event.action === "network" && <Network className="h-4 w-4 text-blue-500" />}
                            {event.action === "system" && <Activity className="h-4 w-4 text-gray-500" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium text-sm">{event.target}</p>
                              <Badge
                                variant={
                                  event.status === "success"
                                    ? "default"
                                    : event.status === "failed"
                                      ? "destructive"
                                      : "secondary"
                                }
                                className="text-xs"
                              >
                                {event.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">{event.details}</p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>Actor: {event.actor}</span>
                              <span>{new Date(event.timestamp).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* System Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle>System Configuration</CardTitle>
                  <CardDescription>Current system settings and configuration status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-4">
                      <h4 className="font-medium">Connector Settings</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">DID Registration:</span>
                          <Badge variant={connectorStatus === "registered" ? "default" : "secondary"}>
                            {connectorStatus === "registered" ? "Registered" : "Not Registered"}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Blockchain Network:</span>
                          <Badge variant="default">
                            {blockchainNetworks.find((n) => n.id === selectedNetwork)?.name || "Unknown"}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Active Sandboxes:</span>
                          <span className="font-mono">
                            {sandboxEnvironments.filter((s) => s.status === "running").length}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Data Offerings:</span>
                          <span className="font-mono">{dataOfferings.filter((o) => o.status === "active").length}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Security Status</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Network Isolation:</span>
                          <Badge variant="default">
                            <Shield className="h-3 w-3 mr-1" />
                            Enabled
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Policy Enforcement:</span>
                          <Badge variant="default">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Audit Logging:</span>
                          <Badge variant="default">Enabled</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Encryption:</span>
                          <Badge variant="default">
                            <Lock className="h-3 w-3 mr-1" />
                            TLS 1.3
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
