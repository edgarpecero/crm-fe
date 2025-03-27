import OrderDetailsContent from '@/components/features/orders/details/OrderDetailsContent';
import CircularIndeterminate from '@/components/ui/Progress/CircularIndeterminate';
import { orderService } from '@/services/orderService';
import { PageModeEnum } from '@/types/enums';
import { Suspense } from 'react';
import InnerPageTabs from '@/components/layout/InnerPageTabs/InnerPageTabs';
import { enumToTabsArray } from '@/components/layout/InnerPageTabs/helpers';
import { TabsIdentifierEnum } from '@/components/layout/InnerPageTabs/types';
import OrderPayments from '@/components/features/orders/details/OrderPayments';
import { OrdersTabsEnum } from '@/components/features/orders/helpers';

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
      <InnerPageTabs tabsArray={enumToTabsArray(OrdersTabsEnum)} id={TabsIdentifierEnum.ordersTab}>
        <OrderDetailsContent initialData={order} mode={PageModeEnum.UPDATE} />
        <OrderPayments initialData={order} mode={PageModeEnum.UPDATE} />
      </InnerPageTabs>
    </Suspense>
  );
}
