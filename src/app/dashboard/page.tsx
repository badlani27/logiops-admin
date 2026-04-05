import PageHeader from "@/components/layout/PageHeader";
import MetricCard from "@/components/active/MetricCard";
import { isFeatureEnabled } from "@/flags/featureFlags";
import { computeDashboardMetrics } from "@/lib/analytics/dashboardMetrics";
import { getLegacyDashboardSummary } from "@/lib/analytics/legacyMetrics";
import { formatCurrency } from "@/lib/logistics/formatters";

export default function DashboardPage() {
  const useV2 = isFeatureEnabled("ENABLE_ANALYTICS_V2");

  if (useV2) {
    const metrics = computeDashboardMetrics();

    return (
      <div>
        <PageHeader
          title="Dashboard"
          description="Overview of logistics operations"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard
            label="Total Shipments"
            value={metrics.totalShipments}
            color="blue"
          />
          <MetricCard
            label="In Transit"
            value={metrics.shipmentsInTransit}
            sublabel="Currently moving"
            color="blue"
          />
          <MetricCard
            label="Delivered"
            value={metrics.shipmentsDelivered}
            color="green"
          />
          <MetricCard
            label="Pending"
            value={metrics.shipmentsPending}
            color="yellow"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard
            label="Total Drivers"
            value={metrics.totalDrivers}
            color="gray"
          />
          <MetricCard
            label="Available"
            value={metrics.driversAvailable}
            color="green"
          />
          <MetricCard
            label="On Route"
            value={metrics.driversOnRoute}
            color="blue"
          />
          <MetricCard
            label="Low Stock Items"
            value={metrics.lowStockCount}
            sublabel="Below reorder point"
            color="red"
          />
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Inventory Value
          </h2>
          <p className="text-3xl font-bold text-gray-900">
            {formatCurrency(metrics.inventoryValue)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Total value across {metrics.totalInventoryItems} tracked items
          </p>
        </div>
      </div>
    );
  }

  // Legacy v1 analytics path — only reached if ENABLE_ANALYTICS_V2 is disabled
  const legacy = getLegacyDashboardSummary();
  return (
    <div>
      <PageHeader title="Dashboard" description="Operations summary (v1)" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard label="Shipments" value={legacy.shipments} color="blue" />
        <MetricCard
          label="Active Drivers"
          value={legacy.activeDrivers}
          color="green"
        />
        <MetricCard
          label="Warehouses"
          value={legacy.warehouses.length}
          color="gray"
        />
      </div>
    </div>
  );
}
