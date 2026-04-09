/**
 * Dashboard analytics — v2 aggregation pipeline.
 *
 * This is the current active implementation, enabled by the ENABLE_ANALYTICS_V2 flag.
 */

import { getShipments } from "@/lib/logistics/shipments";
import { getDrivers } from "@/lib/logistics/drivers";
import { getInventory, getLowStockItems } from "@/lib/logistics/inventory";

export interface DashboardMetrics {
  totalShipments: number;
  shipmentsInTransit: number;
  shipmentsDelivered: number;
  shipmentsPending: number;
  totalDrivers: number;
  driversAvailable: number;
  driversOnRoute: number;
  totalInventoryItems: number;
  lowStockCount: number;
  inventoryValue: number;
}

export function computeDashboardMetrics(): DashboardMetrics {
  const shipments = getShipments();
  const drivers = getDrivers();
  const inventory = getInventory();
  const lowStock = getLowStockItems();

  return {
    totalShipments: shipments.length,
    shipmentsInTransit: shipments.filter((s) => s.status === "in_transit").length,
    shipmentsDelivered: shipments.filter((s) => s.status === "delivered").length,
    shipmentsPending: shipments.filter((s) => s.status === "pending").length,
    totalDrivers: drivers.length,
    driversAvailable: drivers.filter((d) => d.status === "available").length,
    driversOnRoute: drivers.filter((d) => d.status === "on_route").length,
    totalInventoryItems: inventory.length,
    lowStockCount: lowStock.length,
    inventoryValue: inventory.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    ),
  };
}
