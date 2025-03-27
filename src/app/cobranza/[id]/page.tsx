import OrderDetailsContent from '@/components/features/orders/details/OrderDetailsContent';
import CircularIndeterminate from '@/components/ui/Progress/CircularIndeterminate';
import { orderService } from '@/services/orderService';
import { PageModeEnum } from '@/types/enums';
import { Suspense } from 'react';

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const order = await orderService.getById(id);

  return (
    <Suspense fallback={<CircularIndeterminate />}>
      <OrderDetailsContent initialOrder={order} mode={PageModeEnum.UPDATE} />
    </Suspense>
  );
}
