// 基于数据空间的数据服务
export interface DataSpaceDataConfig {
  [key: string]: {
    dataOfferings: any[];
    dataContracts: any[];
    connectedConnectors: any[];
    digitalContracts: any[];
    policyTemplates: any[];
    externalOfferings: any[];
    dataRequests: any[];
  };
}

export const dataSpaceConfigs: DataSpaceDataConfig = {
  healthcare: {
    dataOfferings: [
      {
        id: "h1",
        title: "Patient Demographics Dataset",
        description: "Anonymized patient demographic data for healthcare analytics",
        dataType: "CSV",
        accessPolicy: "GDPR Compliant",
        status: "active",
        createdAt: "2024-01-10T10:00:00Z",
      },
      {
        id: "h2", 
        title: "Medical Imaging Archive",
        description: "De-identified medical imaging data for research",
        dataType: "DICOM",
        accessPolicy: "Research Only",
        status: "active",
        createdAt: "2024-01-12T14:30:00Z",
      },
    ],
    dataContracts: [
      {
        id: "hc1",
        contractAddress: "0xhealth123456789abcdef123456789abcdef123456",
        providerDID: "did:health:provider123",
        consumerDID: "did:health:consumer456",
        policy: "GDPR Compliance",
        status: "active",
        createdAt: "2024-01-10T10:00:00Z",
        expiresAt: "2024-12-31T23:59:59Z",
      },
      {
        id: "hc2",
        contractAddress: "0xhealth987654321fedcba987654321fedcba987654",
        providerDID: "did:health:provider789",
        consumerDID: "did:health:consumer123",
        policy: "Medical Research",
        status: "active",
        createdAt: "2024-01-12T14:30:00Z",
      },
    ],
    connectedConnectors: [
      {
        id: "hconn1",
        name: "Hospital Network EU",
        did: "did:health:hospital-eu-123",
        status: "connected",
        lastSeen: "2024-01-15T08:30:00Z",
        offeringsCount: 15,
      },
      {
        id: "hconn2", 
        name: "Research Institute",
        did: "did:health:research-inst-456",
        status: "connected",
        lastSeen: "2024-01-14T16:45:00Z",
        offeringsCount: 8,
      },
    ],
    digitalContracts: [],
    policyTemplates: [
      {
        id: "hp1",
        name: "GDPR Healthcare Policy",
        description: "GDPR compliant data processing for healthcare data",
        rules: ["Patient consent required", "Data anonymization mandatory", "EU data residency"],
        category: "compliance",
        severity: "high",
        enforcementType: "automatic",
      },
    ],
    externalOfferings: [
      {
        id: "he1",
        title: "Clinical Trial Data",
        description: "Phase III clinical trial datasets",
        dataType: "JSON/CSV",
        provider: "Pharma Research Corp",
        providerDID: "did:health:pharma123",
        accessPolicy: "Research License",
        category: "research",
        lastUpdated: "2024-01-15T08:00:00Z",
        size: "5.2 GB",
        price: "$2000/month",
      },
    ],
    dataRequests: [],
  },
  
  finance: {
    dataOfferings: [
      {
        id: "f1",
        title: "Market Analytics Dataset",
        description: "Real-time financial market data and analytics",
        dataType: "JSON",
        accessPolicy: "Commercial License",
        status: "active",
        createdAt: "2024-01-10T10:00:00Z",
      },
      {
        id: "f2",
        title: "Credit Risk Models",
        description: "Machine learning models for credit risk assessment",
        dataType: "Model",
        accessPolicy: "Partner Only",
        status: "active", 
        createdAt: "2024-01-12T14:30:00Z",
      },
    ],
    dataContracts: [
      {
        id: "fc1",
        contractAddress: "0xfinance123456789abcdef123456789abcdef123456",
        providerDID: "did:finance:bank123",
        consumerDID: "did:finance:fintech456",
        policy: "Commercial License",
        status: "active",
        createdAt: "2024-01-10T10:00:00Z",
        expiresAt: "2024-12-31T23:59:59Z",
      },
    ],
    connectedConnectors: [
      {
        id: "fconn1",
        name: "Central Bank",
        did: "did:finance:central-bank-eu-123",
        status: "connected",
        lastSeen: "2024-01-15T09:00:00Z",
        offeringsCount: 25,
      },
      {
        id: "fconn2",
        name: "FinTech Alliance",
        did: "did:finance:fintech-alliance-456",
        status: "connected", 
        lastSeen: "2024-01-14T18:30:00Z",
        offeringsCount: 12,
      },
    ],
    digitalContracts: [],
    policyTemplates: [
      {
        id: "fp1",
        name: "Financial Data Policy", 
        description: "Regulatory compliant financial data sharing",
        rules: ["PCI DSS compliance", "Anti-money laundering checks", "Basel III compliance"],
        category: "compliance",
        severity: "high",
        enforcementType: "automatic",
      },
    ],
    externalOfferings: [
      {
        id: "fe1",
        title: "ESG Ratings Database",
        description: "Environmental, Social, and Governance ratings for listed companies",
        dataType: "JSON/XML",
        provider: "ESG Analytics Inc",
        providerDID: "did:finance:esg123",
        accessPolicy: "Subscription",
        category: "analytics",
        lastUpdated: "2024-01-15T10:00:00Z",
        size: "1.8 GB",
        price: "$5000/month",
      },
    ],
    dataRequests: [],
  },

  mobility: {
    dataOfferings: [
      {
        id: "m1",
        title: "Traffic Flow Data",
        description: "Real-time traffic flow and congestion data",
        dataType: "JSON",
        accessPolicy: "Open Data",
        status: "active",
        createdAt: "2024-01-10T10:00:00Z",
      },
      {
        id: "m2",
        title: "Public Transport Schedule",
        description: "Dynamic public transportation schedules and delays",
        dataType: "GTFS",
        accessPolicy: "Municipal License",
        status: "active",
        createdAt: "2024-01-12T14:30:00Z",
      },
    ],
    dataContracts: [
      {
        id: "mc1",
        contractAddress: "0xmobility123456789abcdef123456789abcdef12345",
        providerDID: "did:mobility:city123",
        consumerDID: "did:mobility:transport456",
        policy: "Open Access",
        status: "active",
        createdAt: "2024-01-10T10:00:00Z",
      },
    ],
    connectedConnectors: [
      {
        id: "mconn1",
        name: "Smart City Platform",
        did: "did:mobility:smart-city-123",
        status: "connected",
        lastSeen: "2024-01-15T07:45:00Z",
        offeringsCount: 20,
      },
    ],
    digitalContracts: [],
    policyTemplates: [
      {
        id: "mp1",
        name: "Mobility Data Policy",
        description: "Urban mobility data sharing guidelines",
        rules: ["Privacy protection for travelers", "Real-time data updates", "Open standards compliance"],
        category: "usage",
        severity: "medium",
        enforcementType: "hybrid",
      },
    ],
    externalOfferings: [
      {
        id: "me1",
        title: "Weather Impact on Transport",
        description: "Weather data correlated with transportation disruptions",
        dataType: "JSON",
        provider: "Weather & Transport Analytics",
        providerDID: "did:mobility:weather123",
        accessPolicy: "Open Access",
        category: "analytics",
        lastUpdated: "2024-01-15T06:00:00Z",
        size: "3.1 GB",
      },
    ],
    dataRequests: [],
  },

  energy: {
    dataOfferings: [
      {
        id: "e1",
        title: "Grid Load Forecasting",
        description: "Electrical grid load prediction models and historical data",
        dataType: "Time Series",
        accessPolicy: "Utility Partners",
        status: "inactive",
        createdAt: "2024-01-10T10:00:00Z",
      },
    ],
    dataContracts: [],
    connectedConnectors: [
      {
        id: "econn1",
        name: "Energy Grid Operator",
        did: "did:energy:grid-op-123",
        status: "pending",
        lastSeen: "2024-01-10T12:00:00Z",
        offeringsCount: 5,
      },
    ],
    digitalContracts: [],
    policyTemplates: [
      {
        id: "ep1",
        name: "Energy Data Security Policy",
        description: "Critical infrastructure data protection",
        rules: ["Critical infrastructure protection", "Government approval required", "24/7 monitoring"],
        category: "compliance",
        severity: "high",
        enforcementType: "manual",
      },
    ],
    externalOfferings: [],
    dataRequests: [],
  },
};

export function getDataForSpace(dataSpaceId: string) {
  return dataSpaceConfigs[dataSpaceId] || dataSpaceConfigs.healthcare;
}
