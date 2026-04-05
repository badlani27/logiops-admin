import { describe, it, expect } from "vitest";
import {
  getShipments,
  getShipmentById,
  getShipmentsByStatus,
} from "@/lib/logistics/shipments";

describe("Shipments data layer", () => {
  it("returns all mock shipments", () => {
    const shipments = getShipments();
    expect(shipments.length).toBeGreaterThan(0);
  });

  it("finds a shipment by id", () => {
    const shipment = getShipmentById("SHP-001");
    expect(shipment).toBeDefined();
    expect(shipment!.trackingNumber).toBe("TRK-2025-00147");
  });

  it("returns undefined for unknown id", () => {
    expect(getShipmentById("SHP-999")).toBeUndefined();
  });

  it("filters shipments by status", () => {
    const inTransit = getShipmentsByStatus("in_transit");
    expect(inTransit.length).toBeGreaterThan(0);
    inTransit.forEach((s) => expect(s.status).toBe("in_transit"));
  });

  it("each shipment has required fields", () => {
    const shipments = getShipments();
    for (const s of shipments) {
      expect(s.id).toBeTruthy();
      expect(s.trackingNumber).toBeTruthy();
      expect(s.origin).toBeTruthy();
      expect(s.destination).toBeTruthy();
      expect(s.carrier).toBeTruthy();
      expect(s.weight).toBeGreaterThan(0);
    }
  });
});
