"use client";

import { useState } from "react";
import {
  Copy,
  Eye,
  Code,
  FileText,
  Key,
  User,
  IdCard,
  Lock,
  Calendar,
  Tag,
  Shield,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export function IdentityTab() {
  const { toast } = useToast();
  const [didViewMode, setDidViewMode] = useState<"visual" | "json">("visual");
  const [vcViewMode, setVcViewMode] = useState<"visual" | "json">("visual");

  // Mock data based on HTML content
  const connectorData = {
    didIdentifier: "did:example:0df1zlohf",
    name: "Example Connector v2.1",
    version: "2.1.0",
    creationDate: "2023-06-15T10:30:00Z",
  };

  const didDocumentData = {
    "@context": ["https://www.w3.org/ns/did/v1"],
    id: "did:example:0df1zlohf",
    publicKey: [
      {
        id: "did:example:0df1zlohf#keys-1",
        type: "Ed25519VerificationKey2018",
        controller: "did:example:0df1zlohf",
        publicKeyBase58: "H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV",
      },
    ],
    authentication: ["did:example:0df1zlohf#keys-1"],
    service: [
      {
        id: "did:example:0df1zlohf#connector-endpoint",
        type: "ConnectorService",
        serviceEndpoint: "https://connector.example.com/api",
      },
    ],
  };

  const userData = {
    didIdentifier: "did:example:user:87654321",
    userType: "Individual",
    lastAuthenticated: "2023-09-21T14:22:36Z",
    status: "已验证",
  };

  const vcData = {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://schema.org/",
      "https://example.com/schemas/user-identity-v1.json",
    ],
    id: "did:example:vc:8f7e6d5c4b3a210",
    type: ["VerifiableCredential", "IdentityCredential"],
    issuer: {
      id: "did:example:issuer:123456",
      name: "Example Corp",
      url: "https://www.example.com",
    },
    issuanceDate: "2023-09-20T08:30:00Z",
    expirationDate: "2024-09-20T08:30:00Z",
    credentialSubject: {
      id: "did:example:user:87654321",
      name: "John Doe",
      type: "Individual",
      email: "john.doe@example.com",
      memberOf: {
        id: "did:example:issuer:123456",
        name: "Example Corp",
        type: "Organization",
      },
      authenticationDate: "2023-09-21T14:22:36Z",
    },
    proof: {
      type: "Ed25519Signature2018",
      created: "2023-09-22T10:05:30Z",
      verificationMethod: "did:example:issuer:123456#key-1",
      proofPurpose: "assertionMethod",
      jws: "z5T7a......f8K3p",
    },
  };

  const copyToClipboard = async (text: string, description: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "复制成功",
        description: `${description} 已复制到剪贴板`,
      });
    } catch (err) {
      toast({
        title: "复制失败",
        description: "无法复制到剪贴板",
        variant: "destructive",
      });
    }
  };

  const DIDDocumentVisualView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 标识符卡片 */}
      <Card className="border border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <IdCard className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">Identifier</CardTitle>
            </div>
            <Badge variant="secondary" className="text-xs">
              Unique Identifier
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-2 text-muted-foreground/80">
                DID Subject Identifier
              </p>
              <div className="flex items-center gap-2">
                <code className="bg-muted rounded flex-1 text-sm break-all">
                  {didDocumentData.id}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(didDocumentData.id, "DID标识符")
                  }
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 认证方式卡片 */}
      <Card className="border border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Lock className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">Authentication</CardTitle>
            </div>
            <Badge variant="secondary" className="text-xs">
              1 Method
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-2 text-muted-foreground/80">
                Public Key Authentication
              </p>
              <code className="bg-muted rounded block text-sm break-all">
                {didDocumentData.authentication[0]}
              </code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 公钥信息卡片 */}
      <Card className="border border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Key className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">Public Key Information</CardTitle>
            </div>
            <Badge variant="secondary" className="text-xs">
              1 Key
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2 text-muted-foreground/80">
                Verification Key #1
              </p>
              <code className="text-xs font-mono block mb-3">
                {didDocumentData.publicKey[0].id}
              </code>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-muted-foreground">
                    Algorithm Type
                  </span>
                  <span className="text-sm font-medium">
                    {didDocumentData.publicKey[0].type}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground block mb-1">
                    Public Key (Base58)
                  </span>
                  <div className="flex items-center gap-2">
                    <code className="bg-muted rounded flex-1 text-sm break-all">
                      {didDocumentData.publicKey[0].publicKeyBase58}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(
                          didDocumentData.publicKey[0].publicKeyBase58,
                          "Public Key"
                        )
                      }
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 服务信息卡片 */}
      <Card className="border border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">Service Endpoints</CardTitle>
            </div>
            <Badge variant="secondary" className="text-xs">
              1 Service
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2 text-muted-foreground/80">
                Connector Service Interface
              </p>
              <code className="text-xs font-mono block mb-3">
                {didDocumentData.service[0].id}
              </code>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-muted-foreground">
                    Service Type
                  </span>
                  <span className="text-sm font-medium">
                    {didDocumentData.service[0].type}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground block mb-1">
                    Service Address
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={didDocumentData.service[0].serviceEndpoint}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-muted rounded flex-1 text-sm font-mono text-primary hover:underline break-all"
                    >
                      {didDocumentData.service[0].serviceEndpoint}
                    </a>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(
                          didDocumentData.service[0].serviceEndpoint,
                          "Service Address"
                        )
                      }
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const VCVisualView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* VC标识符卡片 */}
      <Card className="border border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <IdCard className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">VC Identifier</CardTitle>
            </div>
            <Badge variant="secondary" className="text-xs">
              Unique Identifier
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-2 text-muted-foreground/80">
                Credential ID
              </p>
              <div className="flex items-center gap-2">
                <code className="bg-muted rounded flex-1 text-sm break-all truncate">
                  {vcData.id}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(vcData.id, "VC Identifier")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 发行者卡片 */}
      <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <User className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">Issuer Information</CardTitle>
            </div>
            <Badge variant="secondary" className="text-xs">
              Authority
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-2 text-muted-foreground/80">
                Issuer DID
              </p>
              <code className="bg-muted rounded block text-sm break-all">
                {vcData.issuer.id}
              </code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 发行信息卡片 */}
      <Card className="border border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg whitespace-nowrap">
                Issuance Info
              </CardTitle>
            </div>
            <Badge variant="secondary" className="text-xs">
              Time Info
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2 text-muted-foreground/80">
                Issuance Date
              </p>
              <code className="bg-muted rounded block text-sm">
                {vcData.issuanceDate}
              </code>
            </div>
            <div>
              <p className="text-sm font-medium mb-2 text-muted-foreground/80">
                Expiration Date
              </p>
              <code className="bg-muted rounded block text-sm">
                {vcData.expirationDate}
              </code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 凭证类型卡片 */}
      <Card className="border border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Tag className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">Credential Type</CardTitle>
            </div>
            <Badge variant="secondary" className="text-xs">
              2 Types
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {vcData.type.map((type, index) => (
              <div key={index} className="bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground/80">
                  {index === 0 ? "Base Type" : "Specific Type"}
                </p>
                <p className="font-medium">{type}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 凭证主题卡片 */}
      <Card className="border border-border col-span-full">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <User className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">Credential Subject</CardTitle>
            </div>
            <Badge variant="secondary" className="text-xs">
              Subject Information
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2 text-muted-foreground/80">
                Subject DID
              </p>
              <code className="bg-muted rounded block text-sm break-all mb-4">
                {vcData.credentialSubject.id}
              </code>
            </div>
            <div>
              <p className="text-sm font-medium mb-3 text-muted-foreground/80">
                Proof Information
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{vcData.credentialSubject.name}</p>
                </div>
                <div className="bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Identity Type</p>
                  <p className="font-medium">{vcData.credentialSubject.type}</p>
                </div>
                <div className="bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Organization</p>
                  <p className="font-medium">
                    {vcData.credentialSubject.memberOf.name}
                  </p>
                </div>
                <div className="bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground whitespace-nowrap">
                    Authentication Status
                  </p>
                  <p className="font-medium text-green-600 flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    Verified
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 数字签名卡片 */}
      <Card className="border border-border col-span-full">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Lock className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">Digital Signature</CardTitle>
            </div>
            <Badge variant="secondary" className="text-xs">
              Verification Information
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium mb-2 text-muted-foreground/80">
                Signature Algorithm
              </p>
              <code className="bg-muted rounded block text-sm">
                {vcData.proof.type}
              </code>
            </div>
            <div>
              <p className="text-sm font-medium mb-2 text-muted-foreground/80">
                Verification Method
              </p>
              <div className="flex items-center gap-2">
                <code className="bg-muted rounded flex-1 text-sm break-all truncate">
                  {vcData.proof.verificationMethod}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(
                      vcData.proof.verificationMethod,
                      "Verification Method"
                    )
                  }
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2 text-muted-foreground/80">
                Signature Value
              </p>
              <div className="flex items-center gap-2">
                <code className="bg-muted rounded flex-1 text-sm break-all">
                  {vcData.proof.jws}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(vcData.proof.jws, "Signature Value")
                  }
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* 两列布局 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左侧：Connector Identity */}
        <div className="space-y-6">
          <Card className="border border-border">
            <CardHeader className="border-b border-gray-200 pb-6">
              <CardTitle className="text-xl md:text-2xl font-bold">
                Connector Identity
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Connector identity information and associated DID document
                details
              </CardDescription>
            </CardHeader>

            {/* 基本信息部分 */}
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    DID Identifier
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="bg-muted rounded-lg font-mono text-sm break-all flex-grow">
                      {connectorData.didIdentifier}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(
                          connectorData.didIdentifier,
                          "DID Identifier"
                        )
                      }
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Connector Name
                  </p>
                  <div className="bg-muted rounded-lg py-1">
                    <span className="font-medium">{connectorData.name}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Connector Version
                  </p>
                  <div className="bg-muted rounded-lg">
                    <span className="font-medium">{connectorData.version}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Creation Time
                  </p>
                  <div className="bg-muted rounded-lg">
                    <span className="font-medium">
                      {connectorData.creationDate}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>

            {/* DID文档子部分 */}
            <div className="border-t border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 pb-2 border-b border-gray-100">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span>DID Document</span>
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    View detailed content of the DID document
                  </p>
                </div>

                {/* 视图切换按钮组 */}
                <div className="flex gap-2">
                  <Button
                    variant={didViewMode === "visual" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDidViewMode("visual")}
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    {/* <span>Visual View</span> */}
                  </Button>
                  <Button
                    variant={didViewMode === "json" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDidViewMode("json")}
                    className="flex items-center gap-2"
                  >
                    <Code className="h-4 w-4" />
                    {/* <span>Raw JSON</span> */}
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                {didViewMode === "visual" ? (
                  <DIDDocumentVisualView />
                ) : (
                  <div className="space-y-4">
                    <pre className="bg-muted p-6 rounded-lg font-mono text-sm overflow-x-auto leading-relaxed">
                      {JSON.stringify(didDocumentData, null, 2)}
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full"
                      onClick={() =>
                        copyToClipboard(
                          JSON.stringify(didDocumentData, null, 2),
                          "DID Document JSON"
                        )
                      }
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy JSON
                    </Button>
                  </div>
                )}
              </CardContent>
            </div>
          </Card>
        </div>

        {/* 右侧：User Identity */}
        <div className="space-y-6">
          <Card className="border border-border">
            <CardHeader className="border-b border-gray-200 pb-6">
              <CardTitle className="text-xl md:text-2xl font-bold">
                User Identity
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                User identity information and associated verifiable credential
                details
              </CardDescription>
            </CardHeader>

            {/* 基本信息部分 */}
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    DID Identifier
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="bg-muted rounded-lg font-mono text-sm break-all flex-grow">
                      {userData.didIdentifier}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(
                          userData.didIdentifier,
                          "User DID Identifier"
                        )
                      }
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    User Type
                  </p>
                  <div className="bg-muted rounded-lg py-1">
                    <span className="font-medium">{userData.userType}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Last Authentication Time
                  </p>
                  <div className="bg-muted rounded-lg">
                    <span className="font-medium">
                      {userData.lastAuthenticated}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Identity Status
                  </p>
                  <div className="bg-muted rounded-lg">
                    <span className="font-medium text-green-600 flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>

            {/* Verifiable Credential子部分 */}
            <div className="border-t border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 pb-2 border-b border-gray-100">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span>Verifiable Credential</span>
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    View detailed content of the Verifiable Credential
                  </p>
                </div>

                {/* 视图切换按钮组 */}
                <div className="flex gap-2">
                  <Button
                    variant={vcViewMode === "visual" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setVcViewMode("visual")}
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    {/* <span>Visual View</span> */}
                  </Button>
                  <Button
                    variant={vcViewMode === "json" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setVcViewMode("json")}
                    className="flex items-center gap-2"
                  >
                    <Code className="h-4 w-4" />
                    {/* <span>Raw JSON</span> */}
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                {vcViewMode === "visual" ? (
                  <VCVisualView />
                ) : (
                  <div className="space-y-4">
                    <pre className="bg-muted p-6 rounded-lg font-mono text-sm overflow-x-auto leading-relaxed">
                      {JSON.stringify(vcData, null, 2)}
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full"
                      onClick={() =>
                        copyToClipboard(
                          JSON.stringify(vcData, null, 2),
                          "Verifiable Credential JSON"
                        )
                      }
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy JSON
                    </Button>
                  </div>
                )}
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
