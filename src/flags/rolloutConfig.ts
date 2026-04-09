/**
 * Rollout configuration for gradual feature flag changes.
 *
 * This file tracks the rollout history and schedule for feature flags.
 * In practice, this would be driven by a remote config service, but for
 * this internal tool we keep it in-code for simplicity.
 *
 * NOTE: Several entries below are for flags that have completed their rollout
 * and should be cleaned up along with the flag itself.
 */

export interface RolloutEntry {
  flagName: string;
  /** Percentage of users who see this feature (0–100) */
  rolloutPercentage: number;
  /** When the rollout reached this percentage */
  updatedAt: string;
  notes?: string;
}

export const rolloutConfig: RolloutEntry[] = [
  {
    flagName: "ENABLE_OLD_SHIPPING_FLOW",
    rolloutPercentage: 0,
    updatedAt: "2024-11-01",
    notes: "Disabled for all users after v2 shipping launch. Safe to remove.",
  },
  {
    flagName: "SHOW_BETA_DRIVER_PANEL",
    rolloutPercentage: 100,
    updatedAt: "2025-02-15",
    notes: "Fully rolled out. Beta label removed from UI. Flag can be deleted.",
  },
  {
    flagName: "USE_LEGACY_INVENTORY_TABLE",
    rolloutPercentage: 0,
    updatedAt: "2025-11-20",
    notes: "Legacy table disabled. New data grid is the default. Cleanup pending.",
  },
  {
    flagName: "ENABLE_ANALYTICS_V2",
    rolloutPercentage: 100,
    updatedAt: "2025-05-01",
    notes: "V2 analytics fully rolled out. V1 helpers can be removed.",
  },
];

/**
 * Get the current rollout percentage for a flag.
 * @deprecated This helper was useful during gradual rollouts but most flags
 * are now either 0% or 100%. Consider removing after flag cleanup.
 */
export function getRolloutPercentage(flagName: string): number {
  const entry = rolloutConfig.find((r) => r.flagName === flagName);
  return entry?.rolloutPercentage ?? 0;
}
