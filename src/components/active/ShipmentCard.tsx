import { Shipment } from "@/lib/logistics/shipments";
import { formatDate, getStatusColor } from "@/lib/logistics/formatters";

interface ShipmentCardProps {
  shipment: Shipment;
}

export default function ShipmentCard({ shipment }: ShipmentCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <span className="font-semibold text-gray-900">{shipment.id}</span>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}
        >
          {shipment.status.replace("_", " ")}
        </span>
      </div>
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Tracking</span>
          <span className="font-mono text-gray-800">
            {shipment.trackingNumber}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Route</span>
          <span>
            {shipment.origin} → {shipment.destination}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Carrier</span>
          <span>{shipment.carrier}</span>
        </div>
        <div className="flex justify-between">
          <span>Weight</span>
          <span>{shipment.weight} kg</span>
        </div>
        <div className="flex justify-between">
          <span>Est. Delivery</span>
          <span>{formatDate(shipment.estimatedDelivery)}</span>
        </div>
      </div>
    </div>
  );
}
