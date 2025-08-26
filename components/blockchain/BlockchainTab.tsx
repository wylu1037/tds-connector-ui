"use client";

import { MetricCard, StatusBadge } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBlockchain } from "@/hooks";
import { useDataSpace } from "@/lib/contexts/DataSpaceContext";
import {
  Activity,
  AlertCircle,
  Building,
  CheckCircle,
  Clock,
  Database,
  FileSearch,
  Folder,
  GitBranch,
  Network,
  Shield,
} from "lucide-react";
import { useState } from "react";

// Sub chain type mapping
const subChainTypes = {
  catalog: {
    name: "Catalog Chain",
    description: "Data catalog contracts and directory operations",
    icon: Folder,
    purpose: "Data Directory Management",
  },
  audit: {
    name: "Audit Chain",
    description: "Connector operations and compliance audit trails",
    icon: FileSearch,
    purpose: "Audit & Compliance",
  },
  business: {
    name: "Business Chain",
    description: "Business contracts and commercial transactions",
    icon: Building,
    purpose: "Business Operations",
  },
  lineage: {
    name: "Lineage Chain",
    description: "Data lineage tracking and file relationship records",
    icon: GitBranch,
    purpose: "Data Lineage",
  },
};

export function BlockchainTab() {
  const { blockchainNetworks, recentTransactions } = useBlockchain();

  const { currentDataSpace } = useDataSpace();

  // State for selected sub chain type
  const [selectedSubChainType, setSelectedSubChainType] = useState<
    "catalog" | "audit" | "business" | "lineage"
  >("catalog");

  // 分离主链和子链
  const mainChain = blockchainNetworks.find(
    (network) => network.chainType === "main"
  );
  const subChains = blockchainNetworks.filter(
    (network) => network.chainType === "sub"
  );

  // 分离主链和子链的交易
  const mainChainTransactions = recentTransactions.filter(
    (tx) => tx.chainType === "main"
  );
  const subChainTransactions = recentTransactions.filter(
    (tx) => tx.chainType === "sub" && tx.subChainType === selectedSubChainType
  );

  // Get current sub chain info
  const currentSubChainInfo = subChainTypes[selectedSubChainType];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          title="Main Chain"
          value={mainChain ? "Connected" : "Disconnected"}
          description="Identity Chain (DID)"
          icon={Shield}
          variant="primary"
        />
        <MetricCard
          title="Sub Chains"
          value={subChains.length}
          description={`${
            subChains.filter((s) => s.status === "connected").length
          } Connected`}
          icon={Database}
          variant="secondary"
        />
        <MetricCard
          title="Recent Transactions"
          value={recentTransactions.length}
          description="Last 24 hours"
          icon={Activity}
        />
        <MetricCard
          title="Data Space"
          value={currentDataSpace.name}
          description="Current environment"
          icon={Network}
        />
      </div>

      {/* Main Chain and Sub Chain Display */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Main Chain */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Main Chain (Identity Chain)
                </CardTitle>
                <CardDescription>
                  DID registration and identity verification
                </CardDescription>
              </div>
              <StatusBadge status={mainChain?.status || "disconnected"} />
            </div>
          </CardHeader>
          <CardContent>
            {mainChain ? (
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{mainChain.name}</h4>
                      <Badge variant="outline">{mainChain.type}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Chain ID:</span>
                        <p className="font-medium">{mainChain.chainId}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Curve Algorithm:
                        </span>
                        <p className="font-medium">
                          {mainChain.curveAlgorithm}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Witness Nodes:
                        </span>
                        <p className="font-medium">{mainChain.witnessNodes}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Consensus Nodes:
                        </span>
                        <p className="font-medium">
                          {mainChain.consensusNodes}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Block Height:
                        </span>
                        <p className="font-medium">
                          {mainChain.blockHeight.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Purpose:</span>
                        <p className="font-medium">{mainChain.purpose}</p>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Description:
                      </span>
                      <p className="mt-1 text-sm">{mainChain.description}</p>
                    </div>
                  </div>
                </div>

                {/* Main Chain Recent Transactions */}
                <div>
                  <h5 className="mb-3 font-medium">Recent Transactions</h5>
                  <div className="space-y-2">
                    {mainChainTransactions.slice(0, 3).map((tx) => (
                      <div
                        key={tx.id}
                        className="flex items-center justify-between rounded border p-2"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            {tx.status === "confirmed" ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : tx.status === "failed" ? (
                              <AlertCircle className="h-4 w-4 text-red-500" />
                            ) : (
                              <Clock className="h-4 w-4 text-yellow-500" />
                            )}
                            <span className="text-sm font-medium">
                              {tx.type.replace("_", " ")}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-muted-foreground font-mono text-xs">
                            {tx.hash.slice(0, 8)}...{tx.hash.slice(-6)}
                          </div>
                          <div className="text-muted-foreground text-xs">
                            {new Date(tx.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-muted-foreground py-8 text-center">
                No main chain connected
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sub Chain */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <CardTitle className="flex items-center gap-2">
                  {(() => {
                    const IconComponent = currentSubChainInfo.icon;
                    return <IconComponent className="h-5 w-5" />;
                  })()}
                  {currentSubChainInfo.name}
                </CardTitle>
                <CardDescription>
                  {currentSubChainInfo.description}
                </CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <Select
                  value={selectedSubChainType}
                  onValueChange={(value) =>
                    setSelectedSubChainType(
                      value as "catalog" | "audit" | "business" | "lineage"
                    )
                  }
                >
                  <SelectTrigger className="bg-background border-border w-fit border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(subChainTypes).map(([key, info]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          {(() => {
                            const IconComponent = info.icon;
                            return <IconComponent className="h-4 w-4" />;
                          })()}
                          {info.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <StatusBadge status="connected" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">
                      {currentSubChainInfo.name}
                    </h4>
                    <Badge variant="outline">ZLTC</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Chain Type:</span>
                      <p className="font-medium">Sub Chain</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Sub Chain Type:
                      </span>
                      <p className="font-medium">
                        {selectedSubChainType.charAt(0).toUpperCase() +
                          selectedSubChainType.slice(1)}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Active Transactions:
                      </span>
                      <p className="font-medium">
                        {subChainTransactions.length}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status:</span>
                      <p className="font-medium">Connected</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Latest Block:
                      </span>
                      <p className="font-medium">
                        {Math.floor(Math.random() * 1000000).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Purpose:</span>
                      <p className="font-medium">
                        {currentSubChainInfo.purpose}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Description:</span>
                    <p className="mt-1 text-sm">
                      {currentSubChainInfo.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sub Chain Recent Transactions */}
              <div>
                <h5 className="mb-3 font-medium">Recent Transactions</h5>
                <div className="space-y-2">
                  {subChainTransactions.length > 0 ? (
                    subChainTransactions.slice(0, 3).map((tx) => (
                      <div
                        key={tx.id}
                        className="flex items-center justify-between rounded border p-2"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            {tx.status === "confirmed" ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : tx.status === "failed" ? (
                              <AlertCircle className="h-4 w-4 text-red-500" />
                            ) : (
                              <Clock className="h-4 w-4 text-yellow-500" />
                            )}
                            <span className="text-sm font-medium">
                              {tx.type
                                .replace("_", " ")
                                .replace(/\b\w/g, (l) => l.toUpperCase())}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-muted-foreground font-mono text-xs">
                            {tx.hash.slice(0, 8)}...{tx.hash.slice(-6)}
                          </div>
                          <div className="text-muted-foreground text-xs">
                            {new Date(tx.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-muted-foreground py-4 text-center">
                      No recent transactions for{" "}
                      {currentSubChainInfo.name.toLowerCase()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
