import PageHeader from "@/components/layout/PageHeader";
import DriverPanel from "@/components/active/DriverPanel";
import OldDriverMap from "@/components/legacy/OldDriverMap";
import { isFeatureEnabled } from "@/flags/featureFlags";
import { getDrivers } from "@/lib/logistics/drivers";

export default function DriversPage() {
  const showBetaPanel = isFeatureEnabled("SHOW_BETA_DRIVER_PANEL");
  const drivers = getDrivers();

  // When SHOW_BETA_DRIVER_PANEL is disabled, show legacy driver map.
  // In practice, this flag is always on (100% rollout), so this path is dead.
  if (!showBetaPanel) {
    return (
      <div>
        <PageHeader
          title="Drivers"
          description="Fleet driver tracking (legacy view)"
        />
        <OldDriverMap drivers={drivers} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Drivers"
        description="Fleet management and driver status"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {drivers.map((driver) => (
          <DriverPanel key={driver.id} driver={driver} />
        ))}
      </div>
    </div>
  );
}
