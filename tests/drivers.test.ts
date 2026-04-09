import { describe, it, expect } from "vitest";
import {
  getDrivers,
  getDriverById,
  getDriversByStatus,
} from "@/lib/logistics/drivers";

describe("Drivers data layer", () => {
  it("returns all mock drivers", () => {
    const drivers = getDrivers();
    expect(drivers.length).toBeGreaterThan(0);
  });

  it("finds a driver by id", () => {
    const driver = getDriverById("DRV-001");
    expect(driver).toBeDefined();
    expect(driver!.name).toBe("Maria Santos");
  });

  it("returns undefined for unknown id", () => {
    expect(getDriverById("DRV-999")).toBeUndefined();
  });

  it("filters drivers by status", () => {
    const available = getDriversByStatus("available");
    expect(available.length).toBeGreaterThan(0);
    available.forEach((d) => expect(d.status).toBe("available"));
  });
});
