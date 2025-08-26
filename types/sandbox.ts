// Sandbox and data processing related types

export interface SandboxEnvironment {
  id: string;
  name: string;
  status: "running" | "stopped" | "creating" | "destroying" | "error";
  image: string;
  runtime: "python" | "nodejs" | "java" | "r" | "custom";
  createdAt: string;
  lastUsed: string;
  cpuUsage: number;
  memoryUsage: number;
  memoryLimit: string;
  dataVolumes: string[];
  networkIsolated: boolean;
  startupTime: number;
}

export interface OCIImage {
  id: string;
  name: string;
  tag: string;
  runtime: "python" | "nodejs" | "java" | "r" | "custom";
  size: string;
  description: string;
  lastUpdated: string;
  verified: boolean;
  downloads: number;
}

export interface DataProcessingJob {
  id: string;
  name: string;
  sandboxId: string;
  dataOfferingId: string;
  status: "queued" | "running" | "completed" | "failed" | "cancelled";
  startTime: string;
  endTime?: string;
  inputSize: string;
  outputSize?: string;
  script: string;
  results?: string;
  errorMessage?: string;
}
