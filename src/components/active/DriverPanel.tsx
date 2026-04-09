import { Driver } from "@/lib/logistics/drivers";
import { getDriverStatusColor } from "@/lib/logistics/formatters";

interface DriverPanelProps {
  driver: Driver;
}

export default function DriverPanel({ driver }: DriverPanelProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{driver.name}</h3>
          <p className="text-xs text-gray-400">{driver.id}</p>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getDriverStatusColor(driver.status)}`}
        >
          {driver.status.replace("_", " ")}
        </span>
      </div>
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>License</span>
          <span className="font-mono">{driver.licenseNumber}</span>
        </div>
        <div className="flex justify-between">
          <span>Vehicle</span>
          <span>{driver.assignedVehicle}</span>
        </div>
        <div className="flex justify-between">
          <span>Location</span>
          <span className="text-right max-w-[200px] truncate">
            {driver.currentLocation}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Trips</span>
          <span>{driver.completedTrips}</span>
        </div>
        <div className="flex justify-between">
          <span>Rating</span>
          <span>{"★".repeat(Math.round(driver.rating))} {driver.rating}</span>
        </div>
      </div>
    </div>
  );
}
