"use client";

import { MetricCard, StatusBadge } from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useMonitoring } from "@/hooks";
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Eye,
  RefreshCw,
  Shield,
  X,
} from "lucide-react";

export function MonitoringTab() {
  const {
    systemMetrics,
    securityAlerts,
    connectorHealth,
    resolveAlert,
    dismissAlert,
    refreshMetrics,
    criticalAlerts,
    unresolvedAlerts,
    latestMetrics,
    healthySystems,
    systemsWithIssues,
    averageResponseTime,
  } = useMonitoring();

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          title="System Health"
          value={`${healthySystems}/${connectorHealth.length}`}
          description="Healthy systems"
          icon={CheckCircle}
          variant="primary"
        />
        <MetricCard
          title="Critical Alerts"
          value={criticalAlerts.length}
          description="Require attention"
          icon={AlertTriangle}
          variant={criticalAlerts.length > 0 ? "secondary" : "default"}
        />
        <MetricCard
          title="Avg Response Time"
          value={`${Math.round(averageResponseTime)}ms`}
          description="System performance"
          icon={Activity}
        />
        <MetricCard
          title="Unresolved Issues"
          value={unresolvedAlerts.length}
          description="Total alerts"
          icon={Shield}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* System Metrics */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>System Metrics</CardTitle>
                <CardDescription>
                  Real-time system performance indicators
                </CardDescription>
              </div>
              <Button size="sm" variant="outline" onClick={refreshMetrics}>
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {latestMetrics && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">CPU Usage</span>
                    <span className="text-muted-foreground text-sm">
                      {latestMetrics.cpuUsage}%
                    </span>
                  </div>
                  <Progress value={latestMetrics.cpuUsage} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Memory Usage</span>
                    <span className="text-muted-foreground text-sm">
                      {latestMetrics.memoryUsage}%
                    </span>
                  </div>
                  <Progress value={latestMetrics.memoryUsage} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Disk Usage</span>
                    <span className="text-muted-foreground text-sm">
                      {latestMetrics.diskUsage}%
                    </span>
                  </div>
                  <Progress value={latestMetrics.diskUsage} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Network In</div>
                    <div className="text-2xl font-bold text-green-600">
                      {latestMetrics.networkIn} KB/s
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Network Out</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {latestMetrics.networkOut} KB/s
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium">
                      Active Connections
                    </div>
                    <div className="text-lg font-semibold">
                      {latestMetrics.activeConnections}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Requests/Min</div>
                    <div className="text-lg font-semibold">
                      {latestMetrics.requestsPerMinute}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Security Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Security Alerts</CardTitle>
            <CardDescription>Security events and system alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-h-96 space-y-3 overflow-y-auto">
              {securityAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`rounded-lg border p-3 ${
                    alert.resolved ? "bg-muted/50" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-1 flex items-center space-x-2">
                        <h4 className="text-sm font-medium">{alert.title}</h4>
                        <StatusBadge
                          status={alert.severity}
                          className="text-xs"
                        />
                        {alert.resolved && (
                          <StatusBadge status="resolved" className="text-xs" />
                        )}
                      </div>
                      <p className="text-muted-foreground mb-2 text-xs">
                        {alert.description}
                      </p>
                      <div className="text-muted-foreground flex items-center space-x-4 text-xs">
                        <span>Type: {alert.type}</span>
                        <span>Source: {alert.source}</span>
                        <span>
                          {new Date(alert.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {!alert.resolved && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => resolveAlert(alert.id)}
                          >
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => dismissAlert(alert.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
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
          <CardDescription>
            Health monitoring for all connected systems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {connectorHealth.map((connector) => (
              <div key={connector.id} className="rounded-lg border p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="font-medium">{connector.name}</h4>
                  <StatusBadge status={connector.status} type="health" />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Response Time</span>
                    <span
                      className={`font-medium ${
                        connector.responseTime > 300
                          ? "text-red-600"
                          : connector.responseTime > 200
                            ? "text-yellow-600"
                            : "text-green-600"
                      }`}
                    >
                      {connector.responseTime}ms
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Uptime</span>
                    <span className="font-medium">{connector.uptime}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Version</span>
                    <span className="font-medium">{connector.version}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Last Heartbeat
                    </span>
                    <span className="text-xs">
                      {new Date(connector.lastHeartbeat).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Metrics History */}
      <Card>
        <CardHeader>
          <CardTitle>Metrics History</CardTitle>
          <CardDescription>Recent system performance data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemMetrics.slice(0, 5).map((metric, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded border p-3"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-sm font-medium">
                    {new Date(metric.timestamp).toLocaleTimeString()}
                  </div>
                  <div className="text-muted-foreground flex items-center space-x-2 text-sm">
                    <span>CPU: {metric.cpuUsage}%</span>
                    <span>Memory: {metric.memoryUsage}%</span>
                    <span>Disk: {metric.diskUsage}%</span>
                  </div>
                </div>
                <div className="text-muted-foreground flex items-center space-x-4 text-sm">
                  <span>{metric.activeConnections} connections</span>
                  <span>{metric.requestsPerMinute} req/min</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
