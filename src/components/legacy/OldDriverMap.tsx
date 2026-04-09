/**
 * OldDriverMap
 *
 * A placeholder "map" component from the original driver tracking UI.
 * Before the SHOW_BETA_DRIVER_PANEL was introduced, this static list was
 * the only way to see driver locations. It's been replaced by the DriverPanel
 * component which shows richer driver information.
 *
 * This component is only meaningful when SHOW_BETA_DRIVER_PANEL is disabled,
 * which no longer happens in practice (the flag is at 100% rollout).
 *
 * TODO(fleet-team): Remove this component when SHOW_BETA_DRIVER_PANEL is cleaned up.
 */

import { Driver } from "@/lib/logistics/drivers";

interface OldDriverMapProps {
  drivers: Driver[];
}

export default function OldDriverMap({ drivers }: OldDriverMapProps) {
  return (
    <div className="border border-gray-300 rounded p-4 bg-gray-50">
      <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
        Driver Locations (Legacy View)
      </h3>
      <div className="space-y-2">
        {drivers.map((driver) => (
          <div
            key={driver.id}
            className="flex items-center justify-between py-2 px-3 bg-white rounded border border-gray-200"
          >
            <div>
              <span className="font-medium text-gray-800">{driver.name}</span>
              <span className="ml-2 text-xs text-gray-400">
                ({driver.assignedVehicle})
              </span>
            </div>
            <div className="text-sm text-gray-600">
              {driver.currentLocation}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-gray-400 italic">
        Map visualization unavailable — showing list fallback.
      </p>
    </div>
  );
}
