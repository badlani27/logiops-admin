/**
 * Feature flag definitions for LogiOps Admin.
 *
 * Flags should be cleaned up once fully rolled out. See docs/feature-flag-policy.md
 * for the team's guidelines on flag lifecycle management.
 *
 * Flag naming convention: UPPER_SNAKE_CASE describing the feature or UI path.
 */

export interface FeatureFlag {
  name: string;
  description: string;
  enabled: boolean;
  /** ISO date when the flag was introduced */
  addedAt: string;
  /** Owner or team responsible for the flag */
  owner: string;
  /** If true, this flag has been fully rolled out and is a candidate for removal */
  fullyRolledOut?: boolean;
}

export const featureFlags: Record<string, FeatureFlag> = {
  /**
   * ENABLE_OLD_SHIPPING_FLOW
   *
   * Gates the legacy shipping card and shipment filters UI.
   * This was the original shipping interface before the v2 redesign in Q3 2024.
   * Currently disabled for all users — the old flow is no longer needed.
   *
   * TODO(ops-eng): This flag and all legacy shipping components should be removed.
   */
  ENABLE_OLD_SHIPPING_FLOW: {
    name: "ENABLE_OLD_SHIPPING_FLOW",
    description: "Show the legacy shipping card and v1 shipment filters",
    enabled: false,
    addedAt: "2023-06-15",
    owner: "shipping-team",
  },

  /**
   * SHOW_BETA_DRIVER_PANEL
   *
   * Originally gated the new driver assignment panel during beta rollout.
   * The beta period ended in Q1 2025 and this flag has been enabled for
   * 100% of users since then. It is now safe to remove and inline the
   * driver panel as the default.
   */
  SHOW_BETA_DRIVER_PANEL: {
    name: "SHOW_BETA_DRIVER_PANEL",
    description: "Display the new driver assignment and status panel",
    enabled: true,
    addedAt: "2024-09-01",
    owner: "fleet-team",
    fullyRolledOut: true,
  },

  /**
   * USE_LEGACY_INVENTORY_TABLE
   *
   * Controls whether the inventory page renders the old HTML table or the
   * new data-grid component. This was kept on during the migration to let
   * warehouse managers fall back if needed. The new table has been stable
   * since Nov 2025 and this flag is effectively always off now, but the
   * legacy table component still ships in the bundle.
   */
  USE_LEGACY_INVENTORY_TABLE: {
    name: "USE_LEGACY_INVENTORY_TABLE",
    description: "Render the old inventory table instead of the new data grid",
    enabled: false,
    addedAt: "2024-03-10",
    owner: "warehouse-team",
  },

  /**
   * ENABLE_ANALYTICS_V2
   *
   * Switches dashboard analytics widgets to use the v2 aggregation pipeline.
   * This has been enabled for all users since Q2 2025. The v1 analytics
   * helpers are still in the codebase but no longer called when this flag is on.
   */
  ENABLE_ANALYTICS_V2: {
    name: "ENABLE_ANALYTICS_V2",
    description: "Use v2 analytics aggregation for dashboard metrics",
    enabled: true,
    addedAt: "2025-01-20",
    owner: "data-team",
    fullyRolledOut: true,
  },
};

/**
 * Check whether a feature flag is enabled.
 */
export function isFeatureEnabled(flagName: string): boolean {
  const flag = featureFlags[flagName];
  if (!flag) {
    console.warn(`[FeatureFlags] Unknown flag: ${flagName}`);
    return false;
  }
  return flag.enabled;
}
