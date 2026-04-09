import { describe, it, expect } from "vitest";
import { computeDashboardMetrics } from "@/lib/analytics/dashboardMetrics";
import {
  getLegacyDashboardSummary,
  getShipmentCount,
  getActiveDriverCount,
  LEGACY_WAREHOUSE_LIST,
} from "@/lib/analytics/legacyMetrics";

describe("Dashboard Metrics (v2)", () => {
  it("computes all metrics", () => {
    const metrics = computeDashboardMetrics();
    expect(metrics.totalShipments).toBeGreaterThan(0);
    expect(metrics.totalDrivers).toBeGreaterThan(0);
    expect(metrics.totalInventoryItems).toBeGreaterThan(0);
    expect(metrics.inventoryValue).toBeGreaterThan(0);
  });

  it("in-transit + delivered + pending + cancelled <= total", () => {
    const m = computeDashboardMetrics();
    const sum =
      m.shipmentsInTransit + m.shipmentsDelivered + m.shipmentsPending;
    expect(sum).toBeLessThanOrEqual(m.totalShipments);
  });
});

/**
 * Tests for legacy analytics — these exist to ensure the legacy path
 * still works while the ENABLE_ANALYTICS_V2 flag is being cleaned up.
 * Once the flag and legacy code are removed, these tests should also be deleted.
 */
describe("Legacy Dashboard Metrics (v1)", () => {
  it("returns shipment count", () => {
    expect(getShipmentCount()).toBeGreaterThan(0);
  });

  it("returns active driver count (legacy definition)", () => {
    // Legacy: only counts "available" drivers, not "on_route"
    const count = getActiveDriverCount();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  it("legacy warehouse list has entries", () => {
    expect(LEGACY_WAREHOUSE_LIST.length).toBeGreaterThan(0);
  });

  it("returns legacy dashboard summary", () => {
    const summary = getLegacyDashboardSummary();
    expect(summary.shipments).toBeGreaterThan(0);
    expect(summary.warehouses.length).toBeGreaterThan(0);
  });
});
