import PageHeader from "@/components/layout/PageHeader";
import InventoryTable from "@/components/active/InventoryTable";
import LegacyInventoryTable from "@/components/legacy/LegacyInventoryTable";
import { isFeatureEnabled } from "@/flags/featureFlags";
import { getInventory, getLowStockItems } from "@/lib/logistics/inventory";

export default function InventoryPage() {
  const useLegacyTable = isFeatureEnabled("USE_LEGACY_INVENTORY_TABLE");
  const inventory = getInventory();
  const lowStockItems = getLowStockItems();

  if (useLegacyTable) {
    return (
      <div>
        <PageHeader
          title="Inventory"
          description="Warehouse inventory (legacy table)"
        />
        <LegacyInventoryTable items={inventory} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Inventory"
        description="Warehouse stock levels and reorder tracking"
      />

      {lowStockItems.length > 0 && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm font-medium text-red-800">
            ⚠ {lowStockItems.length} item(s) below reorder point
          </p>
          <p className="text-xs text-red-600 mt-1">
            {lowStockItems.map((i) => i.name).join(", ")}
          </p>
        </div>
      )}

      <InventoryTable items={inventory} />
    </div>
  );
}
