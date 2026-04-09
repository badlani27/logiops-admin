# Feature Flag Policy

> **Owner:** Engineering — LogiOps Admin  
> **Last updated:** 2025-12-10

## Purpose

Feature flags let us ship incremental changes safely behind toggles. This document describes how we manage flags in the LogiOps Admin codebase and when they should be cleaned up.

## Flag Lifecycle

Every feature flag should go through these stages:

1. **Created** — A flag is added to `src/flags/featureFlags.ts` with `enabled: false` and a corresponding entry in `src/flags/rolloutConfig.ts` at 0% rollout.
2. **Gradual Rollout** — The rollout percentage is increased over time. The `rolloutConfig.ts` entry is updated with each change and a note explaining the reason.
3. **Fully Rolled Out** — The flag reaches 100% rollout and is set to `enabled: true`. The `fullyRolledOut` field should be set to `true` in the flag definition.
4. **Cleanup** — Once a flag has been fully rolled out for **at least 2 weeks** with no issues, it should be cleaned up:
   - Remove the flag from `featureFlags.ts` and `rolloutConfig.ts`.
   - Inline the enabled code path as the default.
   - Delete the disabled code path (legacy components, old utilities, etc.).
   - Remove or update any tests that specifically tested the old path.

## Current Flag Status

| Flag | Status | Action Needed |
|------|--------|---------------|
| `ENABLE_OLD_SHIPPING_FLOW` | Disabled (0%) | **Remove flag and delete legacy shipping components** (`LegacyShipmentCard`, `ShipmentFiltersV1`, legacy formatters). The v2 shipping UI has been the default since Q3 2024. |
| `SHOW_BETA_DRIVER_PANEL` | Enabled (100%) | **Remove flag and inline driver panel as default.** Delete `OldDriverMap` component. The beta period ended in Q1 2025. |
| `USE_LEGACY_INVENTORY_TABLE` | Disabled (0%) | **Remove flag and delete `LegacyInventoryTable`.** The new data grid has been stable since Nov 2025. |
| `ENABLE_ANALYTICS_V2` | Enabled (100%) | **Remove flag and delete v1 analytics helpers** (`legacyMetrics.ts`). V2 has been fully rolled out since Q2 2025. |

## Naming Conventions

- Use `UPPER_SNAKE_CASE` for flag names.
- Prefix with a verb: `ENABLE_`, `SHOW_`, `USE_`.
- Be descriptive about what the flag controls.

## Where Flags Are Referenced

Flags are checked using `isFeatureEnabled(flagName)` from `src/flags/featureFlags.ts`. When cleaning up a flag, search the entire codebase for references to the flag name to ensure all conditional branches are removed.

Common places where flags appear:
- Page components (`src/app/*/page.tsx`) — conditional rendering of active vs. legacy UI.
- The dashboard page — conditional use of v1 vs. v2 analytics.
- Component imports — legacy components may only be imported in flag-gated paths.

## Guidelines

- **Do not leave flags at 100% indefinitely.** A fully rolled-out flag is tech debt. Clean it up.
- **Do not gate unrelated features behind a single flag.** Each flag should control one coherent behavior change.
- **Always add tests for both paths** during rollout. Once cleaned up, remove the tests for the deleted path.
- **Document why a flag exists** in both the flag definition (comment in `featureFlags.ts`) and in this policy document.

## Cleanup Checklist

When removing a flag, follow this checklist:

- [ ] Remove the flag definition from `src/flags/featureFlags.ts`
- [ ] Remove the rollout entry from `src/flags/rolloutConfig.ts`
- [ ] Remove all `isFeatureEnabled("FLAG_NAME")` calls and their conditional branches
- [ ] Delete any components, utilities, or config that were only used by the removed path
- [ ] Update or remove tests that covered the removed path
- [ ] Update this document's "Current Flag Status" table
- [ ] Verify the app builds and all remaining tests pass
