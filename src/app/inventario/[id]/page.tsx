import InventoryDetailsContent from '@/components/features/inventory/details/InventoryDetailsContent';
import CircularIndeterminate from '@/components/ui/Progress/CircularIndeterminate';
import { inventoryService } from '@/services/inventoryService';
import { PageActionsEnum } from '@/types/enums';
import { Suspense } from 'react';

export default async function InventoryDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const inventory = await inventoryService.getById(id);

  return (
    <Suspense fallback={<CircularIndeterminate />}>
      <InventoryDetailsContent initialData={inventory} id={id} mode={PageActionsEnum.UPDATE} />
    </Suspense>
  );
}
