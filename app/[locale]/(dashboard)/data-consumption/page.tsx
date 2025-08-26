"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { lazy, Suspense } from "react";

// Lazy load the DataConsumptionTab component
const DataConsumptionTab = lazy(() =>
  import("@/components/data-consumption").then((m) => ({
    default: m.DataConsumptionTab,
  }))
);

// Loading skeleton component
const TabLoadingSkeleton = () => (
  <div className="space-y-6">
    <div className="grid gap-4 md:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="bg-muted h-24 w-full" />
      ))}
    </div>
    <div className="grid gap-6 lg:grid-cols-2">
      <Skeleton className="bg-muted h-96 w-full" />
      <Skeleton className="bg-muted h-96 w-full" />
    </div>
  </div>
);

export default function DataConsumptionPage() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<TabLoadingSkeleton />}>
        <DataConsumptionTab />
      </Suspense>
    </div>
  );
}
