import { describe, it, expect } from "vitest";
import {
  getInventory,
  getInventoryById,
  getLowStockItems,
} from "@/lib/logistics/inventory";

describe("Inventory data layer", () => {
  it("returns all mock inventory items", () => {
    const items = getInventory();
    expect(items.length).toBeGreaterThan(0);
  });

  it("finds an item by id", () => {
    const item = getInventoryById("INV-001");
    expect(item).toBeDefined();
    expect(item!.sku).toBe("ELC-GPS-100");
  });

  it("returns undefined for unknown id", () => {
    expect(getInventoryById("INV-999")).toBeUndefined();
  });

  it("identifies low stock items correctly", () => {
    const lowStock = getLowStockItems();
    for (const item of lowStock) {
      expect(item.quantity).toBeLessThanOrEqual(item.reorderPoint);
    }
  });

  it("each item has valid pricing", () => {
    const items = getInventory();
    for (const item of items) {
      expect(item.unitPrice).toBeGreaterThan(0);
      expect(item.quantity).toBeGreaterThanOrEqual(0);
    }
  });
});
