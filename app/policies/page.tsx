"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Plus, FileText, Shield, Clock, AlertTriangle, CheckCircle, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"

export default function PoliciesPage() {
  const [activeTab, setActiveTab] = useState("templates")
  const [isCreateTemplateOpen, setIsCreateTemplateOpen] = useState(false)
  const [isCreateContractOpen, setIsCreateContractOpen] = useState(false)

  // Mock data for policy templates
  const policyTemplates = [
    {
      id: "pt-001",
      name: "Standard Data Access",
      category: "Access Control",
      description: "Basic data access policy with time-based restrictions",
      enforcementType: "Automatic",
      rules: ["Access limited to 30 days", "No data redistribution", "Audit logging required"],
      usageCount: 12,
      status: "Active",
    },
    {
      id: "pt-002",
      name: "Research Collaboration",
      category: "Usage Rights",
      description: "Policy for academic research data sharing",
      enforcementType: "Manual Review",
      rules: ["Academic use only", "Attribution required", "Results sharing mandatory"],
      usageCount: 8,
      status: "Active",
    },
    {
      id: "pt-003",
      name: "Commercial License",
      category: "Commercial",
      description: "Commercial data usage with payment terms",
      enforcementType: "Smart Contract",
      rules: ["Payment required", "Commercial use allowed", "Revenue sharing 5%"],
      usageCount: 3,
      status: "Draft",
    },
  ]

  // Mock data for digital contracts
  const digitalContracts = [
    {
      id: "dc-001",
      title: "Healthcare Data Exchange Agreement",
      parties: ["MedCorp Inc.", "Research Institute"],
      status: "Active",
      createdDate: "2024-01-15",
      expiryDate: "2024-12-15",
      contractType: "Data Sharing",
      blockchainTx: "0x1a2b3c4d...",
      value: "$50,000",
      violations: 0,
    },
    {
      id: "dc-002",
      title: "Financial Analytics Partnership",
      parties: ["FinTech Solutions", "Analytics Corp"],
      status: "Pending",
      createdDate: "2024-02-01",
      expiryDate: "2025-02-01",
      contractType: "API Access",
      blockchainTx: "Pending",
      value: "$25,000",
      violations: 0,
    },
    {
      id: "dc-003",
      title: "IoT Sensor Data License",
      parties: ["SmartCity Ltd.", "Tech Innovators"],
      status: "Expired",
      createdDate: "2023-06-01",
      expiryDate: "2024-01-31",
      contractType: "Data License",
      blockchainTx: "0x5e6f7g8h...",
      value: "$15,000",
      violations: 2,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Expired":
        return "bg-red-100 text-red-800"
      case "Draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 font-serif">Policy & Contract Management</h1>
              <p className="text-slate-600">Manage data usage policies and digital contracts</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="templates">Policy Templates</TabsTrigger>
            <TabsTrigger value="contracts">Digital Contracts</TabsTrigger>
            <TabsTrigger value="enforcement">Enforcement</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          {/* Policy Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Policy Templates</h2>
                <p className="text-slate-600">Create and manage reusable policy templates</p>
              </div>
              <Dialog open={isCreateTemplateOpen} onOpenChange={setIsCreateTemplateOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-cyan-600 hover:bg-cyan-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Template
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create Policy Template</DialogTitle>
                    <DialogDescription>Define a new reusable policy template</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="template-name">Template Name</Label>
                        <Input id="template-name" placeholder="e.g., Standard Data Access" />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="access">Access Control</SelectItem>
                            <SelectItem value="usage">Usage Rights</SelectItem>
                            <SelectItem value="commercial">Commercial</SelectItem>
                            <SelectItem value="research">Research</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Describe the policy template..." />
                    </div>
                    <div>
                      <Label htmlFor="enforcement">Enforcement Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select enforcement type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="automatic">Automatic</SelectItem>
                          <SelectItem value="manual">Manual Review</SelectItem>
                          <SelectItem value="smart-contract">Smart Contract</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="rules">Policy Rules (one per line)</Label>
                      <Textarea
                        id="rules"
                        placeholder="Access limited to 30 days&#10;No data redistribution&#10;Audit logging required"
                        rows={4}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsCreateTemplateOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-cyan-600 hover:bg-cyan-700">Create Template</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {policyTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(template.status)}>{template.status}</Badge>
                        <Badge variant="outline">{template.category}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium text-slate-700">Enforcement</p>
                        <p className="text-sm text-slate-600">{template.enforcementType}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700">Usage Count</p>
                        <p className="text-sm text-slate-600">{template.usageCount} contracts</p>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm font-medium text-slate-700 mb-2">Policy Rules:</p>
                      <ul className="text-sm text-slate-600 space-y-1">
                        {template.rules.map((rule, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            {rule}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Digital Contracts Tab */}
          <TabsContent value="contracts" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Digital Contracts</h2>
                <p className="text-slate-600">Manage active and historical data sharing contracts</p>
              </div>
              <Dialog open={isCreateContractOpen} onOpenChange={setIsCreateContractOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-cyan-600 hover:bg-cyan-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Contract
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Create Digital Contract</DialogTitle>
                    <DialogDescription>Create a new data sharing agreement</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contract-title">Contract Title</Label>
                        <Input id="contract-title" placeholder="e.g., Healthcare Data Exchange Agreement" />
                      </div>
                      <div>
                        <Label htmlFor="contract-type">Contract Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="data-sharing">Data Sharing</SelectItem>
                            <SelectItem value="api-access">API Access</SelectItem>
                            <SelectItem value="data-license">Data License</SelectItem>
                            <SelectItem value="research">Research Agreement</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="party-a">Party A (Data Provider)</Label>
                        <Input id="party-a" placeholder="Organization name" />
                      </div>
                      <div>
                        <Label htmlFor="party-b">Party B (Data Consumer)</Label>
                        <Input id="party-b" placeholder="Organization name" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="start-date">Start Date</Label>
                        <Input id="start-date" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="end-date">End Date</Label>
                        <Input id="end-date" type="date" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contract-value">Contract Value</Label>
                        <Input id="contract-value" placeholder="e.g., $50,000" />
                      </div>
                      <div>
                        <Label htmlFor="policy-template">Policy Template</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select template" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pt-001">Standard Data Access</SelectItem>
                            <SelectItem value="pt-002">Research Collaboration</SelectItem>
                            <SelectItem value="pt-003">Commercial License</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="contract-terms">Contract Terms</Label>
                      <Textarea id="contract-terms" placeholder="Detailed contract terms and conditions..." rows={4} />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsCreateContractOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-cyan-600 hover:bg-cyan-700">Create Contract</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contract</TableHead>
                      <TableHead>Parties</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Expiry</TableHead>
                      <TableHead>Violations</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {digitalContracts.map((contract) => (
                      <TableRow key={contract.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{contract.title}</p>
                            <p className="text-sm text-slate-500">{contract.id}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {contract.parties.map((party, index) => (
                              <p key={index}>{party}</p>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{contract.contractType}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(contract.status)}>{contract.status}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">{contract.value}</TableCell>
                        <TableCell>{contract.expiryDate}</TableCell>
                        <TableCell>
                          {contract.violations > 0 ? (
                            <div className="flex items-center gap-1 text-red-600">
                              <AlertTriangle className="h-4 w-4" />
                              {contract.violations}
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-green-600">
                              <CheckCircle className="h-4 w-4" />0
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enforcement Tab */}
          <TabsContent value="enforcement" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Policy Enforcement</h2>
              <p className="text-slate-600">Monitor and manage policy enforcement mechanisms</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    Automatic Enforcement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Active Policies</span>
                      <span className="font-medium">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Violations Blocked</span>
                      <span className="font-medium text-red-600">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Success Rate</span>
                      <span className="font-medium text-green-600">98.7%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Smart Contracts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Deployed Contracts</span>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Gas Used (24h)</span>
                      <span className="font-medium">0.024 ETH</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Execution Success</span>
                      <span className="font-medium text-green-600">100%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                    Manual Review
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Pending Reviews</span>
                      <span className="font-medium">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Avg Review Time</span>
                      <span className="font-medium">2.3 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Approval Rate</span>
                      <span className="font-medium text-green-600">94%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Compliance Monitoring</h2>
              <p className="text-slate-600">Track compliance with data protection regulations and policies</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Regulatory Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>GDPR Compliance</span>
                      <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>CCPA Compliance</span>
                      <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>HIPAA Compliance</span>
                      <Badge className="bg-yellow-100 text-yellow-800">Review Required</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>SOX Compliance</span>
                      <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Audit Trail</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Total Audit Events</span>
                      <span className="font-medium">1,247</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Data Access Events</span>
                      <span className="font-medium">892</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Policy Violations</span>
                      <span className="font-medium text-red-600">5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Blockchain Records</span>
                      <span className="font-medium">1,247</span>
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
