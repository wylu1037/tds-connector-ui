"use client";

import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load the IdentityTab component
const IdentityTab = lazy(() =>
  import("@/components/identity").then((m) => ({ default: m.IdentityTab }))
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

export default function IdentityPage() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<TabLoadingSkeleton />}>
        <IdentityTab />
      </Suspense>
    </div>
  );
}
