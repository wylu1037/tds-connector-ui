// Cross-border data audit service
import type { CrossBorderAuditStatus, DataOffering, ExternalDataOffering } from "@/types";

export interface CrossBorderAuditRequest {
  id: string;
  dataOfferingId: string;
  dataOfferingTitle: string;
  requestType: "offering_registration" | "data_consumption" | "data_transfer";
  requesterDID: string;
  targetCountry?: string;
  submittedAt: string;
  status: CrossBorderAuditStatus;
  reviewNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  estimatedReviewTime?: string;
  urgency: "low" | "normal" | "high";
  dataClassification: "public" | "sensitive" | "restricted" | "confidential";
}

export interface AuditRequirement {
  country: string;
  dataType: string;
  requirements: {
    mandatoryApproval: boolean;
    estimatedProcessingDays: number;
    requiredDocuments: string[];
    complianceFrameworks: string[];
  };
}

class CrossBorderAuditService {
  // Mock audit requirements database
  private auditRequirements: AuditRequirement[] = [
    {
      country: "US",
      dataType: "healthcare",
      requirements: {
        mandatoryApproval: true,
        estimatedProcessingDays: 15,
        requiredDocuments: ["HIPAA Compliance Certificate", "Data Processing Agreement"],
        complianceFrameworks: ["HIPAA", "FDA 21 CFR Part 11"]
      }
    },
    {
      country: "EU",
      dataType: "financial",
      requirements: {
        mandatoryApproval: true,
        estimatedProcessingDays: 21,
        requiredDocuments: ["GDPR Impact Assessment", "Financial Services License"],
        complianceFrameworks: ["GDPR", "PSD2", "MiFID II"]
      }
    },
    {
      country: "CN",
      dataType: "all",
      requirements: {
        mandatoryApproval: true,
        estimatedProcessingDays: 30,
        requiredDocuments: ["Data Security Assessment", "Cross-border Transfer Permit"],
        complianceFrameworks: ["Cybersecurity Law", "PIPL", "Data Security Law"]
      }
    }
  ];

  // Mock audit requests storage
  private auditRequests: CrossBorderAuditRequest[] = [
    {
      id: "audit-001",
      dataOfferingId: "h1",
      dataOfferingTitle: "Patient Records Database",
      requestType: "offering_registration",
      requesterDID: "did:health:hospital123",
      targetCountry: "US",
      submittedAt: "2024-01-15T10:00:00Z",
      status: "pending",
      urgency: "high",
      dataClassification: "confidential",
      estimatedReviewTime: "15 business days"
    },
    {
      id: "audit-002",
      dataOfferingId: "f1",
      dataOfferingTitle: "Market Analytics Dataset",
      requestType: "data_consumption",
      requesterDID: "did:finance:bank123",
      targetCountry: "EU",
      submittedAt: "2024-01-10T08:30:00Z",
      status: "approved",
      urgency: "normal",
      dataClassification: "sensitive",
      reviewedBy: "EU Data Protection Authority",
      reviewedAt: "2024-01-20T14:00:00Z",
      reviewNotes: "Approved with standard data protection requirements."
    }
  ];

  // Check if cross-border audit is required
  checkAuditRequirement(
    dataOffering: DataOffering | ExternalDataOffering,
    targetCountry: string,
    requestType: "offering_registration" | "data_consumption" | "data_transfer"
  ): {
    required: boolean;
    requirement?: AuditRequirement;
    reason?: string;
  } {
    // Check if the data involves cross-border transfer
    const isInternational = targetCountry !== "domestic";
    
    if (!isInternational) {
      return {
        required: false,
        reason: "Domestic data transfer - no cross-border audit required"
      };
    }

    // Find specific requirement
    let requirement = this.auditRequirements.find(
      req => req.country === targetCountry && 
      (req.dataType === "all" || req.dataType === this.extractDataSpaceFromOffering(dataOffering))
    );

    // If no specific requirement found, check for general country requirements
    if (!requirement) {
      requirement = this.auditRequirements.find(
        req => req.country === targetCountry && req.dataType === "all"
      );
    }

    if (requirement?.requirements.mandatoryApproval) {
      return {
        required: true,
        requirement,
        reason: `Cross-border data transfer to ${targetCountry} requires mandatory approval`
      };
    }

    return {
      required: false,
      reason: "No mandatory audit requirements found for this jurisdiction"
    };
  }

