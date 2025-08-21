"use client"

import {
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Database,
  Eye,
  Network,
  Plus,
  Shield,
} from "lucide-react";
import { useState } from "react";
import { MetricCard, StatusBadge } from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBlockchain, useContracts } from "@/hooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function BlockchainTab() {
  const {
    blockchainNetworks,
    selectedNetwork,
    setSelectedNetwork,
    auditLogs,
    blockchainTransactions,
    isAddNetworkOpen,
    setIsAddNetworkOpen,
    addNetwork,
    connectToNetwork,
    activeNetworks,
    recentTransactions,
    recentAuditLogs,
  } = useBlockchain()

  const { smartContractTemplates, isDeploySmartContractOpen, setIsDeploySmartContractOpen, selectedSmartContractTemplate, setSelectedSmartContractTemplate, deploySmartContract } = useContracts()

  const [newNetwork, setNewNetwork] = useState({
    name: "",
    type: "ethereum",
    rpcUrl: "",
    chainId: "",
  })

  const handleAddNetwork = () => {
    addNetwork(newNetwork)
    setNewNetwork({ name: "", type: "ethereum", rpcUrl: "", chainId: "" })
  }

  const handleDeployContract = (template: any) => {
    setSelectedSmartContractTemplate(template)
    setIsDeploySmartContractOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          title="Active Networks"
          value={activeNetworks.length}
          description="Connected blockchains"
          icon={Network}
          variant="primary"
        />
        <MetricCard
          title="Recent Transactions"
          value={
            recentTransactions.filter((tx) => tx.status === "confirmed").length
          }
          description="Last 24 hours"
          icon={Activity}
          variant="secondary"
        />
        <MetricCard
          title="Smart Contracts"
          value={smartContractTemplates.length}
          description="Available templates"
          icon={Shield}
        />
        <MetricCard
          title="Audit Logs"
          value={recentAuditLogs.length}
          description="Recent activities"
          icon={Database}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Blockchain Networks */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Blockchain Networks</CardTitle>
                <CardDescription>
                  Connect to blockchain networks for DID registration and smart
                  contract deployment
                </CardDescription>
              </div>
              <Dialog
                open={isAddNetworkOpen}
                onOpenChange={setIsAddNetworkOpen}
              >
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Blockchain Network</DialogTitle>
                    <DialogDescription>
                      Connect to a new blockchain network
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="network-name">Network Name</Label>
                      <Input
                        id="network-name"
                        value={newNetwork.name}
                        onChange={(e) =>
                          setNewNetwork({ ...newNetwork, name: e.target.value })
                        }
                        placeholder="My Custom Network"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="network-type">Network Type</Label>
                      <Select
                        value={newNetwork.type}
                        onValueChange={(value) =>
                          setNewNetwork({ ...newNetwork, type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ethereum">Ethereum</SelectItem>
                          <SelectItem value="polygon">Polygon</SelectItem>
                          <SelectItem value="hyperledger">
                            Hyperledger
                          </SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rpc-url">RPC URL</Label>
                      <Input
                        id="rpc-url"
                        value={newNetwork.rpcUrl}
                        onChange={(e) =>
                          setNewNetwork({
                            ...newNetwork,
                            rpcUrl: e.target.value,
                          })
                        }
                        placeholder="https://mainnet.infura.io/v3/your-project-id"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="chain-id">Chain ID</Label>
                      <Input
                        id="chain-id"
                        type="number"
                        value={newNetwork.chainId}
                        onChange={(e) =>
                          setNewNetwork({
                            ...newNetwork,
                            chainId: e.target.value,
                          })
                        }
                        placeholder="1"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsAddNetworkOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleAddNetwork}>Add Network</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label>Current Network</Label>
                <Select
                  value={selectedNetwork}
                  onValueChange={setSelectedNetwork}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {blockchainNetworks.map((network) => (
                      <SelectItem key={network.id} value={network.id}>
                        {network.name} ({network.type})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                {blockchainNetworks.map((network) => (
                  <div key={network.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{network.name}</h4>
                        <StatusBadge status={network.status} />
                      </div>
                      {network.status === "disconnected" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => connectToNetwork(network.id)}
                        >
                          Connect
                        </Button>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>Type: {network.type}</div>
                      <div>Chain ID: {network.chainId}</div>
                      <div>
                        Block Height: {network.blockHeight.toLocaleString()}
                      </div>
                      <div>Gas Price: {network.gasPrice}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Smart Contract Templates */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Smart Contract Templates</CardTitle>
                <CardDescription>
                  Blockchain-based automated contract enforcement
                </CardDescription>
              </div>
              <Dialog
                open={isDeploySmartContractOpen}
                onOpenChange={setIsDeploySmartContractOpen}
              >
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Deploy Smart Contract</DialogTitle>
                    <DialogDescription>
                      Deploy a smart contract template to the blockchain
                    </DialogDescription>
                  </DialogHeader>
                  {selectedSmartContractTemplate && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium">
                          {selectedSmartContractTemplate.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {selectedSmartContractTemplate.description}
                        </p>
                      </div>
                      <div>
                        <Label>Contract Parameters</Label>
                        <div className="space-y-2 mt-2">
                          {selectedSmartContractTemplate.parameters.map(
                            (param, index) => (
                              <div key={index} className="space-y-1">
                                <Label className="text-sm">
                                  {param.name} ({param.type})
                                </Label>
                                <Input
                                  placeholder={
                                    param.defaultValue || `Enter ${param.name}`
                                  }
                                  className="text-sm"
                                />
                                <p className="text-xs text-muted-foreground">
                                  {param.description}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium">Deployment Cost</p>
                        <p className="text-sm text-muted-foreground">
                          Estimated:{" "}
                          {selectedSmartContractTemplate.deploymentCost}
                        </p>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsDeploySmartContractOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={deploySmartContract}>
                          Deploy Contract
                        </Button>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {smartContractTemplates.map((template) => (
                <div key={template.id} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {template.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                        <span>Category: {template.category}</span>
                        <span>Parameters: {template.parameters.length}</span>
                        <span>Cost: {template.deploymentCost}</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeployContract(template)}
                    >
                      Deploy
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest blockchain transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.slice(0, 5).map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-2 border rounded"
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
                    <div className="text-sm">{tx.value}</div>
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
            <CardDescription>System activity and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAuditLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="p-2 border rounded">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">
                      {log.action.replace("_", " ")}
                    </span>
                    <StatusBadge status={log.status} className="text-xs" />
                  </div>
                  <p className="text-xs text-muted-foreground">{log.details}</p>
                  <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
                    <span>Actor: {log.actor}</span>
                    <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
