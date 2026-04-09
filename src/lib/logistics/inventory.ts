/**
 * Mock inventory data layer.
 */

export type InventoryCategory =
  | "electronics"
  | "machinery"
  | "raw_materials"
  | "packaging"
  | "spare_parts";

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: InventoryCategory;
  quantity: number;
  warehouse: string;
  reorderPoint: number;
  unitPrice: number;
  lastRestocked: string;
}

export const mockInventory: InventoryItem[] = [
  {
    id: "INV-001",
    sku: "ELC-GPS-100",
    name: "Fleet GPS Module",
    category: "electronics",
    quantity: 142,
    warehouse: "Chicago Main",
    reorderPoint: 50,
    unitPrice: 89.99,
    lastRestocked: "2026-03-15",
  },
  {
    id: "INV-002",
    sku: "MCH-LIFT-200",
    name: "Hydraulic Lift Cylinder",
    category: "machinery",
    quantity: 23,
    warehouse: "Dallas South",
    reorderPoint: 30,
    unitPrice: 450.0,
    lastRestocked: "2026-02-20",
  },
  {
    id: "INV-003",
    sku: "RAW-STL-050",
    name: "Steel Plate (4x8 ft)",
    category: "raw_materials",
    quantity: 310,
    warehouse: "Chicago Main",
    reorderPoint: 100,
    unitPrice: 125.5,
    lastRestocked: "2026-03-28",
  },
  {
    id: "INV-004",
    sku: "PKG-BOX-LRG",
    name: "Shipping Box (Large)",
    category: "packaging",
    quantity: 2400,
    warehouse: "LA West",
    reorderPoint: 500,
    unitPrice: 3.25,
    lastRestocked: "2026-04-01",
  },
  {
    id: "INV-005",
    sku: "SPR-BRK-010",
    name: "Brake Pad Set (Heavy Duty)",
    category: "spare_parts",
    quantity: 67,
    warehouse: "Denver Depot",
    reorderPoint: 40,
    unitPrice: 78.0,
    lastRestocked: "2026-03-10",
  },
  {
    id: "INV-006",
    sku: "ELC-DASH-300",
    name: "Dashboard Camera Unit",
    category: "electronics",
    quantity: 89,
    warehouse: "Chicago Main",
    reorderPoint: 25,
    unitPrice: 149.99,
    lastRestocked: "2026-03-22",
  },
  {
    id: "INV-007",
    sku: "SPR-TIRE-020",
    name: "Commercial Tire (11R22.5)",
    category: "spare_parts",
    quantity: 15,
    warehouse: "Dallas South",
    reorderPoint: 20,
    unitPrice: 320.0,
    lastRestocked: "2026-02-10",
  },
];

export function getInventory(): InventoryItem[] {
  return mockInventory;
}

export function getInventoryById(id: string): InventoryItem | undefined {
  return mockInventory.find((item) => item.id === id);
}

export function getLowStockItems(): InventoryItem[] {
  return mockInventory.filter((item) => item.quantity <= item.reorderPoint);
}