  // Submit audit request
  async submitAuditRequest(
    dataOffering: DataOffering | ExternalDataOffering,
    requestType: "offering_registration" | "data_consumption" | "data_transfer",
    requesterDID: string,
    targetCountry?: string,
    urgency: "low" | "normal" | "high" = "normal",
    dataClassification: "public" | "sensitive" | "restricted" | "confidential" = "sensitive"
  ): Promise<CrossBorderAuditRequest> {
    const auditRequest: CrossBorderAuditRequest = {
      id: `audit-${Date.now()}`,
      dataOfferingId: dataOffering.id,
      dataOfferingTitle: dataOffering.title,
      requestType,
      requesterDID,
      targetCountry,
      submittedAt: new Date().toISOString(),
      status: "pending",
      urgency,
      dataClassification
    };

    // Calculate estimated review time based on requirements
    if (targetCountry) {
      const requirement = this.auditRequirements.find(
        req => req.country === targetCountry
      );
      if (requirement) {
        auditRequest.estimatedReviewTime = `${requirement.requirements.estimatedProcessingDays} business days`;
      }
    }

    // Store the request
    this.auditRequests.push(auditRequest);

    // Simulate async submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    return auditRequest;
  }

  // Get audit requests for a specific data offering
  getAuditRequestsForOffering(offeringId: string): CrossBorderAuditRequest[] {
    return this.auditRequests.filter(req => req.dataOfferingId === offeringId);
  }

  // Get all audit requests for a requester
  getAuditRequestsForRequester(requesterDID: string): CrossBorderAuditRequest[] {
    return this.auditRequests.filter(req => req.requesterDID === requesterDID);
  }

  // Update audit status (simulate regulatory authority action)
  async updateAuditStatus(
    requestId: string,
    status: CrossBorderAuditStatus,
    reviewNotes?: string,
    reviewedBy?: string
  ): Promise<CrossBorderAuditRequest | null> {
    const request = this.auditRequests.find(req => req.id === requestId);
    if (!request) return null;

    request.status = status;
    request.reviewedAt = new Date().toISOString();
    if (reviewNotes) request.reviewNotes = reviewNotes;
    if (reviewedBy) request.reviewedBy = reviewedBy;

    return request;
  }

  // Get audit requirements for a specific country and data type
  getAuditRequirements(country: string, dataType?: string): AuditRequirement | null {
    return this.auditRequirements.find(
      req => req.country === country && 
      (req.dataType === "all" || req.dataType === dataType)
    ) || null;
  }

  // Extract data space category from offering
  private extractDataSpaceFromOffering(offering: DataOffering | ExternalDataOffering): string {
    // Simple heuristic based on offering title/description
    const text = `${offering.title} ${offering.description}`.toLowerCase();
    
    if (text.includes("health") || text.includes("medical") || text.includes("patient")) {
      return "healthcare";
    }
    if (text.includes("financial") || text.includes("bank") || text.includes("payment")) {
      return "financial";
    }
    if (text.includes("mobility") || text.includes("transport") || text.includes("traffic")) {
      return "mobility";
    }
    if (text.includes("energy") || text.includes("grid") || text.includes("power")) {
      return "energy";
    }
    
    return "general";
  }

  // Simulate automated compliance check
  async runComplianceCheck(
    dataOffering: DataOffering | ExternalDataOffering,
    targetCountry: string
  ): Promise<{
    passed: boolean;
    score: number;
    issues: string[];
    recommendations: string[];
  }> {
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock compliance analysis
    const issues: string[] = [];
    const recommendations: string[] = [];
    let score = 85;

    // Check data classification
    if (!("traceabilityInfo" in dataOffering)) {
      issues.push("Missing traceability information");
      score -= 15;
      recommendations.push("Add complete traceability information including blockchain records");
    }

    // Check storage location
    if ("storageLocation" in dataOffering && dataOffering.storageLocation?.includes("Pending")) {
      issues.push("Storage location not finalized");
      score -= 10;
      recommendations.push("Finalize data storage location before cross-border transfer");
    }

    // Check audit status
    if ("crossBorderAuditStatus" in dataOffering && dataOffering.crossBorderAuditStatus === "rejected") {
      issues.push("Previous audit rejection not resolved");
      score -= 25;
      recommendations.push("Address previous audit rejection reasons before resubmission");
    }

    return {
      passed: score >= 70,
      score,
      issues,
      recommendations
    };
  }
}

// Singleton instance
export const crossBorderAuditService = new CrossBorderAuditService();