import { describe, it, expect } from "vitest";
import { isFeatureEnabled, featureFlags } from "@/flags/featureFlags";
import { getRolloutPercentage, rolloutConfig } from "@/flags/rolloutConfig";

describe("Feature Flags", () => {
  it("returns true for enabled flags", () => {
    expect(isFeatureEnabled("SHOW_BETA_DRIVER_PANEL")).toBe(true);
    expect(isFeatureEnabled("ENABLE_ANALYTICS_V2")).toBe(true);
  });

  it("returns false for disabled flags", () => {
    expect(isFeatureEnabled("ENABLE_OLD_SHIPPING_FLOW")).toBe(false);
    expect(isFeatureEnabled("USE_LEGACY_INVENTORY_TABLE")).toBe(false);
  });

  it("returns false for unknown flags", () => {
    expect(isFeatureEnabled("NONEXISTENT_FLAG")).toBe(false);
  });

  it("has metadata for all defined flags", () => {
    for (const [key, flag] of Object.entries(featureFlags)) {
      expect(flag.name).toBe(key);
      expect(flag.description).toBeTruthy();
      expect(flag.addedAt).toBeTruthy();
      expect(flag.owner).toBeTruthy();
    }
  });

  it("marks fully rolled out flags", () => {
    expect(featureFlags.SHOW_BETA_DRIVER_PANEL.fullyRolledOut).toBe(true);
    expect(featureFlags.ENABLE_ANALYTICS_V2.fullyRolledOut).toBe(true);
  });
});

describe("Rollout Config", () => {
  it("returns rollout percentage for known flags", () => {
    expect(getRolloutPercentage("SHOW_BETA_DRIVER_PANEL")).toBe(100);
    expect(getRolloutPercentage("ENABLE_OLD_SHIPPING_FLOW")).toBe(0);
  });

  it("returns 0 for unknown flags", () => {
    expect(getRolloutPercentage("NONEXISTENT")).toBe(0);
  });

  it("has an entry for every defined flag", () => {
    const flagNames = Object.keys(featureFlags);
    const rolloutFlagNames = rolloutConfig.map((r) => r.flagName);
    for (const name of flagNames) {
      expect(rolloutFlagNames).toContain(name);
    }
  });
});
