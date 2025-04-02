import InventoryDetailsContent from '@/components/features/inventory/details/InventoryDetailsContent';
import CircularIndeterminate from '@/components/ui/Progress/CircularIndeterminate';
import { PageActionsEnum } from '@/types/enums';
import { Suspense } from 'react';

export default async function InventoryDetailsPage() {
  return (
    <Suspense fallback={<CircularIndeterminate />}>
      <InventoryDetailsContent mode={PageActionsEnum.CREATE} />
    </Suspense>
  );
}
