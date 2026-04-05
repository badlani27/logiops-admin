/**
 * ShipmentFiltersV1
 *
 * The original filter bar used in the v1 shipping flow. It supported basic
 * status filtering but not carrier or date range filtering.
 *
 * This component is only rendered when ENABLE_OLD_SHIPPING_FLOW is enabled.
 *
 * TODO(shipping-team): Remove alongside ENABLE_OLD_SHIPPING_FLOW cleanup.
 */

"use client";

import { useState } from "react";
import { ShipmentStatus } from "@/lib/logistics/shipments";

interface ShipmentFiltersV1Props {
  onFilterChange: (status: ShipmentStatus | "all") => void;
}

const STATUS_OPTIONS: Array<{ value: ShipmentStatus | "all"; label: string }> = [
  { value: "all", label: "All Shipments" },
  { value: "pending", label: "Pending" },
  { value: "in_transit", label: "In Transit" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export default function ShipmentFiltersV1({
  onFilterChange,
}: ShipmentFiltersV1Props) {
  const [selected, setSelected] = useState<ShipmentStatus | "all">("all");

  const handleChange = (value: ShipmentStatus | "all") => {
    setSelected(value);
    onFilterChange(value);
  };

  return (
    <div className="flex gap-2 mb-4 p-3 bg-gray-100 rounded border border-gray-200">
      <span className="text-sm font-medium text-gray-600 self-center mr-2">
        Filter:
      </span>
      {STATUS_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => handleChange(opt.value)}
          className={`px-3 py-1 text-sm rounded border ${
            selected === opt.value
              ? "bg-gray-700 text-white border-gray-700"
              : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
