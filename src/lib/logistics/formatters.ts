/**
 * Formatting utilities for the logistics domain.
 */

/**
 * Format a currency value as USD.
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

/**
 * Format a date string into a human-readable form.
 */
export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Get a CSS-friendly color class for a shipment status badge.
 */
export function getStatusColor(status: string): string {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-800";
    case "in_transit":
      return "bg-blue-100 text-blue-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

/**
 * Get a CSS-friendly color class for a driver status badge.
 */
export function getDriverStatusColor(status: string): string {
  switch (status) {
    case "available":
      return "bg-green-100 text-green-800";
    case "on_route":
      return "bg-blue-100 text-blue-800";
    case "off_duty":
      return "bg-gray-100 text-gray-600";
    case "maintenance":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

// ─── Legacy formatters ──────────────────────────────────────────────────────
// These were used by the old shipping flow and are no longer needed.

/**
 * @deprecated Use formatDate() instead. This was the original date formatter
 * that used a different locale format.
 */
export function formatShippingDate(dateStr: string): string {
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

/**
 * @deprecated Carrier code mapping from the v1 shipping system.
 * The current system uses full carrier names directly.
 */
export const LEGACY_CARRIER_CODES: Record<string, string> = {
  FF: "FastFreight",
  PH: "PacificHaul",
  SE: "SouthernExpress",
  ML: "MountainLine",
  ECL: "EastCoastLogistics",
};

/**
 * @deprecated Resolve a legacy carrier code to a carrier name.
 */
export function resolveCarrierCode(code: string): string {
  return LEGACY_CARRIER_CODES[code] ?? "Unknown Carrier";
}
