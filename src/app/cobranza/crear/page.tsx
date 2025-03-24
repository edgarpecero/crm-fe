import OrderDetailsContent from '@/components/features/orders/details/OrderDetailsContent';
import { FormModeEnum } from '@/components/layout/FormData/helpers';
import CircularIndeterminate from '@/components/ui/Progress/CircularIndeterminate';
import { Suspense } from 'react';

export default async function OrderDetailsPage() {
  //TODO: Add request to get customers
  // const { id } = await params;
  // const customers = await getAllCustomers();

  return (
    <Suspense fallback={<CircularIndeterminate />}>
      <OrderDetailsContent mode={FormModeEnum.CREATE} />
    </Suspense>
  );
}
