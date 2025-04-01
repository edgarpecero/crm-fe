import OrderDetailsContent from '@/components/features/orders/details/OrderDetailsContent';
import CircularIndeterminate from '@/components/ui/Progress/CircularIndeterminate';
import { PageActionsEnum } from '@/types/enums';
import { Suspense } from 'react';

export default async function OrderDetailsPage() {
  return (
    <Suspense fallback={<CircularIndeterminate />}>
      <OrderDetailsContent mode={PageActionsEnum.CREATE} />
    </Suspense>
  );
}
