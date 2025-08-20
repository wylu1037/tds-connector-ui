// Monitoring and system metrics related types

export interface SystemMetrics {
  timestamp: string
  cpuUsage: number
  memoryUsage: number
  diskUsage: number
  networkIn: number
  networkOut: number
  activeConnections: number
  requestsPerMinute: number
}

export interface SecurityAlert {
  id: string
  timestamp: string
  severity: "low" | "medium" | "high" | "critical"
  type: "authentication" | "data_access" | "policy_violation" | "network" | "system"
  title: string
  description: string
  source: string
  resolved: boolean
}
