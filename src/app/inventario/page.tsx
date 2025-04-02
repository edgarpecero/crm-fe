import InventoryTable from '@/components/features/inventory/InventoryTable';
import { inventoryService } from '@/services/inventoryService';

export default async function InventaryTablePage() {
  const initialData = await inventoryService.getAll();

  return <InventoryTable initialData={initialData} />;
}
