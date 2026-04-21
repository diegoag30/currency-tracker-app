import { Suspense } from "react";
import DashboardContent from "./DashboardContent";
import CurrencyListingsTableSkeleton from "@/components/CurrencyListingsTableSkeleton";

export default function Page() {
  return (
    <Suspense fallback={<CurrencyListingsTableSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
