/**
 * LegacyInventoryTable
 *
 * The original inventory display component. This was a simpler table that
 * did not show category, warehouse, or stock status. It was replaced by
 * the InventoryTable component in the src/components/active/ directory.
 *
 * Gated by USE_LEGACY_INVENTORY_TABLE flag (currently disabled).
 *
 * TODO(warehouse-team): Delete once USE_LEGACY_INVENTORY_TABLE flag is removed.
 */

import { InventoryItem } from "@/lib/logistics/inventory";
import { formatCurrency } from "@/lib/logistics/formatters";

interface LegacyInventoryTableProps {
  items: InventoryItem[];
}

export default function LegacyInventoryTable({
  items,
}: LegacyInventoryTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 border-b">
              SKU
            </th>
            <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 border-b">
              Item Name
            </th>
            <th className="px-4 py-2 text-right text-sm font-bold text-gray-700 border-b">
              Qty
            </th>
            <th className="px-4 py-2 text-right text-sm font-bold text-gray-700 border-b">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-gray-200">
              <td className="px-4 py-2 text-sm font-mono">{item.sku}</td>
              <td className="px-4 py-2 text-sm">{item.name}</td>
              <td className="px-4 py-2 text-sm text-right">{item.quantity}</td>
              <td className="px-4 py-2 text-sm text-right">
                {formatCurrency(item.unitPrice)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
