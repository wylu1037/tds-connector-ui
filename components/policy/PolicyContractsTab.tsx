"use client"

import {
  Clock,
  Edit,
  Eye,
  FileText,
  Plus,
  Shield,
  Trash2,
  Users,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Key,
  Globe,
  Lock,
  TrendingUp,
} from "lucide-react";
import { MetricCard, StatusBadge } from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useContracts } from "@/hooks";
import { useDataSpace } from "@/lib/contexts/DataSpaceContext";

// Policy规则类型图标映射
const policyRuleIcons = {
  access_period: Clock,
  access_count: TrendingUp,
  identity_restriction: Users,
  encryption: Lock,
  ip_restriction: Globe,
  transfer_limit: FileText,
  qps_limit: Shield,
};

// Policy规则类型名称映射
const policyRuleTypeNames = {
  access_period: "Access Period Limitation",
  access_count: "Access Count Limitation",
  identity_restriction: "Identity Restriction",
  encryption: "Encryption & Transmission Protection",
  ip_restriction: "Access IP Restriction",
  transfer_limit: "Single Transfer Limit",
  qps_limit: "Data Transmission QPS Limit",
};

export function PolicyContractsTab() {
  const {
    digitalContracts,
    policyTemplates,
    contractTemplates,
    activeContracts,
    pendingContracts,
  } = useContracts();

  const { currentDataSpace } = useDataSpace();

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          title="Active Policy Templates"
          value={policyTemplates.length}
          description="Currently available"
          icon={Shield}
          variant="primary"
        />
        <MetricCard
          title="Contract Templates"
          value={contractTemplates.length}
          description="Ready to use"
          icon={FileText}
          variant="secondary"
        />
        <MetricCard
          title="Active Contracts"
          value={activeContracts.length}
          description="Currently enforced"
          icon={CheckCircle}
        />
        <MetricCard
          title="Data Space"
          value={currentDataSpace.name}
          description="Current environment"
          icon={Globe}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Policy Templates */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Policy Templates
                </CardTitle>
                <CardDescription>
                  Define access control and usage policies for data sharing
                </CardDescription>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Policy
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {policyTemplates.map((policy) => (
                <Card key={policy.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{policy.name}</h4>
                        <Badge
                          variant={
                            policy.severity === "high"
                              ? "destructive"
                              : policy.severity === "medium"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {policy.severity}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {policy.category}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {policy.description}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {/* 简化展示：每个Policy只有一个规则 */}
                      {policy.rules.length > 0 && (
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            {(() => {
                              const rule = policy.rules[0]; // 取第一个规则
                              const IconComponent =
                                policyRuleIcons[rule.type] || Shield;
                              return (
                                <>
                                  <IconComponent className="h-5 w-5 text-primary" />
                                  <div>
                                    <p className="text-sm font-medium">
                                      {rule.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {rule.description}
                                    </p>
                                  </div>
                                </>
                              );
                            })()}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-sm">
                              {policy.rules[0].value} {policy.rules[0].unit}
                            </Badge>
                            {policy.rules[0].isActive ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <XCircle className="h-4 w-4 text-gray-400" />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Enforcement: {policy.enforcementType}</span>
                        <span>•</span>
                        <span>
                          Created:{" "}
                          {new Date(policy.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contract Templates */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Contract Templates
                </CardTitle>
                <CardDescription>
                  Pre-configured contracts combining multiple policies
                </CardDescription>
              </div>
              <Button size="sm" variant="secondary">
                <Plus className="h-4 w-4 mr-2" />
                Create Contract
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contractTemplates.map((contract) => (
                <Card key={contract.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{contract.name}</h4>
                        <Badge
                          variant={
                            contract.status === "active"
                              ? "default"
                              : contract.status === "draft"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {contract.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {contract.contractType === "single_policy"
                            ? "Single Policy"
                            : "Multi Policy"}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {contract.description}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div>
                        <h5 className="text-sm font-medium mb-2">
                          Included Policies:
                        </h5>
                        <div className="space-y-1">
                          {contract.policyIds.map((policyId) => {
                            const policy = policyTemplates.find(
                              (p) => p.id === policyId
                            );
                            return policy ? (
                              <div
                                key={policyId}
                                className="flex items-center gap-2 p-2 bg-muted/50 rounded"
                              >
                                <Shield className="h-4 w-4 text-primary" />
                                <span className="text-sm font-medium">
                                  {policy.name}
                                </span>
                                <Badge
                                  variant="outline"
                                  className="text-xs ml-auto"
                                >
                                  1 rule
                                </Badge>
                              </div>
                            ) : (
                              <div
                                key={policyId}
                                className="flex items-center gap-2 p-2 bg-muted/50 rounded"
                              >
                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                <span className="text-sm text-muted-foreground">
                                  Policy not found: {policyId}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Used: {contract.usageCount} times</span>
                          <span>•</span>
                          <span>
                            Created:{" "}
                            {new Date(contract.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <Button size="sm" variant="outline">
                          Use Template
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}