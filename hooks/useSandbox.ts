import { DataProcessingJob, OCIImage, SandboxEnvironment } from "@/types";
import { useState } from "react";

export interface UseSandboxReturn {
  // Sandbox environments
  sandboxEnvironments: SandboxEnvironment[];
  setSandboxEnvironments: (environments: SandboxEnvironment[]) => void;

  // OCI images
  ociImages: OCIImage[];
  setOciImages: (images: OCIImage[]) => void;

  // Data processing jobs
  dataProcessingJobs: DataProcessingJob[];
  setDataProcessingJobs: (jobs: DataProcessingJob[]) => void;

  // Dialog states
  isCreateSandboxOpen: boolean;
  setIsCreateSandboxOpen: (open: boolean) => void;
  isCreateJobOpen: boolean;
  setIsCreateJobOpen: (open: boolean) => void;

  // Selected items
  selectedSandbox: SandboxEnvironment | null;
  setSelectedSandbox: (sandbox: SandboxEnvironment | null) => void;

  // Form states
  newSandbox: {
    name: string;
    runtime: string;
    image: string;
    memoryLimit: string;
    networkIsolated: boolean;
  };
  setNewSandbox: (sandbox: any) => void;

  newJob: {
    name: string;
    sandboxId: string;
    dataOfferingId: string;
    script: string;
  };
  setNewJob: (job: any) => void;

  // Actions
  createSandbox: () => Promise<void>;
  createJob: () => Promise<void>;
  startSandbox: (sandboxId: string) => Promise<void>;
  stopSandbox: (sandboxId: string) => Promise<void>;
  runJob: (jobId: string) => Promise<void>;

  // Computed values
  runningSandboxes: SandboxEnvironment[];
  activeJobs: DataProcessingJob[];
  completedJobs: DataProcessingJob[];
}

