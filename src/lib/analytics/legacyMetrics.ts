/**
 * Legacy analytics helpers — v1 aggregation.
 *
 * @deprecated These functions are superseded by dashboardMetrics.ts (v2).
 * They are still in the codebase because ENABLE_ANALYTICS_V2 was only recently
 * rolled out to 100%. Once the flag is removed, these helpers can be deleted.
 *
 * NOTE: Some of these functions use an older data shape and hardcoded
 * warehouse names that no longer match the current data layer.
 */

import { getShipments } from "@/lib/logistics/shipments";
import { getDrivers } from "@/lib/logistics/drivers";

/** @deprecated Use computeDashboardMetrics() from dashboardMetrics.ts */
export function getShipmentCount(): number {
  return getShipments().length;
}

/** @deprecated Use computeDashboardMetrics() from dashboardMetrics.ts */
export function getActiveDriverCount(): number {
  const drivers = getDrivers();
  // Legacy: only counted "available" as active, missed "on_route"
  return drivers.filter((d) => d.status === "available").length;
}

/**
 * @deprecated Hardcoded warehouse list — does not match current warehouse names.
 * Was used in the old dashboard summary widget.
 */
export const LEGACY_WAREHOUSE_LIST = [
  "Warehouse A - Chicago",
  "Warehouse B - Dallas",
  "Warehouse C - LA",
] as const;

/**
 * @deprecated Old metric format used by the v1 dashboard cards.
 */
export interface LegacyDashboardSummary {
  shipments: number;
  activeDrivers: number;
  warehouses: readonly string[];
}

/** @deprecated */
export function getLegacyDashboardSummary(): LegacyDashboardSummary {
  return {
    shipments: getShipmentCount(),
    activeDrivers: getActiveDriverCount(),
    warehouses: LEGACY_WAREHOUSE_LIST,
  };
}
