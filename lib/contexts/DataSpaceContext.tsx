"use client";

import { createContext, ReactNode, useContext, useState } from "react";

export interface DataSpace {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive";
}

interface DataSpaceContextType {
  currentDataSpace: DataSpace;
  availableDataSpaces: DataSpace[];
  switchDataSpace: (dataSpaceId: string) => void;
}

const defaultDataSpaces: DataSpace[] = [
  {
    id: "healthcare",
    name: "Healthcare Data Space",
    description: "Medical and healthcare data sharing platform",
    status: "active",
  },
  {
    id: "finance",
    name: "Financial Data Space",
    description: "Financial services data ecosystem",
    status: "active",
  },
  {
    id: "mobility",
    name: "Mobility Data Space",
    description: "Transportation and mobility data hub",
    status: "active",
  },
  {
    id: "energy",
    name: "Energy Data Space",
    description: "Energy sector data exchange platform",
    status: "inactive",
  },
];

const DataSpaceContext = createContext<DataSpaceContextType | undefined>(
  undefined
);

export function DataSpaceProvider({ children }: { children: ReactNode }) {
  const [currentDataSpace, setCurrentDataSpace] = useState<DataSpace>(
    defaultDataSpaces[0]
  );

  const switchDataSpace = (dataSpaceId: string) => {
    const dataSpace = defaultDataSpaces.find((ds) => ds.id === dataSpaceId);
    if (dataSpace) {
      setCurrentDataSpace(dataSpace);
    }
  };

  return (
    <DataSpaceContext.Provider
      value={{
        currentDataSpace,
        availableDataSpaces: defaultDataSpaces,
        switchDataSpace,
      }}
    >
      {children}
    </DataSpaceContext.Provider>
  );
}

export function useDataSpace() {
  const context = useContext(DataSpaceContext);
  if (context === undefined) {
    throw new Error("useDataSpace must be used within a DataSpaceProvider");
  }
  return context;
}