export function useSandbox(): UseSandboxReturn {
  const [sandboxEnvironments, setSandboxEnvironments] = useState<
    SandboxEnvironment[]
  >([
    {
      id: "1",
      name: "Python Analytics",
      status: "running",
      image: "python:3.9-analytics",
      runtime: "python",
      createdAt: "2024-01-15T08:00:00Z",
      lastUsed: "2024-01-15T10:30:00Z",
      cpuUsage: 45,
      memoryUsage: 60,
      memoryLimit: "2GB",
      dataVolumes: ["/data/customer-analytics", "/data/exports"],
      networkIsolated: true,
      startupTime: 15,
    },
    {
      id: "2",
      name: "R Statistical Computing",
      status: "stopped",
      image: "r-base:4.2.0",
      runtime: "r",
      createdAt: "2024-01-14T14:00:00Z",
      lastUsed: "2024-01-14T16:45:00Z",
      cpuUsage: 0,
      memoryUsage: 0,
      memoryLimit: "4GB",
      dataVolumes: ["/data/research"],
      networkIsolated: true,
      startupTime: 20,
    },
  ]);

  const [ociImages, setOciImages] = useState<OCIImage[]>([
    {
      id: "1",
      name: "python-analytics",
      tag: "3.9-latest",
      runtime: "python",
      size: "1.2 GB",
      description:
        "Python environment with pandas, numpy, scikit-learn, and visualization libraries",
      lastUpdated: "2024-01-10T00:00:00Z",
      verified: true,
      downloads: 1250,
    },
    {
      id: "2",
      name: "r-statistics",
      tag: "4.2.0",
      runtime: "r",
      size: "890 MB",
      description:
        "R environment with tidyverse, ggplot2, and statistical packages",
      lastUpdated: "2024-01-12T00:00:00Z",
      verified: true,
      downloads: 845,
    },
    {
      id: "3",
      name: "nodejs-processor",
      tag: "18-alpine",
      runtime: "nodejs",
      size: "450 MB",
      description:
        "Node.js environment for data processing and API integration",
      lastUpdated: "2024-01-14T00:00:00Z",
      verified: false,
      downloads: 320,
    },
  ]);

  const [dataProcessingJobs, setDataProcessingJobs] = useState<
    DataProcessingJob[]
  >([
    {
      id: "1",
      name: "Customer Segmentation Analysis",
      sandboxId: "1",
      dataOfferingId: "1",
      status: "running",
      startTime: "2024-01-15T10:00:00Z",
      inputSize: "150 MB",
      script:
        "import pandas as pd\nimport numpy as np\nfrom sklearn.cluster import KMeans\n\n# Load and process data\ndata = pd.read_csv('/data/customers.csv')\n# ... analysis code",
    },
    {
      id: "2",
      name: "Market Trend Prediction",
      sandboxId: "1",
      dataOfferingId: "2",
      status: "completed",
      startTime: "2024-01-15T08:00:00Z",
      endTime: "2024-01-15T09:30:00Z",
      inputSize: "75 MB",
      outputSize: "12 MB",
      script: "# Market trend analysis script\nprint('Analysis completed')",
      results: "Trend analysis shows 15% growth potential in Q2",
    },
    {
      id: "3",
      name: "Data Quality Assessment",
      sandboxId: "2",
      dataOfferingId: "1",
      status: "failed",
      startTime: "2024-01-14T16:00:00Z",
      endTime: "2024-01-14T16:05:00Z",
      inputSize: "200 MB",
      script: "library(dplyr)\n# Quality check script",
      errorMessage: "Memory limit exceeded during data loading",
    },
  ]);

  // Dialog states
  const [isCreateSandboxOpen, setIsCreateSandboxOpen] = useState(false);
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);

  // Selected items
  const [selectedSandbox, setSelectedSandbox] =
    useState<SandboxEnvironment | null>(null);

  // Form states
  const [newSandbox, setNewSandbox] = useState({
    name: "",
    runtime: "python",
    image: "",
    memoryLimit: "2GB",
    networkIsolated: true,
  });

  const [newJob, setNewJob] = useState({
    name: "",
    sandboxId: "",
    dataOfferingId: "",
    script: "",
  });

  // Actions
  const createSandbox = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const newSandboxEnv: SandboxEnvironment = {
      id: Date.now().toString(),
      name: newSandbox.name,
      status: "creating",
      image: newSandbox.image,
      runtime: newSandbox.runtime as
        | "python"
        | "nodejs"
        | "java"
        | "r"
        | "custom",
      createdAt: new Date().toISOString(),
      lastUsed: new Date().toISOString(),
      cpuUsage: 0,
      memoryUsage: 0,
      memoryLimit: newSandbox.memoryLimit,
      dataVolumes: [],
      networkIsolated: newSandbox.networkIsolated,
      startupTime: 0,
    };
    setSandboxEnvironments((prev) => [...prev, newSandboxEnv]);
    setNewSandbox({
      name: "",
      runtime: "python",
      image: "",
      memoryLimit: "2GB",
      networkIsolated: true,
    });
    setIsCreateSandboxOpen(false);

    // Simulate sandbox startup
    setTimeout(() => {
      setSandboxEnvironments((prev) =>
        prev.map((env) =>
          env.id === newSandboxEnv.id
            ? { ...env, status: "running" as const, startupTime: 18 }
            : env
        )
      );
    }, 3000);
  };

  const createJob = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newDataJob: DataProcessingJob = {
      id: Date.now().toString(),
      name: newJob.name,
      sandboxId: newJob.sandboxId,
      dataOfferingId: newJob.dataOfferingId,
      status: "queued",
      startTime: new Date().toISOString(),
      inputSize: "Unknown",
      script: newJob.script,
    };
    setDataProcessingJobs((prev) => [...prev, newDataJob]);
    setNewJob({
      name: "",
      sandboxId: "",
      dataOfferingId: "",
      script: "",
    });
    setIsCreateJobOpen(false);
  };

  const startSandbox = async (sandboxId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSandboxEnvironments((prev) =>
      prev.map((env) =>
        env.id === sandboxId
          ? {
              ...env,
              status: "running" as const,
              lastUsed: new Date().toISOString(),
            }
          : env
      )
    );
  };

  const stopSandbox = async (sandboxId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSandboxEnvironments((prev) =>
      prev.map((env) =>
        env.id === sandboxId
          ? { ...env, status: "stopped" as const, cpuUsage: 0, memoryUsage: 0 }
          : env
      )
    );
  };

  const runJob = async (jobId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setDataProcessingJobs((prev) =>
      prev.map((job) =>
        job.id === jobId
          ? {
              ...job,
              status: "running" as const,
              startTime: new Date().toISOString(),
            }
          : job
      )
    );
  };

  // Computed values
  const runningSandboxes = sandboxEnvironments.filter(
    (env) => env.status === "running"
  );
  const activeJobs = dataProcessingJobs.filter(
    (job) => job.status === "running" || job.status === "queued"
  );
  const completedJobs = dataProcessingJobs.filter(
    (job) => job.status === "completed" || job.status === "failed"
  );

  return {
    sandboxEnvironments,
    setSandboxEnvironments,
    ociImages,
    setOciImages,
    dataProcessingJobs,
    setDataProcessingJobs,
    isCreateSandboxOpen,
    setIsCreateSandboxOpen,
    isCreateJobOpen,
    setIsCreateJobOpen,
    selectedSandbox,
    setSelectedSandbox,
    newSandbox,
    setNewSandbox,
    newJob,
    setNewJob,
    createSandbox,
    createJob,
    startSandbox,
    stopSandbox,
    runJob,
    runningSandboxes,
    activeJobs,
    completedJobs,
  };
}
