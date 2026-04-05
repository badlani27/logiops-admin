/**
 * LegacyShipmentCard
 *
 * The original shipment card component from the v1 shipping interface.
 * This is only rendered when ENABLE_OLD_SHIPPING_FLOW is enabled (currently
 * disabled for all users). It uses the old date formatter and carrier code
 * resolver, both of which are deprecated.
 *
 * TODO(shipping-team): Remove this component after ENABLE_OLD_SHIPPING_FLOW
 * flag cleanup.
 */

import { Shipment } from "@/lib/logistics/shipments";
import {
  formatShippingDate,
  resolveCarrierCode,
  LEGACY_CARRIER_CODES,
} from "@/lib/logistics/formatters";

interface LegacyShipmentCardProps {
  shipment: Shipment;
}

export default function LegacyShipmentCard({
  shipment,
}: LegacyShipmentCardProps) {
  // Legacy: resolve carrier name via old code mapping (falls back to raw name)
  const carrierCode = Object.entries(LEGACY_CARRIER_CODES).find(
    ([, name]) => name === shipment.carrier
  )?.[0];
  const displayCarrier = carrierCode
    ? resolveCarrierCode(carrierCode)
    : shipment.carrier;

  return (
    <div className="border border-gray-300 rounded p-4 bg-gray-50">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-gray-700">{shipment.id}</span>
        <span className="text-xs uppercase text-gray-500">
          {shipment.status}
        </span>
      </div>
      <table className="w-full text-sm">
        <tbody>
          <tr>
            <td className="text-gray-500 py-1">Tracking #</td>
            <td className="text-right">{shipment.trackingNumber}</td>
          </tr>
          <tr>
            <td className="text-gray-500 py-1">From</td>
            <td className="text-right">{shipment.origin}</td>
          </tr>
          <tr>
            <td className="text-gray-500 py-1">To</td>
            <td className="text-right">{shipment.destination}</td>
          </tr>
          <tr>
            <td className="text-gray-500 py-1">Carrier</td>
            <td className="text-right">{displayCarrier}</td>
          </tr>
          <tr>
            <td className="text-gray-500 py-1">ETA</td>
            <td className="text-right">
              {formatShippingDate(shipment.estimatedDelivery)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
