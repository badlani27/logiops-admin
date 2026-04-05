/**
 * Mock shipment data layer.
 *
 * In a real app this would query a database or internal API.
 */

export type ShipmentStatus =
  | "pending"
  | "in_transit"
  | "delivered"
  | "cancelled";

export interface Shipment {
  id: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  estimatedDelivery: string;
  weight: number; // kg
  carrier: string;
  createdAt: string;
}

export const mockShipments: Shipment[] = [
  {
    id: "SHP-001",
    trackingNumber: "TRK-2025-00147",
    origin: "Chicago, IL",
    destination: "New York, NY",
    status: "in_transit",
    estimatedDelivery: "2026-04-07",
    weight: 24.5,
    carrier: "FastFreight",
    createdAt: "2026-04-01",
  },
  {
    id: "SHP-002",
    trackingNumber: "TRK-2025-00148",
    origin: "Los Angeles, CA",
    destination: "Seattle, WA",
    status: "delivered",
    estimatedDelivery: "2026-04-03",
    weight: 12.0,
    carrier: "PacificHaul",
    createdAt: "2026-03-28",
  },
  {
    id: "SHP-003",
    trackingNumber: "TRK-2025-00149",
    origin: "Dallas, TX",
    destination: "Miami, FL",
    status: "pending",
    estimatedDelivery: "2026-04-10",
    weight: 45.2,
    carrier: "SouthernExpress",
    createdAt: "2026-04-04",
  },
  {
    id: "SHP-004",
    trackingNumber: "TRK-2025-00150",
    origin: "Denver, CO",
    destination: "Phoenix, AZ",
    status: "in_transit",
    estimatedDelivery: "2026-04-06",
    weight: 8.7,
    carrier: "MountainLine",
    createdAt: "2026-04-02",
  },
  {
    id: "SHP-005",
    trackingNumber: "TRK-2025-00151",
    origin: "Atlanta, GA",
    destination: "Boston, MA",
    status: "cancelled",
    estimatedDelivery: "2026-04-08",
    weight: 33.1,
    carrier: "EastCoastLogistics",
    createdAt: "2026-03-30",
  },
  {
    id: "SHP-006",
    trackingNumber: "TRK-2025-00152",
    origin: "Portland, OR",
    destination: "Salt Lake City, UT",
    status: "delivered",
    estimatedDelivery: "2026-04-04",
    weight: 19.4,
    carrier: "PacificHaul",
    createdAt: "2026-03-29",
  },
];

export function getShipments(): Shipment[] {
  return mockShipments;
}

export function getShipmentById(id: string): Shipment | undefined {
  return mockShipments.find((s) => s.id === id);
}

export function getShipmentsByStatus(status: ShipmentStatus): Shipment[] {
  return mockShipments.filter((s) => s.status === status);
}
