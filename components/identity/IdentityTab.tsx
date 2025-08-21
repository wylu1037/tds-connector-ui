"use client"

import { AlertCircle, CheckCircle, Copy, Key, RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { useIdentity } from "@/hooks"

export function IdentityTab() {
  const {
    connectorId,
    didDocument,
    isRegistered,
    isGenerating,
    generateDID,
    registerDID,
  } = useIdentity()

  const handleGenerateDID = () => {
    generateDID()
  }

  const handleRegisterConnector = () => {
    registerDID()
  }

  return (
    <div className="space-y-6">
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
    </div>
  )
}
