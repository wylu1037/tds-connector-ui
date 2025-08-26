"use client";

import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load the PolicyContractsTab component
const PolicyContractsTab = lazy(() =>
  import("@/components/policy").then((m) => ({ default: m.PolicyContractsTab }))
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

export default function PolicyPage() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<TabLoadingSkeleton />}>
        <PolicyContractsTab />
      </Suspense>
    </div>
  );
}
