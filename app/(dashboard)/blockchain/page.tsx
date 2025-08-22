"use client";

import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load the BlockchainTab component
const BlockchainTab = lazy(() =>
  import("@/components/blockchain").then((m) => ({ default: m.BlockchainTab }))
);

// Loading skeleton component
const TabLoadingSkeleton = () => (
  <div className="space-y-6">
    <div className="grid gap-4 md:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-24 w-full bg-muted" />
      ))}
    </div>
    <div className="grid gap-6 lg:grid-cols-2">
      <Skeleton className="h-96 w-full bg-muted" />
      <Skeleton className="h-96 w-full bg-muted" />
    </div>
  </div>
);

export default function BlockchainPage() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<TabLoadingSkeleton />}>
        <BlockchainTab />
      </Suspense>
    </div>
  );
}
