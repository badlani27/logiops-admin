"use client";

import { useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import ShipmentCard from "@/components/active/ShipmentCard";
import LegacyShipmentCard from "@/components/legacy/LegacyShipmentCard";
import ShipmentFiltersV1 from "@/components/legacy/ShipmentFiltersV1";
import { isFeatureEnabled } from "@/flags/featureFlags";
import {
  getShipments,
  getShipmentsByStatus,
  ShipmentStatus,
} from "@/lib/logistics/shipments";

export default function ShipmentsPage() {
  const useOldFlow = isFeatureEnabled("ENABLE_OLD_SHIPPING_FLOW");
  const [statusFilter, setStatusFilter] = useState<ShipmentStatus | "all">(
    "all"
  );

  const shipments =
    statusFilter === "all"
      ? getShipments()
      : getShipmentsByStatus(statusFilter);

  // Legacy shipping flow — gated by ENABLE_OLD_SHIPPING_FLOW (currently off)
  if (useOldFlow) {
    return (
      <div>
        <PageHeader
          title="Shipments"
          description="Shipping operations (legacy view)"
        />
        <ShipmentFiltersV1 onFilterChange={setStatusFilter} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shipments.map((s) => (
            <LegacyShipmentCard key={s.id} shipment={s} />
          ))}
        </div>
      </div>
    );
  }

  // Active shipping flow
  return (
    <div>
      <PageHeader
        title="Shipments"
        description="Track and manage all shipments"
      />

      {/* Active filter bar */}
      <div className="flex gap-2 mb-6">
        {(
          ["all", "pending", "in_transit", "delivered", "cancelled"] as const
        ).map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
              statusFilter === status
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {status === "all"
              ? "All"
              : status.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shipments.map((s) => (
          <ShipmentCard key={s.id} shipment={s} />
        ))}
      </div>
    </div>
  );
}
