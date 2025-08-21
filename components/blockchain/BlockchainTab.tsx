"use client"

import {
  AlertCircle,
  CheckCircle,
  Clock,
  Database,
  Eye,
  Network,
  Shield,
  Link,
  Activity,
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
import { useBlockchain } from "@/hooks";
import { useDataSpace } from "@/lib/contexts/DataSpaceContext";

export function BlockchainTab() {
  const {
    blockchainNetworks,
    blockchainTransactions,
    auditLogs,
    activeNetworks,
    recentTransactions,
    recentAuditLogs,
  } = useBlockchain();

  const { currentDataSpace } = useDataSpace();

  // 分离主链和子链
  const mainChain = blockchainNetworks.find(network => network.chainType === "main");
  const subChain = blockchainNetworks.find(network => network.chainType === "sub");

  // 分离主链和子链的交易
  const mainChainTransactions = recentTransactions.filter(tx => tx.chainType === "main");
  const subChainTransactions = recentTransactions.filter(tx => tx.chainType === "sub");

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
          title="Sub Chain"
          value={subChain ? "Connected" : "Disconnected"}
          description="Business Operations"
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
                <div className="p-4 border rounded-lg">
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
                        <span className="text-muted-foreground">Curve Algorithm:</span>
                        <p className="font-medium">{mainChain.curveAlgorithm}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Witness Nodes:</span>
                        <p className="font-medium">{mainChain.witnessNodes}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Consensus Nodes:</span>
                        <p className="font-medium">{mainChain.consensusNodes}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Block Height:</span>
                        <p className="font-medium">{mainChain.blockHeight.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Purpose:</span>
                        <p className="font-medium">{mainChain.purpose}</p>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Description:</span>
                      <p className="text-sm mt-1">{mainChain.description}</p>
                    </div>
                  </div>
                </div>
                
                {/* Main Chain Recent Transactions */}
                <div>
                  <h5 className="font-medium mb-3">Recent Transactions</h5>
                  <div className="space-y-2">
                    {mainChainTransactions.slice(0, 3).map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-2 border rounded">
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
                          <div className="text-xs text-muted-foreground font-mono">
                            {tx.hash.slice(0, 8)}...{tx.hash.slice(-6)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(tx.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No main chain connected
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sub Chain */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Sub Chain (Business Chain)
                </CardTitle>
                <CardDescription>
                  Audit logs and business operations
                </CardDescription>
              </div>
              <StatusBadge status={subChain?.status || "disconnected"} />
            </div>
          </CardHeader>
          <CardContent>
            {subChain ? (
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{subChain.name}</h4>
                      <Badge variant="outline">{subChain.type}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Chain ID:</span>
                        <p className="font-medium">{subChain.chainId}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Curve Algorithm:</span>
                        <p className="font-medium">{subChain.curveAlgorithm}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Witness Nodes:</span>
                        <p className="font-medium">{subChain.witnessNodes}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Consensus Nodes:</span>
                        <p className="font-medium">{subChain.consensusNodes}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Block Height:</span>
                        <p className="font-medium">{subChain.blockHeight.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Purpose:</span>
                        <p className="font-medium">{subChain.purpose}</p>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Description:</span>
                      <p className="text-sm mt-1">{subChain.description}</p>
                    </div>
                  </div>
                </div>
                
                {/* Sub Chain Recent Transactions */}
                <div>
                  <h5 className="font-medium mb-3">Recent Transactions</h5>
                  <div className="space-y-2">
                    {subChainTransactions.slice(0, 3).map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-2 border rounded">
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
                          <div className="text-xs text-muted-foreground font-mono">
                            {tx.hash.slice(0, 8)}...{tx.hash.slice(-6)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(tx.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No sub chain connected
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* All Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>All Recent Transactions</CardTitle>
            <CardDescription>Latest blockchain transactions across all chains</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.slice(0, 5).map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-3 border rounded"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      {tx.status === "confirmed" ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : tx.status === "failed" ? (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      ) : (
                        <Clock className="h-4 w-4 text-yellow-500" />
                      )}
                      <div>
                        <span className="text-sm font-medium">
                          {tx.type.replace("_", " ")}
                        </span>
                        <div className="text-xs text-muted-foreground">
                          {tx.chainType === "main" ? "Main Chain" : "Sub Chain"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono">
                      {tx.hash.slice(0, 8)}...{tx.hash.slice(-6)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(tx.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Audit Logs */}
        <Card>
          <CardHeader>
            <CardTitle>Audit Logs</CardTitle>
            <CardDescription>System activity and business operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAuditLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="p-3 border rounded">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      {log.action.replace("_", " ")}
                    </span>
                    <StatusBadge status={log.status} className="text-xs" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{log.details}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Actor: {log.actor}</span>
                    <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                  </div>
                  {log.blockchainTxId && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Tx: {log.blockchainTxId}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}