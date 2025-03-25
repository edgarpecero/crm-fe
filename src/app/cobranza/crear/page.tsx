import OrderDetailsContent from '@/components/features/orders/details/OrderDetailsContent';
import CircularIndeterminate from '@/components/ui/Progress/CircularIndeterminate';
import { PageModeEnum } from '@/types/enums';
import { Suspense } from 'react';

export default async function OrderDetailsPage() {
  return (
    <Suspense fallback={<CircularIndeterminate />}>
      <OrderDetailsContent 
        mode={PageModeEnum.CREATE} 
        />
    </Suspense>
  );
}
