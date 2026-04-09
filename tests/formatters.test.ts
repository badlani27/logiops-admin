import { describe, it, expect } from "vitest";
import {
  formatCurrency,
  formatDate,
  getStatusColor,
  getDriverStatusColor,
  formatShippingDate,
  resolveCarrierCode,
} from "@/lib/logistics/formatters";

describe("Active formatters", () => {
  it("formats currency as USD", () => {
    expect(formatCurrency(1234.5)).toBe("$1,234.50");
  });

  it("formats dates readably", () => {
    const result = formatDate("2026-04-05");
    expect(result).toContain("2026");
    expect(result).toContain("Apr");
  });

  it("returns correct status colors", () => {
    expect(getStatusColor("delivered")).toContain("green");
    expect(getStatusColor("in_transit")).toContain("blue");
    expect(getStatusColor("pending")).toContain("yellow");
    expect(getStatusColor("cancelled")).toContain("red");
    expect(getStatusColor("unknown")).toContain("gray");
  });

  it("returns correct driver status colors", () => {
    expect(getDriverStatusColor("available")).toContain("green");
    expect(getDriverStatusColor("on_route")).toContain("blue");
    expect(getDriverStatusColor("off_duty")).toContain("gray");
    expect(getDriverStatusColor("maintenance")).toContain("orange");
  });
});

/**
 * Tests for legacy formatters — to be removed with ENABLE_OLD_SHIPPING_FLOW cleanup.
 */
describe("Legacy formatters", () => {
  it("formats shipping date in M/D/YYYY", () => {
    const result = formatShippingDate("2026-04-05");
    expect(result).toBe("4/5/2026");
  });

  it("resolves carrier codes", () => {
    expect(resolveCarrierCode("FF")).toBe("FastFreight");
    expect(resolveCarrierCode("PH")).toBe("PacificHaul");
    expect(resolveCarrierCode("UNKNOWN")).toBe("Unknown Carrier");
  });
});
