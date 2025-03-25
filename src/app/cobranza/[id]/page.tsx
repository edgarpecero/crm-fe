import OrderDetailsContent from '@/components/features/orders/details/OrderDetailsContent';
import CircularIndeterminate from '@/components/ui/Progress/CircularIndeterminate';
import { updateOrderAction } from '@/services/actions/orderActions';
import { orderService } from '@/services/orderService';
import { PageModeEnum } from '@/types/enums';
import { OrderRequest } from '@/types/orders';
import { Suspense } from 'react';

export default async function OrderDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const order = await orderService.getById(id);
  const mode = query.mode === PageModeEnum.READONLY ? PageModeEnum.READONLY : PageModeEnum.UPDATE;
  const handleSubmit = async (data: OrderRequest) => {
    await updateOrderAction(id, data);
  };
  return (
    <Suspense fallback={<CircularIndeterminate />}>
      <OrderDetailsContent initialOrder={order} mode={mode} onSubmit={handleSubmit} />
    </Suspense>
  );
}
